import firebase from 'firebase/app'

export default {
  actions: {
    async login({email, password}) {
      await firebase.auth().signInWithEmailAndPassword(email,password);
    }
  }
}