FROM node:20-alpine
EXPOSE 8080

RUN mkdir -p /app

WORKDIR /app

COPY Frontend .

RUN npm install
RUN npm run build

CMD ["npm", "run", "preview"]