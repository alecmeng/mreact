import { handleProps } from './props';
export function render(vnode, parentDom) {
  const domEl = getDomFromVNode(vnode);
  parentDom.appendChild(domEl);
}

export function getDomFromVNode(vnode) {
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return document.createTextNode(vnode);
  }
  if (typeof vnode === 'boolean') {
    return null;
  }
  const {
    type,
    props,
  } = vnode;
  let children = props && props.children;
  let el;
  if(typeof type === 'string') {
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
    const inst = new type(props);
    const vnode = inst.render();
    const el = getDomFromVNode(vnode);
    el._inst = inst;
    inst._dom = el;
    inst._vnode = vnode;
    return el;
  } else if (type === null){
    el = document.createTextNode(children);
    return el;
  }
}
