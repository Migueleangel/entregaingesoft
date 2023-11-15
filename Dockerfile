FROM node:18-alpine

WORKDIR /usr/app

COPY index.mjs .
COPY package.json .
COPY package-lock.json .
COPY /src ./src/

ENV MONGO_URI mongodb+srv://miguelsotelo:fitnesvip1@cluster0.efkqoyw.mongodb.net/?retryWrites=true&w=majority
ENV PORT 5001
<<<<<<< HEAD
ENV MINIO_HOST http://localhost:9000
ENV MINIO_ACESS_KEY migueleangel
=======
ENV MINIO_HOST http://minio:9000
ENV MINIO_ACCESS_KEY migueleangel
>>>>>>> 5f9df42065f85f614cf0b6a1a98f1b3b162f391d
ENV MINIO_SECRET_KEY fitnesvip1
EXPOSE 5001

RUN npm install --production

ENTRYPOINT [ "npm","start" ]