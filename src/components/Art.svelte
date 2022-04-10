<script>
  import {onMount} from "svelte";
  const placeholder = "This is basically a free NFT";
  let shadow = "-5px 5px 0px white";
  let descretion = false;
  let text = placeholder;

  onMount(() => {
    let amount = 0;
    const searchText = new URLSearchParams(window.location.search).get("text");
    const bypass = new URLSearchParams(window.location.search).get("bypass");

    descretion = bypass || false;
    text = searchText || placeholder;

    const textStyles =
      "color: seagreen;" +
      "background: aquamarine;" +
      "font-size: 2rem;" +
      "padding: 0.5rem;" +
      "border-radius: 6px;" +
      "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;" +
      "font-style: italic;" +
      "text-transform: uppercase;" +
      "font-weight: 900;";

    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");
    const width = window.innerWidth;
    const height = window.innerHeight;

    let startX = 0;
    let startY = 0;
    let endX = width;
    let endY = height;

    canvas.width = width;
    canvas.height = height;
    context.lineCap = "round";

    const getNewX = () => Math.floor(Math.random() * width);
    const getNewY = () => Math.floor(Math.random() * height);
    const getColor = () => Math.floor(Math.random() * 255);
    let raf;
    const animation = setInterval(() => {
      if (descretion === false) return;
      raf = window.requestAnimationFrame(animate);
    }, 5);

    function animate() {
      console.log("%cd o i n g  a r t", textStyles);

      endX = getNewX();
      endY = getNewY();

      const yDistance = startY + (endY - startY) * amount;
      const xDistance = startX + (endX - startX) * amount;
      const red = getColor();
      const green = getColor();
      const blue = getColor();
      const color = `rgba(${red}, ${green}, ${blue}, ${amount * 0.25})`;

      shadow = `-5px 5px 0px rgb(${red + 25} ${green + 25} ${blue + 25})`;

      amount += 0.035;

      startY = endY;
      startX = endX;

      context.strokeStyle = color;
      context.lineWidth = amount;
      context.moveTo(startX, startY);
      context.lineTo(xDistance, yDistance);
      //context.bezierCurveTo(startX, startY, xDistance, yDistance, 45, 50);
      context.stroke();

      if (amount >= 20) {
        console.log("%ca r t  i s  d o n e", textStyles);
        clearInterval(animation);
        window.cancelAnimationFrame(raf);
      }
    }
  });
</script>

{#if descretion === false}
  <h2>Warning</h2>
  <p class="warning">
    Generating art may induce an epileptic seizure in photosensitive individuals
  </p>
  <form class="form">
    <div class="input">
      <label for="text">Start with your favourite motivational quote</label>
      <input id="text" type="text" {placeholder} bind:value={text} />
    </div>
    <button on:click={() => (descretion = true)}>Generate</button>
  </form>
{/if}

<h1 class="art {descretion}" style="text-shadow: {shadow}">{text}</h1>
<canvas class="canvas" />

<style>
  :root {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  h2 {
    letter-spacing: 1ch;
    text-transform: uppercase;
  }

  .form {
    display: flex;
    gap: var(--space-1);
  }

  .input {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .canvas {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background-color: #010101;
  }

  .art {
    font-size: 5rem;
    font-style: italic;
    text-transform: uppercase;
    font-weight: 900;
    letter-spacing: 1ch;
    padding-left: 1ch;
    color: #010101;
  }

  .art.false {
    display: none;
  }

  .warning {
    color: white;
    font-size: 1rem;
    letter-spacing: 0.5ch;
    padding-left: 0.5ch;
  }
</style>
