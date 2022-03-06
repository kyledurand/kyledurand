<script>
  import {onMount} from "svelte";

  onMount(() => {
    let nodeDirections = [false, false];
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const canvas = document.querySelector(".background");
    const context = canvas.getContext("2d");
    const width = window.innerWidth;
    const height = window.innerHeight;

    let step = 0;
    let raf;
    let node1Start = Math.floor(Math.random() * width);
    let node1End = Math.floor(Math.random() * width);

    canvas.height = height;
    canvas.width = width;
    context.strokeStyle = "rgb(0 0 150  / 15%)";
    context.lineWidth = 2;
    context.blur = 2;
    // Line 1 start
    context.moveTo(node1Start, 0);
    context.lineTo(node1End, height);
    context.stroke();

    if (prefersReducedMotion) return;

    const animation = setInterval(() => {
      raf = window.requestAnimationFrame(animate);
    }, 1000 / 30);

    function animate() {
      // Temp
      step++;
      // Check node directions
      checkDirections();

      node1Start = nodeDirections[0] ? node1Start - 1 : node1Start + 1;
      node1End = nodeDirections[1] ? node1End - 1 : node1End + 1;

      console.log(nodeDirections);
      context.clearRect(0, 0, width, height);
      context.save();
      context.beginPath();
      context.moveTo(node1Start, 0);
      context.lineTo(node1End, height);
      context.stroke();
      context.restore();

      // COORDS

      // IF GREATER THAN HALF OF SCREEN WIDTH MOVE LEFT

      // IF LESS, MOVE RIGHT

      // IF REACHES 0 OR WIDTH, START MOVING UP OR DOWN

      if (step >= 1000) {
        console.log("end");
        clearInterval(animation);
        window.cancelAnimationFrame(raf);
      }
    }

    function checkDirections() {
      nodeDirections[0] =
        node1Start >= width ? !nodeDirections[0] : nodeDirections[0];

      nodeDirections[1] =
        node1End >= width ? !nodeDirections[1] : nodeDirections[1];

      nodeDirections[0] =
        node1Start >= 0 ? nodeDirections[0] : !nodeDirections[0];

      nodeDirections[1] =
        node1End >= 0 ? nodeDirections[1] : !nodeDirections[1];
    }
  });
</script>

<canvas class="background" />

<style>
  :root {
    margin: 0;
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }

  canvas {
    background-color: aliceblue;
  }
</style>
