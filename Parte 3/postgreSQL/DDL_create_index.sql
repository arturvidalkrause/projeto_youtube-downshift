-- =====================================
-- == ARQUIVO DE CRIAÇÃO DOS ÍNDICES  ==
-- ==        DOWSHIFT v1.0.1          ==
-- =====================================

--> por brunikito + artur

----------------
-- DEFINIÇÕES --
----------------
SET search_path TO downshift;

-------------
-- ÍNDICES --
-------------
-- Índice para otimizar número de inscritos
CREATE INDEX idx_channel_subscribers ON downshift.user_interest_channel_T (channel_nanoid)
WHERE
    _is_sub = TRUE;

-- Índices para acelerar a contagem de interações
CREATE INDEX idx_uic_content_interaction ON user_interaction_content_T (
    content_nanoid,
    interaction_uid
);

CREATE INDEX idx_uip_playlist_interaction ON user_interaction_playlist_T (
    playlist_nanoid,
    interaction_uid
);

CREATE INDEX idx_uip_comment_interaction ON user_interaction_comment_T (
    comment_nanoid,
    interaction_uid
);

-- Índice para o firebaseid
CREATE INDEX idx_user_t_firebaseid 
ON user_T (firebaseid);