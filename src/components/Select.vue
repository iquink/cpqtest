<template>
  <label class="select-label">
    <span class="select-description">
      <slot></slot>
    </span>
    <select
      class="select"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option v-for="item in options" :key="item.value" :value="item.value">
        {{ item.label }}
      </option>
    </select>
  </label>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["update:modelValue"],
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    modelValue: {
      type: String,
      default: "",
    },
  },
});
</script>

<style lang="scss">
@import "../scss/mixins.scss";

@include select;
</style>
