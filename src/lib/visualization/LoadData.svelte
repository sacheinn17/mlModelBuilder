<script>

    import { getColumns} from "$lib/data/load_dataset";
    import DataSettings from "$lib/visualization/DataSettings.svelte";
    import {columns} from "$lib/stores/networkStore";
    let features = [];
    let fileName = [];
    let url = '';
    async function handleButtonClick(e){
      ;
      await getColumns(url);
    }

</script>

<div class="inputDataset">
  
  <input bind:value={url} type="text" placeholder="Enter URL" class="input input-bordered w-full max-w-xs" />
</div>

<center>
  {#if url != ""}
    <button on:click={handleButtonClick} class = "btn btn-primary">Load Data</button>
    {:else}
    <button on:click={handleButtonClick} class = "btn btn-primary" disabled>Load Data</button>
    {/if}
</center>

<DataSettings />

<style>
  .inputDataset{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: row;
  }

</style>