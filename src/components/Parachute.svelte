<script>
  import { onDestroy } from "svelte";
  import { draw } from "svelte/transition";

  const States = {
    falling: "falling",
    open: "open",
    down: "down",
  };

  let state = States.falling;
  let landed = false;

  setTimeout(() => {
    state = States.open;
  }, 200);

  setTimeout(() => {
    state = States.down;
    landed = true;
  }, 1000);

  onDestroy(() => {
    state = undefined;
  });
</script>

{#if state === States.down}
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
        in:draw={{ duration: 800 }}
        d="M4 19.44C4 10.913 12.019 4 21.91 4c9.892 0 17.91 6.913 17.91 15.44L21.91 34.524 4 19.44Z"
        stroke-linejoin="round"
      />
      <path in:draw={{ duration: 800 }} d="M4.045 45.95h35.91" />
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
      {#if state === States.open}
        <path
          d="M4.442 19.159c0-8.528 8.019-15.44 17.91-15.44 9.892 0 17.911 6.912 17.911 15.44l-17.91 15.083-17.91-15.083Z"
          stroke-linejoin="round"
          class="parachute {state}"
        />
      {:else}
        <path
          in:draw={{ duration: 800 }}
          d="M13 7.44C15.785 5.147 18.755 4 21.91 4c3.155 0 6.126 1.147 8.91 3.44l-8.91 27.084L13 7.44Z"
          stroke-linejoin="round"
          class="parachute {state}"
        />
      {/if}
      <path d="M4.045 111.95h35.91" />
    </g>
  </svg>
{/if}

<style>
  .logo {
    overflow: visible;
    transition: transform 100ms ease-in-out;
  }

  .parachute {
    transform: translateY(-74px);
    transition: transform 200ms ease-in-out;
  }

  .falling {
    transform: translateY(0);
  }

  .open {
    transform: translateY(40px);
  }

  .landed {
    transform: rotate(90deg);
  }
</style>
