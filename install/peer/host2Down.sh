docker-compose -f host2.yaml down --volume --remove-orphans
docker container stop $(docker container ls -aq)
docker container prune -f
docker rm $(docker ps -aq)
docker rmi $(docker images dev-* -q)
docker volume prune -f