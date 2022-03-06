<script>
  import {onMount} from "svelte";

  onMount(() => {
    const canvas = document.querySelector(".background");
    const context = canvas.getContext("2d");
    const width = window.innerWidth;
    const height = window.innerHeight;

    let step = 0;
    let raf;
    let line1Start = Math.floor(Math.random() * width);
    let line1End = Math.floor(Math.random() * width);

    canvas.height = height;
    canvas.width = width;
    context.strokeStyle = "rgb(0 0 150  / 25%)";
    context.lineWidth = 2;
    context.blur = 2;
    // Line 1 start
    context.moveTo(line1Start, 0);
    context.lineTo(line1End, height);
    context.stroke();

    const animation = setInterval(() => {
      // Return if prefers reduced motion
      raf = window.requestAnimationFrame(animate);
    }, 50);

    function animate() {
      step++;
      console.log({step});

      line1Start++;
      line1End++;
      context.clearRect(0, 0, width, height);
      context.save();
      context.beginPath();
      context.moveTo(line1Start, 0);
      context.lineTo(line1End, height);
      context.stroke();
      context.restore();

      // COORDS

      // IF GREATER THAN HALF OF SCREEN WIDTH MOVE LEFT

      // IF LESS, MOVE RIGHT

      // IF REACHES 0 OR WIDTH, START MOVING UP OR DOWN

      if (step >= 100) {
        clearInterval(animation);
        window.cancelAnimationFrame(raf);
      }
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
