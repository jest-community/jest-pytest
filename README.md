# jest-pytest

Based on @cpojer's amazing [Jest / Pytest work here](https://github.com/cpojer/pyjest), and adapted to work with pytest snapshots and a custom [JSON pytest reporter](https://github.com/jondot/pytest-jest).

Essentially, it's:

1.  `jest-pytest` to tie up the Jest side.
2.  `pytest-jest` to tailor-fit reporting from the Python side.

## Quick Start

```
$ yarn add jest-pytest
```

To your Python project, add `pytest-jest`:

```
pip install pytest-jest --upgrade
```

Optionally, add [snapshots](https://github.com/syrusakbary/snapshottest):

```
pip install snapshottest
```

And then add a `package.json` file with the following Jest pragma:

```json
  "jest": {
    "moduleFileExtensions": ["py"],
    "runner": "jest-pytest",
    "testPathIgnorePatterns": ["snap_.*\\.py"],
    "testMatch": ["**/?(*_)test.py"]
  }
```

Note that this configuration will work well with Pytest [snapshots](https://github.com/syrusakbary/snapshottest).

# Contributing

Fork, implement, add tests, pull request, get my everlasting thanks and a respectable place here :).

### Thanks:

To all [Contributors](https://github.com/jondot/jest-pytest/graphs/contributors) - you make this happen, thanks!

# Copyright

Copyright (c) 2018 [Dotan Nahum](http://gplus.to/dotan) [@jondot](http://twitter.com/jondot). See [LICENSE](LICENSE.txt) for further details.
