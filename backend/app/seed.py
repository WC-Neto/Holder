from database import SessionLocal, engine, Base
from models import models
import bcrypt


Base.metadata.create_all(bind=engine)

def gerar_hash(senha: str):
    return bcrypt.hashpw(senha.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

db = SessionLocal()

try:
    # --- 1. CRIAÇÃO DO IDOSO  ---
    if not db.query(models.Idoso).filter(models.Idoso.email == "benedito@email.com").first():
        benedito = models.Idoso(
            nome_completo="Benedito Sella",
            data_de_nascimento="1950-05-20",
            cpf="123.456.789-01",
            email="benedito@email.com",
            telefone="(67) 99999-1234",
            senha_hash=gerar_hash("senha123")
        )
        db.add(benedito)
        db.flush() 
        db.add(models.Endereco(
            cep="79600-000", logradouro="Avenida Capitão Olinto Mancini", numero="100",
            bairro="Centro", cidade="Três Lagoas", estado="MS", idoso_id=benedito.id
        ))


    if not db.query(models.Idoso).filter(models.Idoso.email == "neusa.silva@email.com").first():
        neusa = models.Idoso(
            nome_completo="Neusa Maria da Silva",
            data_de_nascimento="1955-10-15",
            cpf="458.682.260-03",
            email="neusa.silva@email.com",
            telefone="(67) 9 9988-7766",
            senha_hash=gerar_hash("senha456"),
            tamanho_fonte=20,
            alto_contraste=True
        )
        db.add(neusa)
        db.flush()
        db.add(models.Endereco(
            cep="79600-000", logradouro="Avenida Capitão Olinto Mancini", numero="500",
            bairro="Centro", cidade="Três Lagoas", estado="MS", idoso_id=neusa.id
        ))
        db.add(models.NecessidadeEspecialIdoso(necessidade="mobilidade_reduzida", idoso_id=neusa.id))

    # --- 3. CRIAÇÃO DO VOLUNTÁRIO ---
    if not db.query(models.Voluntario).filter(models.Voluntario.email == "fernando@email.com").first():
        fernando = models.Voluntario(
            nome_completo="Fernando Junior",
            data_de_nascimento="1995-03-10",
            cpf="222.333.444-55",
            email="fernando@email.com",
            telefone="(67) 98888-7777",
            senha_hash=gerar_hash("voluntario123")
        )
        db.add(fernando)
        db.flush() 
        db.add(models.Endereco(
            cep="79600-000", logradouro="Rua João Carrato", numero="500",
            bairro="Centro", cidade="Três Lagoas", estado="MS", voluntario_id=fernando.id
        ))


    if not db.query(models.Voluntario).filter(models.Voluntario.email == "rafaela@email.com").first():
        rafaela = models.Voluntario(
            nome_completo="Rafaela Miguel",
            data_de_nascimento="2000-08-25",
            cpf="333.444.555-66",
            email="rafaela@email.com",
            telefone="(67) 9 8877-6655",
            senha_hash=gerar_hash("rafa123")
        )
        db.add(rafaela)
        db.flush()
        db.add(models.Endereco(
            cep="79600-000", logradouro="Rua Generoso Siqueira", numero="300",
            bairro="Centro", cidade="Três Lagoas", estado="MS", voluntario_id=rafaela.id
        ))

    db.commit()
    print("--- Base de dados sincronizada com sucesso! ---")
    

    print("\n[IDOSOS NO BANCO]:")
    for i in db.query(models.Idoso).all():
        print(f"ID: {i.id} | Nome: {i.nome_completo}")
        
    print("\n[VOLUNTÁRIOS NO BANCO]:")
    for v in db.query(models.Voluntario).all():
        print(f"ID: {v.id} | Nome: {v.nome_completo}")

except Exception as e:
    db.rollback()
    print(f"Erro ao popular o banco: {e}")
finally:
    db.close()