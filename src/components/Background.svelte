<script>
  import {onMount} from "svelte";
  const MOTION_QUERY = "(prefers-reduced-motion: reduce)";

  onMount(() => {
    const styles = getComputedStyle(document.body);
    if (window.matchMedia(MOTION_QUERY).matches) return;

    const canvas = document.querySelector(".background");
    const context = canvas.getContext("2d");
    const width = window.innerWidth;
    const height = window.innerHeight;

    let raf;
    let step = 0;
    let nodeDirections = [false, false, true, true];
    let node1Start = Math.floor(Math.random() * width);
    let node1End = Math.floor(Math.random() * width);
    let node2Start = Math.floor(Math.random() * height);
    let node2End = Math.floor(Math.random() * height);

    canvas.height = height;
    canvas.width = width;
    context.strokeStyle = styles.getPropertyValue("--background-stroke");
    context.lineWidth = 2;
    context.blur = 2;
    // Line 1 start
    context.moveTo(node1Start, 0);
    context.lineTo(node1End, height);
    // Line 2 start
    context.moveTo(0, node2Start);
    context.lineTo(width, node2End);

    context.stroke();

    const animation = setInterval(() => {
      raf = window.requestAnimationFrame(animate);
    }, 1000 / 60);

    function animate() {
      // Temp
      step++;
      checkDirections();

      node1Start = nodeDirections[0] ? node1Start - 1 : node1Start + 1;
      node1End = nodeDirections[1] ? node1End - 1 : node1End + 1;
      node2Start = nodeDirections[2] ? node2Start - 1 : node2Start + 1;
      node2End = nodeDirections[3] ? node2End - 1 : node2End + 1;

      context.clearRect(0, 0, width, height);
      context.save();
      context.beginPath();
      context.moveTo(node1Start, 0);
      context.lineTo(node1End, height);
      context.moveTo(0, node2Start);
      context.lineTo(width, node2End);
      context.stroke();
      context.restore();

      // COORDINATES
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
      // Vertical line
      nodeDirections[0] =
        node1Start >= width ? !nodeDirections[0] : nodeDirections[0];

      nodeDirections[1] =
        node1End >= width ? !nodeDirections[1] : nodeDirections[1];

      nodeDirections[0] =
        node1Start <= 0 ? !nodeDirections[0] : nodeDirections[0];

      nodeDirections[1] =
        node1End <= 0 ? !nodeDirections[1] : nodeDirections[1];
      // Horizontal line
      nodeDirections[2] =
        node2Start >= height ? !nodeDirections[2] : nodeDirections[2];

      nodeDirections[3] =
        node2End >= height ? !nodeDirections[3] : nodeDirections[3];

      nodeDirections[2] =
        node2Start <= 0 ? !nodeDirections[2] : nodeDirections[2];

      nodeDirections[3] =
        node2End <= 0 ? !nodeDirections[3] : nodeDirections[3];
    }
  });
</script>

<canvas class="background" />

<style>
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
</style>
