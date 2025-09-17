import { writable, derived } from "svelte/store";
import  mf2  from "./formatter.js";

console.log("mf2 function:", mf2);
console.log(typeof mf2);

// locale store
export const locale = writable("en");

// store for dictionaries: { [locale: string]: Record<string, string> }
const dictionaries = writable<Record<string, Record<string, string>>>({});

// init function
export function init(opts: { fallbackLocale: string; messages: Record<string, Record<string, string>> }) {
  dictionaries.set(opts.messages);
  locale.set(opts.fallbackLocale);
}

// derived translation function
export const t = derived([locale, dictionaries], ([$locale, $dicts]) => {
  return (key: string, vars: Record<string, any> = {}) => {
    const dict = $dicts[$locale] || {};
    const msg = dict[key];
    return msg ? mf2($locale, msg, vars) : key;
  };
});
