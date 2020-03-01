export function createOnChange(setter) {
  return function(e) {
    setter(e.target.value);
  };
}
