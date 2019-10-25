export default {
  bind(el, {value}) {
    M.Tooltip.init(el, {html: value});
  },

  unbind(el) {
    const instanse = M.Tooltip.getInstance(el);
    instanse.destroy();
  }
}