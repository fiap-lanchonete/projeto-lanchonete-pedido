.PHONY: dev test

dev:
	docker compose up api db-pedido-lanchonete -d

test:
	docker compose up db-pedido-lanchonete-test -d

stop_dev:
	docker compose stop api db-pedido-lanchonete

stop_test:
	docker compose stop db-pedidos-lanchonete-test
