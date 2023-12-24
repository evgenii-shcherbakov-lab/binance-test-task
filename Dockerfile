FROM node:18-alpine
WORKDIR /app
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
RUN npm ci --silent
COPY . /app
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
