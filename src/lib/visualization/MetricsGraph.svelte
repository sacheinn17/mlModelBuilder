<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  export let metrics = [];
  let container;
  
  $: if (container && metrics.length) {
    drawMetrics();
  }

  function drawMetrics() {
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 400 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    d3.select(container).selectAll("*").remove();
    
    const svg = d3.select(container)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain([0, metrics.length - 1])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, Math.max(...metrics.map(m => m.loss))])
      .range([height, 0]);

    // Add loss line
    const line = d3.line()
      .x((d, i) => x(i))
      .y(d => y(d.loss));

    svg.append("path")
      .datum(metrics)
      .attr("fill", "none")
      .attr("stroke", "#ff7133")
      .attr("stroke-width", 2.5)
      .attr("d", line);

    // Add axes
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5));

    svg.append("g")
      .call(d3.axisLeft(y));

    // Add labels
    svg.append("text")
      .attr("x", width/2)
      .attr("y", height + margin.bottom)
      .style("text-anchor", "middle")
      .attr("fill","#d4ff33")
      .text("Epoch");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height/2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .attr("fill","#d4ff33")
      .text("Loss");
  }
</script>

<div bind:this={container} class="metrics-container" />

<style>
  .metrics-container {
    background-color: rgb(65, 65, 65);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
    padding: 20px;
  }
</style>