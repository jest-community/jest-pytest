---
id: overview
title: Overview
sidebar_label: Overview
---

`jest-pytest` is a way to use Jest, the test platform from Facebook, with Pytest - a popular Python test infrastructure.

If you're a Pythonista, using Jest with Python will unlock a modern, cutting-edge testing experience for your workflow, making your tests run faster and welcoming you to join the huge amount of people already using Jest for their front-end, React and Node.js workflows.

## How it Works

Essentially `jest-pytest` is a couple modules, each taking care of the two sides: Javascript (Jest), and Python (Pytest). We install them both.

First the Pytest plugin:

```
$ pip install pytest-jest
```

For Python, I've used `pip` directly, but feel free to use `pipenv` / `poetry` / `flit` and so on, what ever you prefer to maintain dependencies. Pytest will pick this plugin up once it exists in your environment.

And then our Pytest Jest runner:

```
$ yarn add --dev jest-pytest
```

If you don't have a `package.json` set up, here's how:

```
$ yarn init && yarn add --dev jest
```

Finally, we'll configure our project to use this runner and let Jest know how to find tests (some use the pattern `test_*.py` and some prefer `*_test.py`, what ever it is - we can configure it).

```json
"jest": {
    "moduleFileExtensions": ["py"],
    "runner": "jest-pytest",
    "testPathIgnorePatterns": [],
    "testMatch": ["**/test_*.py"]
}
```

Done!

## Using Jest

I can't recommend enough to look at the [Jest](https://facebook.github.io/jest/) website, because this tool has a lot to offer; not only you unlock a great development experience but a whole community and extra tooling.

Either way, here's a quick starter for you to use. To run your test normally:

```
$ yarn jest
```

To run in interactive mode (if you're unfamiliar with Jest, this will be mind blowing):

```
$ yarn jest --watch
```

Go forth and experiment!
