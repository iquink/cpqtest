<template>
  <PageWrapper>
    <template v-slot:header>
      {{ $t("message.configLabel") }}
    </template>
    <template v-slot:page>
      <Form>
        <ul v-for="item in mainFormInputs" :key="item.id">
          <li>
            {{
              item.names.find((name) => name.locale === $i18n.locale).value
            }}
            --
            {{ $t(`message.inputTypes.${item.type}`) }}
          </li>
        </ul>
        <Select v-model="newInputModel.type" :options="selectTypeOptions">{{
          $t("message.newInputType")
        }}</Select>
        <template v-for="item in newInputModel.names" :key="item.locale">
          <Input v-model="item.value" :placeholder="'test'">
            {{ $t("message.inputNameForLocale") }} {{ item.locale }}
          </Input>
        </template>
        <Button @click="addNewInput">
          {{ $t("message.addLabel") }}
        </Button>
      </Form>
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
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "Config",
  components: {
    Input,
    Select,
    PageWrapper,
    Button,
    Form
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

    const names = availableLocales.map((item) => ({
      value: "",
      locale: item,
    }));

    const newInputModel = reactive({
      names,
      type: "text",
    });

    const store = useStore();

    const mainFormInputs = computed(() => store.state.mainFormInputs);

    const addNewInput = () => {
      store.commit("addNewInput", newInputModel);
    };

    return {
      mainFormInputs,
      newInputModel,
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
