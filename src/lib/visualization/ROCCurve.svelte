<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  export let predictions = [];
  export let labels = [];
  
  let container;
  
  $: if (container && predictions.length && labels.length) {
    drawROC();
  }

  function calculateROC(predictions, labels) {
    const points = [];
    const thresholds = d3.range(0, 1.01, 0.01);
    
    thresholds.forEach(threshold => {
      const predicted = predictions.map(p => p >= threshold ? 1 : 0);
      const tp = predicted.filter((p, i) => p === 1 && labels[i] === 1).length;
      const fp = predicted.filter((p, i) => p === 1 && labels[i] === 0).length;
      const fn = predicted.filter((p, i) => p === 0 && labels[i] === 1).length;
      const tn = predicted.filter((p, i) => p === 0 && labels[i] === 0).length;
      
      const tpr = tp / (tp + fn) || 0;
      const fpr = fp / (fp + tn) || 0;
      
      points.push({ fpr, tpr });
    });
    
    return points;
  }

  function drawROC() {
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

    const rocPoints = calculateROC(predictions.flat(), labels.flat());
    
    const x = d3.scaleLinear()
      .domain([0, 1])
      .range([0, width]);
      
    const y = d3.scaleLinear()
      .domain([0, 1])
      .range([height, 0]);

    // Add diagonal reference line
    svg.append("line")
      .attr("x1", x(0))
      .attr("y1", y(0))
      .attr("x2", x(1))
      .attr("y2", y(1))
      .attr("stroke", "#ccc")
      .attr("stroke-dasharray", "4");

    // Add ROC curve
    const line = d3.line()
      .x(d => x(d.fpr))
      .y(d => y(d.tpr));

    svg.append("path")
      .datum(rocPoints)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Add axes
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append("g")
      .call(d3.axisLeft(y));

    // Add labels
    svg.append("text")
      .attr("x", width/2)
      .attr("y", height + margin.bottom)
      .style("text-anchor", "middle")
      .text("False Positive Rate");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height/2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("True Positive Rate");

    // Calculate AUC
    const auc = d3.polygonArea(rocPoints.map(p => [p.fpr, p.tpr]));
    
    svg.append("text")
      .attr("x", width - 60)
      .attr("y", 20)
      .style("text-anchor", "start")
      .text(`AUC: ${auc.toFixed(3)}`);
  }
</script>

<div bind:this={container} class="roc-container" />

<style>
  .roc-container {
    background-color: rgb(65, 65, 65);;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
</style>