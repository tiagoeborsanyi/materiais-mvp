FROM debian:jessie

# install cron, certbot, bash, plus any other dependencies
RUN apt-get update \
    && apt-get install -y cron bash wget
RUN mkdir -p /webroots/tiagoemerick.com/.well-known /scripts

WORKDIR /scripts
RUN wget https://dl.eff.org/certbot-auto
RUN chmod a+x ./certbot-auto
# Run certbot-auto
RUN /scripts/certbot-auto -n certificates

# /webroots/DOMAIN.TLD/.well-known/ ....
VOLUME /webroots
VOLUME /etc/letsencrypt

# This install a Crontab
# run certbot renew

CMD [ "cron", "-f" ]