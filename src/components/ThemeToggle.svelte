<script>
  import {onMount} from "svelte";

  let theme = "theme-light";

  onMount(() => {
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

{#if theme === "theme-light"}
  <button type="button" class="button" on:click={() => setTheme("theme-dark")}>
    🌚
  </button>
{:else}
  <button type="button" class="button" on:click={() => setTheme("theme-light")}>
    🌝
  </button>
{/if}
