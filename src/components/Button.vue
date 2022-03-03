<template>
  <button :type="type">
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Button",
  props: {
    type: {
      type: String,
      default: "submit",
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../scss/mixins.scss";

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
