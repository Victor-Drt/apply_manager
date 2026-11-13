# Build with:  docker build -t my-app .
# Run with:    docker run -p 8000:8000 my-app

FROM python:3.12-slim

WORKDIR /app

# Ferramentas para compilação de dependências nativas
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Instala dependências
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copia o restante do projeto
COPY . .

EXPOSE 8000

CMD ["sh", "-c", "alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port 8000"]
