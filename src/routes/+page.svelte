<script>
  import NetworkGraph from '$lib/visualization/NetworkGraph.svelte';
  import MetricsGraph from '$lib/visualization/MetricsGraph.svelte';
  import ROCCurve from '$lib/visualization/ROCCurve.svelte';
  import DatasetPlot from '$lib/visualization/DatasetPlot.svelte';
  // @ts-ignore
  import LayerControls from '$lib/components/LayerControls.svelte';
  // @ts-ignore
  import { network, isTraining, loss } from '$lib/stores/networkStore';
  import { trainModel } from '$lib/neural/model';
  import { datasets } from '$lib/data/datasets';

  let selectedDataset = datasets[0];
  let metrics= [];   
  let predictions= null;
  let labels= null;
  let datasetPoints = null;

  function handleRemoveLayer(event) {
    const { index } = event.detail;
    network.removeLayer(index);
  }

  // @ts-ignore
  function handleUpdateNeurons(event) {
    const { index, delta } = event.detail;
    network.updateNeurons(index, delta);
  }

  // @ts-ignore
  function handleUpdateLayer(event) {
    const { index, changes } = event.detail;
    network.updateLayer(index, changes);
  }

  async function handleTrain() {
    metrics = [];
    predictions = null;
    labels = null;
    
    const data = selectedDataset.generate();
    datasetPoints = {
      xs: await data.xs.array(),
      ys: await data.ys.array()
    };
    
    // @ts-ignore
    const results = await trainModel(selectedDataset, (metric) => {
      metrics = [...metrics, metric];
      if (metric.predictions) {
        predictions = metric.predictions;
      }
    });
    
    predictions = results.predsArray;
    labels = results.labelsArray;
  }

 // @ts-ignore
   $: if (selectedDataset && !datasetPoints) {
    handleTrain();
  }
</script>

<div class="container">
  <h1>Interactive Neural Network Visualization</h1>
  
  <div class="controls">
    <select bind:value={selectedDataset}>
      {#each datasets as dataset}
        <option value={dataset}>{dataset.name}</option>
      {/each}
    </select>
    
    <button on:click={() => network.addLayer()} disabled={$isTraining}>
      Add Hidden Layer
    </button>
    <button on:click={handleTrain} disabled={$isTraining}>
      {$isTraining ? 'Training...' : 'Train Network'}
    </button>
  </div>

  <div class="layer-settings">
    {#each $network.layers as layer, i}
      <LayerControls {layer} index={i} on:update={handleUpdateLayer} />
    {/each}
  </div>

  <div class="visualization">
    <div class="left-column">
      <NetworkGraph 
        on:removeLayer={handleRemoveLayer}
        on:updateNeurons={handleUpdateNeurons}
      />
      
      {#if datasetPoints}
        <div class="dataset-visualization">
          <h2>Dataset Visualization</h2>
          <DatasetPlot data={datasetPoints} {predictions} />
        </div>
      {/if}
    </div>
    
    {#if metrics.length > 0}
      <div class="right-column">
        <h2>Training Metrics</h2>
        <MetricsGraph {metrics} />
        
        <div class="metrics-summary">
          <p>Latest metrics:</p>
          <ul>
            <li>Loss: {metrics[metrics.length - 1].loss.toFixed(4)}</li>
            <li>Accuracy: {(metrics[metrics.length - 1].accuracy * 100).toFixed(2)}%</li>
            {#if metrics[metrics.length - 1].valLoss}
              <li>Validation Loss: {metrics[metrics.length - 1].valLoss.toFixed(4)}</li>
              <li>Validation Accuracy: {(metrics[metrics.length - 1].valAccuracy * 100).toFixed(2)}%</li>
            {/if}
          </ul>
        </div>

        {#if predictions && labels}
          <div class="roc-section">
            <h2>ROC Curve</h2>
            <ROCCurve {predictions} {labels} />
          </div>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .controls {
    margin: 20px 0;
    display: flex;
    gap: 10px;
  }

  select {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  button {
    padding: 8px 16px;
    background-color: #4075a6;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .layer-settings {
    margin: 20px 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }

  .visualization {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .dataset-visualization {
    margin-top: 20px;
  }

  .metrics-summary {
    margin: 20px 0;
  }

  .metrics-summary ul {
    list-style: none;
    padding: 0;
  }

  .metrics-summary li {
    margin: 5px 0;
  }

  .roc-section {
    margin-top: 20px;
  }

  h2 {
    margin-top: 0;
    color: #333;
  }

  @media (min-width: 1024px) {
    .visualization {
      grid-template-columns: 3fr 2fr;
    }
  }
</style>