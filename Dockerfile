# Usa a imagem oficial do Bun
FROM oven/bun:latest

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto
COPY . .

# Instala as dependências
RUN bun install

# Gera o Prisma Client
RUN bunx prisma generate
RUN bunx prisma migrate deploy

# Executa a build do projeto
RUN bun run build

# Expõe a porta (ajuste conforme necessário)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["bun", "start"]