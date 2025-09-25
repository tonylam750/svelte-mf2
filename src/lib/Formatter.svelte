<script lang="ts" >
	import { MessageFormat, type MessageMarkupPart, type MessagePart } from "messageformat";
    import { locale, dictionaries } from "./stores.js"
	import { derived } from "svelte/store";

    let { id, data = {} } = $props();

    type TreeNode = {
        type: "text";
        value: string;
    } | {
        type: "number";
        value: string;
    } | {
        type: "markup";
        tag: string;
        attributes: Record<string, string>;
        children: TreeNode[];
    };
    

    const parts = derived([locale, dictionaries], ([$locale, $dicts]) => {
        const message = $dicts[$locale]?.[id] ?? id;
        const mf = new MessageFormat($locale, message);
        return mf.formatToParts(data) as MessagePart<string>[]
    })



</script>



{#each $parts as part}
    {#if part.type === "text"}
        {part.value}
        {:else if part.type === "string"}
        {part.value}
        {:else if part.type === "bidiIsolation"}
        {part.value || ""}
        {:else if part.type === "number"}
        {part.parts?.map(p => p.value).join("")}
        {:else if part.type === "markup"}
            {part.source}
    {/if}
{/each}