<script>
    import {columns,features,labels} from "$lib/stores/networkStore";
    import {getFeatures} from "$lib/data/load_dataset"
    let featuresLoc = [];
    let labelsLoc = [];

    function clickHandlef (e){
        featuresLoc.push(e);
        // console.log("f",featuresLoc,e);

    }
    function clickHandlel (e){
        labelsLoc.push(e);
        // console.log("l",labelsLoc,e);

    }

    function loadHandle(){

        featuresLoc = [...new Set(featuresLoc)];
        labelsLoc = [...new Set(labelsLoc)];

        let dup = true;
            for (let i = 0; i < featuresLoc.length; i++) {
                for (let j = 0; j < labelsLoc.length; j++) {
                    console.log(featuresLoc[i],labelsLoc[j]);
                    if (featuresLoc[i].c === labelsLoc[j].c) {
                        dup = false;
                        break;
                    }
                }
            }

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
                <input type="checkbox" class="checkbox" on:click={clickHandlef({c})}/>
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
        <input type="checkbox" class="checkbox" on:click={clickHandlel({c})}/>
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