<script>
  import HudElement from "./HudElement.svelte";

  import { throttle, steering, fps, time, lap } from "./stores.js";

  export let scrollToTable;
</script>

<style>
  #leaderboard {
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
</style>

<div class="d-flex flex-row w-100">
  <div
    class="d-flex flex-grow-1 flex-shrink-0 justify-content-start ml-1"
    style="flex-basis: 0">
    <HudElement label={'THROTTLE'} value={Math.round($throttle * 100)} />
    <HudElement label={'STEERING'} value={Math.round(-$steering * 50)} />
    <button
      class="btn p-3 mb-2 ml-1 mr-1 bg-danger text-light"
      on:click={() => window.restartRace()}>
      <h5 class="m-0">RESTART</h5>
      <h4 class="m-0"><i class="fas fa-redo-alt" /></h4>
    </button>
  </div>
  <div
    class="d-flex flex-grow-1 flex-shrink-0 justify-content-center align-items-end"
    style="flex-basis: 0">
    <button
      class="btn btn-lg px-4 py-3 m-0 bg-dark text-light"
      id="leaderboard"
      on:click={() => scrollToTable()}>
      <i class="fas fa-trophy" />
      Leaderboard
    </button>
  </div>
  <div
    class="d-flex flex-grow-1 flex-shrink-0 justify-content-end mr-1"
    style="flex-basis: 0">
    <HudElement label={'FPS'} value={$fps} color={'primary'} />
    <HudElement label={'TIME'} value={$time} />
    <HudElement label={'LAP'} value={$lap + '/2'} />
  </div>
</div>
