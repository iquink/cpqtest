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
        names: names.map((item: { value: string; locale: string }) => {
          const { value, locale } = item;

          return {
            value,
            locale,
          };
        }),
        type,
      });
    },
    deleteInput(state: IState, { id }) {
      const input = state.mainFormInputs.find((item) => item.id === id);
      state.mainFormInputs = state.mainFormInputs.filter(
        (value) => value !== input
      );
    },
  },
  actions: {},
  modules: {},
});
