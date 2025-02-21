#!/bin/sh

DB_PATH="/sqlite_db_data/auth_service.sqlite"

# Ensure the SQLite database file exists
echo "Checking SQLite file at $DB_PATH..."
if [ ! -f "$DB_PATH" ]; then
    echo "Creating new SQLite database at $DB_PATH"
    touch "$DB_PATH"
else
    echo "SQLite database already exists."
fi

# Run Flyway migrations
echo "Running Flyway migrations for SQLite"
flyway migrate -url=jdbc:sqlite:$DB_PATH -locations=filesystem:/flyway/sql/sqlite
echo "Running Flyway migrations for Postgres"
flyway migrate -url=jdbc:postgresql://auth_service_db:5432/auth_db -user=auth_user -password=securepassword -locations=filesystem:/flyway/sql/pg

