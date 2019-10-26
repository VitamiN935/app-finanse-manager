<template>
  <ul class="sidenav app-sidenav" :class="{open: isOpenSidebar}">
    <router-link 
    v-for="link of links"
    :key="link.title"
    tag="li"
    :to="link.url"
    >
      <a href="#" class="waves-effect waves-green pointer">{{link.title}}</a>
    </router-link>
  </ul>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'sidebar',

  props: {
    isOpenSidebar: Boolean
  },

  data() {
    return {
      links: [
        {title: localizeFilter("MenuHome"), url: '/'},
        {title: localizeFilter("MenuHistory"), url: '/history'},
        {title: localizeFilter("MenuPlanning"), url: '/planning'},
        {title: localizeFilter("MenuNewRecord"), url: '/record'},
        {title: localizeFilter("MenuCategories"), url: '/categories'},
      ]
    }
  },
}
</script>