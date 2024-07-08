# FROM node:18 as dependencies
# WORKDIR /Football-App
# COPY package.json ./
# RUN npm install

# FROM node:18 as builder
# WORKDIR /Football-App
# COPY . .
# COPY --from=dependencies /Football-App/node_modules ./node_modules
# RUN npm run build

# FROM node:18 as runner
# WORKDIR /Football-App
# ENV NODE_ENV production

# COPY --from=builder /Football-App/public ./public
# COPY --from=builder /Football-App/package.json ./package.json
# COPY --from=builder /Football-App/.next ./.next
# COPY --from=builder /Football-App/node_modules ./node_modules

# EXPOSE 3000
# CMD ["npm", "start"]

# FROM node:18-alpine as builder
# WORKDIR /src/app

# COPY package*.json ./
# RUN npm ci
# COPY . .
# RUN npm run build

# FROM node:18-alpine as runner
# WORKDIR /src/app
# COPY --from=builder package.json .
# COPY --from=builder package-lock.json .
# COPY --from=builder next.config.js ./
# COPY --from=builder public ./public
# COPY --from=builder .next/standalone ./
# COPY --from=builder .next/static ./.next/static
# EXPOSE 3000
# CMD ["npm", "run", "start"]

FROM node:18-alpine AS build

WORKDIR /football-app/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runtime

WORKDIR /football-app/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=build /football-app/.next ./.next
COPY --from=build /football-app/public ./public

EXPOSE 3000
USER node
CMD ["npm", "start"]