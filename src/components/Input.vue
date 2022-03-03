<template>
  <label class="input-label">
    <span class="input-description">
      <slot></slot>
    </span>
    <input
      class="input-text"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </label>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["update:modelValue"],
  name: "Input",
  props: {
    type: {
      type: String,
      default: "text",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../scss/mixins.scss";

.input-label {
  @include text-small;

  display: flex;
  flex-direction: column;
}

.input-text {
  @include text-small;

  border-radius: 8px;
  border: 1px solid $color-gray-stroke;
  padding: 16px 20px;
  margin: 4px 0 12px 0;

  &::placeholder {
    color: $color-gray-text;
  }
}
</style>
