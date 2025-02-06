import * as tf from '@tensorflow/tfjs';
import { network, isTraining, loss } from '../stores/networkStore';
import { get } from 'svelte/store';
import {tfdata} from "$lib/stores/networkStore.js";

var data = [];

const unsubscribe = tfdata.subscribe(value => {
  data = value;

}
);



export function createModel() {
  const networkData = get(network);
  const model = tf.sequential();
    
  networkData.layers.forEach((layer, index) => {
    if (index === 0) return;
      
    model.add(tf.layers.dense({
      units: layer.neurons,
      activation: layer.activation || (index === networkData.layers.length - 1 ? 'sigmoid' : 'relu'),
      inputShape: index === 1 ? [networkData.layers[0].neurons] : undefined,
      kernelRegularizer: tf.regularizers.l1l2({
        l1: layer.l1 || 0,
        l2: layer.l2 || 0
      })
    }));
  });

  model.compile({
    optimizer: tf.train.adam(0.01),
    loss: 'binaryCrossentropy',
    metrics: ['accuracy']
  });
  console.log(model);
  return model;
}

export async function trainModel(dataset, onMetricsUpdate) {
  const model = createModel();
  isTraining.set(true);

  try {
    // const { xs, ys } = dataset.generate();
    const { xs, ys } = data;
    console.log("dataset xs ",xs,"ys ",ys);
    await model.fit(xs, ys, {
      epochs: 50,
      batchSize: 32,
      validationSplit: 0.2,
      shuffle: true,
      callbacks: {
        onEpochEnd: async (epoch, logs) => {
          loss.set(logs.loss);
          
          // Calculate current predictions
          const predictions = model.predict(xs);
          const predsArray = await predictions.array();
          predictions.dispose();
          
          if (onMetricsUpdate) {
            onMetricsUpdate({
              epoch,
              loss: logs.loss,
              accuracy: logs.acc,
              valLoss: logs.val_loss,
              valAccuracy: logs.val_acc,
              predictions: predsArray
            });
          }
        }
      }
    });

    const predictions = model.predict(xs);
    const predsArray = await predictions.array();
    const labelsArray = await ys.array();
    
    predictions.dispose();
    return { predsArray, labelsArray, xs: await xs.array() };
  }
  
  catch (e){
    console.log("Train ",e);
  }
  finally {
    isTraining.set(false);
  }
}