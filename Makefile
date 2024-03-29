CONTAINER_ID := `docker-compose ps -q new-world-front-app`

docker_build:
	@docker-compose build
up:
	@mutagen-compose up -d
down:
	@mutagen-compose down
yarn:
	@docker-compose exec new-world-front-app yarn
dev:
	@docker-compose exec new-world-front-app yarn dev
build:
	@docker-compose exec new-world-front-app yarn build
lint:
	@docker-compose exec new-world-front-app yarn lint
lint_fix:
	@docker-compose exec new-world-front-app yarn lint:fix
cp_node_modules:
	rm -rf ./node_modeules
	docker cp $(CONTAINER_ID):/code/node_modules ./
bash:
	@docker-compose exec new-world-front-app /bin/bash

