<script lang="ts">
  import en from "../locales/en.json" with { type: "json" };
  import es from "../locales/es.json" with { type: "json" };
  import { init, t, locale } from "../lib/stores.js";
  import { writable } from "svelte/store";

  let name = "Alice";
  const count = writable(0);

  init({
    fallbackLocale: "en",
    messages: { en, es }
  });

  const switchToSpanish = () => locale.set("es");
  const switchToEnglish = () => locale.set("en");
  const increment = () => count.update(n => n + 1);
  const decrement = () => count.update(n => n-1);

</script>

<h1>mf2 Demo</h1>

<h1>{@html $t("welcome", { username: name })}</h1>
<p>{$t("inbox", { count: $count })}</p>

<button onclick={switchToEnglish}>English</button>
<button onclick={switchToSpanish}>Español</button>

<button onclick={increment}>{$t("increment")}</button>
<button onclick={decrement}>{$t("decrement")}</button>
