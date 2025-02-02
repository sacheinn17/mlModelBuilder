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

let featuresDict = {};
let labelsDict = {};

export async function getFeatures(){
  dataset = tf.data.csv(url, {
    hasHeader: true,
    
  });

  dataset.toArray().then(data => {
    data.forEach(element => {
    
      const unsubscribe = features.subscribe(value => {
        value.forEach(d => {
          if (!featuresDict[d.c]) {
            featuresDict[d.c] = [];
          }
          featuresDict[d.c].push(element[d.c]);
        });
      });    
      // unsubscribe();
      const unsubscribe2 = labels.subscribe(value => {
        value.forEach(d => {
          if (!labelsDict[d.c]) {
            labelsDict[d.c] = [];
          }
          labelsDict[d.c].push(element[d.c]);
        });
      });
      // unsubscribe();

    });


});

}
