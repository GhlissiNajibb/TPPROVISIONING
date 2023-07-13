# HowTo

Steps to produce a docker test environment

## Install docker

Install docker desktop on you pc, when ready open docker command line and run:
```
docker run --rm hello-world
```

If the command work you are ready to use docker

## build docker C# backend

cd in C#/Server directory, where the server `Dockerfile` il located and run:
```
docker build -t tpitalia3/tpdevprovbackend .
```

to make docker of the server part

check at the end with:
```
docker image ls
```

that the `tpitalia3/tpdevprovbackend` is generated

## build docker angular frontend

cd in angular directory, where the client `Dockerfile` il located and run:
```
docker build -t tpitalia3/tpdevprovfrontend .
```

Check if image is created

## build complete docker

cd in `Docker\docker_tpdevprov`, where full `Dockerfile` is located and run:
```
docker build -t tpitalia3/tpdevprov .
```

to upload to docker hub run:
```
docker push tpitalia3/tpdevprov
```
