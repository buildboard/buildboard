FROM node:7.10.0-alpine
#RUN addgroup -S app && adduser -S -g app app 
#USER app
WORKDIR /buildbaord
COPY . /buildbaord
RUN yarn install
ENV NODE_ENV=production
RUN yarn run build
RUN yarn install
RUN yarn install --production

EXPOSE 3000

ENTRYPOINT ["sh", "manage.sh"]

CMD ["run-server"]