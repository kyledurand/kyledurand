<script>
  import {onMount} from "svelte";

  const followMouse = (event) => {
    const {innerHeight, innerWidth} = window;
    const mouseXpercentage = Math.round((event.pageX / innerWidth) * 100);
    const mouseYpercentage = Math.round((event.pageY / innerHeight) * 100);

    const sections = document.querySelectorAll("section");
    const style = `radial-gradient(at ${mouseXpercentage}% ${mouseYpercentage}%, var(--gradient-start), var(--gradient-end))`;

    sections.forEach((node) => (node.style.background = style));
  };

  onMount(() => {
    document.addEventListener("mousemove", followMouse);

    return () => {
      document.removeEventListener("mousemove", followMouse);
    };
  });
</script>

<main>
  <section>This</section>
  <section>is</section>
  <section>neat.</section>

  <section><span class="perspective">ahahahahaha1</span></section>
  <section><span class="perspective">ahahahahaha2</span></section>
  <section><span class="perspective">ahahahahaha3</span></section>

  <section><span class="perspective">whooaoaaaaa1</span></section>
  <section><span class="perspective">whooaoaaaaa2</span></section>
  <section><span class="perspective">whooaoaaaaa3</span></section>

  <section><span class="perspective">weeeeoooooo1</span></section>
  <section><span class="perspective">weeeeoooooo2</span></section>
  <section><span class="perspective">weeeeoooooo3</span></section>
</main>

<style>
  .perspective {
    transform: translateZ(12px);
  }

  main {
    --gradient-start: #2b2b2b;
    --gradient-end: #000000;
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100vw;
    height: 100vh;
    overflow: auto;
    perspective: 30px;
    scroll-snap-type: both mandatory;
    position: relative;
    overscroll-behavior: contain;
  }

  section {
    --scale: 3;
    position: relative;
    display: grid;
    place-content: center;
    background-color: #eee;
    width: calc(100vw - var(--space-4) * 2);
    height: calc(100vh - var(--space-4) * 2);
    margin: var(--space-2);
    padding: var(--space-2);
    scroll-snap-align: start;
    scroll-margin: var(--space-2);
    transform-style: preserve-3d;
    color: #fff;
    background: radial-gradient(
      closest-side,
      var(--gradient-start),
      var(--gradient-end)
    );
  }

  section::after {
    position: absolute;
    font-size: 2rem;
  }

  section:not(:nth-child(3n + 3))::after {
    content: ">";
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
