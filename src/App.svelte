<script>

    let hiddenLayers = [
        {id:1,nodes:3 },
        {id:2,nodes:3 },
        {id:3,nodes:3 },
        {id:4,nodes:3 },
    ]
    let newId;
    $:newId = hiddenLayers[hiddenLayers.length -1].id;


    function addLayerCallBack()
    {
        hiddenLayers = [...hiddenLayers, {id:newId+1,nodes:3}]
    }
    function addNodeCallBack(layerIndex)
    {
        hiddenLayers[layerIndex] = {id:hiddenLayers[layerIndex].id,nodes:hiddenLayers[layerIndex].nodes+1};
       }

</script>

<div class="layersContainer">
    <div class="layer"><p>Input Layer</p></div>
    {#each hiddenLayers as layer,index(index)}
    <div id = ${layer.id} class = "layer">            
        <p>Layer {layer.id}</p>
        
        {#each Array(layer.nodes) as _,index}
            <p>Node {index}</p>            
        {/each}
        
        <button on:click={() => addNodeCallBack(index)}>Add Node</button>

    </div>
    {/each}
    <div class="layer"><p>Output Layer</p></div>

</div>
<button on:click={addLayerCallBack}>
    Add Layer
</button>


<style>
    .layersContainer{
        display: flex;
        flex-direction: row;
    }


    .layer{
        margin-left: 20px;
        
    }
</style>

