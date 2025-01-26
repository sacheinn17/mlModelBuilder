<script>

    import { loadAndPrepareData } from "$lib/data/load_dataset";



    async function handleButtonClick(){
        
        const { features, labels, columnMap } = await loadAndPrepareData(
      'https://storage.googleapis.com/tfjs-examples/multivariate-linear-regression/data/boston-housing-train.csv'
    );

    // Now you can use 'features' and 'labels' for model training or inference
    console.log('Data loaded successfully!');
    console.log('Column map:', features, labels, columnMap);
    }

</script>

<button on:click={handleButtonClick}>Load Data</button>