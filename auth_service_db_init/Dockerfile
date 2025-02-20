FROM flyway/flyway:latest

RUN mkdir -p /flyway/scripts
RUN mkdir -p /sqlite_db_data
RUN mkdir -p /flyway/sql

COPY ./init_sqlite.sh /flyway/scripts

COPY ./migrations /flyway/sql

RUN chmod +x /flyway/scripts/init_sqlite.sh

# Set the init script as the entrypoint (runs before CMD)
#ENTRYPOINT ["/bin/sh", "/flyway/scripts/init_sqlite.sh"]

# Run Flyway as the final command
#CMD ["migrate", "-url=jdbc:sqlite:/sqlite_db_data/auth_service.sqlite", "-locations=filesystem:/flyway/sql"]
# Set init script as entrypoint
ENTRYPOINT ["/bin/sh", "/flyway/scripts/init_sqlite.sh"]