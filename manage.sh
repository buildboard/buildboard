#!/usr/bin/env sh

if env | grep -q ^MONGO_PORT_27017_TCP_ADDR=
then
    echo "$(date) - try to connect"
    while ! curl http://mongo:27017/
    do
        sleep 1
    done
    echo "$(date) - connected successfully"
fi

case "$1" in
  run-server)
    yarn start
    ;;
  *)

        echo "Usage: manage.sh {run-server}"
        exit 1
esac

exit 0