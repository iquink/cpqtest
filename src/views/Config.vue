<template>
  <PageWrapper>
    <template v-slot:header>
      {{ $t("message.configLabel") }}
    </template>
    <template v-slot:page>
      <Form @submit="addNewInput">
        <Select v-model="newInput.type" :options="selectTypeOptions">{{
          $t("message.newInputType")
        }}</Select>
        <template v-for="name in newInput.names" :key="name.id">
          <Input v-model="name.value" :placeholder="'test'">
            {{ $t("message.inputNameForLocale") }} {{ name.locale }}
          </Input>
        </template>
        <Button type="submut">
          {{ $t("message.addLabel") }}
        </Button>
      </Form>
      <AddedInputs v-if="mainFormInputs.length" :addedInputs="mainFormInputs" />
    </template>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from "vue";
import { useStore } from "vuex";
import Input from "../components/Input.vue";
import Select from "../components/Select.vue";
import Button from "../components/Button.vue";
import Form from "../components/Form.vue";
import PageWrapper from "../components/PageWrapper.vue";
import AddedInputs from "../components/AddedInputs.vue";
import { useI18n } from "vue-i18n";

interface IInputName {
  value: string;
  locale: string;
  id: number;
}

interface INewInput {
  names: IInputName[];
  type: string;
}

export default defineComponent({
  components: {
    Input,
    Select,
    PageWrapper,
    Button,
    Form,
    AddedInputs,
  },
  setup() {
    const { t, availableLocales } = useI18n({
      useScope: "global",
    });

    const selectTypeOptions = [
      {
        value: "text",
        label: t("message.inputTypes.text"),
      },
      {
        value: "number",
        label: t("message.inputTypes.number"),
      },
    ];

    const newInput: INewInput = reactive({
      names: availableLocales.map(
        (item, i): IInputName => ({
          value: "",
          locale: item,
          id: i + 1,
        })
      ),
      type: "text",
    });

    const store = useStore();

    const mainFormInputs = computed(() => store.state.mainFormInputs);

    const addNewInput = () => {
      store.commit("addNewInput", newInput);

      newInput.names.forEach((item) => (item.value = ""));
      newInput.type = "text";
    };

    return {
      mainFormInputs,
      newInput,
      addNewInput,
      selectTypeOptions,
    };
  },
});
</script>

<style lang="scss">
@import "../scss/mixins.scss";

.input-text {
  @include text-default-400;

  border-radius: 8px;
  border: 1px solid $color-gray-stroke;
  padding: 16px 20px;

  &::placeholder {
    color: $color-gray-text;
  }
}

button {
  @include text-button;

  background: #1a7cc1;
  border-radius: 8px;
  height: 52px;
  color: $color-white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 36px;
  border: none;
  margin-top: 24px;
}
</style>
