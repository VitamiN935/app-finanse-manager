<template>
  <ul class="sidenav app-sidenav open">
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
export default {
  name: 'sidebar',

  data() {
    return {
      links: [
        {title: 'Счет', url: '/'},
        {title: 'История', url: '/history'},
        {title: 'Планирование', url: '/planning'},
        {title: 'Новая запись', url: '/record'},
        {title: 'Категории', url: '/categories'},
      ]
    }
  },
}
</script>