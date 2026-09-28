FROM node:24-alpine AS dependencies
WORKDIR /app
COPY app/package.json app/package-lock.json ./
RUN npm ci --no-fund --no-audit

FROM dependencies AS development
COPY app/ ./
EXPOSE 5173
CMD ["npm", "start"]

FROM dependencies AS build
ARG SITE_BASE=/
ARG SITE_ORIGIN=https://nikitastetskiy.github.io
ENV SITE_BASE=$SITE_BASE SITE_ORIGIN=$SITE_ORIGIN
COPY app/ ./
RUN npm run build && npm test

FROM scratch AS export
COPY --from=build /app/dist/ /

FROM nginx:stable-alpine AS production
COPY compose/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/ /usr/share/nginx/html/
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1
