// Import required modules
import * as tf from '@tensorflow/tfjs';

export async function loadAndPrepareData(csvUrl) {
  const csvDataset = tf.data.csv(csvUrl,{
      hasHeader:true,
    columnConfigs: {
      crim: {
        isLabel: true
      }
    }
  });
console.log(csvDataset);
  try {

    const columnNames = await csvDataset.columnNames();
    // console.log('Column names:', columnNames);

    const columnMap = {};
    columnNames.forEach((name, index) => {
      columnMap[name] = index;
    });


    const flattenedDataset = csvDataset.map(record => {
      const xs = columnNames.map((name) => {if (name === 'indus') {
            record['xs'][name]};})

      const ys = record['ys']['crim']; 
      return { xs, ys };
    }).batch(10); 

    let features = [];
    let labels = [];
    
    const datasetArray = await flattenedDataset.toArray();
    console.log(datasetArray);
    console.log(flattenedDataset)
    for (const data of datasetArray) {
        console.log(data);
      features.push(data.xs);
      labels.push(data.ys);
    }

    console.log(`Features shape: ${features[0].shape}`);
    console.log(`Labels shape: ${labels[0].shape}`);

    return { features, labels, columnMap };
  } catch (error) {
    console.error('Error loading data:', error);
    throw error;
  }
}

// Usage example
// async function main() {
//   try {
//     const { features, labels, columnMap } = await loadAndPrepareData(
//       'https://storage.googleapis.com/tfjs-examples/multivariate-linear-regression/data/boston-housing-train.csv'
//     );

//     // Now you can use 'features' and 'labels' for model training or inference
//     console.log('Data loaded successfully!');
//     console.log('Column map:', columnMap);
//   } catch (error) {
//     console.error('Error loading data:', error);
//   }
// }

// main();
