CONTAINER_ID := `docker-compose ps -q new-world-front-app`

docker-build:
	@docker-compose build
up:
	@docker-compose up -d
down:
	@docker-compose down
yarn:
	@docker-compose exec new-world-front-app yarn
dev:
	@docker-compose exec new-world-front-app yarn dev
build:
	@docker-compose exec new-world-front-app yarn build
prod:
	@docker-compose exec new-world-front-app yarn prod
lint:
	@docker-compose exec new-world-front-app yarn lint
lint-fix:
	@docker-compose exec new-world-front-app yarn lint:fix
cp_node_modules:
	rm -rf ./node_modeules
	docker cp $(CONTAINER_ID):/code/node_modules ./
bash:
	@docker-compose exec new-world-front-app /bin/bash

