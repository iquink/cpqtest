<template>
  <div class="app-container">
    <Header class="header" />
    <Navigation class="navigation" />
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import Header from "./components/Header.vue";
import Navigation from "./components/Navigation.vue";

export default defineComponent({
  components: {
    Header,
    Navigation,
  },
  setup() {
    const { t } = useI18n({
      useScope: "global",
    });
    const route = useRoute();

    const getPageHeader = () => {
      switch (route.name) {
        case "Settings":
          return t("message.settingsLabel");
        case "MainForm":
          return t("message.mainFormLabel");
        case "Config":
          return t("message.configLabel");
      }
    };

    let pageHeader;

    watch(
      () => route,
      () => {
        pageHeader = getPageHeader();
      }
    );

    return { pageHeader };
  },
});
</script>

<style lang="scss">
@import "./scss/mixins.scss";

html,
body {
  height: 100%;
  margin: 0;
}

.app-container {
  height: 100vh;

  .header {
    grid-area: header;
  }

  .main {
    grid-area: main;
    background: $color-gray-bg;
    padding: 0 44px 44px 44px;
  }

  .navigation {
    grid-area: nav;
  }
  display: grid;
  grid-template-columns: 320px 1fr;
  grid-auto-rows: 80px 1fr;
  grid-template-areas:
    "header header"
    "nav main";
}
</style>
