FROM node:16.16.0-alpine

ARG NODE_ENV=development

ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev --ignore-scripts

COPY . .

EXPOSE 3001

RUN pwd && ls -al

RUN chmod +x /app/entrypoint.sh

CMD [ "/app/entrypoint.sh" ]