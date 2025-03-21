FROM node:18-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm && pnpm install

COPY . .

EXPOSE 5173

CMD ["pnpm", "dev"]
