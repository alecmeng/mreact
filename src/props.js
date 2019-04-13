export function handleProps(el, props = {}) {
  for (const key in props) {
    if (key.indexOf('on') === 0) {
      const evtType = key.toLowerCase().substr(2);
      el.addEventListener(evtType, props[key], false);
    }
  }
}