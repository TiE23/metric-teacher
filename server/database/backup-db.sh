#!/usr/bin/env bash

# This script backs up the acme.json to a folder /backups (not included in git) and names the file
# db_example.com_2019-01-01_11-35-05_manual.sql

# Example cron job (every 8 hours):
# 00 */8 * * * cd ~/git/metric-teacher/server/database && sh backup-db.sh db.metric-teacher.com cron

if [[ $# -eq 0 ]]; then
  echo "Run with destination domain name as argument"
  exit 1
fi

# Yes, raw password because a hacker would need to get past firewall and layers of auth to even get to this point.
ssh ubuntu@$1 sudo docker exec database_db_1 bash -c "mysqldump --default-character-set=utf8mb4 -u root --password=prisma --all-databases > backup.sql"

DB_CONTAINER_ID=`ssh ubuntu@$1 sudo docker ps -q -f "name=database_db_1"`

# Copy backup from container to host
ssh ubuntu@$1 sudo docker cp $DB_CONTAINER_ID:backup.sql backup.sql

# Using UTC Timestamp
# By the way, the directory backups/ is a symlink to a good backup location for me.
if [[ -z $2 ]]; then
  BACKUP_LOCATION=backups/db_$1_`date -u +%Y-%m-%d_%H-%M-%S`_manual.sql
else
  # Second arg can give it an extra suffix. For example, in cron I have it say "..._cron.sql"
  BACKUP_LOCATION=backups/db_$1_`date -u +%Y-%m-%d_%H-%M-%S`_$2.sql
fi

scp ubuntu@$1:backup.sql $BACKUP_LOCATION

echo "Backup complete: $BACKUP_LOCATION"

# I'm not going to write a script for restoring because I don't ever want to do it by accident.
# The command to copy the file over
#   docker cp backup-file.sql <CONTAINER_ID>:backup-file.sql
# The command to restore it after bashing into the container:
#   mysql --default-character-set=utf8mb4 -u root --password=prisma < backup-file.sql
