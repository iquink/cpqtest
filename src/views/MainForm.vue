<template>
  <PageWrapper>
    <template v-slot:header>
      {{ $t("message.mainFormLabel") }}
    </template>
    <template v-slot:page>
      <Form v-if="formInputs.length" @submit="saveFormData">
        <Input
          v-for="item in formInputs"
          :key="item.id"
          :type="item.type"
          v-model="data.find((elem) => item.id === elem.id).value"
        >
          {{ item.names.find((name) => name.locale === $i18n.locale).value }}
        </Input>
        <Button :type="'submit'">{{ $t("message.submitForm") }}</Button>
      </Form>
      <div v-else class="empty-inputs-list">
        <span>{{ $t("message.emptyInputListLabel") }}</span>
        <router-link class="go-to-config" to="/config">
          <span>{{ $t("message.goToConfigLabel") }}</span>
        </router-link>
      </div>
    </template>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useStore } from "vuex";
import { saveData } from "../api";
import Form from "../components/Form.vue";
import Button from "../components/Button.vue";
import PageWrapper from "../components/PageWrapper.vue";
import Input from "../components/Input.vue";

interface IFormInput {
  id: number;
  names: string[];
  type: string;
}

export default defineComponent({
  components: {
    Form,
    PageWrapper,
    Input,
    Button,
  },
  setup() {
    const store = useStore();

    const formInputs: IFormInput[] = store.state.mainFormInputs;

    const data = reactive(
      formInputs.map((item: IFormInput) => ({
        id: item.id,
        value: "",
      }))
    );

    const saveFormData = (e: Event): void => {
      e.preventDefault();
      let requestData: { [key: number]: string | number } = {};

      data.forEach((item: { id: number; value: string | number }) => {
        const value = item.value;

        requestData[item.id] =
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          !isNaN(parseFloat(value)) && isFinite(value) ? Number(value) : value;
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
                (elem) => elem.id === Number(item)
              );

              if (changedElement) {
                changedElement.value = JSON.parse(responseData)[item];
              }
            });
          }
        });
    };

    return { formInputs, data, saveFormData };
  },
});
</script>

<style lang="scss" scoped>
@import "../scss/mixins.scss";

.empty-inputs-list {
  @include text-default-400;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;

  span {
    margin-bottom: 12px;
  }
}
</style>
