setup:
	docker volume create --name=xendit-data
	cd container && docker-compose -p xendit-notification up -d

destroy:
	cd container && docker-compose -p xendit-notification down

build:
	cd container && docker-compose build

init:
	docker exec -ti notification-service npm install

test:
	docker exec -ti notification-service npm test