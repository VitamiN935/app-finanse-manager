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
    },

    async fetchRecords({commit, dispatch}) {
      try {
        const uid = await dispatch('getUId');
        const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val();
        return Object.keys(records).map(key => ({...records[key], id: key}));
      } catch (e) {
        commit('setError');
        throw e;
      }
    }
  }
}