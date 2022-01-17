/* eslint-disable */
export let LANGUAGE = localStorage.getItem("language") !== null && localStorage.getItem("language") !== undefined ? localStorage.getItem("language") : 'pt-BR';
export function setLANGUAGE(language) {LANGUAGE = language};