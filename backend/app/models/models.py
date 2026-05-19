from sqlalchemy import Column, Integer, String, Boolean, Date, ForeignKey, Enum as SAEnum
from sqlalchemy.orm import relationship
from database import Base

class Idoso(Base):
    __tablename__ = "idosos"

    id = Column(Integer, primary_key=True, index=True)
    nome_completo = Column(String(255), nullable=False)
    data_de_nascimento = Column(Date, nullable=False)
    cpf = Column(String(14), unique=True, nullable=False, index=True)
    senha_hash = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    telefone = Column(String(20), nullable=False)
    foto_perfil = Column(String(500), nullable=True)
    tamanho_fonte = Column(Integer, default=16)
    alto_contraste = Column(Boolean, default=False)

    enderecos = relationship("Endereco", back_populates="idoso", cascade="all, delete-orphan")
    necessidades_especiais = relationship("NecessidadeEspecialIdoso", back_populates="idoso", cascade="all, delete-orphan")

class Voluntario(Base):
    __tablename__ = "voluntarios"

    id = Column(Integer, primary_key=True, index=True)
    nome_completo = Column(String(255), nullable=False)
    data_de_nascimento = Column(Date, nullable=False)
    cpf = Column(String(14), unique=True, nullable=False, index=True)
    senha_hash = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    telefone = Column(String(20), nullable=False)
    foto_perfil = Column(String(500), nullable=True)

    enderecos = relationship("Endereco", back_populates="voluntario", cascade="all, delete-orphan")
    disponibilidades = relationship("Disponibilidade", back_populates="voluntario", cascade="all, delete-orphan")

class Endereco(Base):
    __tablename__ = "enderecos"

    id = Column(Integer, primary_key=True, index=True)
    cep = Column(String(9), nullable=False)
    logradouro = Column(String(255), nullable=False)
    numero = Column(String(20), nullable=False)
    complemento = Column(String(100), nullable=True)
    bairro = Column(String(100), nullable=False)
    cidade = Column(String(100), nullable=False)
    estado = Column(String(2), nullable=False)

    idoso_id = Column(Integer, ForeignKey("idosos.id"), nullable=True)
    voluntario_id = Column(Integer, ForeignKey("voluntarios.id"), nullable=True)

    idoso = relationship("Idoso", back_populates="enderecos")
    voluntario = relationship("Voluntario", back_populates="enderecos")


class NecessidadeEspecialIdoso(Base):
    __tablename__ = "necessidades_especiais_idoso"

    id = Column(Integer, primary_key=True, index=True)
    necessidade = Column(String(100), nullable=False)
    idoso_id = Column(Integer, ForeignKey("idosos.id"), nullable=False)

    idoso = relationship("Idoso", back_populates="necessidades_especiais")

class Disponibilidade(Base):
    __tablename__ = "disponibilidades"

    id = Column(Integer, primary_key=True, index=True)
    dia_semana = Column(
        SAEnum("segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"),
        nullable=False
    )
    periodo = Column(
        SAEnum("matutino", "vespertino", "noturno"),
        nullable=False
    )
    voluntario_id = Column(Integer, ForeignKey("voluntarios.id"), nullable=False)

    voluntario = relationship("Voluntario", back_populates="disponibilidades")

class PedidoAjuda(Base):
    __tablename__ = "pedidos_ajuda"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String(100), nullable=False)
    descricao = Column(String(500), nullable=False)
    categoria = Column(String(50), nullable=False) # Ex: "Mercado", "Conversa", "Remédios"
    prioridade = Column(SAEnum("baixa", "media", "alta"), default="baixa")
    status = Column(
        SAEnum("aberto", "em_andamento", "finalizado", "cancelado"), 
        default="aberto"
    )
    data_criacao = Column(Date, nullable=False)

    # Relacionamentos
    idoso_id = Column(Integer, ForeignKey("idosos.id"), nullable=False)
    voluntario_id = Column(Integer, ForeignKey("voluntarios.id"), nullable=True)

    idoso = relationship("Idoso")
    voluntario = relationship("Voluntario")
