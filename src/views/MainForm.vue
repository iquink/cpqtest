<template>
  <PageWrapper>
    <template v-slot:header>
      {{ $t("message.mainFormLabel") }}
    </template>
    <template v-slot:page>
      <Form>
        <Input v-for="item in formInputs" :key="item.id" :type="item.type">
          {{ item.names.find((name) => name.locale === $i18n.locale).value }}
        </Input>
        <Button :type="'submit'">{{ $t("message.submitForm") }}</Button>
      </Form>
    </template>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import Form from "../components/Form.vue";
import Button from "../components/Button.vue";
import PageWrapper from "../components/PageWrapper.vue";
import Input from "../components/Input.vue";

export default defineComponent({
  components: {
    Form,
    PageWrapper,
    Input,
    Button,
  },
  setup() {
    const store = useStore();

    const formInputs = store.state.mainFormInputs;

    return { formInputs };
  },
});
</script>

<style></style>
