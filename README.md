# Star Wars Explorer

## Objetivo:
Desenvolver uma página que exiba todos os personagens e os planetas dos filmes
de Star Wars. A página deve incluir um filtro que permita aos usuários buscar
personagens e os planetas pelo nome e permita navegar entre eles. Utilize a SWAPI
para obter os dados correspondentes.

## 👩‍💻 Tecnologias:
- Rect.js
- Vite
- Typescript


**Bibliotecas utilizadas no projeto:**
- Cypress
- Vitest
- Eslint
- Tailwindcss
- Tanstack
- Radix ui
- Framer motion

## 🚀 Como executar
- Clone o repositório
- Você deve ter o gerenciador de dependecias PNPM na sua máquina, caso não tenha instale com `npm install -g pnpm@latest-10`
- Instale as dependências com `pnpm i`
- Inicie o servidor com `pnpm dev`
- Para executar testes com Vistest use `pnpm test` e `pnpm testcy` para teste e2e com Cypress 

Agora você pode acessar [`localhost:5173`](http://localhost:5173) do seu
navegador.

## Docker 
Tendo o docker instalado na sua máquina execute esses comandos:

- `docker build -t sw-explorer .`
- `docker run -p 5173:5173 sw-explorer`
  
Agora você pode acessar o network do seu navegador > [`localhost:5173`](http://localhost:5173)

## Desenho do MVP
![image](https://github.com/user-attachments/assets/5207f2d5-e93c-4afc-9ff4-cef39334df35)

# Vercel
Link do deploy na vercel: [`Star Wars Explorer`](https://sw-explorer.vercel.app/)

