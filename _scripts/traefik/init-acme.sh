#!/usr/bin/env bash
# This script is symlinked in ./client/traefik and ./server/traefik

if [[ $# -eq 0 ]]; then
  echo "Run with destination domain name as argument";
  exit 1;
fi

touch acme.json;
chmod 600 acme.json;
scp -p acme.json ubuntu@${1}:~/;
rm acme.json;
