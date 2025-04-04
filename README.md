# MIMI - Mídia Interativa Multiplataforma Interconectada


<div align="center">
	<p>
<pre>
M     M   III   M     M   III 
MM   MM    I    MM   MM    I  
M M M M    I    M M M M    I  
M  M  M    I    M  M  M    I  
M     M   III   M     M   III 
</pre>
	</p>
</div>

Projeto de modelagem de banco de dados inspirado no YouTube, com foco em uma plataforma de vídeos chamada **MIMI**. A ideia foi construir uma estrutura sólida para um sistema de gerenciamento de usuários, canais, conteúdos multimídia e interações sociais.


## Integrantes (Grupo 12)

- [Artur Vidal Krause](https://github.com/arturvidalkrause)  
- [Bruno Luís Zerbinatto Rosa](https://github.com/Brunikito) 
- [Gustavo de Oliveira da Silva](https://github.com/GuOliv2306) 


## Estrutura do Projeto

Modelagem ER Youtube/  
├── Parte 1/  
│   ├── **Requisitos banco de dados youtube.md**: Lista dos requisitos do banco de dados.  
│   ├── **Imagem do modelo ER (image_ER.png)**: Imagem do modelo ER inicial.  
│   ├── **Modelagem ER Youtube.docx**: Documento detalhado sobre a modelagem ER.  
│   ├── **Modelagem ER.markdown**: Versão em Markdown da modelagem ER.  
│   └── **Youtube_01.erdplus**: Arquivo ERDPlus com a modelagem do banco de dados.  
|
├── Parte 2/  
│   ├── **Apresentação.pdf**: Apresentação do projeto (PDF).  
│   ├── **Apresentação.pptx**: Apresentação do projeto (PowerPoint).  
│   ├── **BD_Example_Data.xlsx**: Planilha com dados fictícios.  
│   ├── **gerateTable.ipynb**: Script Jupyter para gerar dados de exemplo.  
│   ├── **image_ER.png**: Imagem do modelo ER revisado.  
│   ├── **image_Relational.png**: Imagem do modelo relacional.  
│   ├── **MIMI_ER.erdplus**: Arquivo ERDPlus com o modelo ER revisado.  
│   ├── **MIMI_Relational.erdplus**: Arquivo ERDPlus com o modelo relacional.  
│   └── **Requisitos.md**: Lista reestruturada dos requisitos do banco de dados.  


## Funcionalidades Modeladas

- Gerenciamento de **usuários** e **canais**
- **Conteúdos** diversos: vídeos, lives, shorts, enquetes
- **Notificações** e preferências do usuário
- **Playlists**, **tags** e **interações** (curtir, comentar, etc.)
- Comentários com possibilidade de **respostas**
- **Normalização** até a **3ª Forma Normal**


## Principais Entidades

- `USER`, `CHANNEL`, `CONTENT`, `NOTIFICATION`
- `LIVE`, `VIDEO`, `SHORT`, `POLL`
- `COMMENT`, `COMMENTREPLY`, `USERINTERACTION`
- `PLAYLIST`, `PLAYLISTCONTENT`, `CONT_TAG`


## Principais Relacionamentos

- **Usuário - Canal**: Um **usuário** pode ter **múltiplos canais** e ser **membro de múltiplos canais**. Além disso, o usuário pode ser **administrador de vários canais**.
- **Usuário - Conteúdo**: Um **usuário** pode visualizar **múltiplos conteúdos** (vídeos, shorts, lives), e cada **conteúdo** pode ser visualizado por **vários usuários**.
- **Canal - Conteúdo**: Um **canal** pode publicar **vários tipos de conteúdos** (vídeos, shorts, enquetes, etc.), e cada **conteúdo** é associado a **um único canal**.
- **Usuário - Notificação**: Um **usuário** pode receber **várias notificações**, que estão associadas a **conteúdos específicos** de **um canal** ao qual o usuário tenha ativado o sininho de notificações.
- **Usuário - Comentário**: Um **usuário** pode deixar **comentários** em **conteúdos**, e cada **comentário** pode ser respondido por outros **usuários** (relacionamento com **COMMENTREPLY**).
- **Conteúdo - Playlists**: Um **conteúdo** pode estar associado a **várias playlists**, e uma **playlist** pode conter **vários conteúdos**.
- **Conteúdo - Tag**: **Conteúdos** podem ter **várias tags** associadas, enquanto cada **tag** pode ser vinculada a **múltiplos conteúdos**.

## Exemplos de Dados

A planilha **BD_Example_Data.xlsx** contém dados fictícios para testar e demonstrar o funcionamento do banco de dados. Os dados de exemplo são fictícios e incluem:

- Usuários com nome, email, foto
- Canais com descrições, banners, vídeo de boas-vindas
- Conteúdos com título, descrição, data, status, classificação indicativa
- Comentários e respostas
- Playlists e suas relações com os vídeos
- Interações dos usuários (likes, dislikes, saves)


## Dificuldades Encontradas

Durante a execução do projeto, algumas dificuldades foram enfrentadas, incluindo:

- Alta complexidade de relacionamento entre as **entidades**.
- Limitações da ferramenta **ERDPlus**, que dificultou a implementação de certos relacionamentos.
- Esforço considerável para garantir que a **normalização** fosse feita corretamente até a **3ª forma normal**.


## Tecnologias Utilizadas

- **ERDPlus** – Modelagem ER e relacional
- **Jupyter Notebook** – Geração de tabelas SQL
- **Excel** – Dados de exemplo
- **Markdown** – Documentação


## Como Usar

1. Leia os requisitos (**Parte 1** e **Parte 2**).
2. Consulte os modelos ER e Relacional (formatos `.erdplus` ou imagens).
3. Utilize o notebook `gerateTable.ipynb` para gerar a estrutura de tabelas em excel.
4. Use os dados de exemplo para testes (arquivo `BD_Example_Data.xlsx`).


## Apresentação

Apresentação disponível nos arquivos **Apresentação.pdf** e **Apresentação.pptx**, contem a visão geral do projeto, modelo ER, modelo relacional e exemplos de dados.


---

## Conclusão

A Parte 1 e Parte 2 do projeto foram fundamentais para a construção e aprimoramento do banco de dados **MIMI**. Na Parte 1, estabelecemos os requisitos iniciais e a modelagem ER, que serviram como base para a Parte 2, onde revisamos e normalizamos o modelo para a 3ª forma normal (3FN), além de gerarmos dados fictícios para testes. Com esses avanços, a estrutura do banco de dados está mais robusta, preparada para ser expandida nas próximas etapas do projeto.
