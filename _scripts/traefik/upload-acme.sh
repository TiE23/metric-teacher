#!/usr/bin/env bash
# This script is symlinked in ./client/traefik and ./server/traefik

if [[ $# -eq 0 ]]; then
  echo "Run with destination domain name as argument";
  exit 1;
fi

if [[ ! -f "acme.json" ]]; then
  echo "acme.json doesn't exist!";
  exit 1;
else
  scp -p acme.json ubuntu@${1}:~/;
fi
