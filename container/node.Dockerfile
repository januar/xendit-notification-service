FROM node:14-alpine3.14

WORKDIR /app

COPY . .

RUN npm install -g nodemon

RUN npm install -g typescript

RUN npm install

CMD npm install && npm run build && npm run dev
