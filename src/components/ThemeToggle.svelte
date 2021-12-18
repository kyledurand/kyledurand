<script>
  import { onMount } from "svelte";

  onMount(() => {
    if (import.meta.env.SSR) return undefined;

    const root = document.documentElement;

    const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "theme-dark"
      : "theme-light";

    root.classList = [];
    root.classList.add(theme);
  });

  function setTheme(theme) {
    const root = document.documentElement;

    root.classList = [];
    root.classList.add(theme);
  }
</script>

<div>
  <button on:click={() => setTheme("theme-dark")}>dark</button>
  <button on:click={() => setTheme("theme-light")}>light</button>
</div>
