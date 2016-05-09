export default function mergeable(reducer) {
  reducer.original = reducer;
  reducer.merge = function merge() {
    const original = this.original;
    return function wrapper(state, action) {
      const newState = extra(state, action);
      return original(newState, action);
    };
  }
  return reducer;
}
