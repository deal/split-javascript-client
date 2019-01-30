import proxyquire from 'proxyquire';
import tape from 'tape-catch';
import sinon from 'sinon';

const proxyquireStrict = proxyquire.noCallThru();

const loggerMock = {
  warn: sinon.stub(),
  error: sinon.stub()
};
function LogFactoryMock() {
  return loggerMock;
}
const validateAttributes = proxyquireStrict('../../inputValidation/attributes', {
  '../logger': LogFactoryMock
});

/* We'll reset the history for the next test */
function resetStubs() {
  loggerMock.warn.resetHistory();
  loggerMock.error.resetHistory();
}

const invalidAttributes = [
  [],
  () => {},
  false,
  true,
  5,
  'something',
  NaN,
  -Infinity,
  new Promise(res => res),
  Symbol('asd'),
  null,
  undefined,
  NaN
];

tape('INPUT VALIDATION for Attributes', t => {
  t.test('Should return the passed object if it is a valid attributes map without logging any errors', assert => {
    const validAttributes = { amIvalid: 'yes', 'are_you_sure': true, howMuch: 10 };

    assert.deepEqual(validateAttributes(validAttributes, 'some_method_attrs'), validAttributes, 'It should return the passed map if it is valid.');
    assert.notOk(loggerMock.called, 'Should not log any errors.');

    resetStubs();
    assert.end();
  });

  t.test('Should return false and log error if attributes map is invalid', assert => {
    for (let i = 0; i < invalidAttributes.length; i++) {
      const invalidAttribute = invalidAttributes[i];

      assert.equal(validateAttributes(invalidAttribute, 'test_method'), false, 'Invalid attribute objects should return false.');
      assert.ok(loggerMock.error.calledWithExactly('test_method: attributes must be a plain object.'), 'The error should be logged for the invalid attributes map.');

      loggerMock.error.resetHistory();
    }

    resetStubs();
    assert.end();
  });
});
