.DEFAULT_GOAL:=help
CUR_DIR:=$$(pwd)
CONTAINER_NAME=qa-e2e-tests
TEST_CAFE_BIN=/usr/local/bin/testcafe.sh

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Install NPM on the container (this step is only necessary the first time)
	docker exec -it ${CONTAINER_NAME} bash -c 'npm install; npm cache clean --force'

tests-payment: ## Run payment end2end tests on your host
	docker exec -it ${CONTAINER_NAME} bash -c "${TEST_CAFE_BIN} --domain=payment --is-browser-stack=false --headless=false"
	
tests-payment-headless: ## Run payment end2end tests on the container in headless mode
	docker exec -it ${CONTAINER_NAME} bash -c "${TEST_CAFE_BIN} --domain=payment --is-browser-stack=false --headless=true"

lint: ## Run lint on the project (without applying the fix)
	docker exec -it ${CONTAINER_NAME} npm run lint

lint-fix: ## Run lint on the project and apply the fixes
	docker exec -it ${CONTAINER_NAME} npm run lint-fix