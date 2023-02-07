FROM node:18-alpine as builder

RUN npm install -g pnpm

RUN mkdir -p /opt/app && chown -R node:node /opt/app

WORKDIR /opt/app

USER node

COPY --chown=node:node pnpm-lock.yaml ./

RUN pnpm fetch

COPY --chown=node:node package.json ./

RUN pnpm install -r --offline

COPY --chown=node:node . .

RUN pnpm run build

FROM nginx:1.7 as production

ENV NODE_ENV production

COPY --from=builder /opt/app/build /usr/share/nginx/html

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
