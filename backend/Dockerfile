# Build with:  docker build -t my-app .
# Run with:    docker run -p 8000:8000 my-app

FROM python:3-slim

WORKDIR /app

# Install dependencies first so this layer is cached
COPY . .
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["sh", "-c", "alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port 8000"]
