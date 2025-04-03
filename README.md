# MINIMUNDO - MODELO YOUTUBE
#### Integrantes do grupo:
* Artur Vidal Krause
* Bruno Luís Zerbinatto Rosa
* Gustavo de Oliveira da Silva

## LISTA DE REQUISITOS

### Entidades e atributos

#### USER
Entidade que representa todo usuário do site.
Atributos:
* <u>UserID</u>: Identificador único do usuário;
* (UserLogin): Informações de login do usuário. Composto em:
  - <u>UserEmail</u>: Email do usuário;
  - UserPassword: Senha do usuário.
* UserName: Nome de usuário;
* UserPhoto: Foto de perfil do usuário.
* <span class="derived">USERHistory (O)</span>: Histórico do usuário, obtido a partir das interações de assistir. (atributo derivado e opcional, e não é armazenado)

#### CHANNEL
Entidade que representa um canal, ou seja, produtor de conteído do site.
Atributos:
* <u>ChannelID</u>: Identificador único do canal;
* <u>ChannelURL</u>: Identificador único do link para o canal;
* ||CHExtLink (O)||: Links externos do canal (por exemplo, redes sociais). (multivalorado e opcional).
* CHName: Nome do canal;
* CHDesc: Descrição do canal;
* CHCreationDate: Data de criação do canal;
* CHWelcomeVID (O): Vídeo de apresentação do canal. (opcional);
* CHBanner: Plano de fundo do canal;
* <span class="derived">CHSubCount</span>: Número de inscritos no canal. (atributo derivado e não é armazenado).

#### NOTIFICATION
Entidade que representa uma notificação, um elemento do site.
Atributos:
* <u>NotificatonID</u>: Identificador único da notificação;
* NOTBody: Corpo da Notificação (conteúdo);

#### USERINTERACTION
Supertipo que representa uma interação do usuário com outro elemento do site.
Atributos comuns a todas as subclasses:
* <u>UINTID</u>: Identificador único da interação;
* UINTType: Tipo de interação (like, dislike, salvar como favorito).
##### Subclasses disjuntas:
###### UCONTINT
Entidade que representa uma interação entre um usuário e um conteúdo. (like, dislike, salvar como favorito)
###### UCOMTINT
Entidade que representa uma interação entre um usuário e um comentário. (like, dislike)
###### UPLAYINT
Entidade que representa uma interação entre um usuário e uma playlist. (like, dislike, salvar como favorito)

#### CONTENT
Superclasse que representa todo tipo de conteúdo do site.
Atributos comuns a todas as subclasses:
* <u>ContentID</u>: Identificador único do conteúdo;
* <u>ContentURL</u>: Identificador único do link para acessor o conteúdo;
* CONTTitle: Título do conteúdo;
* CONTDesc: Descrição do conteúdo;
* CONTThumb: Imagem de capa do conteúdo;
* ||CONTTag||: Tag do conteúdo (multivalorado);
* CONTCategory: Categoria do conteúdo (música/infantil/comédia/etc.);
* CONTIndRating: Classificação indicativa do conteúdo;
* CONTLanguage: Idioma do conteúdo;
* ||(CONTCaption (O))||: Legenda do conteúdo (opcional, multivalorado e composto). Composto em:
  - CONTCaptionLanguage: Idioma da legenda.
* CONTStatus: Status do conteúdo (público/privado/não listado);
* CONTPubDateTime: Data e hora de publicação do conteúdo;
* <span class="derived">CONTLikeCount</span>: Número de likes que um conteúdo recebeu. (atributo derivado e não é armazenado);
* <span class="derived">CONTDislikeCount</span>: Número de dislikes que um conteúdo recebeu. (atributo derivado e não é armazenado);
* <span class="derived">CONTViewCount</span>: Número de views que um conteúdo recebeu. (atributo derivado e não é armazenado).

##### Subclasses disjuntas:
###### LIVE
Entidade que representa uma transmissão ao vivo no site.
Atributos:
* LIVEBody: Live em si, ou seja, o vídeo que é transmitido.
* <span class="derived">LiveNofViewers</span>: Atributo derivado da interação de assistir entre um usuário e um conteúdo. (atributo derivado e não é armazenado).
###### VIDEO
Entidade que representa um vídeo do site.
Atributos:
* VIDEOBody: Vídeo em si, ou seja, o vídeo que é armazenado.
###### SHORT
Entidade que representa um vídeo curto ou corte de vídeo do site.
Atributos:
* SHORTBody: Short em si, ou seja, o vídeo que é armazenado.
* SHMusicLink (O): Atributo opcional que é um link para o vídeo da música que está sendo tocada de fundo no vídeo curto.

#### POLL
Entidade que representa uma enquete promovida por um canal.
Atributos:
* <u>POLLID</u>: Identificador único da enquete;
* <u>POLLURL</u>: Identificador único do link para acessar a enquete;
* POLLBody: Conteúdo da enquete (ou seja, o texto e a enquete em si).
* POLLPubDateTime: Data e hora de publicação da enquete;
* <span class="derived">POLLLikeCount</span>: Número de likes que uma enquete recebeu. (atributo derivado e não é armazenado);
* <span class="derived">POLLDislikeCount</span>: Número de dislikes que uma enquete recebeu. (atributo derivado e não é armazenado);
* <span class="derived">POLLViewCount</span>: Número de views que uma enquete recebeu. (atributo derivado e não é armazenado).

#### PLAYLIST
Entidade que representa uma playlist, ou seja, agrupamento de conteúdo feito por um canal.
Atributos:
* <u>PlayID</u>: Identificador único da playlist;
* <u>PlayURL</u>: Identificador único do link para acessar a playlist;
* PLAYTitle: Título da playlist;
* PLAYDesc: Descrição da playlist;
* PLAYThumb: Imagem de capa da playlist;
* PLAYStatus: Status da playlist (pública/privada/não listada);
* ||PLAYTag||: Tag da plylist (multivalorado);
* <span class="derived">PLAYLikeCount</span>: Número de likes que uma playlist recebeu. (atributo derivado e não é armazenado);
* <span class="derived">PLAYDislikeCount</span>: Número de dislikes que uma playlist recebeu. (atributo derivado e não é armazenado);

#### COMMENT
Superclasse que representa um comentário feito por um usuário em um conteúdo (CONTENT) ou uma enquete (POLL).
Atributos:
* <u>CommentID</u>: Identificador único do comentário;
* COMDateTime: Data e hora que o comentário foi feito;
* COMisEdited: Boleano se o comentário já foi editado;
* COMBody: String contendo o texto do comentário;
* <span class="derived">COMLikeCount</span>: Número de likes que um comentário recebeu. (atributo derivado e não é armazenado);
* <span class="derived">COMDislikeCount</span>: Número de dislikes que um comentário recebeu. (atributo derivado e não é armazenado);
* <span class="derived">COMViewCount</span>: Número de views que um comentário recebeu. (atributo derivado e não é armazenado).
##### Subclasses disjuntas:
###### LIVECOMMENT
Entidade (LIVE) que representa um comentário em uma transmissão ao vivo no site.
###### SHORTCOMMENT
Entidade que representa um comentário em um vídeo curto (SHORT).
###### VIDEOCOMMENT
Entidade que representa um comentário em um vídeo (VIDEO).
###### POLLCOMMENT
Entidade que representa um comentário em uma enquete (POLL).

### Relacionamentos
Observação: a notação será (A min1,max1:min2,max2 B) em um relacionamento, se de A para B é (min2,max2) e de B para A é (min1,max1).
#### Entre USER e CHANNEL: 
* **UOwnsCH**: representa a posse do usuário sobre o canal. Um usuário pode ter no máximo um canal, e todo canal pertence a exatamente um usuário:
**(USER 1,1:O,1 CHANNEL)**.
* **UADMINCH**: entidade associativa que representa o relacionamento de adminstração de um usuário sobre um canal. Um usuário pode administrar quantos canais quiser, e um canal pode ser administrado por nenhum ou vários usuários:
**(USER O,M:O,N CHANNEL)**.
* **UINTERESTCH**: entidade associativa que representa o relacionamento de manifestação de interesse de um usuário sobre um canal. Um usuário pode ser interessado em quantos canais quiser, e um canal pode ter qualquer número de usuários interessados: 
**(USER O,M:O,N CHANNEL)**. 
Além disso, são armazenadas os seguintes atributos desse relacionamento:
  - UisSubToCH: Boleano se o usuário é inscrito no canal;
  - UMemberLevelCH: Representa o nível de membro do usuário no canal;
  - UisNotifiedByCH: Boleano se o usuário é notificado pelo canal;


#### Entre USER e USERINTERACTION
* **UMakesINT**: representa o ato de um usuário fazer uma interação com outro elemento do site. Um usuário pode ou não fazer várias interações. Uma interação sempre é feita por exatamente um usuário:
**(USER 1,1:O,M USERINTERACTION)**.

#### Entre UCONTINT e CONTENT
* **USERIntsWithCONT**: representa o vínculo de uma interação com conteúdo feita pelo usuário com o conteúdo em si. Uma interação é de exatamente um conteúdo. Um conteúdo pode ser interagido por várias interações:
**(UCONTINT O,M:1,1 CONTENT)**.

#### Entre USER e CONTENT
* **UWATCHINGCONT**: entidade associativa que representa o ato de um usuário assistir a um conteúdo. Um usuário pode assistir ou não a vários conteúdos. Um conteúdo pode ser assistido ou não por vários usuários:
**(USER O,M:O,N CONTENT)**.
Além disso, são armazenadas os seguintes atributos desse relacionamento:
  - UWATCHCONTID: ID único da interação de assistir;
  - UisWatchingCONTNow: Boleano se a interação ainda está ocorrendo ou não;
  - UWatchDurationCONT: tempo pelo qual o usuário assitiu ou há quanto tempo o usuário está assistindo o vídeo;
  - UWatchCONTDateTime: data e hora que o usuário começou a interação de assistir o vídeo.

#### Entre UPLAYINT e PLAYLSIT
* **UintsWithPL**: representa o vínculo de uma interação com playlist feita pelo usuário com a playlist em si. Uma interação é de exatamente uma playlist. Uma playlist pode ser interagida por várias interações:
**(UPLAYINT O,M:1,1 PLAYLIST)**.

#### Entre USER e COMMENT
* **USERComments**: representa o ato de um usuário fazer um comentário. Um usuário pode ou não fazer vários comentários. Um comentário é feito por exatamente um usuário:
**(USER 1,1:O,M COMMENT)**.

#### Entre USER e NOTIFICATION
* **USERNOTIFIED**: entidade associativa que representa o ato de um usuário receber uma notificação. Um usuário pode ou não receber várias notificações. Uma notificação pode ou não ser enviada para vários usuários.
**(USER O,M:O,N NOTIFICATION)**
Além disso, são armazenadas o seguinte atributo desse relacionamento:
  - NOTSentDateTime: Data e hora de envio da notificação.

#### Entre UCOMINT e COMMENT
* **UintsWithCOM**: representa o vínculo de uma interação com comentário feita pelo usuário com o comentário em si. Uma interação é de exatamente um comentário. Um comentário pode ser interagido por várias interações:
**(UCOMINT O,M:1,1 COMMENT)**.

#### Entre CHANNEL e CONTENT
* **CONTisProdByCH**: representa a produção de um conteúdo por um canal. Um canal pode ou não produzir quantos conteúdos quiser. Um conteúdo é produzido por exatamente um canal:
**(CHANNEL 1,1:O,M CONTENT)**.

#### Entre CHANNEL e POLL
* **CHDoesPOLL**: representa a promoção de uma enquete por um canal. Um canal pode ou não promover quantas enquetes quiser. Uma enquete é promovida por exatamente um canal:
**(CHANNEL 1,1:O,M POLL)**.

#### Entre CHANNEL e PLAYLIST
* **CHHasPL**: representa o pertencimento de uma playlist a um canal. Um canal pode ou não ter quantas playlists quiser. Uma playlist pertence a exatamente um canal:
**(CHANNEL 1,1:O,M PLAYLIST)**.

#### Entre CHANNEL e NOTIFICATION
* **CHCreatesNOT**: representa a criação de uma notificação por parte de um canal. Um canal pode ou não criar várias notificações. Uma notificação é criada por exatamente um canal.
**(CHANNEL O,M:O,N NOTIFICATION)**.
Além disso, são armazenadas o seguinte atributo desse relacionamento:
  - NOTCreatedDateTime: Data e hora da criação da notificação.

#### Entre PLAYLIST e CONTENT
* **PLAYLISTCONTENT**: entidade associativa que representa o pertencimento de um conteúdo a uma playlist. Uma playlist tem um ou mais conteúdos. Um conteúdo pode ou não estar em várias playlists:
**(PLAYLIST O,M:1,N CONTENT)**.
Além disso, é armazenado o seguinte atributo desse relacionamento:
  - CONTAddDateTimePL: data e horário em que o conteúdo foi adicionado à playlist.

#### Entre SHORT e VIDEO
* **SHisCutOfVID**: representa o relacionamento de um short ser um corte de um vídeo. Um short pode ou não ser um corte de um único vídeo. Um vídeo pode ou não ter vários cortes:
**(SHORT O,M:O,1 VIDEO)**.

#### Entre o próprio COMMENT
* **COMMENTREPLY**: entidade associativa que representa o ato de um comentário responder a outro comentário. Um comentário pode responder ou não a um único comentário. Um comentário pode ou não ser respondido por vários comentários:
**(COMMENT O,M:O,1 COMMENT)**.

#### Entre LIVECOMMENT e LIVE
* **LCOMisInLIVE**: representa o pertencimento de um comentário ao vivo a uma live. Um comentário ao vivo está sempre em exatamente uma live. Uma live pode ou não possuir vários comentários ao vivo:
**(LIVECOMMENT O,M:1,1 LIVE)**.

#### Entre SHORTCOMMENT e SHORT
* **SCOMisInSH**: representa o pertencimento de um comentário de short a um vídeo curto. Um comentário de short está sempre em exatamente um vídeo curto. Um vídeo curto pode ou não ter vários comentários estáticos:
**(STATICCOMMENT O,M:1,1 SHORT)**.

#### Entre VIDEOCOMMENT e VIDEO
* **VCOMisInVID**: representa o pertencimento de um comentário de vídeo a um vídeo. Um comentário de vídeo está sempre em exatamente um vídeo. Um vídeo pode ou não ter vários comentários de vídeo:
**(VIDEOCOMMENT O,M:1,1 VIDEO)**.

#### Entre POLLCOMMENT e POLL
* **PCOMisInPOLL**: representa o pertencimento de um comentário de enquete a uma enquete. Um comentário de enquete está sempre em exatamente uma enquete. Uma enquete pode ou não ter vários comentários de enquete:
**(POLLCOMMENT O,M:1,1 POLL)**.


<style>
    .derived {
        text-decoration: underline dashed;
    }
</style>
