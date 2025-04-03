# Requisitos banco de dados youtube

## User
* Para cada usuário temos: *email* e *id* unicos, uma senha privada, um nome completo e uma foto de perfil;
* Cada usuario pode ser dono de um unico canal;
* Cada usuario pode ser administrador de quantos canais lhe forem ofertados;
* Cada usuario tem um historico com todo o conteudo visualizado de outros canais;
* Cada usuario pode receber muitas notificaçoes de um determinado canal, se estiver com sininho do mesmo ativo;
* Cada usuario pode ser membro de quantos canais entender;

## userNotification
* Para cada notificaçao ao usuario temos: *id* unico, a data em que a notificaçao foi enviada, e o status da notificaçao (se ela ja foi visualizada ou não);
* Uma notificaçao so pode ser enviada para um usuario por um video, short, live, playlist ou enquete de um canal ao qual o usuario ativou o sininho das notificaçoes;

## userHistory
* O historico contem todos os videos, shorts e lives em que o usuario ja visuazou, contendo a data da visualizaçao e o tempo em que ele parou no conteudo;
* O historico e referente a um unico usuario;

## Channel
* Cada canal deve ter um usuario como dono, mas pode ser administrado por quantos outros usuarios entender;
* Cada canal deve conter um id e um identificador publico (sera utilizado na url para identificar o canal) ambos unicos, uma descrição, a data em que foi criado, n° de incritos, n° de views que o canal teve(soma das views de todo o conteudo);
* A imagem principal do canal deve ser a mesma imagem utilizada pelo usuario em seu perfil;
* O canal pode ou não conter a area de membros, se estiver abilitada deve conter o n° de membros ativos e o nivel de cada;
* O canal pode conter uma marca d'água, um banner, links externos(outras redes sociais), video de boas vindas (APARECE NA HOME);
* Um canal pode conter quantos videos, lives, shorts e enquetes desejar;
* O canal pode ser monetizado ou não;

> Videos, shorts, lives e enquetes de um canal devem apresentar um status de visibilidade

## Video
* Cada video deve pertencer unicamente a um canal;
* Cada video deve conter um id e uma url unica, um titulo, uma descrição, a data em que foi lançada, o tempo total do video, uma thumbnail, a classificação indicativa, uma categoria e o indioma do video;
* Cada video pode conter tags de identificação;
* O video pode conter comentarios e legenda;
* Um video pode estar associado a varias playlists;
* Um video pode ser visualizado pelos usuarios, se o mesmo estiver publico;

## Short
* O short deve pertencer a um canal;
* O short deve conter id e url unicos, um titulo, uma descrição, data de publicação, a duração do short, uma thumbnail, uma categoria e o idioma;
* O short pode conter uma legenda, varias tags de identificação, varios comentarios, link para o video completo ou para o outro short, n° de likes e deslikes;
* Se o short possuir uma musica ele deve conter uma referencia para a musica utilizada(afim de evitar copy rate);
* Um short pode pertencer a varias playlists;
* Um short pode ser visualizado por todos os usuarios, se o mesmo estiver publico;

## Live
* A live deve pertencer a um canal;
* A live deve conter ID e uma url unica, um titulo, idioma, uma descrição duração atual da live, data de inicio da live, n° de views, n° de usuarios atualmente assistindo, uma thumbnail, o status atual da live, e sua categoria; 
* A live pode conter tags de identificação, varios liveComentarios, legenda, n° de likes e deslikes;
* A live pode ser vista por todos os usuarios(se o status atual permitir);
* Os comentarios das lives devem ter sido escritos por um usuario(pode ser adminstrando outro canal), não podem receber likes e deslikes, alem de não poderem receber outros comentarios;

## Poll
* Cada enquete deve pertencer unicamente a um canal;
* A enquete deve conter id unica, data de publicação, n° de likes e deslikes, pode receber comentarios, n° de views

## Comentario
* Deve pertencer a um video, live, short ou enquete;
* Deve ter sido publicado por um usuario(pode ser adminstrando outro canal);
* Deve conter um Id unico, n° de likes e deslikes, a data em que foi comentado;
* Um comentario pode ser editado apos um tempo, este estado deve estar visivel para outros usuarios;
* Um comentario pode receber outros comentarios;

## Caption
* A legenda deve pertencer a um video ou short.
* A legenda deve conter um Id unico e todos os idiomas;

## Playlist
* Uma playlist deve ter sido criado e pertencer a um canal;
* A playlist deve conter Id e url unico, um titulo, uma thumbnail, uma descrição, ao menos um video, n° de videos na playlist, o status da playlist(private/public/nonlisted) e o n° de views;
* A playlist pode conter varias tags;
