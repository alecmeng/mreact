
export function createElement(type, props, children) {
  // console.log('---type---', type, props, children);
  if (props === null) props = {};
	if (arguments.length>3) {
		children = [children];
		for (let i=3; i<arguments.length; i++) {
			children.push(arguments[i]);
		}
	}
	if (children!=null) {
		props.children = children;
  }
  if (type!=null && type.defaultProps!=null) {
		for (let i in type.defaultProps) {
			if (props[i]===undefined) props[i] = type.defaultProps[i];
		}
	}
	let ref = props.ref;
	if (ref) delete props.ref;
	let key = props.key;
  if (key) delete props.key;
  return createVNode(type, props, key, ref);
}

function createVNode(type, props, key, ref) {
  return {
    type,
    props,
    key,
    ref,
  };
}
