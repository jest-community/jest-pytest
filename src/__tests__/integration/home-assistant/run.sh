#!/bin/sh
yarn install
pip install -r requirements_all.txt
pip install pytest-jest
yarn test