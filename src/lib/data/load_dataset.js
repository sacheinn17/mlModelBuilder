// Import required modules
import * as tf from '@tensorflow/tfjs';
import {columns,features,labels} from "$lib/stores/networkStore.js";
import { featuresDict,labelsDict } from '$lib/stores/networkStore.js';
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
});

}
