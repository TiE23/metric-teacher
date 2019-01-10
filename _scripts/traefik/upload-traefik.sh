#!/usr/bin/env bash
# This script is symlinked in ./client/traefik and ./server/traefik

if [[ $# -eq 0 ]]; then
  echo "Run with destination domain name (or IP that you can SSH) as argument"
  exit 1
fi

if [[ ! -f "traefik.toml" ]]; then
  echo "traefik.toml doesn't exist!"
  exit 1
else
  scp -p traefik.toml ubuntu@$1:~/
fi
