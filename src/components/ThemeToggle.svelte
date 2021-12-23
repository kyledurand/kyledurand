<script>
  import { onMount } from "svelte";

  let theme = "theme-light";

  onMount(() => {
    if (import.meta.env.SSR) return;

    const root = document.documentElement;

    const preference = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "theme-dark"
      : "theme-light";

    theme = preference;
    root.classList = [];
    root.classList.add(preference);
  });

  function setTheme(newTheme) {
    const root = document.documentElement;
    theme = newTheme;
    root.classList = [];
    root.classList.add(theme);
  }
</script>

<div>
  <button
    type="button"
    class={`plain-button ${theme === "theme-dark" && "active"}`}
    on:click={() => setTheme("theme-dark")}
  >
    🌚
  </button>
  <button
    type="button"
    class={`plain-button ${theme === "theme-light" && "active"}`}
    on:click={() => setTheme("theme-light")}
  >
    🌝
  </button>
</div>
