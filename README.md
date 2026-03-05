# Holder Project

Este repositório contém o ecossistema completo do projeto Holder, organizado como um Monorepo.

## Estrutura do Projeto

- **frontend/holder**: Interface web construída com Next.js 15+, Tailwind CSS e Turbopack.
- **backend**: API robusta utilizando FastAPI (Python).

---

## Guia de Instalação

### 1. Clonar e entrar no diretório

```bash
git clone https://github.com/WC-Neto/Holder.git
cd Holder
```

### 2. Configurar o Frontend (Node.js)

```bash
npm install
```

### 3. Configurar o Backend (Python)

```bash
pip install -r backend/requirements.txt
```

---

## Executar o projeto

Para facilitar o desenvolvimento, usamos um comando único que sobe ambos os servidores:

```bash
npm run dev
```

- **Frontend:** [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)
- **Backend:** [http://localhost:8000](https://www.google.com/search?q=http://localhost:8000)
- **Documentação API (Swagger):** [http://localhost:8000/docs](https://www.google.com/search?q=http://localhost:8000/docs)

---

## Scripts Disponíveis (Raiz)

- `npm run dev`: Inicia Front e Back simultaneamente.
- `npm run dev:frontend`: Inicia apenas o Next.js.
- `npm run dev:backend`: Inicia apenas o FastAPI.
