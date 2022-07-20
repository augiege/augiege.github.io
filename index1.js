// set the dimensions and margins of the graph
margin = 150;
height = 600;
canvas_w=1200; 
canvas_h=1200;

// Read data
d3.csv('count_by_make.csv').then(function(data) {

  // stratify the data: reformatting for d3.js
  const root = d3.stratify()
    .id(function(d) { return d.Make; })   // Name of the entity (column name is name in csv)
    .parentId(function(d) { return d.parent; })   // Name of the parent (column name is parent in csv)
    (data);
  root.sum(function(d) { return +d.n })   // Compute the numeric value for each entity

  // Then d3.treemap computes the position of each element of the hierarchy
  // The coordinates are added to the root object above
  d3.treemap()
    .size([canvas_w - 2*margin, canvas_h - 2*margin])
    .padding(4)
    (root)

  //use this information to add rectangles:
  d3.select("svg")
    .append("g")
    .attr("id", "treemap")
    .selectAll("rect")
    .data(root.leaves())
    .join("rect")
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("stroke", "black")
      .style("fill", "lightblue")
      .attr("transform", "translate("+margin+","+margin+")");

  // and to add the text labels
  d3.select("svg")
  .append("g")
  .attr("id", "treemap_text")
    .selectAll("text")
    .data(root.leaves())
    .join("text")
      .attr("x", function(d){ return d.x0+10})    // +10 to adjust position (more right)
      .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
      .text(function(d){ return d.data.Make})
      .attr("font-size", "15px")
      .attr("fill", "black")
      .attr("transform", "translate("+margin+","+margin+")")

d3.select("svg") // Title mpg chart
    .append("g")
    .attr("id", "title_tree")
    .append("text")
    .attr("text-anchor", "middle") 
    .text("Treemap by Vehicle Count")
    .attr("class", "title")
    .style("font-size", "21px") 
    .attr("x", canvas_w / 2)
    .attr("y", margin)
    .attr("text-anchor", "middle"); 
})

