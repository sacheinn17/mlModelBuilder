// Import required modules
import * as tf from '@tensorflow/tfjs';
import {columns,features,labels} from "$lib/stores/networkStore.js";
import { featuresDict,labelsDict,tfdata} from '$lib/stores/networkStore.js';
var dataset = [];
var url = "https://storage.googleapis.com/tfjs-examples/multivariate-linear-regression/data/boston-housing-train.csv";
export async function getColumns(csvUrl){
  dataset = tf.data.csv(csvUrl, {
    hasHeader: true,
    
  });
  const columnNames = await dataset.columnNames();
  columns.set(columnNames);
}

let featuresDictLoc = {};
let labelsDictLoc = {};


// Function to convert dictionaries into tensor format
export function convertToTfDataset(featuresDict, labelsDict) {
  const featureKeys = Object.keys(featuresDict);
  const labelKeys = Object.keys(labelsDict);

  // Ensure both dictionaries have the same length
  // if (featureKeys.length !== labelKeys.length) {
  //   throw new Error("Mismatch between feature and label count.");
  // }

  // Convert dictionary values into arrays
  const points = featureKeys.map(key => featuresDict[key]);
  const labels = labelKeys.map(key => labelsDict[key]);

  // Convert to TensorFlow tensors
  return {
    xs: tf.tensor2d(points),   // Convert features to tensor
    ys: tf.tensor2d(labels),   // Convert labels to tensor
    inputShape: points[0].length,  // Number of features per input
    outputShape: labels[0].length   // Number of outputs per label
  };
}



export async function getFeatures(){
  dataset = tf.data.csv(url, {
    hasHeader: true,
    
  });

  dataset.toArray().then(data => {
    data.forEach(element => {
    
      const unsubscribe = features.subscribe(value => {
        value.forEach(d => {
          if (!featuresDictLoc[d.c]) {
            featuresDictLoc[d.c] = [];
          }
          featuresDictLoc[d.c].push(element[d.c]);
        });
      });    
      unsubscribe();
      const unsubscribe2 = labels.subscribe(value => {
        value.forEach(d => {
          if (!labelsDictLoc[d.c]) {
            labelsDictLoc[d.c] = [];
          }
          labelsDictLoc[d.c].push(element[d.c]);
        });
      });

      unsubscribe2();

    });
    featuresDict.set(featuresDictLoc);
    labelsDict.set(labelsDictLoc);
    tfdata.set(convertToTfDataset(featuresDictLoc,labelsDictLoc));
});

}