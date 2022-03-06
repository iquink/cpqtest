import { createStore } from "vuex";
import { saveData } from "../api";

export interface IMainFormInput {
  id: number;
  names?: { [key: number]: string };
  type: string;
}

interface IState {
  mainFormInputs: IMainFormInput[];
  networkStatus: string;
  calculationData: IMainFormInput[][];
}

export interface IRequestData {
  id: number;
  value: string | number;
  names?: { [key: number]: string };
}

export default createStore({
  state() {
    return {
      mainFormInputs: [],
      networkStatus: navigator.onLine ? "online" : "offline",
      calculationData: [],
    };
  },
  mutations: {
    clearForm(state: IState) {
      state.mainFormInputs = [];
    },
    updateCalculationTable(state: IState, data) {
      state.calculationData.push(data);
    },
    initOnlineStatus(state: IState) {
      window.addEventListener("online", updateOnlineStatus);
      window.addEventListener("offline", updateOnlineStatus);

      function updateOnlineStatus(): void {
        state.networkStatus = navigator.onLine ? "online" : "offline";
      }
    },
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
  actions: {
    saveData({ commit, state }, data: IRequestData[]) {
      if (state.networkStatus === "online") {
        const requestData: { [key: number]: string | number } = {};

        data.forEach((item: { id: number; value: string | number }) => {
          const value = item.value;

          requestData[item.id] =
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            !isNaN(parseFloat(value)) && isFinite(value)
              ? Number(value)
              : value;
        });

        saveData(requestData)
          .then((response) => {
            if (response.status === 200) {
              return response.text();
            }
          })
          .then((responseData) => {
            if (responseData) {
              Object.keys(JSON.parse(responseData)).forEach((item) => {
                const changedElement = data.find(
                  (elem: { id: number; value: string | number }) =>
                    elem.id === Number(item)
                );

                if (changedElement) {
                  changedElement.value = JSON.parse(responseData)[item];
                }
              });
            }

            commit("updateCalculationTable", data);
          })
          .finally(() => {
            let storageData = [];
            try {
              storageData = JSON.parse(localStorage.cpqData);
            } catch {
              console.log("Localstorage error: data is not JSON!");
            }
            if (storageData && Array.isArray(storageData)) {
              storageData.shift();

              localStorage.cpqData = JSON.stringify(storageData);
            }
            commit("clearForm");
          });
      } else {
        let storageData = [];
        try {
          storageData = JSON.parse(localStorage.cpqData);
        } catch {
          console.log("Localstorage error: data is not JSON!");
        }
        if (Array.isArray(storageData)) {
          storageData.push(data);

          localStorage.cpqData = JSON.stringify(storageData);

          commit("clearForm");
        }
      }
    },
  },
  modules: {},
});
