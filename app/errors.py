

class ValidationException(Exception):
    """ Inappropriate argument value (of correct type). """

    def __init__(self, validation_result): # real signature unknown
        self.result = validation_result
        pass