-- Define um schema para organizar as tabelas
CREATE SCHEMA IF NOT EXISTS downshift;

SET search_path TO downshift;

-- Domínio para URLs
CREATE DOMAIN LINK AS VARCHAR(255);

-- TABELAS AUXILIARES --

-- Resoluções do conteudo
CREATE TABLE resolution (
    reso_id SERIAL PRIMARY KEY, -- PK
    reso_type VARCHAR(5) UNIQUE NOT NULL -- Tipo (ex: 720, 1080, 1920)
);

-- Tags para conteúdos/playlists
CREATE TABLE tags (
    tag_id SERIAL PRIMARY KEY, -- PK
    tag_name VARCHAR(20) NOT NULL UNIQUE -- Nome tag
);

-- Níveis de membro dos canais
CREATE TABLE member_level (
    memb_lvl_id SERIAL PRIMARY KEY, -- PK
    memb_lvl_type SMALLINT UNIQUE NOT NULL -- Tipo nível (ex: 0, 1, 2)
);

-- Idiomas disponíveis
CREATE TABLE languages (
    lang_id SERIAL PRIMARY KEY, -- PK
    lang_name VARCHAR(30) UNIQUE NOT NULL -- Nome idioma
);

-- Classificações indicativas
CREATE TABLE indication_rating (
    ind_rat_id SERIAL PRIMARY KEY, -- PK
    ind_rat_body VARCHAR(2) UNIQUE NOT NULL -- Sigla (ex: L, 18)
);

-- Categorias de conteúdo
CREATE TABLE categories (
    catg_id SERIAL PRIMARY KEY, -- PK
    catg_type VARCHAR(50) UNIQUE NOT NULL -- Nome categoria
);

-- Status de conteúdo/playlist
CREATE TABLE status (
    st_id SERIAL PRIMARY KEY, -- PK
    st_type VARCHAR(15) UNIQUE NOT NULL -- Tipo status (ex: Público, Privado)
);

-- Tipos de interação (Like, Salvar, Denunciar, etc.)
CREATE TABLE interaction (
    inter_id SERIAL PRIMARY KEY, -- PK
    inter_type VARCHAR(10) NOT NULL UNIQUE -- Tipo da interação
);

-- TABELAS PRINCIPAIS --

-- Dados dos usuários
CREATE TABLE users (
    users_id SERIAL PRIMARY KEY, -- PK
    users_name VARCHAR(50) NOT NULL,
    users_email VARCHAR(320) UNIQUE NOT NULL,
    users_password VARCHAR(128) NOT NULL,
    users_photo LINK -- URL foto
);

-- Canais dos usuários
CREATE TABLE channel (
    channel_id SERIAL PRIMARY KEY, -- PK	
    channel_url LINK UNIQUE NOT NULL, -- URL do canal
    ch_created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, -- data/hora
    ch_name VARCHAR(50) NOT NULL,
    ch_desc VARCHAR(2000) NOT NULL,
    ch_welcome_vid LINK, -- URL vídeo boas-vindas
    ch_banner LINK, -- URL banner
    users_id INT NOT NULL REFERENCES users (users_id) -- FK users
);

-- Links externos dos canais.
CREATE TABLE channel_external_link (
    ch_ext_link LINK NOT NULL, -- URL externa
    channel_id INT NOT NULL REFERENCES channel (channel_id), -- FK channel
    PRIMARY KEY (ch_ext_link, channel_id) -- PK composta
);

-- Usuários administradores de canais
CREATE TABLE user_admin_channel (
    users_id INT NOT NULL REFERENCES users (users_id), -- FK users
    channel_id INT NOT NULL REFERENCES channel (channel_id), -- FK channel
    PRIMARY KEY (users_id, channel_id) -- PK composta
);

-- Interação do usuário com canal
CREATE TABLE user_int_channel (
    users_id INT NOT NULL REFERENCES users (users_id), -- FK users
    channel_id INT NOT NULL REFERENCES channel (channel_id), -- FK channel
    PRIMARY KEY (users_id, channel_id), -- PK composta
    u_is_sub_to_ch BOOLEAN NOT NULL, -- Inscrito?
    u_is_notified_by_ch BOOLEAN NOT NULL, -- Notificações?
    u_member_level_ch INT NOT NULL REFERENCES member_level (memb_lvl_id) -- FK member
);

-- Legendas dos conteúdos
CREATE TABLE caption (
    cap_id SERIAL PRIMARY KEY, -- PK
    cap_language INT NOT NULL REFERENCES languages (lang_id), -- FK languages
    cap_body TEXT NOT NULL -- Texto legenda
);

-- Conteúdo principal (vídeos, lives, shorts)
CREATE TABLE content (
    content_id SERIAL PRIMARY KEY, -- PK
    content_url LINK UNIQUE NOT NULL, -- URL conteúdo
    cont_title VARCHAR(100) NOT NULL,
    cont_created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, -- data/hora
    cont_status INT NOT NULL REFERENCES status (st_id), -- FK status
    cont_thumb LINK NOT NULL, -- URL thumbnail
    cont_desc VARCHAR(2000) NOT NULL,
    cont_duration INTERVAL NOT NULL, -- Duração
    cont_resolution INT NOT NULL REFERENCES resolution (reso_id), -- FK resolution
    cont_category INT NOT NULL REFERENCES categories (catg_id), -- FK categories
    cont_ind_rating INT NOT NULL REFERENCES indication_rating (ind_rat_id), -- FK indication_rating
    cont_language INT NOT NULL REFERENCES languages (lang_id), -- FK languages
    cont_caption INT NOT NULL REFERENCES caption (cap_id), -- FK caption
    channel_id INT NOT NULL REFERENCES channel (channel_id) -- FK channel
);

-- Relação de tags a conteúdos
CREATE TABLE content_tag (
    tag_id INT NOT NULL REFERENCES tags (tag_id), -- FK tags
    content_id INT NOT NULL REFERENCES content (content_id), -- PK <== FK content -- FK content
    PRIMARY KEY (tag_id, content_id) -- FK composta
);

-- Progresso de visualização de conteúdo por usuário
CREATE TABLE user_watching_content (
    u_watch_cont_id SERIAL PRIMARY KEY, -- PK
    u_watch_duration_cont INTERVAL NOT NULL, -- Tempo assistido
    u_watch_cont_created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, -- data/hora
    u_is_watching_cont_now BOOLEAN NOT NULL, -- Assistindo agora?
    users_id INT NOT NULL REFERENCES users (users_id), -- FK users
    content_id INT NOT NULL REFERENCES content (content_id) -- FK content
);

-- Detalhes de transmissões ao vivo
CREATE TABLE live (
    content_id INT PRIMARY KEY REFERENCES content (content_id), -- PK <== FK content
    live_body BYTEA NOT NULL, -- Stream de dados
    is_live_now BOOLEAN NOT NULL DEFAULT FALSE, -- Ao vivo agora?
    live_start TIMESTAMP WITH TIME ZONE NOT NULL -- Início agendado
);

-- Detalhes de vídeos gravados
CREATE TABLE video (
    content_id INT PRIMARY KEY REFERENCES content (content_id), -- PK <== FK content
    video_body TEXT NOT NULL, -- URL do video
    video_duration INTERVAL NOT NULL -- duração
);

-- Detalhes de vídeos curtos
CREATE TABLE short (
    content_id INT PRIMARY KEY REFERENCES content (content_id), -- PK <== FK content
    full_video_id INT REFERENCES video (content_id), -- FK video
    sh_music_link LINK, -- URL música
    sh_body LINK NOT NULL -- URL do short
);

-- Comentários gerais
CREATE TABLE comment (
    comment_id SERIAL PRIMARY KEY, -- PK
    com_created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, -- data/hora
    com_is_edited BOOLEAN NOT NULL DEFAULT FALSE, -- Editado?
    com_body TEXT NOT NULL, -- Texto comentário
    users_id INT NOT NULL REFERENCES users (users_id) -- FK users (autor)
);

-- Comentários específicos de vídeos
CREATE TABLE video_comment (
    comment_id INT PRIMARY KEY REFERENCES comment (comment_id), -- PK <== FK comment
    content_id INT NOT NULL REFERENCES video (content_id) -- FK video
);

-- Comentários específicos de lives
CREATE TABLE live_comment (
    comment_id INT PRIMARY KEY REFERENCES comment (comment_id), -- PK <== FK comment
    content_id INT NOT NULL REFERENCES live (content_id) -- FK live
);

-- Comentários específicos de shorts
CREATE TABLE shortcomment (
    comment_id INT PRIMARY KEY REFERENCES comment (comment_id), -- PK <== FK comment
    content_id INT NOT NULL REFERENCES short (content_id) -- FK short
);

-- Respostas a comentários
CREATE TABLE comment_reply (
    response_comment_id INT PRIMARY KEY REFERENCES comment (comment_id) ON DELETE CASCADE, -- PK <== FK comment (resposta)
    parent_comment_id INT NOT NULL REFERENCES comment (comment_id) ON DELETE CASCADE -- FK comment
);

-- Enquetes criadas por canais
CREATE TABLE poll (
    poll_id SERIAL PRIMARY KEY, -- PK
    poll_title TEXT NOT NULL, -- Título enquete
    poll_created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, -- data/hora
    channel_id INT NOT NULL REFERENCES channel (channel_id) -- FK channel
);

-- Opções de uma enquete
CREATE TABLE poll_option (
    option_id SERIAL PRIMARY KEY, -- PK
    poll_id INT NOT NULL REFERENCES poll (poll_id) ON DELETE CASCADE, -- FK poll
    option_text TEXT NOT NULL -- Texto opção
);

-- Respostas dos usuários às opções de enquete
CREATE TABLE poll_response (
    users_id INT NOT NULL REFERENCES users (users_id), -- FK users
    option_id INT NOT NULL REFERENCES poll_option (option_id) ON DELETE CASCADE, -- FK poll_option
    response_created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, -- data/hora
    PRIMARY KEY (users_id, option_id) -- PK composta
);

-- Comentários específicos de enquetes
CREATE TABLE poll_comment (
    comment_id INT PRIMARY KEY REFERENCES comment (comment_id), -- PK <== FK comment
    poll_id INT NOT NULL REFERENCES poll (poll_id) -- FK poll
);

-- Playlists de conteúdo
CREATE TABLE playlist (
    play_id SERIAL PRIMARY KEY, -- PK
    play_url LINK UNIQUE NOT NULL, -- URL playlist
    play_title VARCHAR(100) NOT NULL,
    play_desc TEXT NOT NULL,
    play_status INT NOT NULL REFERENCES status (st_id), -- FK status
    play_thumb TEXT NOT NULL, -- URL thumbnail
    channel_id INT NOT NULL REFERENCES channel (channel_id) ON DELETE CASCADE -- FK channel
);

-- Conteúdos dentro de uma playlist
CREATE TABLE playlist_content (
    playlist_content_id SERIAL PRIMARY KEY, -- PK
    content_id INT NOT NULL REFERENCES content (content_id), -- PK <== FK content
    play_id INT NOT NULL REFERENCES playlist (play_id), -- FK playlist
    play_created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, -- data/hora
    play_content_order INT NOT NULL -- Ordem na playlist
);

-- Associação de tags a playlists
CREATE TABLE playlist_tag (
    play_tag INT NOT NULL REFERENCES tags (tag_id), -- FK tags
    play_id INT NOT NULL REFERENCES playlist (play_id), -- FK playlist
    PRIMARY KEY (play_tag, play_id) -- PK composta
);

-- Registro base de uma interação de usuário
CREATE TABLE user_interaction (
    ui_id SERIAL PRIMARY KEY, -- PK
    users_id INT NOT NULL REFERENCES users (users_id), -- FK users
    uint_type INT NOT NULL REFERENCES interaction (inter_id) -- FK interaction
);

-- Interação do usuário com conteúdo
CREATE TABLE user_int_content (
    ui_cont_id INT PRIMARY KEY REFERENCES user_interaction (ui_id), -- PK <== FK user_interaction
    content_id INT NOT NULL REFERENCES content (content_id) -- FK content
);

-- Interação do usuário com playlist
CREATE TABLE user_int_playlist (
    ui_play_id INT PRIMARY KEY REFERENCES user_interaction (ui_id), -- PK <== FK user_interaction
    play_id INT NOT NULL REFERENCES playlist (play_id) -- FK playlist
);

-- Interação do usuário com comentário
CREATE TABLE user_int_comment (
    ui_comment_id INT PRIMARY KEY REFERENCES user_interaction (ui_id), -- PK <== FK user_interaction
    comment_id INT NOT NULL REFERENCES comment (comment_id) -- FK comment
);

-- Notificações geradas por canais
CREATE TABLE notification (
    notification_id SERIAL PRIMARY KEY, -- PK
    channel_id INT NOT NULL REFERENCES channel (channel_id), -- FK channel
    notification_body TEXT NOT NULL -- Conteúdo notificação
);

-- Rastreia quais usuários receberam/visualizaram quais notificações
CREATE TABLE user_notified (
    not_sent_datetime TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, -- data/hora
    users_id INT NOT NULL REFERENCES users (users_id), -- FK users
    notification_id INT NOT NULL REFERENCES notification (notification_id), -- FK notification
    PRIMARY KEY (users_id, notification_id) -- PK Composta
);