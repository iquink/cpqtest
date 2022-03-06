<template>
  <h2 class="page-header">
    <slot name="header"></slot>
  </h2>
  <div class="page-wrapper">
    <slot name="page"></slot>
    <Alert v-if="networkStatus === 'offline'">
      {{ $t("message.isOfflineDataAlertLabel") }}
    </Alert>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import Alert from "@/components/Alert.vue";

export default defineComponent({
  components: {
    Alert,
  },
  setup() {
    const store = useStore();
    const networkStatus = computed(() => store.state.networkStatus);

    return { networkStatus };
  },
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
