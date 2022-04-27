CONTAINER_ID := `docker-compose ps -q app`

docker-build:
	@docker-compose build
up:
	@docker-compose up -d
down:
	@docker-compose down
yarn:
	@docker-compose exec app yarn
dev:
	@docker-compose exec app yarn dev
dev-build:
	@docker-compose exec app yarn builddev
prod:
	@docker-compose exec app yarn prod
lint:
	@docker-compose exec app yarn lint
lint-fix:
	@docker-compose exec app yarn lint:fix
cp_node_modules:
	rm -rf ./node_modeules
	docker cp $(CONTAINER_ID):/code/node_modules ./
bash:
	@docker-compose exec app /bin/bash

