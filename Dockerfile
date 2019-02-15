FROM node:11.9.0-alpine
ENV NODE_ENV production
RUN mkdir -p /root/challengeoftheday
COPY ./build /root/challengeoftheday/
COPY ./package.json /root/challengeoftheday/package.json
COPY ./config.js /root/challengeoftheday/config.js
WORKDIR /root/challengeoftheday
RUN echo "0 11 * * *  node /root/challengeoftheday/index.js" >> /etc/crontabs/root
RUN npm install
ENTRYPOINT ["crond", "-f"]
