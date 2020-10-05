<script>
  import HudElement from "./HudElement.svelte";

  import { throttle, steering, fps, time, lap } from "./stores.js";
</script>

<div class="d-flex flex-row w-100">
  <div
    class="d-flex flex-grow-1 flex-shrink-0 justify-content-start"
    style="flex-basis: 0">
    <HudElement label={'THROTTLE'} value={Math.round($throttle * 100)} />
    <HudElement label={'STEERING'} value={Math.round(-$steering * 50)} />
    <button
      class="btn rounded p-3 mb-2 ml-1 mr-1 bg-danger text-light text-center"
      on:click={() => window.restartRace()}>
      <h5 class="m-0">RESTART</h5>
      <h4 class="m-0"><i class="fas fa-redo-alt" /></h4>
    </button>
  </div>
  <div
    class="d-flex flex-grow-1 flex-shrink-0 justify-content-center align-items-end"
    style="flex-basis: 0">
    <div class="rounded-top px-4 py-3 m-0 bg-light h4">
      <i class="fas fa-trophy" />
      Leaderboard
    </div>
  </div>
  <div
    class="d-flex flex-grow-1 flex-shrink-0 justify-content-end"
    style="flex-basis: 0">
    <HudElement label={'FPS'} value={$fps} color={'primary'} />
    <HudElement label={'TIME'} value={$time} />
    <HudElement label={'LAP'} value={$lap + '/2'} />
  </div>
</div>
