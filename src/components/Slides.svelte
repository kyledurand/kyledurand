<script>
  import {onMount} from "svelte";

  onMount(() => {
    function followMouse(event) {
      const {innerHeight, innerWidth} = window;
      const mouseXpercentage = Math.round((event.pageX / innerWidth) * 100);
      const mouseYpercentage = Math.round((event.pageY / innerHeight) * 100);

      const sections = document.querySelectorAll("section");
      const style = `radial-gradient(at ${mouseXpercentage}% ${mouseYpercentage}%, var(--gradient-start), var(--gradient-end))`;

      sections.forEach((node) => (node.style.background = style));
    }

    document.addEventListener("mousemove", followMouse);

    return () => {
      document.removeEventListener("mousemove", followMouse);
    };
  });
</script>

<main>
  <section>section</section>
  <section>section</section>
  <section>section</section>
  <section>
    <h2 class="perspective">section</h2>
    <p>static</p>
  </section>
  <section>section</section>
  <section>section</section>
  <section>section</section>
  <section>section</section>
  <section>section</section>
  <section>section</section>
  <section>section</section>
  <section>section</section>
  <section>section</section>
</main>

<style>
  main {
    --gradient-start: #2b2b2b;
    --gradient-end: #000000;
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

  .perspective {
    transform: translateZ(3px);
  }
</style>
