<template>
  <div id="wrapper">
    <component :is="isLayout"></component>
  </div>
</template>

<script>
import Empty from '@/layouts/EmptyLayout'
import Main from '@/layouts/MainLayout'

export default {
  name: 'app',

  components: {
    Main,
    Empty
  },

  computed: {
    isLayout() {
      return this.$route.meta.layout || 'Empty'
    }
  }
}
</script>

<style lang="scss">
@import '~materialize-css/sass/materialize.scss';
@import '@/assets/style.scss';
</style>