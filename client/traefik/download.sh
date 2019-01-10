#!/usr/bin/env bash

if [[ $# -eq 0 ]]; then
  echo "Run with destination domain name as argument";
  exit 1;
fi

scp -p ubuntu@${1}:acme.json acme.json.bak;
