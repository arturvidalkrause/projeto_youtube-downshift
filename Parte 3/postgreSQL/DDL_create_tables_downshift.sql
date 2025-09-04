-- =====================================
-- == ARQUIVO DE CRIAÇÃO DAS TABELAS  ==
-- ==        DOWSHIFT v3.0.5          ==
-- =====================================

--> por brunikito + avidalkrause

----------------
-- DEFINIÇÕES --
----------------
CREATE SCHEMA IF NOT EXISTS downshift;
-- Define um schema para organizar as tabelas
SET search_path TO downshift;

--------------
-- DOMÍNIOS --
--------------
-- URL
CREATE DOMAIN LINK AS VARCHAR(512);

-- ID
CREATE DOMAIN FIREBASEID AS VARCHAR(128);
--> ID firebase
CREATE DOMAIN NANOID AS CHAR(21) CHECK (char_length(VALUE) = 21);
--> atualmente NanoID para tabelas principais
CREATE DOMAIN UID AS INT CHECK (VALUE >= 0);
--> INT para tabelas auxiliares (lookup tables)

--------------------------------------------------
-- TABELAS AUXILIARES (Lookup Tables) <table>_A --
--------------------------------------------------
-- Resoluções do conteúdo
CREATE TABLE resolution_A (
    uid UID PRIMARY KEY, -- PK
    _is_vertical BOOLEAN NOT NULL, -- Vertical?
    _height INT NOT NULL, -- Altura do vídeo (720, 360, etc)
    _type varchar(7) NOT NULL -- (ex: video, short, live)
);

-- Níveis de membro dos canais
CREATE TABLE member_level_A (
    tier INT PRIMARY KEY, -- PK
    _label VARCHAR(30) UNIQUE NOT NULL -- (ex: 0, 1, 2)
);

-- Idiomas disponíveis
CREATE TABLE language_A (
    uid UID PRIMARY KEY, -- PK
    _label VARCHAR(30) UNIQUE NOT NULL -- (ex: português, english)
);

-- Classificações indicativas
CREATE TABLE indicative_rating_A (
    uid UID PRIMARY KEY, -- PK
    _label VARCHAR(2) UNIQUE NOT NULL -- (ex: L, 12, 18)
);

-- Categorias de conteúdo
CREATE TABLE category_A (
    uid UID PRIMARY KEY, -- PK
    _label VARCHAR(50) UNIQUE NOT NULL -- (ex: Música, Esportes)
);

-- Status de conteúdo/playlist
CREATE TABLE status_A (
    uid UID PRIMARY KEY, -- PK
    _label VARCHAR(15) UNIQUE NOT NULL -- (ex: Público, Privado)
);

-- Tipos de interação (Like, Salvar, Denunciar, etc.)
CREATE TABLE interaction_A (
    uid UID PRIMARY KEY, -- PK
    _label VARCHAR(20) NOT NULL UNIQUE -- (ex: Like, Dislike)
);

CREATE TABLE login_provider_A (
    uid UID PRIMARY KEY, -- PK
    _name VARCHAR(50) UNIQUE NOT NULL -- (ex: google, facebook)
);

----------------------------------
-- TABELAS PRINCIPAIS <table>_T --
----------------------------------

-- Dados dos usuários
CREATE TABLE user_T (
    nanoid NANOID PRIMARY KEY, -- PK
    firebaseid FIREBASEID UNIQUE NOT NULL,
    _name VARCHAR(50) NOT NULL, -- Nome
    _email VARCHAR(320) UNIQUE NOT NULL, -- E-mail
    _is_verified BOOLEAN NOT NULL, -- E-mail Verificado?
    _profile_picture_url LINK, -- Pfp URL
    _created_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Instante de criação
    sign_in_provider_uid UID NOT NULL REFERENCES login_provider_A (uid) -- FK <== login_provider_A
);

-- Canais dos usuários
CREATE TABLE channel_T (
    nanoid NANOID PRIMARY KEY, -- PK
    _url LINK UNIQUE NOT NULL, -- URL
    _created_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Instante de criação
    _name VARCHAR(50) NOT NULL, -- Nome
    _description VARCHAR(2000) NOT NULL, -- Descrição
    _banner_url LINK, -- Banner URL
    user_nanoid NANOID NOT NULL REFERENCES user_T (nanoid) -- FK <== user_T
);

-- Links externos dos canais.
CREATE TABLE channel_external_link_T (
    nanoid NANOID PRIMARY KEY,
    channel_nanoid NANOID NOT NULL REFERENCES channel_T (nanoid) ON DELETE CASCADE, -- FK <== channel_T
    _url LINK NOT NULL, -- URL
    UNIQUE (channel_nanoid, _url)
);

-- Usuários administradores de canais
CREATE TABLE user_admin_channel_T (
    user_nanoid NANOID NOT NULL REFERENCES user_T (nanoid), -- PK <== user_T
    channel_nanoid NANOID NOT NULL REFERENCES channel_T (nanoid), -- PK <== channel_T
    PRIMARY KEY (user_nanoid, channel_nanoid)
);

-- Interação do usuário com canal
CREATE TABLE user_interest_channel_T (
    user_nanoid NANOID NOT NULL REFERENCES user_T (nanoid), -- PK <== user_T
    channel_nanoid NANOID NOT NULL REFERENCES channel_T (nanoid), -- PK <== channel_T
    _is_sub BOOLEAN NOT NULL, -- É inscrito?
    _is_notified BOOLEAN NOT NULL, -- É notificado?
    member_level_tier INT NOT NULL REFERENCES member_level_A (tier), -- FK <== member_level_A
    PRIMARY KEY (user_nanoid, channel_nanoid)
);

-- Conteúdo principal (vídeos, lives, shorts)
CREATE TABLE content_T (
    nanoid NANOID PRIMARY KEY, -- PK
    _url LINK UNIQUE NOT NULL, -- URL
    _title VARCHAR(100) NOT NULL, -- Título
    _created_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Instante de criação
    _thumbnail_url LINK NOT NULL, -- Thumbnail URL
    _description VARCHAR(2000) NOT NULL, -- Descrição
    _duration INTERVAL NOT NULL, -- Duração
    status_uid UID NOT NULL REFERENCES status_A (uid), -- FK <== status_A
    resolution_uid UID NOT NULL REFERENCES resolution_A (uid), -- FK <== resolution_A
    category_uid UID NOT NULL REFERENCES category_A (uid), -- FK <== category_A
    indicative_rating_uid UID NOT NULL REFERENCES indicative_rating_A (uid), -- FK <== indicative_rating_A
    language_uid UID NOT NULL REFERENCES language_A (uid), -- FK <== language_A
    channel_nanoid NANOID NOT NULL REFERENCES channel_T (nanoid) -- FK <== channel_T
);

-- Legendas dos conteúdos
CREATE TABLE caption_T (
    language_uid UID NOT NULL REFERENCES language_A (uid), -- PK <== language_A
    content_nanoid NANOID NOT NULL REFERENCES content_T (nanoid), -- PK <== content_T
    _body TEXT NOT NULL, -- Texto da legenda
    PRIMARY KEY (language_uid, content_nanoid)
);

-- Visualização de conteúdo por usuário
CREATE TABLE user_watch_content_T (
    nanoid NANOID PRIMARY KEY, -- PK
    _duration INTERVAL NOT NULL, -- Duração
    _created_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Instante de criação
    _is_currently_watching BOOLEAN NOT NULL, -- Assistindo agora?
    user_nanoid NANOID NOT NULL REFERENCES user_T (nanoid), -- FK <== user_T
    content_nanoid NANOID NOT NULL REFERENCES content_T (nanoid) -- FK <== content_T
);

-- Detalhes de transmissões ao vivo
CREATE TABLE live_T (
    content_nanoid NANOID PRIMARY KEY REFERENCES content_T (nanoid), -- PK <== content_T
    _is_live_now BOOLEAN NOT NULL DEFAULT FALSE, -- Ao vivo agora?
    _start_time TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP -- Início agendado
);

-- Detalhes de vídeos gravados
CREATE TABLE video_T (
    content_nanoid NANOID PRIMARY KEY REFERENCES content_T (nanoid) -- PK <== content_T
);

-- Detalhes de vídeos curtos
CREATE TABLE short_T (
    content_nanoid NANOID PRIMARY KEY REFERENCES content_T (nanoid), -- PK <== content_T
    cut_of_video_nanoid NANOID DEFAULT NULL REFERENCES video_T (content_nanoid), -- FK <== video_T -- Short é corte de vídeo
    _music_url LINK -- URL da música (se tiver)
);

-- Adicionando o vídeo de boas vindas ao canal
ALTER TABLE channel_T
ADD COLUMN welcome_video_nanoid NANOID REFERENCES video_T (content_nanoid) DEFAULT NULL;

-- Enquetes criadas por canais
CREATE TABLE poll_T (
    nanoid NANOID PRIMARY KEY, -- PK
    _title TEXT NOT NULL, -- Título da enquete
    _created_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Instante de criação
    channel_nanoid NANOID NOT NULL REFERENCES channel_T (nanoid) -- FK <== channel_T
);

-- Opções de uma enquete
CREATE TABLE poll_option_T (
    nanoid NANOID PRIMARY KEY, -- PK
    poll_nanoid NANOID NOT NULL REFERENCES poll_T (nanoid) ON DELETE CASCADE, -- FK <== poll_T
    _body TEXT NOT NULL -- Texto da opção
);

-- Respostas dos usuários às opções de enquete
CREATE TABLE poll_response_T (
    user_nanoid NANOID NOT NULL REFERENCES user_T (nanoid), -- PK <== users_T
    option_nanoid NANOID NOT NULL REFERENCES poll_option_T (nanoid) ON DELETE CASCADE, -- PK <== poll_option_T
    _created_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Instante de criação
    PRIMARY KEY (user_nanoid, option_nanoid)
);

-- Trigger para evitar respostas duplicadas
CREATE OR REPLACE FUNCTION check_single_vote_per_poll()
RETURNS TRIGGER AS $$
DECLARE
    current_poll NANOID; -- << CORRIGIDO DE 'uuid' PARA 'NANOID'
BEGIN
    -- (resto da função permanece igual)
    SELECT poll_nanoid INTO current_poll
    FROM poll_option_T
    WHERE nanoid = NEW.option_nanoid;

    IF TG_OP = 'INSERT' THEN
        IF EXISTS (
            SELECT 1
            FROM poll_response_T pr
            JOIN poll_option_T po ON pr.option_nanoid = po.nanoid
            WHERE pr.user_nanoid = NEW.user_nanoid
              AND po.poll_nanoid = current_poll
        ) THEN
            RAISE EXCEPTION 'User % already voted in Poll %!', NEW.user_nanoid, current_poll;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_check_single_vote_per_poll ON poll_response_T;

CREATE TRIGGER trigger_check_single_vote_per_poll
BEFORE INSERT ON poll_response_T
FOR EACH ROW
EXECUTE FUNCTION check_single_vote_per_poll();

-- Comentários gerais
CREATE TABLE comment_T (
    nanoid NANOID PRIMARY KEY, -- PK
    _created_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Instante de criação
    _is_edited BOOLEAN NOT NULL DEFAULT FALSE, -- Foi editado?
    _body TEXT NOT NULL, -- Texto do comentário
    user_nanoid NANOID NOT NULL REFERENCES user_T (nanoid) -- Autor do comentário
);

-- Comentários específicos de vídeos
CREATE TABLE video_comment_T (
    comment_nanoid NANOID PRIMARY KEY REFERENCES comment_T (nanoid), -- PK <== comment_T
    content_nanoid NANOID NOT NULL REFERENCES video_T (content_nanoid) -- FK <== video_T
);

-- Comentários específicos de lives
CREATE TABLE live_comment_T (
    comment_nanoid NANOID PRIMARY KEY REFERENCES comment_T (nanoid), -- PK <== comment_T
    content_nanoid NANOID NOT NULL REFERENCES live_T (content_nanoid) -- FK <== live_T
);

-- Comentários específicos de shorts
CREATE TABLE short_comment_T (
    comment_nanoid NANOID PRIMARY KEY REFERENCES comment_T (nanoid), -- PK <== FK comment_T
    content_nanoid NANOID NOT NULL REFERENCES short_T (content_nanoid) -- FK <== short_T
);

-- Respostas a comentários
CREATE TABLE comment_reply_T (
    reply_comment_nanoid NANOID NOT NULL REFERENCES comment_T (nanoid) ON DELETE CASCADE, -- PK <== comment_T (resposta)
    target_comment_nanoid NANOID NOT NULL REFERENCES comment_T (nanoid) ON DELETE CASCADE, -- FK <== comment_T
    PRIMARY KEY (
        reply_comment_nanoid,
        target_comment_nanoid
    )
);

-- Comentários específicos de enquetes
CREATE TABLE poll_comment_T (
    comment_nanoid NANOID PRIMARY KEY REFERENCES comment_T (nanoid), -- PK <== FK comment_T
    poll_nanoid NANOID NOT NULL REFERENCES poll_T (nanoid) -- FK <== poll_T
);

-- Playlists de conteúdo
CREATE TABLE playlist_T (
    nanoid NANOID PRIMARY KEY, -- PK
    _url LINK UNIQUE NOT NULL, -- URL
    _title VARCHAR(100) NOT NULL, -- Título
    _description TEXT NOT NULL, -- Descrição
    _thumbnail_url LINK NOT NULL, -- Thumbnail URL
    status_uid UID NOT NULL REFERENCES status_A (uid), -- FK <== status_A
    channel_nanoid NANOID NOT NULL REFERENCES channel_T (nanoid) ON DELETE CASCADE -- FK <== channel
);

-- Conteúdos dentro de uma playlist
CREATE TABLE playlist_content_T (
    playlist_nanoid NANOID NOT NULL REFERENCES playlist_T (nanoid), -- PK <== playlist_T
    content_nanoid NANOID NOT NULL REFERENCES content_T (nanoid), -- PK <== content_T
    _inserted_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Instante de inserção
    _play_content_order INT NOT NULL, -- Ordem na playlist
    PRIMARY KEY (
        playlist_nanoid,
        content_nanoid
    )
);

-- Interação do usuário com conteúdo
CREATE TABLE user_interaction_content_T (
    user_nanoid NANOID NOT NULL REFERENCES user_T (nanoid), -- PK <== FK user_T
    content_nanoid NANOID NOT NULL REFERENCES content_T (nanoid), -- PK <== FK content_T
    interaction_uid UID NOT NULL REFERENCES interaction_A (uid), -- PK <== FK interaction_A
    PRIMARY KEY (
        user_nanoid,
        content_nanoid,
        interaction_uid
    )
);

-- Interação do usuário com playlist
CREATE TABLE user_interaction_playlist_T (
    user_nanoid NANOID NOT NULL REFERENCES user_T (nanoid), -- PK <== FK user_T
    playlist_nanoid NANOID NOT NULL REFERENCES playlist_T (nanoid), -- PK <== FK playlist_T
    interaction_uid UID NOT NULL REFERENCES interaction_A (uid), -- FK <== interaction_A
    PRIMARY KEY (user_nanoid, playlist_nanoid)
);

-- Interação do usuário com comentário
CREATE TABLE user_interaction_comment_T (
    user_nanoid NANOID NOT NULL REFERENCES user_T (nanoid), -- PK <== FK user_T
    comment_nanoid NANOID NOT NULL REFERENCES comment_T (nanoid), -- PK <== FK comment_T
    interaction_uid UID NOT NULL REFERENCES interaction_A (uid), -- FK <== interaction_A
    PRIMARY KEY (user_nanoid, comment_nanoid)
);

-- Notificações geradas por canais
CREATE TABLE notification_T (
    nanoid NANOID PRIMARY KEY, -- PK
    _body TEXT NOT NULL, -- Texto da notificação
    channel_nanoid NANOID NOT NULL REFERENCES channel_T (nanoid) -- FK <== channel_T
);

-- Rastreia quais usuários receberam/visualizaram quais notificações
CREATE TABLE user_notified_T (
    user_nanoid NANOID NOT NULL REFERENCES user_T (nanoid), -- PK <== FK user
    notification_nanoid NANOID NOT NULL REFERENCES notification_T (nanoid), -- PK <== FK notification
    _sent_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Instante de envio
    _was_read BOOLEAN NOT NULL DEFAULT FALSE, -- Foi lida?
    PRIMARY KEY (
        user_nanoid,
        notification_nanoid
    )
);

-- Tags para conteúdos
CREATE TABLE tag_T (
    nanoid NANOID PRIMARY KEY, -- PK
    _label VARCHAR(20) NOT NULL UNIQUE -- (ex: #carrosTunados, #HatsuneMiku. #V8, #39)
);

-- Tags para playlists
CREATE TABLE playlist_tag_T (
    playlist_nanoid NANOID NOT NULL REFERENCES playlist_T (nanoid), -- PK <== playlist_T
    tag_nanoid NANOID NOT NULL REFERENCES tag_T (nanoid), -- PK <== tag_T
    PRIMARY KEY (playlist_nanoid, tag_nanoid)
);

-- Tags para conteúdos
CREATE TABLE content_tag_T (
    content_nanoid NANOID NOT NULL REFERENCES content_T (nanoid), -- PK <== content_T
    tag_nanoid NANOID NOT NULL REFERENCES tag_T (nanoid), -- PK <== tag_T
    PRIMARY KEY (content_nanoid, tag_nanoid)
);