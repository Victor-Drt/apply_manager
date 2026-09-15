from sqlalchemy import create_engine  # Função responsável por criar a conexão com o banco de dados
from sqlalchemy.orm import sessionmaker  # Fabrica para criar sessões de comunicação com o banco
from ..core.config import DATABASE_URL  # URL de conexão definida no arquivo de configuração


# Para SQLite é necessário passar esse argumento extra.
# O "check_same_thread=False" permite que a mesma conexão seja usada em diferentes threads.
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}


# Cria o "engine", que é o ponto central de conexão com o banco.
# Ele gerencia o pool de conexões e a comunicação com o banco de dados.
engine = create_engine(
    DATABASE_URL,
    connect_args=connect_args,
)


# Cria uma fábrica de sessões.
# Cada sessão representa uma conversa com o banco (usada para consultas, inserts, updates, etc).
SessionLocal = sessionmaker(
    autocommit=False,  # As alterações não são salvas automaticamente (precisa dar commit)
    autoflush=False,  # Não envia automaticamente alterações pendentes antes de consultas
    bind=engine       # Vincula essa sessão ao engine criado acima
)