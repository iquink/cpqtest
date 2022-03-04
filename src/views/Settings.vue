<template>
  <PageWrapper>
    <template v-slot:header>
      {{ $t("message.settingsLabel") }}
    </template>
    <template v-slot:page>
      <Form>
        <LocaleChanger />
      </Form>
    </template>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import LocaleChanger from "@/components/LocaleChanger.vue";
import PageWrapper from "../components/PageWrapper.vue";
import Form from "../components/Form.vue";

export default defineComponent({
  components: {
    LocaleChanger,
    PageWrapper,
    Form,
  },
  setup() {
    const { t } = useI18n({
      useScope: "global",
      messages: {
        en: {
          message: {
            test1: "test",
          },
        },
      },
    });

    return { t };
  },
});
</script>
