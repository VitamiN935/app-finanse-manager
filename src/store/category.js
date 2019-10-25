import firebase from 'firebase'

export default {
  actions: {
    async createCategory({commit, dispatch}, data) {
      try {
        const uid = await dispatch('getUId');
        const category = await firebase.database().ref(`/users/${uid}/categories`).push(data).once('value');
        return {...category.val(), id: category.key};
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },

    async fetchCategories({commit, dispatch}) {
      try {
        const uid = await dispatch('getUId');
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val();
        return Object.keys(categories).map(key => ({...categories[key], id: key}));
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },

    async categoryById({commit, dispatch}, id) {
      try {
        const uid = await dispatch('getUId');
        const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value'));
        return {...category.val(), id: category.key};
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },

    async updateCategory({commit, dispatch}, {id, title, limit}) {
      try {
        const uid = await dispatch('getUId');
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title, limit})
        return await dispatch('categoryById', id);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    }
  }
}