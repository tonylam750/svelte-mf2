

<script lang="ts">
  import en from "../locales/en.json" with { type: "json" };
  import es from "../locales/es.json" with { type: "json" };
  import { init, t, locale } from "../lib/stores.js";

  // Initialize translations
  init({
    fallbackLocale: "en",
    messages: { en, es }
  });

  // Function to switch locale
  function switchToSpanish() {
    locale.set("es");
  }

  function switchToEnglish() {
    locale.set("en");
  }
</script>

<h1>i18n Demo</h1>

<button on:click={switchToEnglish}>English</button>
<button on:click={switchToSpanish}>Español</button>

<p>{@html $t("welcome", { username: "Tony" })}</p>
