FROM node:20-alpine

WORKDIR /app

# Pehle package.json copy karo (cache ke liye)
COPY package.json package-lock.json* ./
RUN npm ci

# Baqi code copy karo (node_modules ignore ho jayega .dockerignore ki wajah se)
COPY . .

# Default command (docker-compose override karega)
CMD ["npm", "start"]