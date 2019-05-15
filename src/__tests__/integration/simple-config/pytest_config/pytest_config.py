import datetime

class TestRun:
    _has_run = False
    _ran_at = None

    def has_run(self):
        return self._has_run

    def last_run(self):
        return self._ran_at
    
    def execute_run(self):
        self._has_run = True
        self._ran_at = datetime.datetime.now()
