FROM node:22 AS build

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:22

WORKDIR /app

COPY --from=build /app/dist /app/frontend
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/package.json

EXPOSE 4001

CMD ["node", "frontend/task-app/server/server.mjs"]
