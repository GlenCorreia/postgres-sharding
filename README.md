# Sharding in Postgres

1. Create init.db file.
2. Create Dockerfile.
3. Build the Docker image from Dockerfile. Run command `docker build -t pgshard .`.
4. Run Docker images pgshard. Command (shard1) -> `docker run --name pgshard1 -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=mydb -p 5432:5432 -d pgshard`.
5. Spin up another shards on port 5433 and port 5434. Same command as above, just replace name and ports. Command (shard2) -> `docker run --name pgshard2 -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=mydb -p 5433:5432 -d pgshard`. Command (shard3) -> `docker run --name pgshard3 -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=mydb -p 5434:5432 -d pgshard`.
6. Open these shards in pgadmin.

### Shards running in Docker
![Running Shards](/imgs/shards.png)

### Shards in pgadmin
![Pgadmin Shards](/imgs/shards-in-pgadmin.png)