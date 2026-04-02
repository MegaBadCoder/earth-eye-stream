# SSR (Nitro node-server), см. vite.config: DEPLOY_TARGET=docker
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
ENV DEPLOY_TARGET=docker
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0
COPY --from=build /app/.output ./
RUN chown -R node:node /app
EXPOSE 3000
USER node
CMD ["node", "server/index.mjs"]
