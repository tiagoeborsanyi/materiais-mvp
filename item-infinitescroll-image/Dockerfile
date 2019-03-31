FROM node:latest

ENV PORT="5000"
ENV DEBUG="server:*"

RUN apt-get update -y \
    && apt-get -y install curl python build-essential git ca-certificates

# RUN mkdir -p 

COPY . /

WORKDIR /
RUN npm install --unsafe-perm

EXPOSE 5000
CMD [ "node", "server.js" ]