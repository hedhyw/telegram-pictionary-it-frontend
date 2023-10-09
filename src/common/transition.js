const addEndListener = (node, done) => node.addEventListener('transitionend', done, false);

export default addEndListener;
