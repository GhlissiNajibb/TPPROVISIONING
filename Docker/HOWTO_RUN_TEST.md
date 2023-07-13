# HowTo run in test

Steps to run the docker in local environment

## Create a network

In docker cmd run:
```
docker network create -d bridge tppostgresnetwork
```

## Create a postgresql instance

In docker cmd run:
```
docker run -itd --network=tppostgresnetwork --net-alias=tppostgresdb -e POSTGRES_USER=postgres -e POSTGRES_DB=postgres -e POSTGRES_PASSWORD=postgres123 --restart=always -d postgres
```

## Check postgres db

Run:
```
docker run -it --rm --network tppostgresnetwork postgres psql -h tppostgresdb -U postgres
```

In postgres cmd, run a command for check the db responde, for example:
```
select 1;
```

If ok run this command for create empty db:
```
CREATE DATABASE "tpdevprovdb"
  WITH OWNER "postgres"
  ENCODING 'UTF8'
  LC_COLLATE = 'en_US.utf8'
  LC_CTYPE = 'en_US.utf8';
```

## Run docker server image

Run you provisioning docker image with:
```
docker run --network=tppostgresnetwork -e PV_DB_HOST=tppostgresdb -e PV_DB_PORT=5432 -e PV_DB_USER=postgres -e PV_DB_PASSWORD=postgres123 -e PV_DB_NAME=tpdevprovdb -p 8080:80 tpitalia3/tpdevprov
```

Open `http://localhost:8080` and check the app

# Clean

## How clean environment

Remove all running docker images, when done this command:
```
docker ls
```
must return not entry

run this to clean all network, volume, container, ..._
```
docker system prune -a
```

After run you local environment is clean, ready to repeat the Steps
