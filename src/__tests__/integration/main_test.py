def test_modulemap(snapshot):
    snapshot.assert_match([1, 2, 3])


def test_runlist():
    assert 1 == 1