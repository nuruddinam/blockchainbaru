#!/bin/bash
docker-compose -f host1.yaml down -v
docker rmi $(docker images 'dev-*' -q)