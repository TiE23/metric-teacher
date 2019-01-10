#!/usr/bin/env bash
# This script is symlinked in ./client/traefik and ./server/traefik

if [[ $# -eq 0 ]]; then
  echo "Run with destination domain name as argument"
  exit 1
fi

# Using UTC Timestamp
# By the way, the directory backups/ is a symlink to a good backup location for me.
if [[ -z $2 ]]; then
  BACKUP_LOCATION=backups/acme_$1_`date -u +%Y-%m-%d_%H-%M-%S`_manual.json
else
  BACKUP_LOCATION=backups/acme_$1_`date -u +%Y-%m-%d_%H-%M-%S`_$2.json
fi

scp -p ubuntu@${1}:acme.json $BACKUP_LOCATION

echo "Backup complete: $BACKUP_LOCATION"
