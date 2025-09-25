import { writable, derived } from "svelte/store";

export const locale = writable("en");

export const dictionaries = writable<Record<string, Record<string, string>>>({});

export function init(opts: { fallbackLocale: string; messages: Record<string, Record<string, string>> }) {
  dictionaries.set(opts.messages);
  locale.set(opts.fallbackLocale);
}

export const t = derived([locale, dictionaries], ([$locale, $dicts]) => {
  return (key: string, vars: Record<string, any> = {}) => {
    const dict = $dicts[$locale] || {};
    const msg = dict[key];
    return msg 
  };
});
