CREATE TABLE usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome_completo VARCHAR(150) NOT NULL,
    data_nascimento DATE NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    senha_hash VARCHAR(255) NOT NULL,
    foto_perfil VARCHAR(255),
    cep VARCHAR(10),
    endereco VARCHAR(150),
    numero VARCHAR(10),
    complemento VARCHAR(100)
);

CREATE TABLE idoso (
    id_idoso INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT UNIQUE,
    tamanho_fonte INT,
    alto_contraste BOOLEAN,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE voluntario (
    id_voluntario INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT UNIQUE,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE pedido (
    id_pedido INT PRIMARY KEY AUTO_INCREMENT,
    id_idoso INT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    categoria VARCHAR(50),
    descricao TEXT,
    cep VARCHAR(10),
    endereco VARCHAR(150),
    numero VARCHAR(10),
    prioridade BOOLEAN,
    status VARCHAR(30),
    data_criacao DATETIME,
    data_inicio DATETIME,
    data_conclusao DATETIME,
    FOREIGN KEY (id_idoso) REFERENCES idoso(id_idoso)
);

CREATE TABLE atendimento (
    id_atendimento INT PRIMARY KEY AUTO_INCREMENT,
    id_pedido INT UNIQUE,
    id_voluntario INT NOT NULL,
    data_inicio DATETIME,
    data_fim DATETIME,
    justificativa_desistencia TEXT,
    FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido),
    FOREIGN KEY (id_voluntario) REFERENCES voluntario(id_voluntario)
);

CREATE TABLE notificacao (
    id_notificacao INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_pedido INT,
    tipo VARCHAR(50),
    mensagem TEXT,
    lida BOOLEAN DEFAULT FALSE,
    data_envio DATETIME,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido)
);

CREATE TABLE token_recuperacao (
    id_token INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    data_expiracao DATETIME,
    usado BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE sessao (
    id_sessao INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    data_expiracao DATETIME,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE necessidade_especial (
    id_necessidade INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(100)
);

CREATE TABLE idoso_necessidade (
    id_idoso INT,
    id_necessidade INT,
    PRIMARY KEY (id_idoso, id_necessidade),
    FOREIGN KEY (id_idoso) REFERENCES idoso(id_idoso),
    FOREIGN KEY (id_necessidade) REFERENCES necessidade_especial(id_necessidade)
);

CREATE TABLE disponibilidade (
    id_disponibilidade INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(50)
);

CREATE TABLE voluntario_disponibilidade (
    id_voluntario INT,
    id_disponibilidade INT,
    PRIMARY KEY (id_voluntario, id_disponibilidade),
    FOREIGN KEY (id_voluntario) REFERENCES voluntario(id_voluntario),
    FOREIGN KEY (id_disponibilidade) REFERENCES disponibilidade(id_disponibilidade)
);