<script>
  import {onMount} from "svelte";

  onMount(() => {
    const canvas = document.querySelector(".background");
    const context = canvas.getContext("2d");
    const width = window.innerWidth;
    const height = window.innerHeight;
    console.log({width, height});
    canvas.height = height;
    canvas.width = width;
  });
</script>

<canvas class="background" />

<style>
  :root {
    margin: 0;
  }

  canvas {
    background-color: forestgreen;
  }
</style>
