SET search_path TO downshift;

INSERT INTO
    resolution (reso_type)
VALUES ('144p'),
    ('240p'),
    ('360p'),
    ('480p'),
    ('540p'),
    ('720p'), -- HD
    ('1080p'), -- Full HD
    ('1440p'), -- QHD (2K)
    ('2160p'), -- UHD (4K)
    ('4320p');
-- FUHD (8K)

INSERT INTO
    tags (tag_name)
VALUES ('Tutorial'),
    ('Review'),
    ('Gameplay'),
    ('Unboxing'),
    ('Live Coding'),
    ('DIY'),
    ('Vlog'),
    ('Educação'),
    ('Tecnologia'),
    ('Ciência'),
    ('Música'),
    ('Arte'),
    ('Comédia'),
    ('Podcast'),
    ('Notícias'),
    ('Esportes'),
    ('Culinária'),
    ('Viagem'),
    ('Finanças'),
    ('História'),
    ('Filosofia'),
    ('Documentário'),
    ('Animação'),
    ('Moda'),
    ('Beleza'),
    ('Saúde'),
    ('Fitness'),
    ('Games Retro'),
    ('Indie Games'),
    ('Programação Web'),
    ('Mobile Development'),
    ('IA'),
    ('Machine Learning'),
    ('Criptomoedas'),
    ('Investimentos'),
    ('Natureza'),
    ('Animais');

INSERT INTO
    member_level (memb_lvl_type)
VALUES (0), -- Nível padrão/gratuito ou não-membro
    (1), -- Nível 1 (ex: Básico, Bronze)
    (2), -- Nível 2 (ex: Intermediário, Prata)
    (3), -- Nível 3 (ex: Avançado, Ouro)
    (4);
-- Nível 4 (ex: Premium, Patrono)

INSERT INTO
    languages (lang_name)
VALUES ('English'),
    ('Portuguese'),
    ('Japanese'),
    ('Spanish'),
    ('French'),
    ('German'),
    ('Chinese'),
    ('Russian'),
    ('Korean'),
    ('Italian'),
    ('Dutch'),
    ('Arabic'),
    ('Hindi'),
    ('Turkish'),
    ('Swedish'),
    ('Norwegian'),
    ('Danish'),
    ('Finnish'),
    ('Polish'),
    ('Greek'),
    ('Hebrew'),
    ('Thai'),
    ('Vietnamese'),
    ('Indonesian'),
    ('Malay'),
    ('Czech'),
    ('Hungarian'),
    ('Romanian'),
    ('Ukrainian');

INSERT INTO
    indication_rating (ind_rat_body)
VALUES ('L'), -- Livre para todos os públicos
    ('10'), -- Não recomendado para menores de 10 anos
    ('12'), -- Não recomendado para menores de 12 anos
    ('14'), -- Não recomendado para menores de 14 anos
    ('16'), -- Não recomendado para menores de 16 anos
    ('18');
-- Não recomendado para menores de 18 anos (Adulto)

INSERT INTO
    categories (catg_type)
VALUES ('Pessoas e Blogs'), -- People & Blogs
    ('Música'), -- Music
    ('Filmes e Animação'), -- Film & Animation
    ('Automóveis e Veículos'), -- Autos & Vehicles
    (
        'Animais de Estimação e Bichos'
    ), -- Pets & Animals
    ('Esportes'), -- Sports
    ('Viagens e Eventos'), -- Travel & Events
    ('Games'), -- Gaming
    ('Comédia'), -- Comedy
    ('Entretenimento'), -- Entertainment
    ('Notícias e Política'), -- News & Politics
    ('Guias e Estilo'), -- Howto & Style
    ('Educação'), -- Education
    ('Ciência e Tecnologia'), -- Science & Technology
    (
        'Sem Fins Lucrativos e Ativismo'
    );
-- Nonprofits & Activism

INSERT INTO
    status (st_type)
VALUES ('Público'), -- Visível para todos
    ('Privado'), -- Visível apenas para o proprietário e usuários especificados
    ('Não Listado'), -- Acessível apenas por quem tem o link direto
    ('Agendado'), -- Programado para se tornar público em uma data futura
    ('Rascunho');
-- Salvo, mas não publicado, visível apenas para o proprietário/editores

INSERT INTO
    interaction (inter_type)
VALUES ('Like'),
    ('Dislike'),
    ('Salvar'), -- Para funcionalidades como "Salvar para assistir mais tarde"
    ('Denunciar'), -- Para reportar conteúdo ou comportamento inadequado
    ('Partilhar');
-- Para compartilhar o item

INSERT INTO
    users (
        users_name,
        users_email,
        users_password,
        users_photo
    )
VALUES (
        'rutra',
        'artur@rutra.com',
        'r#J_$Mu9k6',
        'https://i.pravatar.cc/150?u=rutra'
    ),
    (
        'mikunikito',
        'hatsune@miku39.com',
        '}53GZ]hKw7',
        'https://i.pravatar.cc/150?u=mikunikito'
    ),
    (
        'gugugpt',
        'guoliv@gpt.ai',
        'rjIJC7W8cN',
        'https://i.pravatar.cc/150?u=gugugpt'
    ),
    (
        'pixeltide',
        'tide@pixelhub.io',
        'Gd9#lKv$M3',
        'https://i.pravatar.cc/150?u=pixeltide'
    ),
    (
        'astrozen',
        'zen@astrospace.com',
        '9Vx&hLq@8z',
        'https://i.pravatar.cc/150?u=astrozen'
    ),
    (
        'neonwolf',
        'wolf@neonmail.com',
        'K!29vlMe^0',
        'https://i.pravatar.cc/150?u=neonwolf'
    ),
    (
        'codedream',
        'dream@32bit.net',
        'aD#8kMp!29',
        'https://i.pravatar.cc/150?u=codedream'
    ),
    (
        'glitchcat',
        'cat@glitchmail.io',
        'Z8$vmR#iL6',
        'https://i.pravatar.cc/150?u=glitchcat'
    ),
    (
        'quokkahack',
        'hack@quokkadev.org',
        'Bv9#dLq%0a',
        'https://i.pravatar.cc/150?u=quokkahack'
    ),
    (
        'moonloop',
        'loop@lunar.net',
        'Xp@83Lf$k9',
        'https://i.pravatar.cc/150?u=moonloop'
    ),
    (
        'cyberchai',
        'chai@cyberdrinks.com',
        'Mn2^jK!73x',
        'https://i.pravatar.cc/150?u=cyberchai'
    ),
    (
        'wafflevortex',
        'waffle@vtx.io',
        'Y!0cLp$8Mv',
        'https://i.pravatar.cc/150?u=wafflevortex'
    ),
    (
        'turbozen',
        'zen@turbo.net',
        'Mv6#nLp!1c',
        'https://i.pravatar.cc/150?u=turbozen'
    ),
    (
        'driftraccoon',
        'raccoon@driftmail.org',
        'Lp7$yMv^9X',
        'https://i.pravatar.cc/150?u=driftraccoon'
    ),
    (
        'cloudglyph',
        'glyph@cloudserver.ai',
        '9Zq!Mv8#Pl',
        'https://i.pravatar.cc/150?u=cloudglyph'
    ),
    (
        'ramenspace',
        'ramen@spacefood.com',
        '2Lc#M9v^Xp',
        'https://i.pravatar.cc/150?u=ramenspace'
    ),
    (
        'voidjelly',
        'jelly@voidfoods.net',
        'P@v9#3Mlx$',
        'https://i.pravatar.cc/150?u=voidjelly'
    ),
    (
        'bitmango',
        'mango@bitfruit.io',
        'Kq$29mLv^3',
        'https://i.pravatar.cc/150?u=bitmango'
    ),
    (
        'frostbyte',
        'byte@frostmail.io',
        'z#Mv20Lp!k',
        'https://i.pravatar.cc/150?u=frostbyte'
    ),
    (
        'zestbot',
        'bot@zesty.io',
        'M0lp@#Lx92',
        'https://i.pravatar.cc/150?u=zestbot'
    ),
    (
        'velvetshell',
        'shell@velvetsea.org',
        'Xv^8Lp$0qM',
        'https://i.pravatar.cc/150?u=velvetshell'
    ),
    (
        'nimbusowl',
        'owl@nimbusmail.ai',
        'Mv$1Lp^Z9k',
        'https://i.pravatar.cc/150?u=nimbusowl'
    ),
    (
        'emberknight',
        'knight@emberforge.com',
        'K#2vLq8!Mx',
        'https://i.pravatar.cc/150?u=emberknight'
    ),
    (
        'echofox',
        'fox@echomail.net',
        'L0x^Mv#83p',
        'https://i.pravatar.cc/150?u=echofox'
    ),
    (
        'smolnova',
        'nova@smolmail.com',
        'Zp$Mv03^kl',
        'https://i.pravatar.cc/150?u=smolnova'
    ),
    (
        'quantumleek',
        'leek@qmail.io',
        'Mv@7Lp#1zk',
        'https://i.pravatar.cc/150?u=quantumleek'
    ),
    (
        'lunalogic',
        'luna@logicbyte.org',
        '0Lp$MvZx@9',
        'https://i.pravatar.cc/150?u=lunalogic'
    ),
    (
        'synthcarrot',
        'carrot@synthmail.net',
        'Xp#Mvl29^o',
        'https://i.pravatar.cc/150?u=synthcarrot'
    ),
    (
        'warpchip',
        'chip@warpdigital.ai',
        'Zl^Mv3p$kL',
        'https://i.pravatar.cc/150?u=warpchip'
    ),
    (
        'vaporfox',
        'fox@vapornet.com',
        'Mp0$LvXq^9',
        'https://i.pravatar.cc/150?u=vaporfox'
    ),
    (
        'aurorabyte',
        'aurora@bytemail.com',
        'pY7#kLq!3s',
        'https://i.pravatar.cc/150?u=aurorabyte'
    ),
    (
        'chronoscape',
        'chrono@scapeflow.io',
        '9sX$jMv@2g',
        'https://i.pravatar.cc/150?u=chronoscape'
    ),
    (
        'dynamodash',
        'dynamo@dashnet.org',
        'Fh3!gNq8&kL',
        'https://i.pravatar.cc/150?u=dynamodash'
    ),
    (
        'echoSphere',
        'echo@sphere.ai',
        '7kL@jMv#2sP',
        'https://i.pravatar.cc/150?u=echoSphere'
    ),
    (
        'fluxrider',
        'flux@ridemail.com',
        'jMv2&sPq9!xY',
        'https://i.pravatar.cc/150?u=fluxrider'
    ),
    (
        'galaxygrind',
        'galaxy@grind.net',
        'sPq9!xY6#zW',
        'https://i.pravatar.cc/150?u=galaxygrind'
    ),
    (
        'holohaven',
        'holo@havenflow.io',
        'xY6#zW1@vUa',
        'https://i.pravatar.cc/150?u=holohaven'
    ),
    (
        'igniteinfo',
        'ignite@infomail.org',
        'zW1@vUa5$bT',
        'https://i.pravatar.cc/150?u=igniteinfo'
    ),
    (
        'joltjourney',
        'jolt@journeys.ai',
        'vUa5$bT0&cR',
        'https://i.pravatar.cc/150?u=joltjourney'
    ),
    (
        'kinetixkick',
        'kinetix@kick.com',
        'bT0&cR4%dSf',
        'https://i.pravatar.cc/150?u=kinetixkick'
    );

INSERT INTO
    channel (
        channel_url,
        ch_name,
        ch_desc,
        ch_welcome_vid,
        ch_banner,
        users_id
    )
VALUES
    -- 1. rutra
    (
        'https://downshift.tv/c/rutra', -- Atualizado
        'Tech Rutra',
        'Tutoriais e reviews sobre tecnologia de forma prática.',
        'https://videosite.com/intro_rutra',
        'https://cdn.pixabay.com/photo/2017/08/06/00/03/code-2582748_1280.jpg',
        1
    ),
    -- 2. mikunikito
    (
        'https://downshift.tv/c/mikunikito', -- Atualizado
        'Miku Beats',
        'Canal de músicas eletrônicas e cultura vocaloid.',
        'https://videosite.com/intro_miku',
        'https://cdn.pixabay.com/photo/2020/05/14/08/58/anime-5170415_1280.jpg',
        2
    ),
    -- 3. gugugpt
    (
        'https://downshift.tv/c/gugugpt', -- Atualizado
        'AI com Gugu',
        'Conteúdo sobre inteligência artificial e futuro da tecnologia.',
        'https://videosite.com/intro_ai',
        'https://cdn.pixabay.com/photo/2017/01/31/13/14/artificial-intelligence-2025789_1280.jpg',
        3
    ),
    -- 4. pixeltide
    (
        'https://downshift.tv/c/pixeltide', -- Atualizado
        'Pixel Tide',
        'Animações em pixel art, retro games e devlogs.',
        'https://videosite.com/pixel_intro',
        'https://cdn.pixabay.com/photo/2020/12/09/21/42/arcade-5819004_1280.jpg',
        4
    ),
    -- 5. astrozen
    (
        'https://downshift.tv/c/astrozen', -- Atualizado
        'AstroZen',
        'Astronomia, cosmos e contemplação do universo.',
        'https://videosite.com/cosmos',
        'https://cdn.pixabay.com/photo/2013/07/18/10/56/space-164501_1280.jpg',
        5
    ),
    -- 6. neonwolf
    (
        'https://downshift.tv/c/neonwolf', -- Atualizado
        'Neon Wolf Games',
        'Jogos neon, reviews e nostalgia gamer.',
        'https://videosite.com/neon_intro',
        'https://cdn.pixabay.com/photo/2017/08/01/08/29/games-2562332_1280.jpg',
        6
    ),
    -- 7. codedream
    (
        'https://downshift.tv/c/codedream', -- Atualizado
        'Code Dream',
        'Aprenda programação do zero ao avançado com projetos práticos.',
        'https://videosite.com/code_start',
        'https://cdn.pixabay.com/photo/2015/05/15/14/47/code-768775_1280.jpg',
        7
    ),
    -- 8. glitchcat
    (
        'https://downshift.tv/c/glitchcat', -- Atualizado
        'Glitch Cat',
        'Gameplays bugados, speedruns e momentos engraçados.',
        'https://videosite.com/glitch_intro',
        'https://cdn.pixabay.com/photo/2020/06/24/08/18/streaming-5335106_1280.jpg',
        8
    ),
    -- 9. quokkahack
    (
        'https://downshift.tv/c/quokkahack', -- Atualizado
        'Hack do Quokka',
        'Cibersegurança com bom humor e dicas úteis.',
        'https://videosite.com/hack_dicas',
        'https://cdn.pixabay.com/photo/2020/04/29/15/19/hacker-5111970_1280.jpg',
        9
    ),
    -- 10. moonloop
    (
        'https://downshift.tv/c/moonloop', -- Atualizado
        'Moon Loop',
        'Lo-fi hip hop beats e arte espacial relaxante.',
        'https://videosite.com/lofi_start',
        'https://cdn.pixabay.com/photo/2020/07/01/12/58/moon-5357921_1280.jpg',
        10
    ),
    -- 11. cyberchai
    (
        'https://downshift.tv/c/cyberchai', -- Atualizado
        'Cyber Chai',
        'Tecnologia, estilo de vida digital e cultura futurista.',
        'https://videosite.com/cyber_intro',
        'https://cdn.pixabay.com/photo/2020/04/07/08/22/technology-5017983_1280.jpg',
        11
    ),
    -- 12. wafflevortex
    (
        'https://downshift.tv/c/wafflevortex', -- Atualizado
        'Waffle Vortex',
        'Receitas excêntricas, doces e caos na cozinha!',
        'https://videosite.com/waffle_intro',
        'https://cdn.pixabay.com/photo/2016/06/10/15/33/waffle-1440373_1280.jpg',
        12
    ),
    -- 13. turbozen
    (
        'https://downshift.tv/c/turbozen', -- Atualizado
        'TurboZen Motors',
        'Velocidade e zen: carros, meditação e estilo de vida.',
        'https://videosite.com/turbo_intro',
        'https://cdn.pixabay.com/photo/2017/06/28/16/35/car-2452817_1280.jpg',
        13
    ),
    -- 14. driftraccoon
    (
        'https://downshift.tv/c/driftraccoon', -- Atualizado
        'Drift Raccoon',
        'Drift, tuning e cultura automotiva urbana.',
        'https://videosite.com/drift_intro',
        'https://cdn.pixabay.com/photo/2016/03/27/22/22/car-1284501_1280.jpg',
        14
    ),
    -- 15. cloudglyph
    (
        'https://downshift.tv/c/cloudglyph', -- Atualizado
        'Cloud Glyph',
        'Reflexões filosóficas e arte digital entre as nuvens.',
        'https://videosite.com/cloud_intro',
        'https://cdn.pixabay.com/photo/2016/03/27/07/08/clouds-1282314_1280.jpg',
        15
    );

INSERT INTO
    channel_external_link (ch_ext_link, channel_id)
VALUES
    -- Links para o Canal 1: Tech Rutra (channel_id 1)
    (
        'https://twitter.com/TechRutraReal',
        1
    ),
    (
        'https://github.com/TechRutra',
        1
    ),
    (
        'https://techrutra.com/blog',
        1
    ),
    -- Links para o Canal 2: Miku Beats (channel_id 2)
    (
        'https://soundcloud.com/MikuBeatsOfficial',
        2
    ),
    (
        'https://instagram.com/MikuBeats39',
        2
    ),
    -- Links para o Canal 4: Pixel Tide (channel_id 4)
    (
        'https://www.artstation.com/pixeltide',
        4
    ),
    (
        'https://ko-fi.com/pixeltideanimations',
        4
    ),
    -- Links para o Canal 5: AstroZen (channel_id 5)
    (
        'https://patreon.com/AstroZenExplorer',
        5
    ),
    (
        'https://medium.com/@AstroZenCosmic',
        5
    ),
    -- Links para o Canal 7: Code Dream (channel_id 7)
    (
        'https://www.linkedin.com/in/codedreamer',
        7
    ),
    (
        'https://codedreamplatform.com/portfolio',
        7
    ),
    -- Links para o Canal 10: Moon Loop (channel_id 10)
    (
        'https://moonloop.bandcamp.com/',
        10
    ),
    (
        'https://www.facebook.com/MoonLoopMusic',
        10
    ),
    -- Links para o Canal 12: Waffle Vortex (channel_id 12)
    (
        'https://www.tiktok.com/@wafflevortex',
        12
    ),
    (
        'https://www.pinterest.com/wafflevortexrecipes',
        12
    );

INSERT INTO
    user_admin_channel (users_id, channel_id)
VALUES (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5),
    (6, 6),
    (7, 7),
    (8, 8),
    (9, 9),
    (10, 10),
    (11, 11),
    (12, 12),
    (13, 13),
    (14, 14),
    (15, 15),
    (19, 1),
    (31, 7);

INSERT INTO
    user_int_channel (
        users_id,
        channel_id,
        u_is_sub_to_ch,
        u_is_notified_by_ch,
        u_member_level_ch
    )
VALUES (16, 2, TRUE, TRUE, 3), -- Inscrito no Miku Beats (Canal 2), notificações ON, Nível Intermediário (ID 3)
    (16, 10, TRUE, FALSE, 2), -- Inscrito no Moon Loop (Canal 10), notificações OFF, Nível Básico (ID 2)
    (20, 1, FALSE, FALSE, 1), -- Não inscrito no Tech Rutra (Canal 1), Nível Padrão (ID 1)
    (20, 7, TRUE, TRUE, 4), -- Inscrito no Code Dream (Canal 7), notificações ON, Nível Avançado (ID 4)
    (31, 5, TRUE, TRUE, 5), -- Inscrita no AstroZen (Canal 5), notificações ON, Nível Premium (ID 5)
    (31, 15, TRUE, FALSE, 2), -- Inscrita no Cloud Glyph (Canal 15), notificações OFF, Nível Básico (ID 2)
    (40, 6, TRUE, TRUE, 3), -- Inscrito no Neon Wolf Games (Canal 6), notificações ON, Nível Intermediário (ID 3)
    (1, 8, TRUE, TRUE, 2), -- Usuário rutra (ID 1) no Glitch Cat (Canal 8), Nível Básico (ID 2)
    (2, 14, TRUE, FALSE, 3), -- Usuário mikunikito (ID 2) no Drift Raccoon (Canal 14), Nível Intermediário (ID 3)
    (18, 4, TRUE, TRUE, 5), -- Usuário bitmango (ID 18) no Pixel Tide (Canal 4), Nível Premium (ID 5)
    (25, 11, FALSE, FALSE, 1), -- Usuário smolnova (ID 25) não inscrito no Cyber Chai (Canal 11), Nível Padrão (ID 1)
    (35, 9, TRUE, TRUE, 3), -- Usuário fluxrider (ID 35) no Hack do Quokka (Canal 9), Nível Intermediário (ID 3)
    (3, 5, TRUE, TRUE, 2), -- gugugpt (U3) no AstroZen (C5), Inscrito, Notif. ON, Nível Básico (ID 2)
    (4, 1, TRUE, FALSE, 1), -- pixeltide (U4) no Tech Rutra (C1), Inscrito, Notif. OFF, Nível Padrão (ID 1)
    (5, 2, FALSE, FALSE, 1), -- astrozen (U5) no Miku Beats (C2), Não Inscrito, Nível Padrão (ID 1)
    (6, 12, TRUE, TRUE, 3), -- neonwolf (U6) no Waffle Vortex (C12), Inscrito, Notif. ON, Nível Intermediário (ID 3)
    (7, 9, TRUE, TRUE, 4), -- codedream (U7) no Hack do Quokka (C9), Inscrito, Notif. ON, Nível Avançado (ID 4)
    (8, 13, TRUE, FALSE, 2), -- glitchcat (U8) no TurboZen Motors (C13), Inscrito, Notif. OFF, Nível Básico (ID 2)
    (9, 15, TRUE, TRUE, 5), -- quokkahack (U9) no Cloud Glyph (C15), Inscrito, Notif. ON, Nível Premium (ID 5)
    (10, 3, FALSE, FALSE, 1), -- moonloop (U10) no AI com Gugu (C3), Não Inscrito, Nível Padrão (ID 1)
    (11, 1, TRUE, TRUE, 2), -- cyberchai (U11) no Tech Rutra (C1), Inscrito, Notif. ON, Nível Básico (ID 2)
    (12, 14, TRUE, FALSE, 3), -- wafflevortex (U12) no Drift Raccoon (C14), Inscrito, Notif. OFF, Nível Intermediário (ID 3)
    (13, 11, TRUE, TRUE, 4), -- turbozen (U13) no Cyber Chai (C11), Inscrito, Notif. ON, Nível Avançado (ID 4)
    (14, 8, FALSE, FALSE, 1), -- driftraccoon (U14) no Glitch Cat (C8), Não Inscrito, Nível Padrão (ID 1)
    (15, 7, TRUE, TRUE, 5), -- cloudglyph (U15) no Code Dream (C7), Inscrito, Notif. ON, Nível Premium (ID 5)
    (17, 6, TRUE, TRUE, 2), -- voidjelly (U17) no Neon Wolf Games (C6), Inscrito, Notif. ON, Nível Básico (ID 2)
    (19, 11, TRUE, FALSE, 3), -- frostbyte (U19) no Cyber Chai (C11), Inscrito, Notif. OFF, Nível Intermediário (ID 3)
    (21, 12, TRUE, TRUE, 4), -- velvetshell (U21) no Waffle Vortex (C12), Inscrito, Notif. ON, Nível Avançado (ID 4)
    (22, 1, FALSE, FALSE, 1), -- nimbusowl (U22) no Tech Rutra (C1), Não Inscrito, Nível Padrão (ID 1)
    (23, 2, TRUE, TRUE, 5), -- emberknight (U23) no Miku Beats (C2), Inscrito, Notif. ON, Nível Premium (ID 5)
    (24, 5, TRUE, FALSE, 2), -- echofox (U24) no AstroZen (C5), Inscrito, Notif. OFF, Nível Básico (ID 2)
    (26, 10, TRUE, TRUE, 3), -- quantumleek (U26) no Moon Loop (C10), Inscrito, Notif. ON, Nível Intermediário (ID 3)
    (27, 13, FALSE, FALSE, 1), -- lunalogic (U27) no TurboZen Motors (C13), Não Inscrito, Nível Padrão (ID 1)
    (28, 15, TRUE, TRUE, 4), -- synthcarrot (U28) no Cloud Glyph (C15), Inscrito, Notif. ON, Nível Avançado (ID 4)
    (29, 3, TRUE, FALSE, 5), -- warpchip (U29) no AI com Gugu (C3), Inscrito, Notif. OFF, Nível Premium (ID 5)
    (30, 9, TRUE, TRUE, 2), -- vaporfox (U30) no Hack do Quokka (C9), Inscrito, Notif. ON, Nível Básico (ID 2)
    (32, 4, FALSE, FALSE, 1), -- chronoscape (U32) no Pixel Tide (C4), Não Inscrito, Nível Padrão (ID 1)
    (33, 14, TRUE, TRUE, 3), -- dynamodash (U33) no Drift Raccoon (C14), Inscrito, Notif. ON, Nível Intermediário (ID 3)
    (34, 7, TRUE, FALSE, 4), -- echoSphere (U34) no Code Dream (C7), Inscrito, Notif. OFF, Nível Avançado (ID 4)
    (36, 8, TRUE, TRUE, 5), -- galaxygrind (U36) no Glitch Cat (C8), Inscrito, Notif. ON, Nível Premium (ID 5)
    (37, 1, FALSE, FALSE, 1), -- holohaven (U37) no Tech Rutra (C1), Não Inscrito, Nível Padrão (ID 1)
    (38, 6, TRUE, TRUE, 2), -- igniteinfo (U38) no Neon Wolf Games (C6), Inscrito, Notif. ON, Nível Básico (ID 2)
    (39, 12, TRUE, FALSE, 3);

INSERT INTO
    caption (cap_language, cap_body)
VALUES (
        21,
        '[Intro Music] Welcome to the video! Today, we are discussing an exciting topic. Stay tuned!'
    ), -- English
    (
        22,
        'Olá e bem-vindos! Neste vídeo, vamos explorar [TEMA DO VÍDEO]. Não se esqueça de se inscrever!'
    ), -- Portuguese
    (
        21,
        'Subtitles available in English. Please enable them in your player settings.'
    ), -- English
    (
        22,
        'Legendas disponíveis. Ative-as nas configurações do player para uma melhor experiência.'
    ), -- Portuguese
    (
        23, -- Japanese
        'ようこそ！このビデオでは、[トピック]について説明します。お楽しみに！'
    );

INSERT INTO
    content (
        content_url,
        cont_title,
        cont_status,
        cont_thumb,
        cont_desc,
        cont_duration,
        cont_resolution,
        cont_category,
        cont_ind_rating,
        cont_language,
        cont_caption,
        channel_id
    )
VALUES
    -- === Canal 1: Tech Rutra (5 vídeos) ===
    (
        'https://downshift.tv/v/rutra-postgres-guia-2025',
        'Guia Completo de PostgreSQL para Iniciantes (2025)',
        1, -- Público
        'https://img.downshift.tv/thumb/rutra-postgres-guia-2025.jpg',
        'Neste tutorial abrangente, cobrimos todos os fundamentos do PostgreSQL que você precisa para começar, desde a instalação até queries avançadas. Perfeito para desenvolvedores!',
        '01:15:30',
        5, -- 1080p
        13, -- Educação
        1, -- L - Livre
        22, -- Portuguese (verifique seu lang_id)
        2, -- Legenda em Português (verifique seu cap_id)
        1 -- Channel: Tech Rutra
    ),
    (
        'https://downshift.tv/v/rutra-review-smartphone-xyz-2025',
        'Review: Novo Smartphone XYZ - Vale a Pena o Upgrade em 2025?',
        1, -- Público
        'https://img.downshift.tv/thumb/rutra-review-xyz-2025.jpg',
        'Análise completa do recém-lançado smartphone XYZ. Testamos a câmera, desempenho, bateria e muito mais! Será que ele justifica o investimento? Descubra agora.',
        '00:18:20',
        5, -- 1080p
        14, -- Ciência e Tecnologia
        1, -- L - Livre
        22, -- Portuguese (verifique seu lang_id)
        2, -- Legenda em Português (verifique seu cap_id)
        1 -- Channel: Tech Rutra
    ),
    (
        'https://downshift.tv/v/rutra-top5-js-frameworks-2025',
        'Top 5 Frameworks JavaScript para Aprender em 2025',
        1, -- Público
        'https://img.downshift.tv/thumb/rutra-top5js-2025.jpg',
        'O mundo do desenvolvimento web não para! Conheça os 5 frameworks JavaScript que estão em alta e que podem impulsionar sua carreira em 2025. Com exemplos práticos!',
        '00:25:10',
        5, -- 1080p
        13, -- Educação
        1, -- L - Livre
        22, -- Portuguese (verifique seu lang_id)
        2, -- Legenda em Português (verifique seu cap_id)
        1 -- Channel: Tech Rutra
    ),
    (
        'https://downshift.tv/v/rutra-pc-gamer-custo-beneficio-2025',
        'Como Montar seu PC Gamer Custo-Benefício (Guia Atualizado 2025)',
        1, -- Público
        'https://img.downshift.tv/thumb/rutra-pcgamer-2025.jpg',
        'Sonhando com um PC Gamer mas o orçamento está apertado? Neste guia, mostro passo a passo como escolher as melhores peças com foco em custo-benefício para rodar seus jogos favoritos!',
        '00:33:05',
        5, -- 1080p
        12, -- Guias e Estilo
        1, -- L - Livre
        22, -- Portuguese (verifique seu lang_id)
        2, -- Legenda em Português (verifique seu cap_id)
        1 -- Channel: Tech Rutra
    ),
    (
        'https://downshift.tv/v/rutra-intro-ia-para-devs',
        'Introdução à Inteligência Artificial para Desenvolvedores',
        1, -- Público
        'https://img.downshift.tv/thumb/rutra-intro-ia-devs.jpg',
        'A IA está transformando o desenvolvimento de software. Entenda os conceitos básicos, principais ferramentas e como você pode começar a aplicar IA em seus projetos.',
        '00:28:40',
        5, -- 1080p
        13, -- Educação
        1, -- L - Livre
        22, -- Portuguese (verifique seu lang_id)
        2, -- Legenda em Português (verifique seu cap_id)
        1 -- Channel: Tech Rutra
    ),
    -- === Canal 2: Miku Beats (4 vídeos) ===
    (
        'https://downshift.tv/v/miku-beats-synthwave-dreams',
        'Nova Faixa: ''Synthwave Dreams'' - Miku Beats Original',
        1, -- Público
        'https://img.downshift.tv/thumb/miku-synthwave-dreams.jpg',
        'Clipe oficial da minha nova música ''Synthwave Dreams''! Uma jornada visual e sonora pelo mundo do retrowave. Espero que curtam! Deixem o like!',
        '00:04:12',
        7, -- 2160p (4K)
        2, -- Música
        1, -- L - Livre
        21, -- English (verifique seu lang_id)
        1, -- Legenda em Inglês (verifique seu cap_id)
        2 -- Channel: Miku Beats
    ),
    (
        'https://downshift.tv/v/miku-beats-electric-heart-cover',
        'Hatsune Miku - ''Electric Heart'' (カバーソング) | Miku Beats',
        1, -- Público
        'https://img.downshift.tv/thumb/miku-electric-heart.jpg',
        'Meu cover da clássica ''Electric Heart'' da Hatsune Miku, com um toque especial Miku Beats! Espero que gostem desta homenagem. #Vocaloid #HatsuneMiku',
        '00:03:55',
        5, -- 1080p
        2, -- Música
        1, -- L - Livre
        23, -- Japanese (verifique seu lang_id)
        5, -- Legenda em Japonês (verifique seu cap_id)
        2 -- Channel: Miku Beats
    ),
    (
        'https://downshift.tv/v/miku-beats-fl-studio-tutorial',
        'Criando uma Música Eletrônica do Zero - FL Studio Tutorial (Miku Beats)',
        1, -- Público
        'https://img.downshift.tv/thumb/miku-flstudio-tutorial.jpg',
        'Acompanhem meu processo criativo enquanto produzo uma faixa eletrônica completa no FL Studio, passo a passo. Dicas para iniciantes e produtores experientes! (Feat. Hatsune Miku NT)',
        '00:45:15',
        5, -- 1080p
        2, -- Música (ou Educação 13)
        1, -- L - Livre
        21, -- English (verifique seu lang_id)
        3, -- Legenda em Inglês (verifique seu cap_id)
        2 -- Channel: Miku Beats
    ),
    (
        'https://downshift.tv/v/miku-beats-live-virtual-vibes-2025',
        'Miku Beats Live Set - Virtual Vibes Festival 2025',
        1, -- Público
        'https://img.downshift.tv/thumb/miku-live-virtualvibes-2025.jpg',
        'Gravação completa do meu live set no Virtual Vibes Festival 2025! Muita energia, faixas inéditas e visuais incríveis. Aumente o volume!',
        '01:02:00',
        7, -- 2160p (4K)
        2, -- Música
        1, -- L - Livre
        21, -- English (verifique seu lang_id)
        3, -- Legenda em Inglês (verifique seu cap_id)
        2 -- Channel: Miku Beats
    ),
    -- === Canal 3: AI com Gugu (4 vídeos) ===
    (
        'https://downshift.tv/v/gugugpt-futuro-ia-2030',
        'O Futuro da Inteligência Artificial: Previsões para 2030',
        1, -- Público
        'https://img.downshift.tv/thumb/gugugpt-futuro-ia-2030.jpg',
        'Quais são as próximas grandes revoluções na IA? Neste vídeo, Gugu explora as tendências e previsões mais impactantes para a inteligência artificial até 2030.',
        '00:20:50',
        5, -- 1080p
        14, -- Ciência e Tecnologia
        1, -- L - Livre
        22, -- Portuguese (verifique seu lang_id)
        2, -- Legenda em Português (verifique seu cap_id)
        3 -- Channel: AI com Gugu
    ),
    (
        'https://downshift.tv/v/gugugpt-como-funciona-llm',
        'Como Modelos de Linguagem (LLMs) Realmente Funcionam? (Explicado!)',
        1, -- Público
        'https://img.downshift.tv/thumb/gugugpt-llm.jpg',
        'Desmistificando os Large Language Models! Entenda de forma clara e acessível a tecnologia por trás de ferramentas como ChatGPT. Com Gugu!',
        '00:15:30',
        5, -- 1080p
        13, -- Educação
        1, -- L - Livre
        22, -- Portuguese (verifique seu lang_id)
        4, -- Legenda em Português (verifique seu cap_id)
        3 -- Channel: AI com Gugu
    ),
    (
        'https://downshift.tv/v/gugugpt-etica-na-ia',
        'Ética na IA: Os Desafios que Precisamos Enfrentar',
        1, -- Público
        'https://img.downshift.tv/thumb/gugugpt-etica-ia.jpg',
        'A inteligência artificial traz promessas incríveis, mas também grandes desafios éticos. Gugu discute os principais dilemas e a importância da responsabilidade no desenvolvimento de IA.',
        '00:22:00',
        4, -- 720p
        14, -- Ciência e Tecnologia
        3, -- 12 anos
        22, -- Portuguese (verifique seu lang_id)
        4, -- Legenda em Português (verifique seu cap_id)
        3 -- Channel: AI com Gugu
    ),
    (
        'https://downshift.tv/v/gugugpt-entrevista-ml-especialista',
        'Entrevista com um Especialista em Machine Learning - Insights e Carreira',
        1, -- Público
        'https://img.downshift.tv/thumb/gugugpt-entrevista-ml.jpg',
        'Gugu conversa com um renomado especialista em Machine Learning sobre os avanços da área, dicas de carreira e o futuro da profissão. Não perca!',
        '00:35:40',
        5, -- 1080p
        1, -- Pessoas e Blogs
        1, -- L - Livre
        22, -- Portuguese (verifique seu lang_id)
        4, -- Legenda em Português (verifique seu cap_id)
        3 -- Channel: AI com Gugu
    ),
    -- === Canal 4: Pixel Tide (5 vídeos) ===
    (
        'https://downshift.tv/v/pixeltide-cavaleiro-pixelado-curta',
        'A Lenda do Cavaleiro Pixelado - Curta de Animação em Pixel Art',
        1, -- Público
        'https://img.downshift.tv/thumb/pixeltide-cavaleiro-pixelado.jpg',
        'Minha mais nova animação em pixel art! Uma pequena aventura sobre um cavaleiro corajoso. Foram meses de trabalho, espero que gostem! Feito com Aseprite.',
        '00:05:30',
        5, -- 1080p
        3, -- Filmes e Animação
        1, -- L - Livre
        22, -- Portuguese (verifique seu lang_id)
        4, -- Legenda em Português (verifique seu cap_id)
        4 -- Channel: Pixel Tide
    ),
    (
        'https://downshift.tv/v/pixeltide-snes-top5-jogos-esquecidos',
        'Retro Rewind: Top 5 Jogos Esquecidos do Super Nintendo',
        1, -- Público
        'https://img.downshift.tv/thumb/pixeltide-snes-top5.jpg',
        'Vamos cavar fundo no baú do Super Nintendo e relembrar 5 pérolas esquecidas que merecem ser jogadas até hoje! Qual seu favorito dessa era? Comente!',
        '00:12:15',
        4, -- 720p
        8, -- Games
        1, -- L - Livre
        22, -- Portuguese (verifique seu lang_id)
        2, -- Legenda em Português (verifique seu cap_id)
        4 -- Channel: Pixel Tide
    ),
    (
        'https://downshift.tv/v/pixeltide-devlog03-indiegame-sprites',
        'Devlog #3: Criando Meu Jogo Indie Pixel Art - Novos Sprites e Desafios',
        1, -- Público
        'https://img.downshift.tv/thumb/pixeltide-devlog03.jpg',
        'Atualizações sobre o desenvolvimento do meu jogo indie! Neste devlog, mostro os novos sprites de inimigos, mecânicas de combate e os desafios que enfrentei esta semana.',
        '00:22:40',
        5, -- 1080p
        8, -- Games
        1, -- L - Livre
        21, -- English (verifique seu lang_id)
        3, -- Legenda em Inglês (verifique seu cap_id)
        4 -- Channel: Pixel Tide
    ),
    (
        'https://downshift.tv/v/pixeltide-pixelart-tutorial-walkcycle-aseprite',
        'Pixel Art Tutorial: Animando um Personagem Andando (Aseprite)',
        1, -- Público
        'https://img.downshift.tv/thumb/pixeltide-tutorial-walkcycle.jpg',
        'Aprenda o básico de como animar um ciclo de caminhada para seu personagem em pixel art usando o Aseprite. Tutorial passo a passo para iniciantes!',
        '00:15:00',
        3, -- 480p
        12, -- Guias e Estilo
        1, -- L - Livre
        21, -- English (verifique seu lang_id)
        1, -- Legenda em Inglês (verifique seu cap_id)
        4 -- Channel: Pixel Tide
    ),
    (
        'https://downshift.tv/v/pixeltide-art-showcase-2024',
        'Pixel Tide Art Showcase - Best of 2024 (Members Early Access)',
        2, -- Privado (ex: acesso antecipado para membros)
        'https://img.downshift.tv/thumb/pixeltide-showcase2024.jpg',
        'A collection of my favorite pixel art pieces and animations from 2024. Thank you all for the amazing support this year! #pixelart #animation',
        '00:08:10',
        5, -- 1080p
        3, -- Filmes e Animação
        1, -- L - Livre
        21, -- English (verifique seu lang_id)
        1, -- Legenda em Inglês (verifique seu cap_id)
        4 -- Channel: Pixel Tide
    ),
    -- === Canal 5: AstroZen (4 vídeos) ===
    (
        'https://downshift.tv/v/astrozen-jwst-imagens-explicadas',
        'As Imagens Mais Incríveis do Telescópio James Webb (Com Explicações)',
        1, -- Público
        'https://img.downshift.tv/thumb/astrozen-jwst-imagens.jpg',
        'Mergulhe nas profundezas do cosmos com as imagens mais recentes e espetaculares do Telescópio Espacial James Webb. Explico a ciência por trás de cada nebulosa e galáxia distante.',
        '00:17:30',
        7, -- 2160p (4K)
        14, -- Ciência e Tecnologia
        1, -- L - Livre
        22, -- Portuguese (verifique seu lang_id)
        2, -- Legenda em Português (verifique seu cap_id)
        5 -- Channel: AstroZen
    ),
    (
        'https://downshift.tv/v/astrozen-fermi-paradox-explained',
        'Vida Extraterrestre: Onde Estão Todos? O Paradoxo de Fermi',
        1, -- Público
        'https://img.downshift.tv/thumb/astrozen-fermi-paradox.jpg',
        'Se o universo é tão vasto, por que ainda não encontramos sinais de vida extraterrestre inteligente? Uma reflexão sobre o Paradoxo de Fermi e as possíveis respostas.',
        '00:20:05',
        5, -- 1080p
        14, -- Ciência e Tecnologia
        1, -- L - Livre
        21, -- English (verifique seu lang_id)
        3, -- Legenda em Inglês (verifique seu cap_id)
        5 -- Channel: AstroZen
    ),
    (
        'https://downshift.tv/v/astrozen-meditacao-guiada-universo',
        'Meditação Guiada: Conectando-se com a Energia do Universo',
        1, -- Público
        'https://img.downshift.tv/thumb/astrozen-meditacao-cosmos.jpg',
        'Uma sessão de meditação guiada para acalmar a mente, reduzir o estresse e sentir sua conexão com o cosmos. Encontre um lugar tranquilo e junte-se a mim.',
        '00:15:45',
        5, -- 1080p
        12, -- Guias e Estilo
        1, -- L - Livre
        22, -- Portuguese (verifique seu lang_id)
        4, -- Legenda em Português (verifique seu cap_id)
        5 -- Channel: AstroZen
    ),
    (
        'https://downshift.tv/v/astrozen-constelacoes-inverno-hemisferio-sul',
        'A Beleza Oculta das Constelações de Inverno (Hemisfério Sul)',
        1, -- Público
        'https://img.downshift.tv/thumb/astrozen-constelacoes-inverno.jpg',
        'Explore o céu noturno de inverno do Hemisfério Sul! Descubra as histórias e a beleza das constelações como o Cruzeiro do Sul, Escorpião e Centauro. Dicas de observação.',
        '00:11:50',
        5, -- 1080p
        13, -- Educação
        1, -- L - Livre
        22, -- Portuguese (verifique seu lang_id)
        4, -- Legenda em Português (verifique seu cap_id)
        5 -- Channel: AstroZen
    ),
    -- === Canal 6: Neon Wolf Games (5 vídeos) ===
    (
        'https://downshift.tv/v/neonwolf-cyberpunk2077-review-2025',
        'Cyberpunk 2077 em 2025: Ainda Vale a Pena Explorar Night City?',
        1, -- Público
        'https://img.downshift.tv/thumb/neonwolf-cyberpunk2077-2025.jpg',
        'Anos após seu lançamento conturbado, como está Cyberpunk 2077 hoje? Com todas as atualizações e a expansão Phantom Liberty, revisitamos Night City para dar nosso veredito final.',
        '00:28:15',
        7, -- 2160p (4K)
        8, -- Games
        3, -- 12 anos
        22, -- Portuguese (verifique seu lang_id)
        2, -- Legenda em Português (verifique seu cap_id)
        6 -- Channel: Neon Wolf Games
    ),
    (
        'https://downshift.tv/v/neonwolf-top10-jogos-estetica-neon',
        'Top 10 Jogos com Estética Neon que Você PRECISA Jogar',
        1, -- Público
        'https://img.downshift.tv/thumb/neonwolf-top10-neon.jpg',
        'Luzes, cores vibrantes e muita synthwave! Apresento meu top 10 pessoal de jogos que brilham com uma estética neon inesquecível. Preparem os óculos escuros!',
        '00:16:40',
        5, -- 1080p
        8, -- Games
        1, -- L - Livre
        21, -- English (verifique seu lang_id)
        3, -- Legenda em Inglês (verifique seu cap_id)
        6 -- Channel: Neon Wolf Games
    ),
    (
        'https://downshift.tv/v/neonwolf-evolucao-dos-arcades',
        'A Evolução dos Arcades: Da Era de Ouro aos Dias Atuais',
        1, -- Público
        'https://img.downshift.tv/thumb/neonwolf-evolucao-arcades.jpg',
        'Uma viagem nostálgica pela história dos fliperamas! Desde os clássicos como Pac-Man e Space Invaders até as experiências modernas. Relembre e descubra!',
        '00:21:00',
        4, -- 720p
        10, -- Entretenimento
        1, -- L - Livre
        22, -- Portuguese (verifique seu lang_id)
        2, -- Legenda em Português (verifique seu cap_id)
        6 -- Channel: Neon Wolf Games
    ),
    (
        'https://downshift.tv/v/neonwolf-hotline-miami-gameplay-comentado',
        'Gameplay Comentado: ''Hotline Miami'' - Caos Neon e Trilha Sonora Perfeita',
        1, -- Público
        'https://img.downshift.tv/thumb/neonwolf-hotlinemiami.jpg',
        'Jogando Hotline Miami do início ao fim (ou tentando!). Ação frenética, violência estilizada e uma das melhores trilhas sonoras dos games. CUIDADO: Conteúdo maduro.',
        '00:55:30',
        5, -- 1080p
        8, -- Games
        5, -- 16 anos (ind_rat_id = 5 para '16')
        21, -- English (verifique seu lang_id)
        1, -- Legenda em Inglês (verifique seu cap_id)
        6 -- Channel: Neon Wolf Games
    ),
    (
        'https://downshift.tv/v/neonwolf-qna-especial-50k',
        'Neon Wolf Games - Q&A com Inscritos! (Especial 50k)',
        1, -- Público
        'https://img.downshift.tv/thumb/neonwolf-qna50k.jpg',
        'Chegamos a 50 mil inscritos! Muito obrigado a todos! Neste especial, respondo às perguntas que vocês mandaram sobre games, o canal e curiosidades aleatórias. :D',
        '00:30:25',
        5, -- 1080p
        1, -- Pessoas e Blogs
        1, -- L - Livre
        22, -- Portuguese (verifique seu lang_id)
        2, -- Legenda em Português (verifique seu cap_id)
        6 -- Channel: Neon Wolf Games
    );

INSERT INTO
    content (
        content_url,
        cont_title,
        cont_status,
        cont_thumb,
        cont_desc,
        cont_duration,
        cont_resolution,
        cont_category,
        cont_ind_rating,
        cont_language,
        cont_caption,
        channel_id
    )
VALUES
    -- === Canal 7: Code Dream (6 vídeos) ===
    (
        'https://downshift.tv/v/codedream-python-aula1-configurando-ambiente',
        'Curso Completo de Python para Iniciantes - Aula 1: Configurando o Ambiente',
        1, -- Público
        'https://img.downshift.tv/thumb/codedream-python-aula1.jpg',
        'Comece sua jornada na programação com Python! Nesta primeira aula do nosso curso completo e gratuito, vamos configurar o ambiente de desenvolvimento e escrever nosso primeiro ''Olá, Mundo!''',
        '00:25:30',
        5, -- 1080p
        13, -- Educação
        1, -- L - Livre
        22, -- Portuguese (verifique seu lang_id)
        2, -- Legenda em Português (verifique seu cap_id)
        7 -- Channel: Code Dream
    ),
    (
        'https://downshift.tv/v/codedream-app-lista-tarefas-react-node',
        'Desenvolvendo um App de Lista de Tarefas com React e Node.js (Projeto Prático)',
        1, -- Público
        'https://img.downshift.tv/thumb/codedream-app-tarefas.jpg',
        'Projeto prático completo! Vamos construir um aplicativo de lista de tarefas full-stack usando React no front-end e Node.js com Express no back-end. Código fonte no GitHub!',
        '02:10:00',
        5, -- 1080p
        13, -- Educação
        1, -- L - Livre
        22, -- Portuguese (verifique seu lang_id)
        2, -- Legenda em Português (verifique seu cap_id)
        7 -- Channel: Code Dream
    ),
    (
        'https://downshift.tv/v/codedream-sql-vs-nosql-qual-escolher',
        'SQL vs NoSQL: Qual Banco de Dados Escolher para seu Projeto?',
        1, -- Público
        'https://img.downshift.tv/thumb/codedream-sqlvsnosql.jpg',
        'Uma das decisões mais importantes ao iniciar um projeto: SQL ou NoSQL? Entenda as diferenças, vantagens, desvantagens e casos de uso de cada abordagem. Code Dream explica!',
        '00:18:45',
        5, -- 1080p
        13, -- Educação
        1, -- L - Livre
        21, -- English (verifique seu lang_id)
        3, -- Legenda em Inglês (verifique seu cap_id)
        7 -- Channel: Code Dream
    ),
    (
        'https://downshift.tv/v/codedream-git-github-tutorial-essencial',
        'Versionamento de Código com Git e GitHub - Tutorial Essencial',
        1, -- Público
        'https://img.downshift.tv/thumb/codedream-git-github.jpg',
        'Domine o Git e o GitHub! Aprenda os comandos essenciais, como criar repositórios, fazer commits, branches, merges e colaborar em projetos. Indispensável para qualquer dev.',
        '00:35:10',
        4, -- 720p
        12, -- Guias e Estilo
        1, -- L - Livre
        22, -- Portuguese (verifique seu lang_id)
        2, -- Legenda em Português (verifique seu cap_id)
        7 -- Channel: Code Dream
    ),
    (
        'https://downshift.tv/v/codedream-livecoding-python-chatbot-archive',
        'Live Coding: Construindo um Chatbot Simples com Python (Arquivo)',
        3, -- Não Listado (arquivo de live antiga)
        'https://img.downshift.tv/thumb/codedream-live-chatbot.jpg',
        'Sessão de live coding onde construímos juntos um chatbot básico utilizando Python e bibliotecas simples. Interaja, tire dúvidas e aprenda ao vivo!',
        '01:55:00',
        5, -- 1080p
        13, -- Educação
        1, -- L - Livre
        21, -- English (verifique seu lang_id)
        3, -- Legenda em Inglês (verifique seu cap_id)
        7 -- Channel: Code Dream
    ),
    (
        'https://downshift.tv/v/codedream-dicas-produtividade-programadores',
        'Dicas de Produtividade para Programadores (Como Render Mais!)',
        1, -- Público
        'https://img.downshift.tv/thumb/codedream-produtividade.jpg',
        'Sente que o dia não rende o suficiente? Compartilho minhas melhores dicas e ferramentas de produtividade testadas e aprovadas para programadores. Organize seu fluxo e codifique mais!',
        '00:12:30',
        5, -- 1080p
        1, -- Pessoas e Blogs
        1, -- L - Livre
        22, -- Portuguese (verifique seu lang_id)
        2, -- Legenda em Português (verifique seu cap_id)
        7 -- Channel: Code Dream
    ),
    -- === Canal 8: Glitch Cat (4 vídeos) ===
    (
        'https://downshift.tv/v/glitchcat-fisica-quebrada-jogoX',
        'Física QUEBRADA: Os Momentos Mais Bizarros em Jogo Aleatório X',
        1, -- Público
        'https://img.downshift.tv/thumb/glitchcat-fisicajogoX.jpg',
        'Prepare-se para rir (ou chorar) com essa compilação dos glitches de física mais absurdos que já encontrei no Jogo Aleatório X. O jogo simplesmente não colabora!',
        '00:10:55',
        5, -- 1080p
        8, -- Games
        2, -- 10 anos
        22, -- Portuguese (verifique seu lang_id)
        2, -- Legenda em Português (verifique seu cap_id)
        8 -- Channel: Glitch Cat
    ),
    (
        'https://downshift.tv/v/glitchcat-speedrun-jogo-classico-wr-attempt',
        'Speedrun Any% de Jogo Clássico em Menos de 5 Minutos (WR Attempt!)',
        1, -- Público
        'https://img.downshift.tv/thumb/glitchcat-speedrunWR.jpg',
        'Tentativa de recorde mundial no speedrun Any% de [Jogo Clássico]! Será que o Glitch Cat consegue o tempo abaixo de 5 minutos? Muita tensão e glitches (esperamos que os bons!).',
        '00:06:15',
        4, -- 720p
        8, -- Games
        1, -- L - Livre
        21, -- English (verifique seu lang_id)
        2, -- Legenda em Inglês (verifique seu cap_id)
        8 -- Channel: Glitch Cat
    ),
    (
        'https://downshift.tv/v/glitchcat-npcs-semnocao-compilacao',
        'Os NPCs Mais SEM NOÇÃO dos Games (Compilação Engraçada)',
        1, -- Público
        'https://img.downshift.tv/thumb/glitchcat-npcs.jpg',
        'Uma homenagem aos NPCs que nos fazem questionar a inteligência artificial nos jogos. Comportamentos bizarros, falas sem sentido e muita diversão garantida!',
        '00:14:30',
        5, -- 1080p
        10, -- Entretenimento
        1, -- L - Livre
        22, -- Portuguese (verifique seu lang_id)
        2, -- Legenda em Português (verifique seu cap_id)
        8 -- Channel: Glitch Cat
    ),
    (
        'https://downshift.tv/v/glitchcat-devs-forget-to-test-bugs',
        'When Game Devs FORGET To Test... (Hilarious Bug Montage)',
        1, -- Público
        'https://img.downshift.tv/thumb/glitchcat-devsforget.jpg',
        'Sometimes bugs are not just annoying, they are ART. Enjoy this montage of the most hilarious game-breaking bugs I''ve encountered. Developers, please test your games! :P',
        '00:09:05',
        5, -- 1080p
        10, -- Entretenimento
        2, -- 10 anos
        21, -- English (verifique seu lang_id)
        2, -- Legenda em Inglês (verifique seu cap_id)
        8 -- Channel: Glitch Cat
    ),
    -- === Canal 9: Hack do Quokka (5 vídeos) ===
    (
        'https://downshift.tv/v/quokkahack-5erros-seguranca-online',
        '5 Erros de Segurança que VOCÊ Comete na Internet (e Como Evitá-los!)',
        1, -- Público
        'https://img.downshift.tv/thumb/quokkahack-5erros.jpg',
        'Sua segurança online é mais frágil do que você pensa! O Quokka Hacker revela os 5 erros mais comuns que as pessoas cometem e dá dicas práticas para se proteger de verdade.',
        '00:12:50',
        5, -- 1080p
        13, -- Educação
        1, -- L - Livre
        22, -- Portuguese (verifique seu lang_id)
        2, -- Legenda em Português (verifique seu cap_id)
        9 -- Channel: Hack do Quokka
    ),
    (
        'https://downshift.tv/v/quokkahack-guia-antiphishing',
        'Phishing: O Guia Definitivo para Não Cair em Golpes (Com Exemplos Reais!)',
        1, -- Público
        'https://img.downshift.tv/thumb/quokkahack-phishing.jpg',
        'Aprenda a identificar e se proteger contra ataques de phishing como um profissional! Mostro exemplos reais de e-mails e sites falsos. Não seja a próxima vítima!',
        '00:17:20',
        5, -- 1080p
        13, -- Educação
        1, -- L - Livre
        22, -- Portuguese (verifique seu lang_id)
        2, -- Legenda em Português (verifique seu cap_id)
        9 -- Channel: Hack do Quokka
    ),
    (
        'https://downshift.tv/v/quokkahack-vpn-mitos-verdades',
        'VPNs Realmente Funcionam? Mitos e Verdades (Hack do Quokka Explica)',
        1, -- Público
        'https://img.downshift.tv/thumb/quokkahack-vpn.jpg',
        'Todo mundo fala de VPN, mas você sabe como ela funciona e se realmente garante seu anonimato? O Quokka desvenda os mitos e verdades sobre Redes Virtuais Privadas.',
        '00:15:00',
        4, -- 720p
        14, -- Ciência e Tecnologia
        1, -- L - Livre
        22, -- Portuguese (verifique seu lang_id)
        2, -- Legenda em Português (verifique seu cap_id)
        9 -- Channel: Hack do Quokka
    ),
    (
        'https://downshift.tv/v/quokkahack-senhas-fortes-metodo',
        'Como Criar Senhas FORTES e Fáceis de Lembrar (Método Secreto do Quokka!)',
        1, -- Público
        'https://img.downshift.tv/thumb/quokkahack-senhas.jpg',
        'Chega de senhas fracas! O Quokka revela seu método infalível (e divertido) para criar senhas super seguras que você não vai esquecer. Diga adeus ao ''123456''!',
        '00:09:30',
        5, -- 1080p
        12, -- Guias e Estilo
        1, -- L - Livre
        22, -- Portuguese (verifique seu lang_id)
        2, -- Legenda em Português (verifique seu cap_id)
        9 -- Channel: Hack do Quokka
    ),
    (
        'https://downshift.tv/v/quokkahack-analise-ataque-ficticio-educacional',
        'Analisando um Ataque Hacker em Tempo Real (Fictício e Educacional!)',
        1, -- Público
        'https://img.downshift.tv/thumb/quokkahack-ataque-ficticio.jpg',
        'Em um ambiente controlado e 100% fictício, demonstro as etapas de um ataque cibernético comum e como as defesas atuam. Conteúdo puramente educacional para conscientização!',
        '00:28:10',
        5, -- 1080p
        13, -- Educação
        3, -- 12 anos
        22, -- Portuguese (verifique seu lang_id)
        2, -- Legenda em Português (verifique seu cap_id)
        9 -- Channel: Hack do Quokka
    );

-- Lembre-se de substituir os content_ids e tag_ids pelos valores REAIS da sua base!
INSERT INTO
    content_tag (content_id, tag_id)
VALUES
    -- Para "Guia Completo de PostgreSQL para Iniciantes (2025)" (content_id ~100)
    (100, 1), -- Tutorial
    (100, 8), -- Educação
    (100, 9), -- Tecnologia
    -- Para "Nova Faixa: 'Synthwave Dreams' - Miku Beats Original" (content_id ~101)
    (101, 11), -- Música
    -- Para "O Futuro da Inteligência Artificial: Previsões para 2030" (content_id ~102)
    (102, 33), -- Inteligência Artificial
    (102, 9), -- Tecnologia
    (102, 8), -- Educação
    -- Para "A Lenda do Cavaleiro Pixelado - Curta de Animação em Pixel Art" (content_id ~103)
    (103, 24), -- Animação
    -- (103, [tag_id para 'Pixel Art']), -- Adicione a tag 'Pixel Art' e use o ID
    -- Para "Retro Rewind: Top 5 Jogos Esquecidos do Super Nintendo" (content_id ~104)
    (104, 29), -- Games Retro
    (104, 3), -- Gameplay
    -- Para "As Imagens Mais Incríveis do Telescópio James Webb (Com Explicações)" (content_id ~105)
    (105, 10), -- Ciência
    (105, 9), -- Tecnologia
    (105, 8), -- Educação
    -- Para "Cyberpunk 2077 em 2025: Ainda Vale a Pena Explorar Night City?" (content_id ~106)
    (106, 3), -- Gameplay
    (106, 2), -- Review
    -- Para "Curso Completo de Python para Iniciantes - Aula 1" (content_id ~107)
    (107, 1), -- Tutorial
    (107, 8), -- Educação
    (107, 9), -- Tecnologia (sugestão: adicione tag 'Python')
    -- Para "Física QUEBRADA: Os Momentos Mais Bizarros em Jogo Aleatório X" (content_id ~108)
    (108, 3), -- Gameplay
    (108, 13), -- Comédia
    -- (108, [tag_id para 'Glitches' ou 'Bugs']),
    -- Para "5 Erros de Segurança que VOCÊ Comete na Internet" (content_id ~109)
    (109, 8), -- Educação
    (109, 9);

INSERT INTO
    video (
        content_id,
        video_body,
        video_duration
    )
VALUES (
        100,
        'https://videos.downshift.tv/final/82_postgres_guia.mp4',
        '01:15:30'
    ),
    (
        105,
        'https://videos.downshift.tv/final/87_miku_synthwave.mp4',
        '00:04:12'
    ),
    (
        109,
        'https://videos.downshift.tv/final/91_gugu_futuro_ia.mp4',
        '00:20:50'
    ),
    (
        113,
        'https://videos.downshift.tv/final/95_pixeltide_cavaleiro.mp4',
        '00:05:30'
    ),
    (
        114,
        'https://videos.downshift.tv/final/96_pixeltide_snes_top5.mp4',
        '00:12:15'
    ),
    (
        118,
        'https://videos.downshift.tv/final/100_astrozen_jwst.mp4',
        '00:17:30'
    ),
    (
        122,
        'https://videos.downshift.tv/final/104_neonwolf_cyberpunk.mp4',
        '00:28:15'
    ),
    (
        127,
        'https://videos.downshift.tv/final/109_codedream_python1.mp4',
        '00:25:30'
    ),
    (
        128,
        'https://videos.downshift.tv/final/110_codedream_apptarefas.mp4',
        '02:10:00'
    ),
    (
        133,
        'https://videos.downshift.tv/final/115_glitchcat_fisica.mp4',
        '00:10:55'
    ),
    (
        134,
        'https://videos.downshift.tv/final/116_glitchcat_speedrun.mp4',
        '00:06:15'
    ),
    (
        137,
        'https://videos.downshift.tv/final/119_quokka_5erros.mp4',
        '00:12:50'
    ),
    (
        138,
        'https://videos.downshift.tv/final/120_quokka_phishing.mp4',
        '00:17:20'
    );

-- Passo A: Inserir os Shorts como entradas na tabela 'content'
-- Assumindo que os próximos content_ids serão 124, 125, 126...
INSERT INTO
    content (
        content_url,
        cont_title,
        cont_status,
        cont_thumb,
        cont_desc,
        cont_duration,
        cont_resolution,
        cont_category,
        cont_ind_rating,
        cont_language,
        cont_caption,
        channel_id
    )
VALUES
    -- Short 1: Dica Rápida de PostgreSQL (Canal Tech Rutra - ID 1)
    (
        'https://downshift.tv/s/rutra-pg-dica-otimizacao-query', -- content_url (página do short)
        'PostgreSQL: Otimize Consultas em 58s! #shorts', -- cont_title
        1, -- cont_status (Público)
        'https://img.downshift.tv/thumb/s_rutra_pg_dica.jpg', -- cont_thumb
        'Uma dica super rápida para otimizar suas queries no PostgreSQL e ganhar performance! #PostgreSQL #SQL #DicasDev #Shorts', -- cont_desc
        '00:00:58', -- cont_duration
        5, -- cont_resolution (1080p - pode ser vertical)
        13, -- cont_category (Educação)
        1, -- cont_ind_rating (L - Livre)
        22, -- cont_language (Portuguese - ajuste o ID)
        2, -- cont_caption (Português - ajuste o ID)
        1 -- channel_id (Tech Rutra)
    ),
    -- Short 2: Mini Animação Gato Pixelado (Canal Pixel Tide - ID 4)
    (
        'https://downshift.tv/s/pixeltide-gato-pixel-saltitante',
        'Gatinho Pixelado Fofo Saltitando! #pixelart #animation #shorts',
        1, -- Público
        'https://img.downshift.tv/thumb/s_pixeltide_gato_pixel.jpg',
        'Uma pequena e fofa animação de um gatinho pixelado saltitando. Feito com Aseprite! Qual o próximo animal? Deixe nos comentários! #Art #Cute',
        '00:00:15',
        3, -- 480p (adequado para pixel art, será escalado)
        3, -- Filmes e Animação
        1, -- L - Livre
        21, -- English (para atingir audiência de arte mais ampla)
        3, -- English (ajuste o ID)
        4 -- channel_id (Pixel Tide)
    ),
    -- Short 3: Bug Engraçado da Semana (Canal Glitch Cat - ID 8)
    (
        'https://downshift.tv/s/glitchcat-bug-epico-semana-gaming',
        'FAIL ÉPICO: Bug da Semana em Jogo X! 😂 #shorts #gamingfails',
        1, -- Público
        'https://img.downshift.tv/thumb/s_glitchcat_bug_semana.jpg',
        'Vocês precisam ver esse bug hilário que aconteceu durante a live no Jogo X! O personagem simplesmente atravessou o mapa. #GamingFails #FunnyMoments #Glitch',
        '00:00:35',
        4, -- 720p
        10, -- Entretenimento
        1, -- L - Livre
        22, -- Portuguese (ajuste o ID)
        3, -- Portuguese (ajuste o ID)
        8 -- channel_id (Glitch Cat)
    );

-- Passo B: Inserir os detalhes na tabela 'short'
-- Usando os content_ids REAIS gerados no Passo A (content_id original + 54)
INSERT INTO
    short (
        content_id,
        full_video_id,
        sh_music_link,
        sh_body
    )
VALUES (
        142, -- content_id do Short "PostgreSQL: Otimize Consultas em 58s!" (88 + 54)
        NULL, -- full_video_id (não é um corte de outro vídeo)
        NULL, -- sh_music_link (sem música específica)
        'https://videos.downshift.tv/shorts/final/124_rutra_pg_dica.mp4' -- sh_body (link para o arquivo do short)
    ),
    (
        143, -- content_id do Short "Gatinho Pixelado Fofo Saltitando!" (89 + 54)
        NULL, -- full_video_id
        'https://freemusicarchive.org/music/trackedmusic/Pulse/', -- sh_music_link (exemplo de link de música)
        'https://videos.downshift.tv/shorts/final/125_pixeltide_gato_pixel.mp4' -- sh_body
    ),
    (
        144, -- content_id do Short "FAIL ÉPICO: Bug da Semana..." (90 + 54)
        133, -- full_video_id do vídeo "Física QUEBRADA..." (79 + 54)
        NULL, -- sh_music_link
        'https://videos.downshift.tv/shorts/final/126_glitchcat_bug_semana.mp4' -- sh_body
    );

INSERT INTO
    comment (users_id, com_body)
VALUES
    -- Comentários Base
    (
        5,
        'Excelente vídeo sobre PostgreSQL! Muito bem explicado, aprendi bastante. Obrigado, Tech Rutra!'
    ), --  Supondo que este gere comment_id = [ID_COMENTARIO_1]
    (
        10,
        'Adorei a nova faixa ''Synthwave Dreams''! A vibe é incrível. Já quero mais!'
    ), --  Supondo que este gere comment_id = [ID_COMENTARIO_2]
    (
        19,
        'This pixel art cat is so cute! Great job, Pixel Tide! <3'
    ), --  Supondo que este gere comment_id = [ID_COMENTARIO_3]
    (
        25,
        'Muito interessante essa discussão sobre o futuro da IA. Dá o que pensar...'
    ), --  Supondo que este gere comment_id = [ID_COMENTARIO_4]
    (
        33,
        'Esse guia de como montar PC gamer me ajudou demais! Consegui montar o meu gastando menos do que esperava.'
    ), --  Supondo que este gere comment_id = [ID_COMENTARIO_5]
    (
        1,
        'Gameplay muito engraçado, Glitch Cat! Ri alto com esses bugs.'
    ), --  Supondo que este gere comment_id = [ID_COMENTARIO_6]
    (
        40,
        'Wow, this 58s tip for PG is gold! Thanks! #shorts'
    ), --  Supondo que este gere comment_id = [ID_COMENTARIO_7]
    (
        15,
        'Dicas de segurança muito importantes do Quokka! Sempre bom relembrar.'
    ), --  Supondo que este gere comment_id = [ID_COMENTARIO_8]
    -- Respostas (também são inseridas na tabela 'comment')
    (
        1,
        'Fico feliz que tenha gostado e aprendido, @astrozen! Obrigado pelo feedback!'
    ), --  Supondo que este gere comment_id = [ID_RESPOSTA_1_PARA_1] (resposta ao comentário 1)
    (
        4,
        '@frostbyte Thank you so much! Glad you liked the kitty animation! :D'
    ), --  Supondo que este gere comment_id = [ID_RESPOSTA_2_PARA_3] (resposta ao comentário 3)
    (
        5,
        'Concordo, @smolnova! Realmente nos faz refletir sobre os rumos da tecnologia.'
    );

INSERT INTO
    video_comment (comment_id, content_id)
VALUES (1, 100), -- Comentário de astrozen no "Guia Completo de PostgreSQL..."
    (2, 105), -- Comentário de moonloop em "Nova Faixa: 'Synthwave Dreams'..."
    (4, 109), -- Comentário de smolnova em "O Futuro da Inteligência Artificial..."
    (5, 127), -- Comentário de dynamodash em "Curso Completo de Python para Iniciantes - Aula 1"
    (6, 133), -- Comentário de rutra em "Física QUEBRADA: Os Momentos Mais Bizarros..."
    (8, 137);
-- Outro comentário (ID 8) no conteúdo 137

INSERT INTO
    shortcomment (comment_id, content_id)
VALUES (3, 143), -- Comentário de frostbyte (ID 3) no short "Gatinho Pixelado Fofo Saltitando!" (ID 143)
    (7, 142);
-- Comentário de kinetixkick (ID 7) no short "PostgreSQL: Otimize Consultas em 58s!" (ID 142)

INSERT INTO
    comment_reply (
        response_comment_id,
        parent_comment_id
    )
VALUES (9, 1), -- Resposta de rutra (comment_id 9) ao comentário de astrozen (comment_id 1)
    (10, 3), -- Resposta de pixeltide (comment_id 10) ao comentário de frostbyte (comment_id 3)
    (11, 4);
-- Resposta de astrozen (comment_id 11) ao comentário de smolnova (comment_id 4)

INSERT INTO
    user_watching_content (
        users_id,
        content_id,
        u_watch_duration_cont,
        u_is_watching_cont_now
    )
VALUES (1, 100, '00:45:10', TRUE),
    (2, 105, '00:04:12', FALSE),
    (4, 113, '00:02:00', FALSE),
    (7, 127, '00:05:00', FALSE),
    (8, 133, '00:10:55', FALSE),
    (16, 100, '01:15:30', FALSE),
    (20, 142, '00:00:58', FALSE),
    (31, 143, '00:00:10', TRUE),
    (1, 127, '00:15:30', FALSE),
    (5, 118, '00:08:15', TRUE),
    (19, 144, '00:00:20', FALSE);

INSERT INTO
    user_interaction (users_id, uint_type)
VALUES (1, 4), -- Usuário 1 deu 'Like' (Supondo que gere ui_id = [ID_INTERACAO_1])
    (1, 4), -- Usuário 1 deu 'Like' (Supondo que gere ui_id = [ID_INTERACAO_1])
    (1, 4), -- Usuário 1 deu 'Like' (Supondo que gere ui_id = [ID_INTERACAO_1])
    (1, 4), -- Usuário 1 deu 'Like' (Supondo que gere ui_id = [ID_INTERACAO_1])
    (1, 4), -- Usuário 1 deu 'Like' (Supondo que gere ui_id = [ID_INTERACAO_1])
    (1, 4), -- Usuário 1 deu 'Like' (Supondo que gere ui_id = [ID_INTERACAO_1])
    (1, 4), -- Usuário 1 deu 'Like' (Supondo que gere ui_id = [ID_INTERACAO_1])
    (1, 4), -- Usuário 1 deu 'Like' (Supondo que gere ui_id = [ID_INTERACAO_1])
    (1, 4), -- Usuário 1 deu 'Like' (Supondo que gere ui_id = [ID_INTERACAO_1])
    (1, 4), -- Usuário 1 deu 'Like' (Supondo que gere ui_id = [ID_INTERACAO_1])
    (1, 4), -- Usuário 1 deu 'Like' (Supondo que gere ui_id = [ID_INTERACAO_1])
    (1, 4), -- Usuário 1 deu 'Like' (Supondo que gere ui_id = [ID_INTERACAO_1])
    (1, 4), -- Usuário 1 deu 'Like' (Supondo que gere ui_id = [ID_INTERACAO_1])
    (1, 4), -- Usuário 1 deu 'Like' (Supondo que gere ui_id = [ID_INTERACAO_1])
    (1, 4), -- Usuário 1 deu 'Like' (Supondo que gere ui_id = [ID_INTERACAO_1])
    (2, 3), -- Usuário 2 'Salvou' algo (Supondo que gere ui_id = [ID_INTERACAO_2])
    (5, 2), -- Usuário 5 deu 'Dislike' (Supondo que gere ui_id = [ID_INTERACAO_3])
    (10, 4), -- Usuário 10 'Denunciou' algo (Supondo que gere ui_id = [ID_INTERACAO_4])
    (16, 2), -- Usuário 16 'Partilhou' algo (Supondo que gere ui_id = [ID_INTERACAO_5])
    (19, 1), -- Usuário 19 deu 'Like' (Supondo que gere ui_id = [ID_INTERACAO_6])
    (20, 4), -- Usuário 20 'Denunciou' algo (Supondo que gere ui_id = [ID_INTERACAO_7])
    (1, 1), -- Usuário 1 deu 'Like' novamente (Supondo que gere ui_id = [ID_INTERACAO_8])
    (7, 3), -- Usuário 7 'Salvou' algo (Supondo que gere ui_id = [ID_INTERACAO_9])
    (31, 2);
-- Usuário 31 deu 'Dislike' (Supondo que gere ui_id = [ID_INTERACAO_10])

INSERT INTO
    user_int_content (ui_cont_id, content_id)
VALUES (1, 100), -- Like do Usuário 1 no Guia PostgreSQL
    (2, 105), -- Usuário 2 salvou Synthwave Dreams
    (3, 143), -- Dislike do Usuário 5 no Short Gato Pixelado
    (4, 133), -- Denúncia do Usuário 10 no vídeo Física Quebrada
    (5, 118), -- Usuário 16 partilhou James Webb Imagens
    (8, 127);
-- Interação no Curso de Python Aula 1

INSERT INTO
    user_int_comment (ui_comment_id, comment_id)
VALUES (6, 1), -- Like do Usuário 19 no comentário de astrozen
    (7, 6), -- Denúncia do Usuário 20 no comentário de rutra
    (9, 2), -- Usuário 7 salvou o comentário de moonloop
    (10, 5);
-- Dislike do Usuário 31 no comentário de dynamodash

INSERT INTO
    playlist (
        play_url,
        play_title,
        play_desc,
        play_status,
        play_thumb,
        channel_id
    )
VALUES (
        'https://downshift.tv/c/rutra/playlist/postgres-do-zero-ao-avancado', -- play_url (Canal Tech Rutra)
        'PostgreSQL do Zero ao Avançado', -- play_title
        'Uma série completa de tutoriais para você dominar o PostgreSQL, desde os conceitos básicos até tópicos avançados de otimização e administração. Perfeito para DEVs!', -- play_desc
        1, -- play_status (Público)
        'https://img.downshift.tv/thumb/playlist/rutra_postgres_series_01.jpg', -- play_thumb
        1 -- channel_id (Tech Rutra)
    ),
    (
        'https://downshift.tv/c/mikunikito/playlist/miku-beats-trilhas-eletronicas', -- play_url (Canal Miku Beats)
        'Miku Beats: Trilhas Sonoras Eletrônicas', -- play_title
        'Todas as minhas faixas originais, remixes e sets de música eletrônica e vocaloid. Perfeito para estudos, trabalho ou simplesmente para curtir uma boa vibe sonora.', -- play_desc
        1, -- play_status (Público)
        'https://img.downshift.tv/thumb/playlist/mikubeats_electronic_soundscapes_01.jpg', -- play_thumb
        2 -- channel_id (Miku Beats)
    ),
    (
        'https://downshift.tv/c/codedream/playlist/projetos-full-stack-na-pratica', -- play_url (Canal Code Dream)
        'Desenvolvimento Full-Stack: Projetos Práticos', -- play_title
        'Aprenda fazendo! Coleção de projetos práticos e completos para você desenvolver suas habilidades em front-end e back-end com diversas tecnologias do mercado.', -- play_desc
        1, -- play_status (Público)
        'https://img.downshift.tv/thumb/playlist/codedream_fullstack_projects_01.jpg', -- play_thumb
        7 -- channel_id (Code Dream)
    ),
    (
        'https://downshift.tv/c/pixeltide/playlist/animacoes-e-curtas-pixel-art', -- play_url (Canal Pixel Tide)
        'Pixel Art Animations & Shorts Collection', -- play_title
        'A collection of all my pixel art short films, character animations, and creative experiments. Step into these tiny, vibrant worlds! Enjoy the pixels.', -- play_desc
        1, -- play_status (Público)
        'https://img.downshift.tv/thumb/playlist/pixeltide_pixel_animations_01.jpg', -- play_thumb
        4 -- channel_id (Pixel Tide)
    ),
    (
        'https://downshift.tv/c/neonwolf/playlist/retro-gaming-nostalgia', -- play_url (Canal Neon Wolf Games)
        'Clássicos Retro e Nostalgia Gamer (WIP)', -- play_title
        'Revisitando os maiores clássicos dos games de consoles antigos e arcades que marcaram época. Uma viagem nostálgica e análises divertidas. (Playlist em construção!)', -- play_desc
        3, -- play_status (Não Listado)
        'https://img.downshift.tv/thumb/playlist/neonwolf_retro_nostalgia_01.jpg', -- play_thumb
        6 -- channel_id (Neon Wolf Games)
    );

INSERT INTO
    playlist_content (
        play_id,
        content_id,
        play_content_order
    )
VALUES
    -- Conteúdos para a Playlist 1: "PostgreSQL do Zero ao Avançado" (play_id = 1)
    (1, 100, 1), -- "Guia Completo de PostgreSQL..."
    (1, 142, 2), -- Short "PostgreSQL: Otimize Consultas em 58s!"
    -- Conteúdos para a Playlist 2: "Miku Beats: Trilhas Sonoras Eletrônicas" (play_id = 2)
    (2, 105, 1), -- "Nova Faixa: 'Synthwave Dreams'..."
    (2, 106, 2), -- "Hatsune Miku - 'Electric Heart'..."
    (2, 107, 3), -- "Criando uma Música Eletrônica do Zero..."
    (2, 108, 4), -- "Miku Beats Live Set..."
    -- Conteúdos para a Playlist 3: "Desenvolvimento Full-Stack: Projetos Práticos" (play_id = 3)
    (3, 128, 1), -- "Desenvolvendo um App de Lista de Tarefas..."
    (3, 129, 2), -- "SQL vs NoSQL..."
    (3, 130, 3), -- "Versionamento de Código com Git..."
    (3, 131, 4), -- "Live Coding: Construindo um Chatbot..."
    -- Conteúdos para a Playlist 4: "Pixel Art Animations & Shorts Collection" (play_id = 4)
    (4, 113, 1), -- "A Lenda do Cavaleiro Pixelado..."
    (4, 143, 2), -- Short "Gatinho Pixelado Fofo Saltitando!"
    (4, 117, 3), -- "Pixel Tide Art Showcase - Best of 2024..."
    (4, 116, 4), -- "Pixel Art Tutorial: Animando um Personagem Andando..."
    -- Conteúdos para a Playlist 5: "Clássicos Retro e Nostalgia Gamer (WIP)" (play_id = 5)
    (5, 123, 1), -- "A Evolução dos Arcades..."
    (5, 122, 2);
-- "Top 10 Jogos com Estética Neon..."

INSERT INTO
    playlist_tag (play_tag, play_id)
VALUES
    -- Tags para a Playlist 1: "PostgreSQL do Zero ao Avançado" (play_id = 1)
    (1, 1), -- Tag: Tutorial
    (8, 1), -- Tag: Educação
    (9, 1), -- Tag: Tecnologia
    -- Tags para a Playlist 2: "Miku Beats: Trilhas Sonoras Eletrônicas" (play_id = 2)
    (11, 2), -- Tag: Música
    -- ( [tag_id_Eletronica], 2), -- Sugestão: Adicionar tag 'Música Eletrônica' se existir
    -- ( [tag_id_Vocaloid], 2), -- Sugestão: Adicionar tag 'Vocaloid' se existir
    -- Tags para a Playlist 3: "Desenvolvimento Full-Stack: Projetos Práticos" (play_id = 3)
    (8, 3), -- Tag: Educação
    (31, 3), -- Tag: Programação Web
    (1, 3), -- Tag: Tutorial
    -- Tags para a Playlist 4: "Pixel Art Animations & Shorts Collection" (play_id = 4)
    (24, 4), -- Tag: Animação
    -- ( [tag_id_PixelArt], 4), -- Sugestão: Adicionar tag 'Pixel Art' se existir
    -- Tags para a Playlist 5: "Clássicos Retro e Nostalgia Gamer (WIP)" (play_id = 5)
    (29, 5), -- Tag: Games Retro
    (3, 5);
-- Tag: Gameplay

INSERT INTO
    user_interaction (users_id, uint_type)
VALUES (1, 3), -- Usuário 1 'Salvou' uma playlist (Supondo que gere ui_id = 11)
    (5, 3), -- Usuário 5 'Salvou' uma playlist (Supondo que gere ui_id = 12)
    (10, 5), -- Usuário 10 'Partilhou' uma playlist (Supondo que gere ui_id = 13)
    (16, 3), -- Usuário 16 'Salvou' uma playlist (Supondo que gere ui_id = 14)
    (20, 3), -- Usuário 20 'Salvou' uma playlist (Supondo que gere ui_id = 15)
    (1, 3);
-- Usuário 1 'Salvou' outra playlist (Supondo que gere ui_id = 16)

INSERT INTO
    user_int_playlist (ui_play_id, play_id)
VALUES (11, 3), -- Usuário 1 (via ui_id 11) salvou a Playlist "Desenvolvimento Full-Stack" (play_id 3)
    (12, 1), -- Usuário 5 (via ui_id 12) salvou a Playlist "PostgreSQL do Zero ao Avançado" (play_id 1)
    (13, 2), -- Usuário 10 (via ui_id 13) partilhou a Playlist "Miku Beats: Trilhas Sonoras Eletrônicas" (play_id 2)
    (14, 4), -- Usuário 16 (via ui_id 14) salvou a Playlist "Pixel Art Animations & Shorts Collection" (play_id 4)
    (15, 5), -- Usuário 20 (via ui_id 15) salvou a Playlist "Clássicos Retro e Nostalgia Gamer (WIP)" (play_id 5)
    (16, 2);
-- Usuário 1 (via ui_id 16) salvou a Playlist "Miku Beats: Trilhas Sonoras Eletrônicas" (play_id 2)

INSERT INTO
    poll (channel_id, poll_title)
VALUES (
        1, -- channel_id (Tech Rutra)
        'Qual próximo tutorial de banco de dados vocês gostariam de ver no canal Tech Rutra?' -- poll_title
        -- Supondo que este gere poll_id = 1
    ),
    (
        6, -- channel_id (Neon Wolf Games)
        'Qual gênero de jogo retrô vocês mais sentem falta ou gostariam de ver mais gameplays?' -- poll_title
        -- Supondo que este gere poll_id = 2
    );

INSERT INTO
    poll_option (poll_id, option_text)
VALUES
    -- Opções para a Enquete 1 (Qual tutorial de BD?) - Supondo poll_id = 1
    (
        1,
        'MySQL Avançado e Otimização'
    ), -- Supondo option_id = 1
    (
        1,
        'MongoDB para Iniciantes: Modelagem e Casos de Uso'
    ), -- Supondo option_id = 2
    (
        1,
        'SQLite integrado com Python para Projetos Pequenos'
    ), -- Supondo option_id = 3
    (
        1,
        'Elasticsearch: Buscas Complexas na Prática'
    ), -- Supondo option_id = 4
    -- Opções para a Enquete 2 (Qual gênero retrô?) - Supondo poll_id = 2
    (
        2,
        'RPGs Clássicos (Ex: Chrono Trigger, Final Fantasy VI)'
    ), -- Supondo option_id = 5
    (
        2,
        'Jogos de Luta 2D (Ex: Street Fighter Alpha, KOF)'
    ), -- Supondo option_id = 6
    (
        2,
        'Plataforma Clássicos (Ex: Mega Man X, Donkey Kong Country)'
    ), -- Supondo option_id = 7
    (
        2,
        'Shoot ''em ups / Jogos de Nave desafiadores'
    );
-- Supondo option_id = 8

INSERT INTO
    poll_response (users_id, option_id)
VALUES
    -- Respostas para a Enquete 1
    (5, 2), -- Usuário 5 votou na opção "MongoDB para Iniciantes" (option_id 2)
    (10, 1), -- Usuário 10 votou na opção "MySQL Avançado" (option_id 1)
    (16, 4), -- Usuário 16 votou na opção "Elasticsearch na Prática" (option_id 4)
    (7, 2), -- Usuário 7 votou na opção "MongoDB para Iniciantes" (option_id 2)
    -- Respostas para a Enquete 2
    (2, 5), -- Usuário 2 votou na opção "RPGs Clássicos" (option_id 5)
    (8, 7), -- Usuário 8 votou na opção "Plataforma Clássicos" (option_id 7)
    (19, 6), -- Usuário 19 votou na opção "Jogos de Luta 2D" (option_id 6)
    (6, 5);
-- Usuário 6 (Neon Wolf, dono da enquete) votou em "RPGs Clássicos" (option_id 5)

INSERT INTO
    comment (users_id, com_body)
VALUES (
        7, -- users_id (Code Dream)
        'Ótima enquete do Tech Rutra! Eu adoraria ver MongoDB para iniciantes, seria muito útil.'
        -- Supondo que gere comment_id = 12
    ),
    (
        1, -- users_id (Tech Rutra, dono da enquete)
        'Obrigado pelas sugestões e votos na enquete sobre BDs, pessoal! A opinião de vocês é fundamental.'
        -- Supondo que gere comment_id = 13
    ),
    (
        3, -- users_id (gugugpt)
        'Definitivamente RPGs Clássicos para a enquete do Neon Wolf! Trazem muita nostalgia e têm histórias incríveis.'
        -- Supondo que gere comment_id = 14
    );

INSERT INTO
    poll_comment (comment_id, poll_id)
VALUES (12, 1), -- Comentário de Code Dream (comment_id 12) na Enquete de BDs (poll_id 1)
    (13, 1), -- Comentário de Tech Rutra (comment_id 13) na Enquete de BDs (poll_id 1)
    (14, 2);
-- Comentário de gugugpt (comment_id 14) na Enquete de Jogos Retrô (poll_id 2)

INSERT INTO
    notification (channel_id, notification_body)
VALUES (
        1, -- channel_id (Tech Rutra)
        '📢 Novo vídeo no Tech Rutra! "Guia Completo de PostgreSQL para Iniciantes (2025)" já disponível. Não perca! Link: https://downshift.tv/v/rutra-postgres-guia-2025'
        -- Supondo que este gere notification_id = 1
    ),
    (
        2, -- channel_id (Miku Beats)
        '🎶 Nova Faixa de Miku Beats! 🎶 ''Synthwave Dreams'' acaba de ser lançada com clipe oficial. Venha curtir essa vibe contagiante! Link: https://downshift.tv/v/miku-beats-synthwave-dreams'
        -- Supondo que este gere notification_id = 2
    ),
    (
        7, -- channel_id (Code Dream)
        '🚀 Curso Novo no Code Dream! Aula 1 de "Python para Iniciantes - Configurando o Ambiente" já no ar. Ideal para quem quer dar o primeiro passo na programação! Veja agora: https://downshift.tv/v/codedream-python-aula1-configurando-ambiente'
        -- Supondo que este gere notification_id = 3
    );

INSERT INTO
    user_notified (users_id, notification_id)
VALUES
    -- Usuários que receberam a Notificação 1 (do Canal Tech Rutra)
    (11, 1), -- Usuário cyberchai (users_id 11)
    (4, 1), -- Usuário pixeltide (users_id 4) - supondo interesse
    (20, 1), -- Usuário zestbot (users_id 20) - supondo interesse
    -- Usuários que receberam a Notificação 2 (do Canal Miku Beats)
    (1, 2), -- Usuário rutra (users_id 1)
    (16, 2), -- Usuário ramenspace (users_id 16) - (corrigido de frostbyte para ramenspace se frostbyte é 19) -> usando ID 16 (ramenspace)
    (5, 2), -- Usuário astrozen (users_id 5)
    -- Usuários que receberam a Notificação 3 (do Canal Code Dream)
    (4, 3), -- Usuário pixeltide (users_id 4)
    (15, 3), -- Usuário cloudglyph (users_id 15)
    (33, 3);

INSERT INTO
    user_interaction (users_id, uint_type)
VALUES (20, 4), -- Usuário 20 denuncia algo (Supondo que gere ui_id = 17)
    (21, 4), -- Usuário 21 denuncia algo (Supondo que gere ui_id = 18)
    (22, 4), -- Usuário 22 denuncia algo (Supondo que gere ui_id = 19)
    (23, 4), -- Usuário 23 denuncia algo (Supondo que gere ui_id = 20)
    (24, 4), -- Usuário 24 denuncia algo (Supondo que gere ui_id = 21)
    (25, 4), -- Usuário 25 denuncia algo (Supondo que gere ui_id = 22)
    (26, 4);
-- Usuário 26 denuncia algo (Supondo que gere ui_id = 23)

INSERT INTO
    user_int_content (ui_cont_id, content_id)
VALUES (17, 115), -- Denúncia do Usuário 20 (via ui_id 17) no vídeo "Física QUEBRADA..." (content_id 115) do Canal 8
    (18, 115), -- Denúncia do Usuário 21 (via ui_id 18) no MESMO vídeo "Física QUEBRADA..." (content_id 115) do Canal 8
    (19, 118), -- Denúncia do Usuário 22 (via ui_id 19) no vídeo "When Game Devs FORGET To Test..." (content_id 118) do Canal 8
    (20, 116), -- Denúncia do Usuário 23 (via ui_id 20) no vídeo "Speedrun Any% de Jogo Clássico..." (content_id 116)
    (21, 117), -- Denúncia do Usuário 24 (via ui_id 21) no vídeo "Os NPCs Mais SEM NOÇÃO dos Games..." (content_id 117)
    (22, 118), -- Denúncia do Usuário 25 (via ui_id 22) no vídeo "When Game Devs FORGET To Test..." (content_id 118)
    (23, 115);
-- Denúncia do Usuário 26 (via ui_id 23) no vídeo "Física QUEBRADA..." (content_id 115) - outra denúncia para este vídeo

INSERT INTO
    user_int_content (ui_cont_id, content_id)
VALUES (24, 115), -- Denúncia do Usuário 27 (via ui_id 24) no vídeo "Física QUEBRADA..." (content_id 115)
    (25, 116), -- Denúncia do Usuário 28 (via ui_id 25) no vídeo "Speedrun Any% de Jogo Clássico..." (content_id 116)
    (26, 117), -- Denúncia do Usuário 29 (via ui_id 26) no vídeo "Os NPCs Mais SEM NOÇÃO dos Games..." (content_id 117)
    (27, 118), -- Denúncia do Usuário 30 (via ui_id 27) no vídeo "When Game Devs FORGET To Test..." (content_id 118)
    (28, 115);
-- Denúncia do Usuário 31 (via ui_id 28) novamente no vídeo "Física QUEBRADA..." (content_id 115)