# Permiitir usuarios não root usarem o Docker

1. Crie o grupo Docker
```
	sudo groupadd docker
```
2. Adicione o usuario ao grupo
```
	sudo usermod -aG docker seu_nome_de_usuario
```

# PostgreSQL com Docker

1. Entrar no prompt 'psql'
```
	docker exec -it projeto_youtubedownshift-db_postgres-1 psql -U POSTGRES_USER -d POSTGRES_DB
	ou 
	docker compose exec db_postgres sh
``` 

2. Copiar arquivo .sql para dentro do container PostgreSQL:
```
	docker cp /caminho/no/servidor/para/schema.sql <NOME_OU_ID_DO_CONTAINER_POSTGRES>:/tmp/schema.sql
```

3. Executar o script SQL usando psql dentro do container:
```
	docker exec -it <NOME_OU_ID_DO_CONTAINER_POSTGRES> psql -U ${POSTGRES_USER} -d ${POSTGRES_DB} -f /tmp/schema.sql
```

# Docker
- Liag o container (Executa o 'docker-compose.yml')
```
	docker compose up --build -d
```
- Desligar todos os contaisners em primeiro plano
```
	docker compose down
```

- Remover volumes de um docker especifico
```
	docker compose down --volumes <nome_do_docker>
```

- Pense bem antes de usar
```
	docker compose down -v
```

- Desligar todos os containers em segundo plano
```
	docker stop $(docker ps -q)
```

- Mostrar logs
```
	docker compose logs -f backend
```

- Copiar pro docker
```
docker copy DDL_create_tables_downshift.sql db_postgres
```

- DELETAR TUDO
```
# Para parar tudo que estiver rodando
docker stop $(docker ps -aq)

# Remove todos os containers
docker rm -f $(docker ps -aq)

# Remove todas as imagens
docker rmi -f $(docker images -q)

# Remove todos os volumes
docker volume rm $(docker volume ls -q)

# Remove todas as redes (menos as padrões como bridge/host/none)
docker network rm $(docker network ls -q | grep -vE '^(|ID|bridge|host|none)$')

# Limpa cache e dados órfãos
docker system prune -a --volumes --force

# Limpa algo se sobrou
docker builder prune -a --force
```

# MinIO to Docker
- Entrar no bash do MinIO
```
	docker exec -it <NOME OU ID DO CONATINER MINIO> sh
```

# MinIO
- Cria um cliente
```
	mc alias set <NOME_DO_ALIAS> http:localhost:9000 <SEU_USUARIO> <SUA_SENHA>
```

- Lista usuarios 
```
	mc admin user list <NOME_DO_ALIAS>
```

# Comandos úteis para PostgreSQL

## Conexão
- **Host do banco:** `10.61.49.126`
- **Comando de conexão:**
  ```bash
  psql -h <host> -U <user> -d <database>
  ```

---

## Bancos, usuários e schemas

- `ALTER USER nome_do_usuario WITH PASSWORD 'nova_senha';` — altera a senha do usuário

- `GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA downshift TO svc_pg_backend;` — adiciona permissões CRUD pro usuário

- `ALTER DEFAULT PRIVILEGES IN SCHEMA downshift GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO svc_pg_backend;` — mesmo de cima, mas pra todas as tabelas que ainda vão ser criadas

- `\l` — Lista todos os **bancos de dados**
- `\du` — Lista todos os **usuários (roles)** e suas permissões
- `\dn` — Lista todos os **schemas**

SET search_path TO downshift;

---

## Tabelas e colunas

- `\dt` — Lista as tabelas do schema atual
- `\dt <schema>.*` — Lista as tabelas de um schema específico
- `\d nome_tabela` — Mostra a estrutura de uma tabela
- `\d+ nome_tabela` — Mostra estrutura da tabela com informações adicionais