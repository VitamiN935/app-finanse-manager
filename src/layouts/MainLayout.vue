<template>
  <div>
    <Loader v-if="loading"/>
    <div class="app-main-layout" v-else>
      <Navbar @changeIsOpen="isOpenSidebar = !isOpenSidebar" />
      <Sidebar :isOpenSidebar="isOpenSidebar" :key="info.locale || 'ru-RU'"/>

      <main class="app-content" :class="{full: !isOpenSidebar}">
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
import Loader from "@/components/app/Loader";
import messages from "@/plugins/messages";
import { mapGetters } from "vuex";

export default {
  name: "mainlayout",

  components: {
    Navbar,
    Sidebar,
    Loader
  },

  data() {
    return {
      isOpenSidebar: true,
      loading: true
    };
  },

  computed: {
    ...mapGetters(["error", 'info'])
  },

  watch: {
    error(error) {
      this.$error(
        messages[error.code] || "Что-то пошло не так",
        "grey darken-3"
      );
      console.log(error);
    }
  },

  async mounted() {
    await this.$store.dispatch("fetchInfo");
    this.loading = false;
  }
};
</script>