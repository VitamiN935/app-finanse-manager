import firebase from 'firebase'

export default {
  state: {
    info: {},
  },

  getters: {
    info: state => state.info
  },

  mutations: {
    setInfo(state, info) {
      state.info = info;
    },

    clearInfo(state) {
      firebase.auth().signOut();
      state.info = {};
    }
  },

  actions: {
    async fetchInfo({commit, dispatch}) {
      try {
        const uid = await dispatch('getUId');
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val();
        commit('setInfo', info);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    }
  }
}