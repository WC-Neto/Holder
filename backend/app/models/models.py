'''from sqlalchemy import Column, Integer, String, Boolean, Date, Datetime'''
from pydantic import BaseModel
from datetime import date


class Usuario(BaseModel):
    nome_completo: str
    data_de_nascimento: date
    cpf: str
    email: str
    telefone: str
    endereco_completo: str
    #senha: str
    #confirmacao_senha: str




'''
class Usuario(Base):
    __tablename__ = "usuario"

    id = Column(Integer, primary_key=True, index=True) 
    nome_completo = Column(String(150), nullable=False)
    data_nascimento = Column(Date, nullable=False)
    cpf = Column(String(14), unique=True, nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    telefone = Column(String(14), nullable=True)
    senha_hash = Column(String(255), nullable=False)
    foto_perfil = Column(String(255), nullable=True)
    cep = Column(String(9), nullable=True)
    endereco = Column(String(150), nullable=True)
    numero = Column(String(10), nullable=True)
    complemento = Column(String(100), nullable=True)
    momento_criacao = Column(Datetime, nullable=False)

class Idoso(Usuario):
    __tablename__ = "idoso"
    id_idoso = Column(Integer, primary_key=True, index=True)
    id_usuario = Column(Integer, unique=True, nullable=False, foreign_key="usuario.id")
    tamanho_fonte = Column(Integer, nullable=True)
    alto_contraste = Column(Boolean, nullable=True)

CREATE TABLE voluntario (
    id_voluntario INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT UNIQUE,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

Front vai mandar

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

'''