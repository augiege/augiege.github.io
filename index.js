async function init() {

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

d3.select("svg") // X Axis
.append("g")
.attr("transform", "translate("+margin+","+(height+margin)+")")
.call(d3.axisBottom(xs)
        .tickValues([10, 20, 50, 100])
        .tickFormat(d3.format("~s")));

d3.select("svg") // Y Axis
.append("g")
.attr("transform", "translate("+margin+","+margin+")")
.call(d3.axisLeft(ys)
        .tickValues([10, 20, 50, 100])
        .tickFormat(d3.format("~s")));
 
d3.select("svg") // Title
.append("g")
.append("text")
.attr("text-anchor", "middle") 
.text("Automobiles by Mileage")
.attr("class", "title")
.style("font-size", "21px") 
.attr("x", 480)
.attr("y", margin)
.attr("text-anchor", "middle"); 

d3.select("svg") // X Label
.append("g")
.append("text")
.text("Average City MPG (Log 2)")
.attr("class", "x label")
.attr("text-anchor", "end")
.attr("x", (canvas_w-margin) / 2)
.attr("y", (height+margin) + 50);

d3.select("svg") // Y Label
.append("g")
.append("text")
.text("Average Highway MPG (Log 2)")
.attr("class", "y label")
.attr("text-anchor", "end")
.attr("x", -350)
.attr("y", 100)
.attr("transform", "rotate(-90)");


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

}