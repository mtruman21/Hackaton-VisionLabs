#!/bin/bash
FILELOG=tunnel_logfile.txt
FILECMD=tunnel.command
FLAG=--print-requests
TEL_TOKEN=$(cat .env | grep TELEGRAM_TOKEN= | sed 's/TELEGRAM_TOKEN=//')


echo "lt -p 3333 $FLAG | (tee -i $PWD/$FILELOG)" > $FILECMD;
chmod +x $FILECMD;
open $FILECMD;


OLD_URL=$(head -n 1 $FILELOG);
while [ -z "$NEW_URL" ] || [ "$NEW_URL" == "$OLD_URL" ];
do
  NEW_URL=$(head -n 1 $FILELOG);
  sleep 1;
done


TUNNEL_URL=$(head -n 1 $FILELOG | sed "s/your url is: //" | sed "s/$/\/tel/");
echo $TUNNEL_URL;
curl --request POST \
  --url https://api.telegram.org/bot"$TEL_TOKEN"/setWebhook \
  --header 'Content-Type: application/json' \
  --header 'cache-control: no-cache' \
  --data '{"url": "'"$TUNNEL_URL"'"}';
echo ;
