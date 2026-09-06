# 🏃 Strava Analyzer API

API desenvolvida com **FastAPI**, **SQLAlchemy**, **Alembic** e **PostgreSQL** para integração com a **API do Strava**, permitindo autenticação OAuth 2.0 e sincronização/listagem de atividades dos atletas.

---

## 🛠️ Tecnologias Utilizadas

- **Python 3.10+**
- **FastAPI** (Framework Web)
- **Uvicorn** (Servidor ASGI)
- **PostgreSQL** (Banco de dados relacional)
- **SQLAlchemy** (ORM)
- **Alembic** (Migrações do banco de dados)
- **Docker & Docker Compose** (Containerização do banco de dados e Adminer)

---

## 📋 Pré-requisitos (Windows)

Antes de começar, certifique-se de ter instalado em seu ambiente Windows:

1. **[Python 3.10+](https://www.python.org/downloads/)**
   - ⚠️ *Certifique-se de marcar a opção **"Add Python to PATH"** durante a instalação.*
2. **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** (com o serviço do Docker ativo e rodando).
3. **[Git](https://git-scm.com/)** (opcional, para clonar o repositório).
4. Uma **Conta de Desenvolvedor no Strava**:
   - Crie uma aplicação em [Strava API Settings](https://www.strava.com/settings/api) para obter seu `Client ID` e `Client Secret`.
   - Defina o **Authorization Callback Domain** como `localhost`.

---

## 🚀 Passo a Passo: Como Executar no Windows

Siga os passos abaixo utilizando o **PowerShell** ou o **Prompt de Comando (CMD)**.

### 1. Acessar o Repositório

Abra o terminal do PowerShell na raiz do projeto:

```powershell
cd c:\caminho\para\o\projeto\strava
```

---

### 2. Iniciar o Banco de Dados com Docker

Certifique-se de que o **Docker Desktop** está aberto e em execução. Na raiz do projeto, execute:

```powershell
docker compose up -d
```

Este comando iniciará dois containers em segundo plano:
- **PostgreSQL**: Porta `5432` (Banco `strava_db`, usuário `postgres`, senha `postgres`).
- **Adminer** (Interface Web de gerenciamento de banco): Acessível em [`http://localhost:8080`](http://localhost:8080).

---

### 3. Configurar o Ambiente Virtual Python (`backend`)

Navegue até o diretório da API:

```powershell
cd backend
```

Crie o ambiente virtual Python:

```powershell
python -m venv .venv
```

Ative o ambiente virtual no PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

> 💡 **Nota sobre permissões do PowerShell**: Se receber um erro informando que *"a execução de scripts foi desabilitada neste sistema"*, libere a execução para a sessão atual com o comando:
> ```powershell
> Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
> ```
> *(Caso esteja usando o Prompt de Comando/CMD, utilize: `.\.venv\Scripts\activate.bat`)*

---

### 4. Instalar as Dependências

Com o ambiente virtual ativado (indicado por `(.venv)` no início do prompt), instale as bibliotecas necessárias:

```powershell
pip install -r requirements.txt
```

---

### 5. Configurar as Variáveis de Ambiente (`.env`)

Dentro do diretório `backend`, crie o arquivo de configuração `.env` copiando o exemplo:

```powershell
Copy-Item .env.example .env
```

Abra o arquivo `.env` no seu editor de texto e preencha as variáveis com suas credenciais do Strava e as configurações do banco de dados:

```env
STRAVA_CLIENT_ID=seu_client_id_aqui
STRAVA_CLIENT_SECRET=seu_client_secret_aqui
STRAVA_REDIRECT_URI=http://localhost:8000/auth/callback
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/strava_db
```

---

### 6. Executar as Migrações do Banco de Dados (Alembic)

Com o banco de dados rodando no Docker e as variáveis do `.env` configuradas, execute o Alembic para criar as tabelas no PostgreSQL:

```powershell
alembic upgrade head
```

---

### 7. Executar a Aplicação FastAPI

Inicie o servidor de desenvolvimento:

```powershell
python app/main.py
```

Ou diretamente via Uvicorn:

```powershell
uvicorn app.main:app --reload
```

A API estará disponível em: **`http://127.0.0.1:8000`**

---

## 📌 Principais Endpoints

- **Status da API**: `GET http://127.0.0.1:8000/`
- **Documentação Interativa (Swagger UI)**: [`http://127.0.0.1:8000/docs`](http://127.0.0.1:8000/docs)
- **Autenticação Strava (Login)**: [`http://127.0.0.1:8000/auth/login`](http://127.0.0.1:8000/auth/login)
  - Redireciona para o fluxo de autorização OAuth2 do Strava.
- **Callback Strava**: `GET http://127.0.0.1:8000/auth/callback`
  - Recebe o código de autorização e gera os tokens de acesso.
- **Listar Atividades**: `GET http://127.0.0.1:8000/activities`
  - Retorna a lista de atividades do atleta conectado.

---

## 🗄️ Acessar o Gerenciador de Banco de Dados (Adminer)

Você pode gerenciar o PostgreSQL diretamente pelo navegador:

1. Acesse **[`http://localhost:8080`](http://localhost:8080)**.
2. Preencha os campos com:
   - **Sistema**: PostgreSQL
   - **Servidor**: `localhost` (ou `postgres` se estiver dentro da rede docker)
   - **Usuário**: `postgres`
   - **Senha**: `postgres`
   - **Base de dados**: `strava_db`

---

## ❓ Solução de Problemas Comuns no Windows

- **Porta 5432 ocupada**: Se você possui o PostgreSQL instalado nativamente no Windows, o serviço local pode estar ocupando a porta `5432`. Pare o serviço local (`services.msc` -> PostgreSQL) ou altere a porta do container no `docker-compose.yml`.
- **Erro de script desabilitado no PowerShell**: Certifique-se de executar `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` no terminal antes de rodar a ativação da `.venv`.
- **Falha de conexão com o PostgreSQL**: Verifique no Docker Desktop se o container `strava_postgres` está em estado `Running`.
