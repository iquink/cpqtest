<template>
  <table class="table">
    <thead>
      <tr>
        <td>{{ $t("message.inputNameLabel") }}</td>
        <td>{{ $t("message.inputTypeLabel") }}</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in addedInputs" :key="item.id">
        <td>
          {{ item.names.find((name) => name.locale === $i18n.locale).value }}
        </td>
        <td>
          <div class="item-type">
            <span>{{ item.type }}</span>
            <button @click="() => deleteInput(item.id)">
              {{ $t("message.deleteInputLabel") }}
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    addedInputs: Array,
  },
  setup() {
    const store = useStore();

    const deleteInput = (id: number): void =>
      store.commit("deleteInput", { id });

    return { deleteInput };
  },
});
</script>

<style lang="scss" scoped>
@import "../scss/mixins.scss";
@include table;
</style>
