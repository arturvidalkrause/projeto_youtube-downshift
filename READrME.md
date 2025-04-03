
# MIMI - Mídia Interativa Multiplataforma Interconectada

Projeto de modelagem de banco de dados inspirado no YouTube, com foco em uma plataforma de vídeos chamada **MIMI**. A ideia foi construir uma estrutura sólida para um sistema de gerenciamento de usuários, canais, conteúdos multimídia e interações sociais.

## 👨‍💻 Integrantes (Grupo 12)

- Artur Vidal Krause  
- Bruno Luís Zerbinatto Rosa  
- Gustavo de Oliveira da Silva 

## 📁 Estrutura do Projeto

Modelagem ER Youtube/  
├── Parte 1/  
│   ├── Requisitos iniciais e modelagem ER  
│   ├── Imagem do modelo ER  
│   └── Arquivos ERDPlus  
├── Parte 2/  
│   ├── Dados de exemplo (planilha Excel)  
│   ├── Script Jupyter para gerar tabelas SQL  
│   ├── Modelos ER e Relacional atualizados  
│   └── Requisitos revisados  

## 📌 Funcionalidades Modeladas

- Gerenciamento de **usuários** e **canais**
- **Conteúdos** diversos: vídeos, lives, shorts, enquetes
- **Notificações** e preferências do usuário
- **Playlists**, **tags** e **interações** (curtir, comentar, etc.)
- Comentários com possibilidade de **respostas**
- Normalização até a **3ª Forma Normal**

## 🗂 Principais Entidades

- `USER`, `CHANNEL`, `CONTENT`, `NOTIFICATION`
- `LIVE`, `VIDEO`, `SHORT`, `POLL`
- `COMMENT`, `COMMENTREPLY`, `USERINTERACTION`
- `PLAYLIST`, `PLAYLISTCONTENT`, `CONT_TAG`

## 🧪 Exemplos de Dados

Inclui dados como:

- Usuários com nome, email, foto
- Canais com descrições, banners, vídeo de boas-vindas
- Conteúdos com título, descrição, data, status, classificação indicativa
- Comentários e respostas
- Playlists e suas relações com os vídeos
- Interações dos usuários (likes, dislikes, saves)

## 🚧 Dificuldades Encontradas

- Alta complexidade de relacionamento entre entidades
- Limitações da ferramenta ERDPlus
- Esforço na normalização dos dados

## 🛠 Tecnologias Utilizadas

- **ERDPlus** – modelagem ER e relacional
- **Jupyter Notebook** – geração de tabelas SQL
- **Excel** – dados de exemplo
- **Markdown / Word / PDF** – documentação

## 🚀 Como Usar

1. Leia os requisitos (`Parte 1` e `Parte 2`).
2. Consulte os modelos ER e Relacional (formato `.erdplus` ou imagem).
3. Use o notebook `gerateTable.ipynb` para gerar estrutura de tabelas.
4. Use os dados de exemplo para testes (`BD_Example_Data.xlsx`).

## 📄 Apresentação

Apresentação disponível no arquivo `Apresentação.pdf`, contendo visão geral do projeto, modelo ER, modelo relacional e exemplos de dados.