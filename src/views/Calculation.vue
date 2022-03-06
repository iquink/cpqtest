<template>
  <PageWrapper>
    <template v-slot:header>
      {{ $t("message.calculationLabel") }}
    </template>
    <template v-slot:page>
      <table
        class="table"
        v-for="(table, index) in calculationData"
        :key="index"
      >
        <thead>
          <tr>
            <td>{{ $t("message.inputNameLabel") }}</td>
            <td>{{ $t("message.inputValueLabel") }}</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in table" :key="item.id">
            <td>
              {{
                item.names.find((name) => name.locale === $i18n.locale).value
              }}
            </td>
            <td>
              <div class="item-type">
                <span>{{ item.value }}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import PageWrapper from "@/components/PageWrapper.vue";

export default defineComponent({
  components: {
    PageWrapper,
  },
  setup() {
    const store = useStore();
    const calculationData = store.state.calculationData;

    return { calculationData };
  },
});
</script>

<style lang="scss" scoped>
@import "../scss/mixins.scss";
@include table;
</style>
