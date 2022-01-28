FROM node:14.15.4
ENV CI true
RUN npm i -g @nestjs/cli
COPY ./app/package.json /home/app/package.json
COPY ./app/.vscode /root/.vscode-server/data/Machine
WORKDIR /home/app
RUN npm install