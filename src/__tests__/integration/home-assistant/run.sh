#!/bin/sh
yarn install
pipenv --python 3
pipenv run pip install -q -r requirements_test_all.txt
pipenv run pip install pytest-jest
pipenv run yarn test