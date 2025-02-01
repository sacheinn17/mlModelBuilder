<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  export let data = { xs: [], ys: [] };
  export let predictions = null;
  
  let container;
  
  $: if (container && data.xs.length) {
    drawPlot();
  }

  function drawPlot() {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 300 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    d3.select(container).selectAll("*").remove();
    
    const svg = d3.select(container)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain(d3.extent(data.xs, d => d[0]))
      .range([0, width]);
      
    const y = d3.scaleLinear()
      .domain(d3.extent(data.xs, d => d[1]))
      .range([height, 0]);

    // Add points
    svg.selectAll("circle")
      .data(data.xs)
      .enter()
      .append("circle")
      .attr("cx", d => x(d[0]))
      .attr("cy", d => y(d[1]))
      .attr("r", 3)
      .attr("fill", (d, i) => data.ys[i][0] ? "#ff6b6b" : "#4ecdc4")
      .attr("opacity", 0.6);

    // Add prediction overlay if available
    if (predictions) {
      svg.selectAll(".prediction")
        .data(data.xs)
        .enter()
        .append("circle")
        .attr("class", "prediction")
        .attr("cx", d => x(d[0]))
        .attr("cy", d => y(d[1]))
        .attr("r", 5)
        .attr("fill", "none")
        .attr("stroke", (d, i) => predictions[i][0] > 0.5 ? "#ff6b6b" : "#4ecdc4")
        .attr("stroke-width", 2);
    }

    // Add axes
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append("g")
      .call(d3.axisLeft(y));
  }
</script>

<div bind:this={container} class="dataset-plot" />

<style>
  .dataset-plot {
    background-color: rgb(65, 65, 65);;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
</style>