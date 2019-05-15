from . import pytest_config

runner = pytest_config.TestRun()

def pytest_runtest_setup(item):
    runner.execute_run()