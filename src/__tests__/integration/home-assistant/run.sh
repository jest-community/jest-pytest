#!/bin/sh
yarn install
pip install --user -r requirements_all.txt
pip install --user pytest-jest
yarn test