export default {
  setToken(state, payload) {
    state.token = payload.token;
  },
  logout(state) {
    state.token = null;
  },
};
