#!/usr/bin/env bash

if [[ $# -eq 0 ]]; then
  echo "Run with destination domain name as argument";
  exit 1;
fi

if [[ ! -f "acme.json" ]]; then
  echo "acme.json doesn't exist so we're not uploading it";
else
  echo "acme.json exists so we're uploading it";
  scp -p acme.json ubuntu@${1}:~/;
fi

if [[ ! -f "traefik.toml" ]]; then
  echo "traefik.toml doesn't exist so we're not uploading it";
else
  echo "traefik.toml exists so we're uploading it";
  scp -p traefik.toml ubuntu@${1}:~/;
fi
