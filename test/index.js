import 'babel-polyfill';
import assert from 'power-assert';
import mergeable from '../src';

describe('mergeable', () => {
  it("makes given reducer mergeable", () => {
    const reducer = () => {};
    assert(typeof reducer.original === 'undefined');
    assert(typeof reducer.merge === 'undefined');

    assert(mergeable(reducer) === reducer);
    assert(reducer.original === reducer);
    assert(typeof reducer.merge === 'function');
  });
});
