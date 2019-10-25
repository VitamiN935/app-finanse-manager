<template>
  <div>
    <div class="app-main-layout">
      <Navbar @changeIsOpen='isOpenSidebar = !isOpenSidebar'/>
      <Sidebar :isOpenSidebar='isOpenSidebar'/>

      <main 
      class="app-content"
      :class="{full: !isOpenSidebar}"
      >
        <div class="app-page">
          <transition name="componentInMain">
            <router-view />
          </transition>
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";
import { mapGetters } from "vuex";

export default {
  name: "mainlayout",

  components: {
    Navbar,
    Sidebar
  },

  data() {
    return {
      isOpenSidebar: true
    }
  },

  computed: {
    ...mapGetters(["error"])
  },

  watch: {
    error(error) {
      this.$error(messages[error.code] || 'Что-то пошло не так', "grey darken-3");
      console.log(error);
    }
  },

  async mounted() {
    await this.$store.dispatch('fetchInfo');
  },
};
</script>