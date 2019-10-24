export default {
  install(Vue) {
    Vue.prototype.$message = function(html, classes ="green lighten-1") {
      M.toast({html, classes});
    };

    Vue.prototype.$error = function(html, classes = 'grey darken-3') {
      M.toast({html: `[Ошибка]: ${html}`, classes});
    };
  }
}