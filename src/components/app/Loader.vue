<template>
  <div class="app-loader">
    <div class="preloader-wrapper active">
      <div class="spinner-layer" :class="colored">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader',

  computed: {
    colored() {
      const colors = ['spinner-blue-only','spinner-green-only','spinner-red-only'];
      return colors[~~(Math.random() * colors.length)];
    }
  },
}
</script>