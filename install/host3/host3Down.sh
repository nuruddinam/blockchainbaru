docker-compose -f host3.yaml down -v
if [ "$(docker images 'dev-*' -q)" ]; then
  docker rmi $(docker images 'dev-*' -q)
else
  echo "No dev-* images found. Skipping removal."
fi