export default {
  install(Vue) {
    Vue.protype.$message = function(html, classes ="green lighten-1") {
      M.toast({html, classes});
    };

    Vue.prototype.$error = function(html, classes = 'grey darken-1') {
      M.toast({html: `[Ошибка]: ${html}`, classes});
    };
  }
}