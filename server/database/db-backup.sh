#!/usr/bin/env bash

# Yes, raw password because a hacker would need to get past firewall and layers of auth to even get to this point.
docker exec database_db_1 bash -c "mysqldump --default-character-set=utf8mb4 -u root --password=prisma --all-databases > backup.sql"

DB_CONTAINER_ID=`docker ps -q -f "name=database_db_1"`

# Using UTC Timestamp
# By the way, the directory backups/ is a symlink to a good backup location for me.
docker cp $DB_CONTAINER_ID:backup.sql backups/backup_`date -u +%Y-%m-%d_%H-%M-%S`.sql

# I'm not going to write a script for restoring because I don't ever want to do it by accident.
# But here is the command to run when you've copied the file over and accessed bash on the container:
# mysql --default-character-set=utf8mb4 -u root --password=prisma < backup-file.sql
