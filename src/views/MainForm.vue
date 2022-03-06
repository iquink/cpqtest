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
        <Button :type="'submit'">{{ $t("message.submitFormLabel") }}</Button>
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
import { computed, defineComponent, reactive } from "vue";
import { useStore } from "vuex";
import Form from "@/components/Form.vue";
import Button from "@/components/Button.vue";
import PageWrapper from "@/components/PageWrapper.vue";
import Input from "@/components/Input.vue";
import { IMainFormInput, IRequestData } from "@/store";

export default defineComponent({
  components: {
    Form,
    PageWrapper,
    Input,
    Button,
  },
  setup() {
    const store = useStore();
    const formInputs = computed(() => store.state.mainFormInputs);
    const data = reactive(
      formInputs.value.map(
        (item: IMainFormInput) =>
          ({
            id: item.id,
            value: "",
            names: item.names,
          } as IRequestData)
      )
    );
    const changedData = computed(() => store.state.calculationData);
    const saveFormData = (e: Event): void => {
      e.preventDefault();

      store.dispatch("saveData", data);
    };

    return { formInputs, data, saveFormData, changedData };
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
