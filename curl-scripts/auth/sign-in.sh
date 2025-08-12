#!/bin/bash

# Determine API base URL based on hostname
if [[ "$(hostname)" == "Users-MacBook-Pro.local" ]]; then
  API="http://localhost:8000"
else
  API="https://re-art-server.onrender.com"
fi

URL_PATH="/sign-in"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'"
    }
  }'

echo
