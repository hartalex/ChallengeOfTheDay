FROM mhart/alpine-node:8.1.3
RUN mkdir /root/challengeoftheday
COPY . /root/challengeoftheday/
WORKDIR /root/challengeoftheday
RUN echo "0 11 * * *  node /root/challengeoftheday/index.js >> /var/log/challenge.log 2>&1 " >> /etc/crontabs/root
RUN npm install
ENTRYPOINT ["crond", "-f"]
