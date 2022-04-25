export function createActionTypes(type) {
  return [type, `${type}_SUCCESS`, `${type}_FAILURE`];
}