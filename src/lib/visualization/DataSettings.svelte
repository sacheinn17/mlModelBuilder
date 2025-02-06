<script>
    import {columns,features,labels} from "$lib/stores/networkStore";
    import {getFeatures} from "$lib/data/load_dataset"
	import { Reduction } from "@tensorflow/tfjs";
    let featuresLoc = [];
    let labelsLoc = [];

    function loadHandle(){
        let dup = true;

        var radio = document.querySelectorAll('.checkbox.features');
        radio.forEach((radio) => {

            if(radio.checked){
                featuresLoc.push(radio.value);
                console.log("Features ",radio.value);
            }
        });


        radio = document.querySelectorAll('.checkbox.labels');
        radio.forEach((radio) => {
            if(radio.checked){
                labelsLoc.push(radio.value);
                console.log("Labels ",radio.value)
            }
        });


        // console.log(dup)
        if (!dup){
            alert("features and labels are same");
            const radio = document.querySelectorAll('.checkbox');
            radio.forEach((radio) => {
                radio.checked = false;
            });
            featuresLoc = [];
            labelsLoc = [];
        }
        else{
            features.set(featuresLoc);
            labels.set(labelsLoc);
            getFeatures();
        }
    }

</script>

<div class="fandl">
    <div class="features card bg-base-200 hover:shadow-lg">
        <div class="card-body ">
            <p class = "card-title text-primary">Features</p>
            
            {#each $columns as c}
            <label class="label cursor-pointer">
                <span class="label-text text-secondary">{c}</span>
                <input type="checkbox" class="checkbox features" value = "{c}"/>
              </label>
            {/each}
        </div>
</div>

<div class="labels card bg-base-200 hover:shadow-lg">

    <div class="card-body ">
        <p class = "card-title text-primary">Labels</p>
        
    {#each $columns as c}

        
    <label class="label cursor-pointer">
        <span class="label-text text-secondary">{c}</span>
        <input type="checkbox" class="checkbox labels" value = "{c}"/>
      </label>
    {/each}
</div>
</div>

</div>
<center>

    <button class = "btn btn-primary" on:click={loadHandle}>Load Dataset</button>
</center>

<style>

.fandl{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: row;
}

</style>