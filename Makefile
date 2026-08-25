.PHONY: all install build start test clean

all: install build

install:
	npm install

build:
	npm run build

start:
	npm run start

dev:
	npm run dev

test:
	npm run test

clean:
	rm -rf dist build .next
