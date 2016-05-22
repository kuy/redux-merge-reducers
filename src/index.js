export default function mergeable(reducer) {
  reducer.original = reducer;
  reducer.merge = function merge(extra) {
    const original = this.original;
    return function wrapper(state, action) {
      const newState = extra(state, action);
      if (typeof state === 'undefined') {
        // Merge initial state
        const initial = original(undefined, { type: undefined });
        return { ...initial, ...newState };
      } else {
        return original(newState, action);
      }
    };
  }
  return reducer;
}
