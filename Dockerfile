# -------- BUILD STAGE --------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# -------- RUNTIME STAGE --------
FROM node:20-alpine

WORKDIR /app

# Solo copiamos lo necesario
COPY --from=builder /app/dist ./dist
COPY package*.json ./
COPY server.mjs ./

RUN npm install --omit=dev

EXPOSE 4000

CMD ["node", "server.mjs"]