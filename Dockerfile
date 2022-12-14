FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

# CMD ["node" , "built/app.mjs"]
CMD ["yarn" , "serve"]