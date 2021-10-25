#базовый образ
FROM node:14-alpine

#папка в которой будем работать
WORKDIR /opt/app

#добавили пэкэдж джейсон
ADD package.json package.json

#установили зависимости
RUN npm install

#добавили весь оставшийся код
ADD . .

#собрали
RUN npm run build

#удалили дев зависимости
RUN npm prune --production
CMD ["node", "./dist/main.js"]