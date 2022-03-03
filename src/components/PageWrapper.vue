<template>
  <h2 class="page-header">
    <slot name="header"></slot>
  </h2>
  <div class="page-wrapper">
    <slot name="page"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageWrapper",
});
</script>

<style lang="scss">
@import "../scss/mixins.scss";

.page-wrapper {
  background: $color-white;
  padding: 36px;
}

.page-header {
  @include header-1;

  margin: 32px 0 20px 0;
}
</style>
