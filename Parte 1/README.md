
# Fase 1 do Projeto: Banco de Dados do YouTube (MIMI)

## O Que Foi Feito na Parte 1:

### 1. Requisitos do Banco de Dados
Foi desenvolvida uma lista de requisitos essenciais para o banco de dados de um sistema inspirado no YouTube, denominado **MIMI**. A lista contém os seguintes requisitos principais:

#### **Usuário**:
- Cada **usuário** tem um *email*, *id* único, *senha* privada, *nome completo* e *foto de perfil*.
- O **usuário** pode ser dono de apenas **um único canal**.
- O **usuário** pode ser **administrador de múltiplos canais**.
- O **usuário** tem um **histórico** de conteúdos visualizados de outros canais.
- O **usuário** pode receber **múltiplas notificações** de um canal ao qual tenha ativado o sininho.
- O **usuário** pode ser **membro de múltiplos canais**.

#### **Notificação do Usuário**:
- Cada **notificação** tem um *id* único, a *data de envio*, e o *status* (se foi visualizada ou não).
- A notificação é enviada apenas para um **usuário** por um **vídeo, short, live, playlist ou enquete** de um canal ao qual o usuário tenha ativado o sininho.

#### **Histórico de Visualização**:
- O **histórico** contém todos os **vídeos, shorts e lives** visualizados pelo usuário, com a data de cada visualização.

### 2. Diagrama ER
A modelagem do banco de dados foi feita com base nos requisitos mencionados. O diagrama ER foi construído utilizando a ferramenta **ERDPlus** e reflete as entidades, atributos e relacionamentos.

#### **Diagrama ER - Modelo Conceitual**:
O diagrama ER inclui entidades como **Usuário**, **Canal**, **Conteúdo**, **Notificação**, e **Histórico de Visualização**. Ele também contempla **relacionamentos** como:
- Um **usuário** pode ter muitos **canais** e pode ser membro de muitos **canais**.
- Um **usuário** pode visualizar muitos **conteúdos**, e um **conteúdo** pode ser visualizado por muitos **usuários**.
- As **notificações** estão associadas aos **usuários** e aos **canais**.

![Modelo ER](image_ER.png)

### 3. Estrutura dos Arquivos da Parte 1
A entrega da Parte 1 inclui os seguintes arquivos e suas descrições:

- **Requisitos banco de dados youtube.md**: Contém a lista completa de requisitos do banco de dados, incluindo detalhes sobre as entidades e relacionamentos do sistema MIMI.
- **image_ER.png**: Imagem do diagrama ER, que representa visualmente o modelo conceitual do banco de dados.
- **Modelagem ER Youtube.docx**: Documento detalhado sobre a modelagem ER, com explicações sobre as entidades, atributos e relacionamentos.
- **Modelagem ER.markdown**: Versão em Markdown do documento sobre a modelagem ER, com uma abordagem mais simples e direta.
- **Youtube_01.erdplus**: Arquivo ERDPlus com a modelagem do banco de dados. O arquivo pode ser visualizado na ferramenta [ERDPlus](https://erdplus.com).

### Conclusão
- Esta parte do projeto foi crucial para definir a estrutura de dados e os relacionamentos do sistema **MIMI**, permitindo que as fases subsequentes possam ser construídas sobre essa base.
