<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import { network } from '../stores/networkStore';

	export let width = 800;
	export let height = 400;
	let container;

	$: if (container && $network) {
		drawNetwork();
	}

	function drawNetwork() {
		const layerSpacing = width / ($network.layers.length + 1);
		const maxNeurons = Math.max(...$network.layers.map(l => l.neurons));
		const neuronSpacing = height / (maxNeurons + 1);

		d3.select(container).selectAll("*").remove();
		
		const svg = d3.select(container)
			.append("svg")
			.attr("width", width)
			.attr("height", height);

		drawConnections(svg, layerSpacing, neuronSpacing);
		drawLayers(svg, layerSpacing, neuronSpacing);
	}

	function drawConnections(svg, layerSpacing, neuronSpacing) {
		$network.layers.forEach((layer, i) => {
			if (i === 0) return;
			
			const prevLayer = $network.layers[i - 1];
			const x1 = layerSpacing * i;
			const x2 = layerSpacing * (i + 1);
			
			for (let n1 = 0; n1 < prevLayer.neurons; n1++) {
				const y1 = (height / 2) + ((n1 - (prevLayer.neurons - 1) / 2) * neuronSpacing);
				
				for (let n2 = 0; n2 < layer.neurons; n2++) {
					const y2 = (height / 2) + ((n2 - (layer.neurons - 1) / 2) * neuronSpacing);
					
					svg.append("line")
						.attr("x1", x1)
						.attr("y1", y1)
						.attr("x2", x2)
						.attr("y2", y2)
						.attr("stroke", "#ccc")
						.attr("stroke-width", 0.5);
				}
			}
		});
	}

	function drawLayers(svg, layerSpacing, neuronSpacing) {
		$network.layers.forEach((layer, i) => {
			const g = svg.append("g")
				.attr("transform", `translate(${layerSpacing * (i + 1)}, ${height/2})`);

			drawLayerContainer(g);
			drawNeurons(g, layer, neuronSpacing);
			drawLabels(g, layer, i);
		});
	}

	function drawLayerContainer(g) {
		g.append("rect")
			.attr("x", -40)
			.attr("y", -height/3)
			.attr("width", 80)
			.attr("height", (2 * height/3))
			.attr("fill", "none")
			.attr("stroke", "#ddd")
			.attr("stroke-dasharray", "5,5")
			.style("opacity", 0)
			.on("mouseover", function() { d3.select(this).style("opacity", 1); })
			.on("mouseout", function() { d3.select(this).style("opacity", 0); });
	}

	function drawNeurons(g, layer, neuronSpacing) {
		const displayNeurons = Math.min(10, layer.neurons);
		const remainingNeurons = layer.neurons - displayNeurons;
		
		for (let j = 0; j < displayNeurons; j++) {
			const y = ((j - (displayNeurons - 1) / 2) * neuronSpacing);
			
			g.append("circle")
				.attr("cx", 0)
				.attr("cy", y)
				.attr("r", 10)
				.attr("fill", "#fff")
				.attr("stroke", "#666");
		}

		if (remainingNeurons > 0) {
			g.append("text")
				.attr("x", 0)
				.attr("y", (displayNeurons * neuronSpacing / 2) + 20)
				.attr("text-anchor", "middle")
				.text(`+${remainingNeurons} more`);
		}
	}

	function drawLabels(g, layer, index) {
		g.append("text")
			.attr("x", 0)
			.attr("y", -height/3 - 10)
			.attr("text-anchor", "middle")
			.text(layer.label);

		g.append("text")
			.attr("x", 0)
			.attr("y", height/3 + 20)
			.attr("text-anchor", "middle")
			.text(`${layer.neurons} neurons`);

		if (index !== 0 && index !== $network.layers.length - 1) {
			g.append("text")
				.attr("x", 0)
				.attr("y", height/3 + 40)
				.attr("text-anchor", "middle")
				.attr("cursor", "pointer")
				.text("Remove Layer")
				.on("click", () => dispatch('removeLayer', { index }));
		}

		g.append("text")
			.attr("x", -30)
			.attr("y", height/3 + 60)
			.attr("cursor", "pointer")
			.text("-")
			.on("click", () => dispatch('updateNeurons', { index, delta: -1 }));

		g.append("text")
			.attr("x", 30)
			.attr("y", height/3 + 60)
			.attr("cursor", "pointer")
			.text("+")
			.on("click", () => dispatch('updateNeurons', { index, delta: 1 }));
	}

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<div bind:this={container} class="network-container" />

<style>
	.network-container {
		background-color: white;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		margin-top: 20px;
		padding: 20px;
		overflow-x: auto;
	}
</style>