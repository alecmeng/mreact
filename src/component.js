import { render, getDomFromVNode, } from './render';

export function Component(props, context) {
  this.props = props;
	this.context = context;
}

Component.prototype = {
  setState(state, cb) {
    const s = Object.assign({}, this.state, state);
    this.state = this._nextState = s;

    const newEl = getDomFromVNode(this.render());
    const parent = this._dom.parentNode;
    parent.replaceChild(newEl, this._dom);
    newEl._inst = this;
    this._dom = newEl;
  },
  forceUpdate(cb) {
  },
  render() {
    throw 'must implement render'
  },
};