from database import SessionLocal, engine, Base
from models import models
import bcrypt

Base.metadata.create_all(bind=engine)

def gerar_hash(senha: str):
    return bcrypt.hashpw(senha.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

db = SessionLocal()

try:
    # --- 1. CRIAÇÃO DO IDOSO ---
    senha_idoso = gerar_hash("senha123")
    novo_idoso = models.Idoso(
        nome_completo="Benedito Sella",
        data_de_nascimento="1950-05-20",
        cpf="123.456.789-01",
        email="benedito@email.com",
        telefone="(67) 99999-1234",
        senha_hash=senha_idoso
    )
    db.add(novo_idoso)
    db.flush() 

    db.add(models.Endereco(
        cep="79600-000",
        logradouro="Avenida Capitão Olinto Mancini",
        numero="100",
        bairro="Centro",
        cidade="Três Lagoas",
        estado="MS",
        idoso_id=novo_idoso.id
    ))

    # --- 2. CRIAÇÃO DO VOLUNTÁRIO ---
    senha_voluntario = gerar_hash("voluntario123")
    novo_voluntario = models.Voluntario(
        nome_completo="Fernando Junior",
        data_de_nascimento="1995-03-10",
        cpf="222.333.444-55",
        email="fernando@email.com",
        telefone="(67) 98888-7777",
        senha_hash=senha_voluntario
    )
    db.add(novo_voluntario)
    db.flush() 

    db.add(models.Endereco(
        cep="79600-000",
        logradouro="Rua João Carrato",
        numero="500",
        bairro="Centro",
        cidade="Três Lagoas",
        estado="MS",
        voluntario_id=novo_voluntario.id
    ))

    db.commit()
    print(f"Sucesso!")
    print(f"Idoso: {novo_idoso.nome_completo} (ID: {novo_idoso.id})")
    print(f"Voluntário: {novo_voluntario.nome_completo} (ID: {novo_voluntario.id})")

except Exception as e:
    db.rollback()
    print(f"Erro ao popular o banco: {e}")
finally:
    db.close()