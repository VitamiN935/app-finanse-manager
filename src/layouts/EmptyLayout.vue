<template>
  <div>
    <div class="grey darken-1 empty-layout">
      <router-view />
    </div>
  </div>
</template>

<script>
import messages from '@/plugins/messages'

export default {
  name: 'emptylayout',

  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message], 'grey darken-3');
    }
  },
}
</script>