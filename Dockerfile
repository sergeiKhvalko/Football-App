# FROM node:18 as dependencies
# WORKDIR /football-app
# COPY package.json ./
# RUN npm install

# FROM node:18 as builder
# WORKDIR /football-app
# COPY . .
# COPY --from=dependencies /football-app/node_modules ./node_modules
# RUN npm run build

# FROM node:18 as runner
# WORKDIR /football-app
# ENV NODE_ENV production

# COPY --from=builder /football-app/public ./public
# COPY --from=builder /football-app/package.json ./package.json
# COPY --from=builder /football-app/.next ./.next
# COPY --from=builder /football-app/node_modules ./node_modules

# EXPOSE 3000
# CMD ["npm", "start"]

FROM node:18-alpine as builder
WORKDIR /football-app

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine as runner
WORKDIR /football-app
COPY --from=builder /football-app/package.json .
COPY --from=builder /football-app/package-lock.json .
COPY --from=builder /football-app/next.config.js ./
COPY --from=builder /football-app/public ./public
COPY --from=builder /football-app/.next/standalone ./
COPY --from=builder /football-app/.next/static ./.next/static
EXPOSE 3000
ENTRYPOINT ["npm", "start"]