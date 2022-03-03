<template>
  <header class="header">
    <h1 class="header-text">CPQ-3000</h1>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
});
</script>

<style scoped lang="scss">
@import "../scss/mixins.scss";

.header {
  height: 80px;
  background: $color-blue-1;
  padding: 0 44px;
  display: flex;
  align-items: center;

  .header-text {
    @include text-default-600;

    color: $color-white;
  }
}
</style>
