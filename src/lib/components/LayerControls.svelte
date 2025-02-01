<script>
  import { createEventDispatcher } from 'svelte';
  import {fade} from "svelte/transition";


  export let layer;
  /**
	 * @type {any}
	 */
   export let index;
  
  const dispatch = createEventDispatcher();
  
  const activations = ['relu', 'sigmoid', 'tanh', 'linear'];
  
  function updateLayer(changes) {
    dispatch('update', { index, changes });
  }
</script>

<div class="card bg-base-300 shadow-inner hover:shadow-lg hover:shadow-orange-400 transition-shadow mx-2 " transition:fade>
  <div class = "card-body">
    <h3 class = "card-title ">{layer.label}</h3>
  
    {#if layer.type !== 'input' && layer.type !== 'output'}
      <div class="control-group">
        <label >
          Activation:
          <select class="select select-accent w-full max-w-xs"
            value={layer.activation || 'relu'} 
            on:change={(e) => updateLayer({ activation: e.target.value })}
          >
            {#each activations as activation}
              <option value={activation}>{activation}</option>
            {/each}
          </select>
        </label>
      </div>
    {/if}
    
    <div class="control-group">
      <label >
        L1 Regularization:
        <input 
          type="range" 
          class = "range range-sm range-primary"
          min="0" 
          max="0.1" 
          step="0.001"
          value={layer.l1 || 0}
          on:input={(e) => updateLayer({ l1: parseFloat(e.target.value) })}
        />
        <span class = " ">{(layer.l1 || 0).toFixed(3)}</span>
      </label>
    </div>
    
    <div class="control-group">
      <label>
        L2 Regularization:
        <input 
          type="range"
          class = "range range-sm range-secondary" 
          min="0" 
          max="0.1" 
          step="0.001"
          value={layer.l2 || 0}
          on:input={(e) => updateLayer({ l2: parseFloat(e.target.value) })}
        />
        <span>{(layer.l2 || 0).toFixed(3)}</span>
      </label>
  </div>
</div>

</div>
<!-- 
<style>
  .layer-controls {
    background-color: #f8f9fa;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
  }
  
  /* .control-group {
    margin: 0.5rem 0;
  } */
  
  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  select, input {
    padding: 0.25rem;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  
  input[type="range"] {
    flex: 1;
  }
  
  span {
    min-width: 3em;
    text-align: right;
  }
</style> -->