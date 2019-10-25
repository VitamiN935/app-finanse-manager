import firebase from 'firebase/app'

export default {
  actions: {
    async login({ commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },

    async register({ commit, dispatch }, { email, password, name, money, locale }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch('getUId');
        await firebase.database().ref(`/users/${uid}/info`).set({ name, money, locale });
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },

    getUId({ commit }) {
      try {
        const uid = firebase.auth().currentUser.uid;
        return uid ? uid : null;
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    }
  }
}