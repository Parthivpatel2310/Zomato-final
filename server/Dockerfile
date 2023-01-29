FROM node:alpine

WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . ./

ENV MONGO_URL=mongodb+srv://Parthiv2310:23102003@cluster0.r1dlpfx.mongodb.net/?retryWrites=true&w=majority;
ENV AWS_S3_ACCESS_KEY=parthiv;
ENV AWS_S3_SECRET_KEY=parthiv;
ENV GOOGLE_CLIENT_ID=920593803694-q838bdp5cfaacd30stfibhpapue0f793.apps.googleusercontent.com
ENV GOOGLE_CLIENT_SECRET=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

RUN npm run build
CMD ["npm", "run", "start"]