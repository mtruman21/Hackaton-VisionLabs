#!/bin/bash
TEL_TOKEN=$(cat .env | grep TELEGRAM_TOKEN= | sed 's/TELEGRAM_TOKEN=//')

curl --request GET \
  --url https://api.telegram.org/bot"$TEL_TOKEN"/getWebhookInfo \
  --header 'cache-control: no-cache'
echo ;
