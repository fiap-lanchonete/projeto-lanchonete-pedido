.PHONY: dev test

dev:
	docker compose up api db-pedido -d

test:
	docker compose up db-pedido-test -d

stop_dev:
	docker compose stop api db-pedido

stop_test:
	docker compose stop db-pedido-test

bash_dev:
	docker exec -it projeto-lanchonete-pedidos-api-1 sh

logs_dev:
	docker logs projeto-lanchonete-pedidos-api-1 --follow
