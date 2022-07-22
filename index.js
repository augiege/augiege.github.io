async function init() {

d3.select("#base").remove();
d3.select("#x_ax_base").remove();
d3.select("#y_ax_base").remove();
d3.select("#title_base").remove();
d3.select("#x_label_base").remove();
d3.select("#y_label_base").remove();
d3.select("#make_mpg").remove();
d3.select("#x_ax_mpg").remove();
d3.select("#y_ax_mpg").remove();
d3.select("#title_mpg").remove();
d3.select("#x_label_mpg").remove();
d3.select("#y_label_mpg").remove();
d3.select("#treemap").remove();
d3.select("#treemap_text").remove();
d3.select("#title_tree").remove();
d3.selectAll("#base_annotations").remove();
d3.selectAll("#count_annotations").remove()

const data = await d3.csv("cars2017_ids.csv");

margin = 150;
height = 600;
canvas_w=1200; 
canvas_h=1200;

var log = d3.scaleLog()
            .domain([10, 150])
            .range([0, 600]);

ys = d3.scaleLog().domain([10, 150]).range([600,0]);
xs = d3.scaleLog().domain([10, 150]).range([0,600]);

d3.select("svg")
.append("g")
.attr("id", "base")
.attr("transform", "translate("+margin+","+margin+")")
.selectAll("circle")
.data(data)
.enter()
.append("circle")
.attr("fill", "lightgreen")
.attr("stroke", "black")
.attr("cx", function(d) {return log(+d.AverageCityMPG);})
.attr("cy", function(d) {return +height+ - log(+d.AverageHighwayMPG);})
.attr("r", function(d) {return 5+ 3*+d.EngineCylinders;})
.on("mouseover", handleMouseOver)
.on("mouseout", handleMouseOut);

d3.select("svg") // X Axis base chart
.append("g")
.attr("id", "x_ax_base")
.attr("transform", "translate("+margin+","+(height+margin)+")")
.call(d3.axisBottom(xs)
        .tickValues([10, 20, 50, 100])
        .tickFormat(d3.format("~s")));

d3.select("svg") // Y Axis base chart
.append("g")
.attr("id", "y_ax_base")
.attr("transform", "translate("+margin+","+margin+")")
.call(d3.axisLeft(ys)
        .tickValues([10, 20, 50, 100])
        .tickFormat(d3.format("~s")));
 
d3.select("svg") // Title base chart
.append("g")
.attr("id", "title_base")
.append("text")
.attr("text-anchor", "middle") 
.text("Automobiles by Mileage")
.attr("class", "title")
.style("font-size", "21px") 
.attr("x", 480)
.attr("y", margin)
.attr("text-anchor", "middle"); 

d3.select("svg") // X Label base chart
.append("g")
.attr("id", "x_label_base")
.append("text")
.text("Average City MPG (Log 2)")
.attr("class", "base_chart")
.attr("text-anchor", "end")
.attr("x", (canvas_w-margin) / 2)
.attr("y", (height+margin) + 50);

d3.select("svg") // Y Label base chart
.append("g")
.attr("id", "y_label_base")
.append("text")
.text("Average Highway MPG (Log 2)")
.attr("class", "base_chart")
.attr("text-anchor", "end")
.attr("x", -350)
.attr("y", 100)
.attr("transform", "rotate(-90)");

// ** Update to make_count chart (Called from the onclick)
document.getElementById("bar_mpg_button").onclick = function displayBarMake() {
        d3.select("#base").remove();
        d3.select("#x_ax_base").remove();
        d3.select("#y_ax_base").remove();
        d3.select("#title_base").remove();
        d3.select("#x_label_base").remove();
        d3.select("#y_label_base").remove();
        d3.select("#make_mpg").remove();
        d3.select("#x_ax_mpg").remove();
        d3.select("#y_ax_mpg").remove();
        d3.select("#title_mpg").remove();
        d3.select("#x_label_mpg").remove();
        d3.select("#y_label_mpg").remove();
        d3.select("#treemap").remove();
        d3.select("#treemap_text").remove();
        d3.select("#title_tree").remove();
        d3.selectAll("#base_annotations").remove();
        d3.selectAll("#count_annotations").remove();

        var xs_count = d3.scaleBand()
          .range([0, 900])
          .padding(0.1);
        var ys_count = d3.scaleLinear()
          .range([600,0]);

// get the data
d3.csv("mpg_by_make.csv").then(function(data) {

  // Scale the range of the data in the domains
  xs_count.domain(data.map(function(d) { return d.Make; }));
  ys_count.domain([0, d3.max(data, function(d) { return d.mean_by_make; })]);

  // append the rectangles for the bar chart
  d3.select("svg")
  .append("g")
  .attr("id", "make_mpg")
  .attr("transform", "translate("+margin+","+margin+")")
  .selectAll("rect")
  .data(data)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("fill", "pink")
    .attr("x", function(d) { return xs_count(d.Make); })
    .attr("width", xs_count.bandwidth())
    .attr("y", function(d) { return ys_count(d.mean_by_make); })
    .attr("height", function(d) { return height - ys_count(d.mean_by_make); });

  d3.select("svg") // X Axis mpg chart
  .append("g")
  .attr("id", "x_ax_mpg")
  .attr("transform", "translate("+margin+","+(height+margin)+")")
      .call(d3.axisBottom(xs_count))
      .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  d3.select("svg") // Y Axis mpg chart
  .append("g")
  .attr("id", "y_ax_mpg")
  .attr("transform", "translate("+margin+","+margin+")")
      .call(d3.axisLeft(ys_count));

  d3.select("svg") // X Label mpg chart
  .append("g")
  .attr("id", "x_label_mpg")
  .append("text")
  .text("Make")
  .attr("font-size", "20")
  .attr("text-anchor", "end")
  .attr("x", canvas_w / 2)
  .attr("y", (height+margin) + 75);

  d3.select("svg") // Y Label mpg chart
  .append("g")
  .attr("id", "y_label_mpg")
  .append("text")
  .text("Average MPG")
  .attr("text-anchor", "end")
  .attr("x", -350)
  .attr("y", 100)
  .attr("transform", "rotate(-90)");

d3.select("svg") // Title mpg chart
.append("g")
.attr("id", "title_mpg")
.append("text")
.attr("text-anchor", "middle") 
.text("Average MPG by Make")
.attr("class", "title")
.style("font-size", "21px") 
.attr("x", canvas_w / 2)
.attr("y", margin)
.attr("text-anchor", "middle"); 

});
}

document.getElementById("treemap_button").onclick = function displayTreeMap() {
        d3.select("#base").remove();
        d3.select("#x_ax_base").remove();
        d3.select("#y_ax_base").remove();
        d3.select("#title_base").remove();
        d3.select("#x_label_base").remove();
        d3.select("#y_label_base").remove();
        d3.select("#make_mpg").remove();
        d3.select("#x_ax_mpg").remove();
        d3.select("#y_ax_mpg").remove();
        d3.select("#title_mpg").remove();
        d3.select("#x_label_mpg").remove();
        d3.select("#y_label_mpg").remove();
        d3.select("#treemap").remove();
        d3.select("#treemap_text").remove();
        d3.select("#title_tree").remove();
        d3.selectAll("#base_annotations").remove();
        d3.selectAll("#count_annotations").remove()
        
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
        
    const make_count_annotations = d3.annotation()
          .type(d3.annotationLabel)
          .annotations(count_annotations)

      
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
      .attr("transform", "translate("+margin+","+margin+")")
      .on("mouseover", function() {d3.select("svg")
      .append("g")
      .attr("id", "count_annotations")
      .attr("class", "annotation-group")
      .call(make_count_annotations);});

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
      });
      

}


// Mouseover structure taken from http://bl.ocks.org/WilliamQLiu/76ae20060e19bf42d774
function handleMouseOver(d, i) {  // Add interactivity

        // Use D3 to select element, change color and size
        d3.select(this).transition()
        //.duration("0")
        .attr("fill", "orange")
        .attr("r", (5+ 3*+d.EngineCylinders) * 1.2);

        // Specify where to put label of text
        d3.select("svg").append("text")
        .attr("id", "t" + d.id)
        .attr("x", 300)
        .attr("y", 300)
        .text(function() {
          return ["Make: " + d.Make]
        });
        d3.select("svg").append("text")
        .attr("id", "t" + 150 + +d.id)
        .attr("x", 300)
        .attr("y", 315)
        .text(function() {
          return ["Fuel Type: " + d.Fuel]
        });
        d3.select("svg").append("text")
        .attr("id", "t" + 300 + +d.id)
        .attr("x", 300)
        .attr("y", 330)
        .text(function() {
          return ["Engine Cylinders: " + d.EngineCylinders]
        });
        d3.select("svg").append("text")
        .attr("id", "t" + 450 + +d.id)
        .attr("x", 300)
        .attr("y", 345)
        .text(function() {
          return ["Avg Highway MPG: " + d.AverageHighwayMPG]
        });
        d3.select("svg").append("text")
        .attr("id", "t" + 600 + +d.id)
        .attr("x", 300)
        .attr("y", 360)
        .text(function() {
          return ["Avg City MPG: " + d.AverageCityMPG]
        });

        d3.select("svg")
          .append("g")
          .attr("id", "base_annotations")
          .attr("class", "annotation-group")
          .call(make_base_annotations);
      }

function handleMouseOut(d, i) {
        // Use D3 to select element, change color back to normal
        d3.select(this).transition()
        .attr("fill", "lightgreen")
        .attr("r", 5+ 3*+d.EngineCylinders);

        // Select text by id and then remove
        d3.select("#t" + d.id).remove();  // Remove text location
        d3.select("#t" + 150 + +d.id).remove();
        d3.select("#t" + 300 + +d.id).remove();
        d3.select("#t" + 450 + +d.id).remove();
        d3.select("#t" + 600 + +d.id).remove();
      }

const base_annotations = [
        {
          note: {
            label: "The radius of the circles is a linear function of the amount of cylinders a vehicle has. \
             Since these are all electric, their radii are small.",
            title: "Electric Vehicles",
            wrap: 150,
            align: "left"
          },
          connector: {
            end: "arrow" // 'dot' also available
          },
          x: 730,
          y: 250,
          dy: 130,
          dx: 150
        },{
          note: {
            label: "Most of the cars on the market in 2017 utilized gasoline or diesel engines.",
            title: "Traditional Vehicles",
            wrap: 150,
            align: "left"
          },
          connector: {
            end: "arrow" // 'dot' also available
          },
          x: 360,
          y: 560,
          dy: 50,
          dx: 150
        }].map(function(d){ d.color = "#E8336D"; return d})

        const make_base_annotations = d3.annotation()
          .type(d3.annotationLabel)
          .annotations(base_annotations)

const count_annotations = [
        {
          note: {
            label: "This treemap displays node size based on number of new vehicles introduced in 2017. BMW had the \
            most with 9 vehicles.",
            title: "Count by Make",
            wrap: 150,
            align: "left"
          },
          connector: {
            end: "arrow" // 'dot' also available
          },
          x: 910,
          y: 750,
          dy: -130,
          dx: 150
        }].map(function(d){ d.color = "#E8336D"; return d})

}

