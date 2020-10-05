<script>
  export let label;
  export let value;
  export let color = 'dark';
</script>

<div class="rounded p-3 mb-2 ml-1 mr-1 bg-{color} text-light text-center">
  <h5 class="m-0">{label}</h5>
  <h3 class="m-0 text-monospace">{value}</h3>
</div>
