<template>
  <div class="nav">
    <router-link class="nav-item" to="/">
      <span>{{ $t("message.mainFormLabel") }}</span>
    </router-link>
    <router-link class="nav-item" to="/settings">
      <span>
        {{ $t("message.settingsLabel") }}
      </span>
    </router-link>
    <router-link class="nav-item" to="/config">
      <span>{{ $t("message.configLabel") }}</span>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style lang="scss" scoped>
@import "../scss/colors.scss";
@import "../scss/mixins.scss";

.nav {
  display: flex;
  flex-direction: column;

  .nav-item {
    @include text-default-400;
    height: 72px;
    display: flex;
    align-items: center;
    padding-left: 28px;
    text-decoration: none;

    &:hover:not(.router-link-active) {
      background: $color-blue-2;
    }

    &.router-link-active {
      background: $color-blue-2;
      border-right: 4px solid $color-blue-1;
    }
  }
}
</style>
