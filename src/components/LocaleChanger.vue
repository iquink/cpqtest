<template>
  <label class="select-label">
    <span class="select-description">
      {{ $t("message.changeLocaleLabel") }}
    </span>
    <select class="select" v-model="$i18n.locale">
      <option
        v-for="locale in $i18n.availableLocales"
        :key="`locale-${locale}`"
        :value="locale"
      >
        {{ locale }}
      </option>
    </select>
  </label>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style lang="scss" scoped>
@import "../scss/mixins.scss";

@include select;
</style>
