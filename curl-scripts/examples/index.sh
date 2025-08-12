#!/bin/bash

# Determine API base URL based on hostname
if [[ "$(hostname)" == "Users-MacBook-Pro.local" ]]; then
  API="http://localhost:8000"
else
  API="https://re-art-server.onrender.com"
fi

URL_PATH="/examples"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
