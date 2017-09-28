FROM mhart/alpine-node:8
ENV NODE_ENV production
RUN mkdir -p /root/challengeoftheday
COPY ./build /root/challengeoftheday/
COPY ./package.json /root/challengeoftheday/package.json
WORKDIR /root/challengeoftheday
RUN echo "0 11 * * *  node /root/challengeoftheday/index.js >> /var/log/challenge.log 2>&1 " >> /etc/crontabs/root
RUN npm install
ENTRYPOINT ["crond", "-f"]
