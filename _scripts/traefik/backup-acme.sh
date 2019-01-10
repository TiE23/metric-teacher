#!/usr/bin/env bash
# This script is symlinked in ./client/traefik and ./server/traefik

if [[ $# -eq 0 ]]; then
  echo "Run with destination domain name as argument";
  exit 1;
fi

# Using UTC Timestamp
# By the way, the directory backups/ is a symlink to a good backup location for me.
scp -p ubuntu@${1}:acme.json backups/acme_${1}_`date -u +%Y-%m-%d_%H-%M-%S`.json;
