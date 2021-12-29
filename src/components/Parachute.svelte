<script>
  import { onMount } from "svelte";
  import { draw } from "svelte/transition";

  const defaultPosition = "-74px";
  const duration = 300;

  let deployed;
  let landed;
  let position = defaultPosition;

  onMount(() => {
    position = "0px";
    deploy();
  });

  function deploy() {
    setTimeout(() => {
      deployed = true;
      position = "40px";
      land();
    }, duration);
  }

  function land() {
    setTimeout(() => {
      position = "71px";
      rotate();
    }, duration);
  }

  function rotate() {
    setTimeout(() => {
      landed = true;
    }, duration);
  }
</script>

{#if landed}
  <svg
    width="44"
    height="50"
    xmlns="http://www.w3.org/2000/svg"
    class="logo {landed && 'landed'}"
  >
    <g
      stroke="var(--highlight)"
      stroke-width="7"
      fill="none"
      fill-rule="evenodd"
      stroke-linecap="round"
    >
      <path
        in:draw={{ duration }}
        d="M4 19.44C4 10.913 12.019 4 21.91 4c9.892 0 17.91 6.913 17.91 15.44L21.91 34.524 4 19.44Z"
        stroke-linejoin="round"
      />
      <path in:draw={{ duration }} d="M4.045 45.95h35.91" />
    </g>
  </svg>
{:else}
  <svg width="44" height="116" xmlns="http://www.w3.org/2000/svg" class="logo">
    <g
      stroke="var(--highlight)"
      stroke-width="7"
      fill="none"
      fill-rule="evenodd"
      stroke-linecap="round"
    >
      {#if deployed}
        <path
          d="M4.442 19.159c0-8.528 8.019-15.44 17.91-15.44 9.892 0 17.911 6.912 17.911 15.44l-17.91 15.083-17.91-15.083Z"
          stroke-linejoin="round"
          class="parachute"
          style="transform: translateY({position}); transition-duration: {duration}ms"
        />
      {:else}
        <path
          d="M13 7.44C15.785 5.147 18.755 4 21.91 4c3.155 0 6.126 1.147 8.91 3.44l-8.91 27.084L13 7.44Z"
          stroke-linejoin="round"
          class="parachute"
          style="transform: translateY({position}); transition-duration: {duration}ms"
        />
      {/if}
      <path d="M4.045 111.95h35.91" />
    </g>
  </svg>
{/if}

<style>
  .logo {
    overflow: visible;
    transition: transform 300ms ease-in;
  }

  .parachute {
    transition-property: transform;
  }

  .landed {
    transform: rotate(90deg);
  }
</style>
