[![NPM Package][npm_img]][npm_site]
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

1. Make shared reducer mergeable
2. Customize it by calling `merge()` method
3. That's it! :zap:

Wrap your reducer with `mergeable` function.

```es6
import mergeable from 'redux-merge-reducers';

function baseReducer(state = { ... }, action) {
  // ...
}

export default mergeable(baseReducer);
```

Call `merge()` method with the extra reducer.

```es6
import baseReducer from '...';

function extraReducer(state, action) {
  // ...
}

export default combineReducers({
  foo, bar, baseReducer.merge(extraReducer)
});
```

### Notice

The extra reducer will be called before the original.
The original reducer takes the new state which is produced by the extra.

## API

### `mergeable(reducer)`

+ `reducer` *(`function`)* **[required]** :

## License

MIT

## Author

Yuki Kodama / [@kuy](https://twitter.com/kuy)

[npm_img]: https://img.shields.io/npm/v/redux-merge-reducers.svg
[npm_site]: https://www.npmjs.org/package/redux-merge-reducers
[david_img]: https://img.shields.io/david/kuy/redux-merge-reducers.svg
[david_site]: https://david-dm.org/kuy/redux-merge-reducers
