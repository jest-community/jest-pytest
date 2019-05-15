from pytest_config import runner

def test_runlist():
    assert runner.has_run() == True

def test_not_yet_run():
    assert runner.last_run() != None
