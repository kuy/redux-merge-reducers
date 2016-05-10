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

describe('mergeable.merge', () => {
  const initial = { foo: 0, bar: false };
  const extra = (state, action) => {
    switch (action.type) {
    case 'BAR':
      return { ...state, bar: !state.bar };
    }
    return state;
  };
  let shared;

  beforeEach(() => {
    shared = mergeable((state = initial, action) => {
      switch (action.type) {
      case 'FOO':
        return { ...state, foo: state.foo + 1 };
      }
      return state;
    });
  });

  it("returns merged reducer", () => {
    const merged = shared.merge(extra);
    assert(merged !== shared);
    assert(merged !== extra);

    const s0 = merged(undefined, { type: '@@INIT' });
    assert.deepEqual(s0, { foo: 0, bar: false });

    const s1 = merged(s0, { type: 'FOO' });
    assert.deepEqual(s1, { foo: 1, bar: false });

    const s2 = merged(s1, { type: 'BAR' });
    assert.deepEqual(s2, { foo: 1, bar: true });
  });

  it("can be used without merging", () => {
    const s0 = shared(undefined, { type: '@@INIT' });
    assert.deepEqual(s0, { foo: 0, bar: false });

    const s1 = shared(s0, { type: 'FOO' });
    assert.deepEqual(s1, { foo: 1, bar: false });

    const s2 = shared(s1, { type: 'BAR' });
    assert.deepEqual(s2, { foo: 1, bar: false });
  });
});
