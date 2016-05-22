[![NPM Package][npm_img]][npm_site]
[![Travis][ci_img]][ci_site]
[![Dependency Status][david_img]][david_site]

# redux-merge-reducers

A decorator to make your Redux's reducers mergeable.

## For what?

In the development of reusable [Container components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0),
I noticed the importance of shared reducers. Because these are often combined with the different *host* applications,
I can't handle application specific actions in it. The shared reducers should handle only shared actions.

My solution: **Merge**, not **Combine**

`combineReducers` function always join them horizontally, so it can't be used for my purpose.
I needed to chain reducers and make a single reducer.

## Installation

```
npm install --save redux-merge-reducers
```

## Usage

1. Make shared reducers mergeable
2. Merge with the extra reducer
3. That's it :zap:

#### Wrap your reducer with `mergeable()` function.

```es6
import mergeable from 'redux-merge-reducers';

function sharedReducer(state = { ... }, action) {
  // ...
}

export default mergeable(sharedReducer);
```

#### Call `merge()` method with the extra reducer.

```es6
import sharedReducer from '...';

function extraReducer(state = {...}, action) {
  // ...
}

export default combineReducers({
  foo, bar, sharedreducer: sharedReducer.merge(extraReducer)
});
```

#### Without merging

If you want to use shared reducers without customization, you can put mergeable reducers without calling `merge()` method.

```es6
import sharedReducer from '...'; // this reducer is decorated

export default combineReducers({
  foo, bar, sharedReducer // without merging
});
```

#### Merge initial state

The initial state given by the extra reducer should be merged with the shared one.

```es6
function sharedReducer(state = { a: 0, b: true }, action) {
  // ...
}

function extraReducer(state = { b: false, c: 'hello' }, action) {
  // ...
}

// => { a: 0, b: false, c: 'hello' }
```

Be careful that the extra reducer's initial state has a priority over the shared one.

#### Caveat

The extra reducer will be called before the original.
The shared reducer takes the new state which is produced by the extra.

## API

redux-merge-reducers exports one function.

### `mergeable(reducer)`

+ `reducer` *(function)* **[required]** : a reducer function you want to make it mergeable.

## License

MIT

## Author

Yuki Kodama / [@kuy](https://twitter.com/kuy)

[npm_img]: https://img.shields.io/npm/v/redux-merge-reducers.svg
[npm_site]: https://www.npmjs.org/package/redux-merge-reducers
[ci_img]: https://img.shields.io/travis/kuy/redux-merge-reducers/master.svg?style=flat-square
[ci_site]: https://travis-ci.org/kuy/redux-merge-reducers
[david_img]: https://img.shields.io/david/kuy/redux-merge-reducers.svg
[david_site]: https://david-dm.org/kuy/redux-merge-reducers
