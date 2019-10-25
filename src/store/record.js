import firebase from 'firebase'

export default {
  actions: {
    async createRecord({commit, dispatch}, record) {
      try {
        const uid = await dispatch('getUId');
        await firebase.database().ref(`/users/${uid}/records`).push(record);
      } catch (e) {
        commit('setError');
        throw e;
      }
    }
  }
}