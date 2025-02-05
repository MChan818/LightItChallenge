FROM node:20-alpine
EXPOSE 3000

RUN mkdir -p /app

WORKDIR /app
COPY Backend .

RUN npm install
RUN npm run build

CMD ["npm", "start"]