import { writable } from 'svelte/store';


export const columns = writable([]);
export const features = writable([]);
export const labels = writable([]);

export const featuresDict = writable({});
export const labelsDict = writable({});

var fn = 2;
var fn2 = 1;
var ln =0;

var initialNetwork = {
  layers: [
    { type: 'input', neurons: 2, label: 'Input Layer' },
    { type: 'hidden', neurons: 4, label: 'Hidden Layer 1', activation: 'relu' },
    { type: 'output', neurons: 1, label: 'Output Layer', activation: 'sigmoid' }
  ]
};

function createNetworkStore() {
  
  const { subscribe, set, update } = writable(initialNetwork);

  return {
    subscribe,
    addLayer: () => update(n => {
      console.log("fb ",fn);
      const newLayers = [...n.layers];
      newLayers.splice(newLayers.length - 1, 0, {
        type: 'hidden',
        neurons: 4,
        activation: 'relu',
        label: `Hidden Layer ${newLayers.length - 1}`,
        l1: 0,
        l2: 0
      });
      return { ...n, layers: newLayers };
    }),
    removeLayer: (index) => update(n => {
      if (n.layers.length <= 3 || index === 0 || index === n.layers.length - 1) return n;
      const newLayers = [...n.layers];
      newLayers.splice(index, 1);
      newLayers.forEach((layer, i) => {
        if (i > 0 && i < newLayers.length - 1) {
          layer.label = `Hidden Layer ${i}`;
        }
      });
      return { ...n, layers: newLayers };
    }),
    updateLayer: (index, changes) => update(n => {
      const newLayers = [...n.layers];
      newLayers[index] = { ...newLayers[index], ...changes };
      return { ...n, layers: newLayers };
    }),
    updateNeurons: (index, delta) => update(n => {
      if (index === 0 || index === n.layers.length - 1) return n;
      const newLayers = [...n.layers];
      const layer = newLayers[index];
      layer.neurons = Math.max(1, Math.min(20, layer.neurons + delta));
      return { ...n, layers: newLayers };
    }),
    reset: () => set(initialNetwork)
  };
}

export const network = createNetworkStore();
export const isTraining = writable(false);
export const loss = writable(0);
export const tfdata = writable({"xs":0,"ys":0,"inputShape":0,"outputShape":0});

const unsubscribe = featuresDict.subscribe(value => {
  if (Object.keys(value).length >2){
    fn = Object.keys(value).length;
  }
  console.log(fn);
  
  network.updateLayer(0, { neurons: fn });
  
  });


