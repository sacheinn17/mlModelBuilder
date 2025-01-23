export type ActivationFunction = 'relu' | 'sigmoid' | 'tanh' | 'linear';

export interface LayerConfig {
  type: 'input' | 'hidden' | 'output';
  neurons: number;
  label: string;
  activation?: ActivationFunction;
  l1?: number;
  l2?: number;
}

export interface NetworkConfig {
  layers: LayerConfig[];
}