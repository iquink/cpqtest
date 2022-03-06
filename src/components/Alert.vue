<template>
  <span class="alert">
    <slot></slot>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped lang="scss">
@import "../scss/mixins.scss";

.alert {
  @include text-default-400;

  background: $color-blue-2;
  padding: 28px 40px;
  border-radius: 4px;
  margin-top: 44px;
  display: block;
}
</style>
