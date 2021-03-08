FROM node

WORKDIR /app

COPY ./package.json .
COPY ./server/package.json ./server/

# RUN npm i -g yarn
RUN yarn install --production

COPY ./server/dist ./server/dist
COPY ./server/.env ./server/

WORKDIR /app/server

ENV NOD_ENV=production

EXPOSE 4000

CMD ["node", "dist/index.js"]