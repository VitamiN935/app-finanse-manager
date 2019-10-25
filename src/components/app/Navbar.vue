<template>
  <nav class="navbar green lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('changeIsOpen')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{date | date('datetime')}}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a class="dropdown-trigger black-text" href="#" data-target="dropdown" ref="trigger">
            {{info.name}}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'navbar',

  data() {
    return {
      date: new Date(),
      dateIdInterval: null,
      dropdown: null
    }
  },

  computed: {
    ...mapGetters(['info'])
  },

  mounted() {
    this.dateIdInterval = setInterval(() => this.date = new Date(), 1000);
    this.dropdown = M.Dropdown.init(this.$refs.trigger);
  },

  beforeDestroy() {
    clearInterval(this.dateIdInterval);
    if (this.dropdown && this.dropdown.destroy) this.dropdown.destroy();
  },

  methods: {
    logout() {
      this.$router.push('/login?message=logout');
      this.$store.commit('clearInfo');
    }
  },
}
</script>