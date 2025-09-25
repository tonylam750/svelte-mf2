<script lang="ts">
  import en from "../locales/en.json" with { type: "json" };
  import es from "../locales/es.json" with { type: "json" };
  import { init, t, locale } from "../lib/stores.js";
  import { writable } from "svelte/store";
	import Formatter from "../lib/Formatter.svelte";

  let name = "Alice";
  const count = writable(0);
  

  init({
    fallbackLocale: "en",
    messages: { en, es }
  });

  const switchToSpanish = () => locale.set("es");
  const switchToEnglish = () => locale.set("en");

  let props = {username: "morendin", hei:"hei"}

</script>



<Formatter id="welcome" data={props}/>



<button onclick={switchToEnglish}>English</button>
<button onclick={switchToSpanish}>Español</button>
