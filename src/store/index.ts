import { createStore } from "vuex";

interface IMainFormInput {
  id: number;
  names: string[];
  type: string;
}

interface IState {
  mainFormInputs: IMainFormInput[];
}

export default createStore({
  state() {
    return {
      mainFormInputs: [],
    };
  },
  mutations: {
    addNewInput(state: IState, { names, type }) {
      state.mainFormInputs.push({
        id: state.mainFormInputs.length + 1,
        names,
        type,
      });
    },
  },
  actions: {},
  modules: {},
});
