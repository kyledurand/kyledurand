<script>
  import {onMount} from "svelte";

  const defaultPosition = "-54px";
  const duration = 500;

  let status = "falling";
  let position = defaultPosition;

  onMount(() => {
    position = "0px";
    deploy();
  });

  function deploy() {
    setTimeout(() => {
      status = "deployed";
      position = "20px";
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
      status = "landed";
    }, duration);
  }
</script>

{#if status === "landed"}
  <svg
    width="44"
    height="50"
    xmlns="http://www.w3.org/2000/svg"
    class="logo landed"
    style="transition-duration: {duration}ms"
  >
    <g
      stroke="var(--highlight)"
      stroke-width="7"
      fill="none"
      fill-rule="evenodd"
      stroke-linecap="round"
    >
      <path
        d="M4 19.44C4 10.913 12.019 4 21.91 4c9.892 0 17.91 6.913 17.91 15.44L21.91 34.524 4 19.44Z"
        stroke-linejoin="round"
      />
      <path d="M4.045 45.95h35.91" />
    </g>
  </svg>
{:else}
  <svg
    width="44"
    height="116"
    xmlns="http://www.w3.org/2000/svg"
    class="logo {status}"
    style="transition-duration: {duration}ms"
  >
    <g
      stroke="var(--highlight)"
      stroke-width="7"
      fill="none"
      fill-rule="evenodd"
      stroke-linecap="round"
    >
      <path
        d="M4.442 19.159c0-8.528 8.019-15.44 17.91-15.44 9.892 0 17.911 6.912 17.911 15.44l-17.91 15.083-17.91-15.083Z"
        stroke-linejoin="round"
        class="parachute deployed"
        style="opacity: 0; transform: translateY({position}); transition-duration: {duration}ms;"
      />

      <path
        d="M13 7.44C15.785 5.147 18.755 4 21.91 4c3.155 0 6.126 1.147 8.91 3.44l-8.91 27.084L13 7.44Z"
        stroke-linejoin="round"
        class="parachute falling"
        style="transform: translateY({position}); transition-duration: {duration}ms"
      />

      <path d="M4.045 111.95h35.91" />
    </g>
  </svg>
{/if}

<style>
  .logo {
    overflow: visible;
  }

  .logo.deployed .falling {
    opacity: 0;
  }
  .logo.deployed .deployed {
    opacity: 1 !important;
  }

  .landed {
    margin-top: 66px;
    animation: rotate 100ms ease-in-out forwards;
  }

  .parachute {
    transition-property: transform, opacity;
    transition-timing-function: linear;
  }

  .deployed {
    transition-delay: 0ms;
    transition-timing-function: linear;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(90deg);
    }
  }
</style>
