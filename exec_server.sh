echo "executing server..."

docker build --tag server-k8s-test:dev .
wait

docker-compose stop server-test
wait

docker-compose up -d server-test