var data = [
                {
                    'date': 1,
                    'label': 2012,
                    'orange': 8794,
                    'providers': 7215,
                    'orange_var': -6,
                    'provdiers_var': -6.5
                }, {
                    'date': 2,
                    'label': 2012,
                    'orange': 8604,
                    'providers': 7012,
                    'orange_var': -8.7,
                    'provdiers_var': -9.5
                }, {
                    'date': 3,
                    'label': 2012,
                    'orange': 8409,
                    'providers': 6993,
                    'orange_var': -9.1,
                    'provdiers_var': -10
                }, {
                    'date': 4,
                    'label': 2012,
                    'orange': 8573,
                    'providers': 6923,
                    'orange_var': -8.6,
                    'provdiers_var': -9.6
                }, {
                    'date': 5,
                    'label': 2013,
                    'orange': 7970,
                    'providers': 6479,
                    'orange_var': -9.4,
                    'provdiers_var': -10.2
                }, {
                    'date': 6,
                    'label': 2013,
                    'orange': 8192,
                    'providers': 6562,
                    'orange_var': -5.5,
                    'provdiers_var': -6.4
                }, {
                    'date': 7,
                    'label': 2013,
                    'orange': 7756,
                    'providers': 6378,
                    'orange_var': -7.8,
                    'provdiers_var': -8.8
                }, {
                    'date': 8,
                    'label': 2013,
                    'orange': 8045,
                    'providers': 6415,
                    'orange_var': -6.2,
                    'provdiers_var': -7.3
                }
            ];

function add_name(d) {
    d.vector = [ {'value': d.orange, 'variation': d.orange_var}, {'value': d.providers, 'variation': d.provdiers_var}];
}
data.forEach(add_name)


var maxValue = 8794,
    minValue = 6378;

var svg = d3.select("body").append("svg"),
    margin = {top: 15, bottom: 15, left: 50, right: 50},
    height = 350,
    width = 800;

svg.attr('height', height + margin.top + margin.bottom)
    .attr('width', width + margin.left + margin.right);

var scale_height = d3.scale.linear()
    .domain([minValue, maxValue])
    .range([height/1.75, height - margin.top]);

var scale_pos_groups = d3.scale.ordinal()
    .domain([1, 2, 3, 4, 5, 6, 7, 8])
    .rangeRoundBands([0, width], 0.1);

var scale_position = d3.scale.ordinal()
    .domain([0, 1])
    .rangeRoundBands([0, scale_pos_groups.rangeBand()], 0.1);

var scale_cy = d3.scale.linear()
    .domain([-10.2, -5.5])
    .range([300, 200]);

// Data join
var rects = svg.selectAll('rect')
    .data(data);

// Create elements with the enter selection
var trimestre = svg.selectAll(".trimestre")
    .data(data)

trimestre.enter().append('g')
    .attr("class", 'g')
    .attr("transform", function(d) { return "translate(" + scale_pos_groups(d.date) + ", 0)"; });

var bars = trimestre.selectAll("rect")
    .data(function(d) { return d.vector; })
  .enter().append("rect")
    .attr("width", scale_position.rangeBand())
    .attr('height', function(d) { return scale_height(d.value); })
    .attr("x", function(d,i) { return scale_position(i); })
    .attr("y", function(d) {return height - scale_height(d.value)})
    .attr('fill', 'blue');

var points = trimestre.selectAll("circle")
    .data(function(d) { return d.vector; })
  .enter().append("circle")
    .attr("cx", function(d,i) { return scale_position(i) + scale_position.rangeBand(); })
    .attr("cy", function(d) { return scale_cy(d.variation); })
    .attr("r", 7)
    .attr('fill', 'steelblue');

// rects.enter().append('rect')
//     .attr('width', 20)
//     .attr('height', function(d) { return scale_height(d.orange); })
//     .attr('x', function(d) {return scale_position(d.date); })
//     .attr('y', function(d) {return height - scale_height(d.orange)})
//     .attr('fill', 'blue');





