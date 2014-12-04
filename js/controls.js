var margin = {top: 15, bottom: 50, left: 5, right: 50},
    height = 50,
    width = 800;

var svg_controls = d3.select("body").append("svg")
    .attr('height', height + margin.top + margin.bottom)
    .attr('width', width + margin.left + margin.right)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

   svg_controls.selectAll("foreignObject")
      .data([1])
        .enter()
      .append("foreignObject")
        .attr('x', 0)
        .attr('y', 20)
        .attr('width', "30px")
        .attr('height', "30px")
        .append("xhtml:body")
        .html("<form><input type=checkbox id=check1></input></form>");

   svg_controls.append("foreignObject")
        .attr('x', 0)
        .attr('y', 40)
        .attr('width', "30px")
        .attr('height', "30px")
        .append("xhtml:body")
        .html("<form><input type=checkbox id=check2></input></form>");

check1.onchange = function() {
	var value_box = $("#check1").is(":checked");
	console.log(value_box)};

//  var x = document.createElement("INPUT");
//     x.setAttribute("type", "checkbox");
//     document.body.appendChild(x);