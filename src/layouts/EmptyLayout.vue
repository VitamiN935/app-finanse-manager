<template>
  <div>
    <div class="grey darken-1 empty-layout">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import messages from "@/plugins/messages";

export default {
  name: "emptylayout",

  computed: {
    ...mapGetters(["error"])
  },

  watch: {
    error(error) {
      this.$error(messages[error.code] || 'Что-то пошло не так', "grey darken-3");
      console.log(error);
    }
  }
};
</script>