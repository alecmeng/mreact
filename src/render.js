import { handleProps } from './props';
export function render(vnode, parentDom) {
  const domEl = getDomFromVNode(vnode);
  if(!domEl) return;
  parentDom.appendChild(domEl);
}

export function getDomFromVNode(vnode) {
  // console.log('---vnode---', vnode);
  const vtype = typeof vnode;
  if (vtype === 'string' || vtype === 'number') {
    return document.createTextNode(vnode);
  }
  if (vtype === 'boolean' || vnode === null) {
    return null;
  }
  const {
    type,
    props,
  } = vnode;
  let children = props && props.children;
  let el;
  if (typeof type === 'string') {
    // 创建完之后，绑定属性
    el = document.createElement(type);
    handleProps(el, props);
    if (children) {
      if (!Array.isArray(children)) {
        children = [children];
      }
      children.forEach((child) => {
        const childEl = getDomFromVNode(child);
        if (childEl) {
          el.appendChild(childEl);
        }
      })
    }
    return el;
  } else if (typeof type === 'function') {
    // component node
    const inst = new type(props);
    const vnode = inst.render();
    // console.log('vnode', vnode);
    const el = getDomFromVNode(vnode);
    if (!el) return null;
    el._inst = inst;
    inst._dom = el;
    inst._vnode = inst._oldVnode = vnode;
    return el;
  } else {
    return null;
  }
}
