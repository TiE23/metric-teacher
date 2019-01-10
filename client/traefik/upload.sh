#!/usr/bin/env bash

if [[ ! -f "acme.json" ]]; then
  echo "acme.json doesn't exist!";
  exit 1;
fi

if [[ $# -eq 0 ]]; then
  echo "Run with destination domain name as argument";
  exit 1;
fi

scp -p acme.json traefik.toml ubuntu@${1}:~/;
