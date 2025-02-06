// Import required modules
import * as tf from '@tensorflow/tfjs';
import {columns,features,labels} from "$lib/stores/networkStore.js";
import { featuresDict,labelsDict,tfdata} from '$lib/stores/networkStore.js';
import { get } from 'svelte/store';
var dataset = [];
var url = "https://storage.googleapis.com/tfjs-examples/multivariate-linear-regression/data/boston-housing-train.csv";
export async function getColumns(csvUrl = url){
  url = csvUrl;
  dataset = tf.data.csv(csvUrl, {
    hasHeader: true,
    
  });
  const columnNames = await dataset.columnNames();
  columns.set(columnNames);
}

let featuresDictLoc = {};
let labelsDictLoc = {};


function convertDictToList(dict) {
  let result = [];
  let keys = Object.keys(dict);
  // console.log("Keys ",dict);  
  let maxLength = Math.min(...keys.map(key => dict[key].length));
  
  for (let i = 0; i < maxLength; i++) {
      let row = keys.map(key => dict[key][i]).filter(val => val !== undefined);
      // console.log("Row ",row);
      result.push(row);
  }
  console.log("Result ",result)
  return result;
}


export function convertToTfDataset(featuresDict, labelsDict) {
  // const featureKeys = Object.keys(featuresDict);
  // const labelKeys = Object.keys(labelsDict);

  const featuresList = convertDictToList(featuresDict);
  const labelsList = convertDictToList(labelsDict);

  console.log("featureList ",featuresList);

  // var points = [];
  // for(int i;i<featuresDict[featureKeys[0]].length;i++){

  // }

  // points = featureKeys.map(key => featuresDict[key]);
  // const labels = labelKeys.map(key => labelsDict[key]);

  return {
    xs: tf.tensor(featuresList), 
    ys: tf.tensor(labelsList),
    shape: [featuresDict[Object.keys(featuresDict)[0]].length,Object.keys(featuresDict).length], 
    inputShape: featuresList.length,
    outputShape: labelsList.length
  };
}
  
export async function getFeatures(){
  dataset = tf.data.csv(url, {
    hasHeader: true,
    
  });

  dataset.toArray().then(data => {
    data.forEach(element => {
      // console.log("Element ",element);
    
      // const unsubscribe = features.subscribe(value => {
      //   value.forEach(d => {
      //     if (!featuresDictLoc[d.c]) {
      //       featuresDictLoc[d.c] = [];
      //     }
      //     featuresDictLoc[d.c].push(element[d.c]);
      //   });
      // });    

      // console.log(get(features));

      get(features).forEach(d => {
        // console.log(d)
        if (!featuresDictLoc[d]) {
          featuresDictLoc[d] = [];
        }

        featuresDictLoc[d].push(element[d]);
      });

      get(labels).forEach(d => {
        // console.log(d)
        if (!labelsDictLoc[d]) {
          labelsDictLoc[d] = [];
        }

        labelsDictLoc[d].push(element[d]);
      });


      // unsubscribe();
      // const unsubscribe2 = labels.subscribe(value => {
      //   value.forEach(d => {
      //     if (!labelsDictLoc[d.c]) {
      //       labelsDictLoc[d.c] = [];
      //     }
      //     labelsDictLoc[d.c].push(element[d.c]);
      //   });
      // });

      // unsubscribe2();

    });
    featuresDict.set(featuresDictLoc);
    // console.log("Feature ",featuresDictLoc);
    labelsDict.set(labelsDictLoc);
    tfdata.set(convertToTfDataset(featuresDictLoc,labelsDictLoc));
    console.log(get(tfdata));
});

}