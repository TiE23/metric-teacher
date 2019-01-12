#!/usr/bin/env bash
# This script is symlinked in ./client/traefik and ./server/traefik

# This script backs up the acme.json to a folder /backups (not included in git) and names the file
# acme_example.com_2019-01-01_11-35-05_manual.json

# Example cronjob (every night at 12:05 am):
# 05 0 * * * cd /path/to/this/directory && sh backup-acme.sh metric-teacher.com cron /path/to/id_rsa

if [[ $# -eq 0 ]]; then
  echo "Run with destination domain name (or IP that you can SSH) as argument"
  exit 1
fi

if [[ $2 = "cron" ]] && [[ ! -z $3 ]]; then
  SSH_OPTIONS="-i $3"
  echo "Using -i $3"
else
  SSH_OPTIONS=""
fi

# Using UTC Timestamp
# By the way, the directory backups/ is a symlink to a good backup location for me.
if [[ -z $2 ]]; then
  BACKUP_LOCATION=backups/acme_$1_`date -u +%Y-%m-%d_%H-%M-%S`_manual.json
else
  # Second arg can give it an extra suffix. For example, in cron I have it say "..._cron.json"
  BACKUP_LOCATION=backups/acme_$1_`date -u +%Y-%m-%d_%H-%M-%S`_$2.json
fi

scp ${SSH_OPTIONS} -p ubuntu@$1:acme.json $BACKUP_LOCATION

echo "Backup complete: $BACKUP_LOCATION"
