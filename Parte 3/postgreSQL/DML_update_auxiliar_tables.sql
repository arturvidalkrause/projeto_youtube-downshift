-- ===================================
-- == ARQUIVO DE INSERÇÃO DOS DADOS ==
-- ==    NAS TABELAS AUXILIARES     == 
-- ==        DOWSHIFT v1.0.2        ==
-- ===================================

--> por brunikito

----------------
-- DEFINIÇÕES --
----------------
SET search_path TO downshift;

----------------------------------
-- POPULANDO TABELAS AUXILIARES --
----------------------------------

-- ON CONFLICT DO NOTHING; --> Evita erros se dados já existirem

-- Resoluções
INSERT INTO resolution_A (uid, _is_vertical, _height, _type)
VALUES
    -- Vídeos
    (0, FALSE, 144, 'video'),
    (1, FALSE, 240, 'video'),
    (2, FALSE, 360, 'video'),
    (3, FALSE, 480, 'video'),
    (4, FALSE, 720, 'video'),
    (5, FALSE, 1080, 'video'),
    (6, TRUE, 256, 'video'),
    (7, TRUE, 426, 'video'),
    (8, TRUE, 640, 'video'),
    (9, TRUE, 854, 'video'),
    (10, TRUE, 1280, 'video'),
    (11, TRUE, 1920, 'video'),

    -- Shorts (ids 12-23)
    (12, FALSE, 144, 'short'),
    (13, FALSE, 240, 'short'),
    (14, FALSE, 360, 'short'),
    (15, FALSE, 480, 'short'),
    (16, FALSE, 720, 'short'),
    (17, FALSE, 1080, 'short'),
    (18, TRUE, 256, 'short'),
    (19, TRUE, 426, 'short'),
    (20, TRUE, 640, 'short'),
    (21, TRUE, 854, 'short'),
    (22, TRUE, 1280, 'short'),
    (23, TRUE, 1920, 'short'),

    -- Live (ids 24-35)
    (24, FALSE, 144, 'live'),
    (25, FALSE, 240, 'live'),
    (26, FALSE, 360, 'live'),
    (27, FALSE, 480, 'live'),
    (28, FALSE, 720, 'live'),
    (29, FALSE, 1080, 'live'),
    (30, TRUE, 256, 'live'),
    (31, TRUE, 426, 'live'),
    (32, TRUE, 640, 'live'),
    (33, TRUE, 854, 'live'),
    (34, TRUE, 1280, 'live'),
    (35, TRUE, 1920, 'live')
ON CONFLICT (uid) DO NOTHING;

-- Níveis de membro
INSERT INTO member_level_A (tier, _label)
VALUES
    (0, 'Não membro'),
    (1, 'Gasolina'),
    (2, 'Podium'),
    (3, 'Etanol'),
    (4, 'Nitrometano'),
    (5, 'Hidrazina') 
ON CONFLICT (tier) DO NOTHING;

-- Idiomas
INSERT INTO language_A (uid, _label)
VALUES 
    (1,  'English'),
    (2,  'Portuguese'),
    (3,  'Japanese'),
    (4,  'Spanish'),
    (5,  'French'),
    (6,  'German'),
    (7,  'Chinese'),
    (8,  'Russian'),
    (9,  'Korean'),
    (10, 'Italian'),
    (11, 'Dutch'),
    (12, 'Arabic'),
    (13, 'Hindi'),
    (14, 'Turkish'),
    (15, 'Swedish'),
    (16, 'Norwegian'),
    (17, 'Danish'),
    (18, 'Finnish'),
    (19, 'Polish'),
    (20, 'Greek'),
    (21, 'Hebrew'),
    (22, 'Thai'),
    (23, 'Vietnamese'),
    (24, 'Indonesian'),
    (25, 'Malay'),
    (26, 'Czech'),
    (27, 'Hungarian'),
    (28, 'Romanian'),
    (29, 'Ukrainian')
ON CONFLICT (uid) DO NOTHING;

-- Classificações Indicativas
INSERT INTO indicative_rating_A (uid, _label)
VALUES
    (1, 'L'), -- Livre para todos os públicos
    (2, '10'), -- Não recomendado para menores de 10 anos
    (3, '12'), -- Não recomendado para menores de 12 anos
    (4, '14'), -- Não recomendado para menores de 14 anos
    (5, '16'), -- Não recomendado para menores de 16 anos
    (6, '18') -- Não recomendado para menores de 18 anos
ON CONFLICT (uid) DO NOTHING;

-- Categorias de vídeos
INSERT INTO category_A (uid, _label)
VALUES
    (1, 'Pessoas e Blogs'),
    (2, 'Música'),
    (3, 'Filmes e Animação'),
    (4, 'Automóveis e Veículos'),
    (5, 'Animais de Estimação e Bichos'),
    (6, 'Esportes'),
    (7, 'Viagens e Eventos'),
    (8, 'Games'),
    (9, 'Comédia'),
    (10, 'Entretenimento'),
    (11, 'Notícias e Política'),
    (12, 'Guias e Estilo'),
    (13, 'Educação'),
    (14, 'Ciência e Tecnologia'),
    (15, 'Sem Fins Lucrativos e Ativismo')
ON CONFLICT (uid) DO NOTHING;

-- Status (de qualquer entidade)
INSERT INTO status_A (uid, _label)
VALUES
    (1, 'Agendado'), -- Programado para se tornar público em uma data futura
    (2, 'Privado'), -- Visível apenas para o proprietário e usuários especificados
    (3, 'Não Listado'), -- Acessível apenas por quem tem o link direto
    (4, 'Público') -- Visível para todos
ON CONFLICT (uid) DO NOTHING;

-- Interação (com qualquer entidade)
INSERT INTO interaction_A (uid, _label)
VALUES
    (1, 'Denúncia'),
    (2, 'Dislike'),
    (3, 'Like'),
    (4, 'Salvamento'), -- Funcionalidades como "Salvar para assistir mais tarde"
    (5, 'Compartilhamento')
ON CONFLICT (uid) DO NOTHING;

-- Provedores de login
INSERT INTO login_provider_A (uid, _name)
VALUES
    (0, 'compilerhub.com'),
    (1, 'google.com')
ON CONFLICT (uid) DO NOTHING;