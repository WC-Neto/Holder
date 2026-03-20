CREATE TABLE PESSOA (
    id_pessoa SERIAL PRIMARY KEY,
    nome_completo VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    senha VARCHAR(255) NOT NULL,
    foto_perfil TEXT,
    cep VARCHAR(9),
    endereco VARCHAR(255),
    numero VARCHAR(10),
    complemento VARCHAR(100)
);

CREATE TABLE DISPONIBILIDADE (
    id_disponibilidade SERIAL PRIMARY KEY,
    descricao VARCHAR(100) NOT NULL
);

CREATE TABLE NECESSIDADE_ESPECIAL (
    id_necessidade SERIAL PRIMARY KEY,
    descricao VARCHAR(100) NOT NULL
);

CREATE TABLE RELATORIO (
    id_relatorio SERIAL PRIMARY KEY,
    periodo_inicio DATE,
    periodo_fim DATE,
    total_pedidos INT DEFAULT 0,
    total_concluidos INT DEFAULT 0,
    total_usuarios_ativos INT DEFAULT 0
);

CREATE TABLE VOLUNTARIO (
    id_voluntario SERIAL PRIMARY KEY,
    id_pessoa_FK INT NOT NULL REFERENCES PESSOA(id_pessoa) ON DELETE CASCADE
);

CREATE TABLE IDOSO (
    id_idoso SERIAL PRIMARY KEY,
    id_pessoa_FK INT NOT NULL REFERENCES PESSOA(id_pessoa) ON DELETE CASCADE,
    tamanho_fonte INT DEFAULT 12,
    alto_contraste BOOLEAN DEFAULT FALSE
);

CREATE TABLE NOTIFICACAO (
    id_notificacao SERIAL PRIMARY KEY,
    id_pessoa_FK INT NOT NULL REFERENCES PESSOA(id_pessoa) ON DELETE CASCADE,
    tipo VARCHAR(50),
    mensagem TEXT,
    lida BOOLEAN DEFAULT FALSE,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE RECUPERACAO_SENHA (
    id_recuperacao SERIAL PRIMARY KEY,
    id_pessoa_FK INT NOT NULL REFERENCES PESSOA(id_pessoa) ON DELETE CASCADE,
    token_redefinicao VARCHAR(255) NOT NULL,
    data_expiracao TIMESTAMP NOT NULL,
    usado BOOLEAN DEFAULT FALSE
);

CREATE TABLE VOLUNTARIO_DISPONIBILIDADE (
    id_voluntario_FK INT REFERENCES VOLUNTARIO(id_voluntario),
    id_disponibilidade_FK INT REFERENCES DISPONIBILIDADE(id_disponibilidade),
    PRIMARY KEY (id_voluntario_FK, id_disponibilidade_FK)
);

CREATE TABLE IDOSO_NECESSIDADE (
    id_idoso_FK INT REFERENCES IDOSO(id_idoso),
    id_necessidade_FK INT REFERENCES NECESSIDADE_ESPECIAL(id_necessidade),
    PRIMARY KEY (id_idoso_FK, id_necessidade_FK)
);

CREATE TABLE PEDIDO (
    id_pedido SERIAL PRIMARY KEY,
    id_idoso_FK INT REFERENCES IDOSO(id_idoso),
    id_voluntario_FK INT REFERENCES VOLUNTARIO(id_voluntario),
    titulo VARCHAR(150) NOT NULL,
    categoria VARCHAR(100),
    detalhes TEXT,
    endereco_pedido VARCHAR(255),
    usar_endereco_cadastrado BOOLEAN DEFAULT TRUE,
    prioridade BOOLEAN DEFAULT FALSE,
    status VARCHAR(50),
    data_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_inicio_atendimento TIMESTAMP,
    data_conclusao TIMESTAMP,
    justificativa_desistencia TEXT
);