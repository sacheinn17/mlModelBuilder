import * as tf from '@tensorflow/tfjs';

export const xorDataset = {
  name: 'XOR',
  generate: () => {
    const xs = tf.tensor2d([[0, 0], [0, 1], [1, 0], [1, 1]]);
    const ys = tf.tensor2d([[0], [1], [1], [0]]);
    return { xs, ys, inputShape: 2, outputShape: 1 };
  }
};

export const circularDataset = {
  name: 'Circular',
  generate: (numPoints = 100) => {
    const points = [];
    const labels = [];
    
    for (let i = 0; i < numPoints; i++) {
      const r = Math.random() * 5;
      const theta = Math.random() * 2 * Math.PI;
      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);
      points.push([x, y]);
      labels.push([r <= 2.5 ? 1 : 0]);
    }
    
    return {
      xs: tf.tensor2d(points),
      ys: tf.tensor2d(labels),
      inputShape: 2,
      outputShape: 1
    };
  }
};


// Spiral dataset
export const spiralDataset = {
  name: 'Spiral',
  generate: (numPoints = 100) => {
    const points = [];
    const labels = [];
    
    for (let i = 0; i < numPoints; i++) {
      const r = i / numPoints * 5;
      const theta = i / numPoints * 4 * Math.PI;
      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);
      points.push([x, y]);
      labels.push([i < numPoints / 2 ? 1 : 0]);
    }
    
    return {
      xs: tf.tensor2d(points),
      ys: tf.tensor2d(labels),
      inputShape: 2,
      outputShape: 1
    };
  }
};



export const datasetCustom = {
  name: 'Custom',


}

export const datasets = [xorDataset, circularDataset, spiralDataset];