#!/bin/bash

# Determine API base URL based on hostname
if [[ "$(hostname)" == "Users-MacBook-Pro.local" ]]; then
  API="http://localhost:8000"
else
  API="https://re-art-server.onrender.com"
fi

URL_PATH="/examples"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
    "example": {
      "text": "'"${TEXT}"'"
    }
  }'

echo
