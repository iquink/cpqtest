<template>
  <table class="added-inputs">
    <thead>
      <tr>
        <td>{{ $t("message.newInputName") }}</td>
        <td>{{ $t("message.newInputType") }}</td>
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

.added-inputs {
  width: 100%;
  max-width: 600px;
  margin-top: 24px;

  .item-type {
    display: flex;
    justify-content: space-between;

    button {
      all: unset;
      background-color: transparent;
      color: $color-blue-1;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  td {
    padding: 16px 20px;
  }

  thead {
    @include text-default-600;

    td {
      border: 3px solid $color-gray-stroke;
    }
  }

  tbody {
    @include text-default-400;

    td {
      border: 1px solid $color-gray-stroke;
    }
  }
}
</style>
