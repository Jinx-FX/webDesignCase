//求和相关的配置
export default {
  namespaced: true,
  actions: {
    addOdd(context, value) {
      if (context.state.sum % 2) {
        context.commit("add", value);
      }
    },
    addWait(context, value) {
      setTimeout(() => {
        context.commit("add", value);
      }, 500);
    },
  },
  mutations: {
    add(state, value) {
      state.sum += value;
    },
    reduce(state, value) {
      state.sum -= value;
    },
  },
  state: {
    sum: 0,
    school: "github",
    subject: "vue",
  },
  getters: {
    bigSum(state) {
      return state.sum * 10;
    },
  },
};
