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
                    'orange': 8794,
                    'providers': 7215,
                    'orange_var': -6,
                    'provdiers_var': -6.5 
                }, {
                    'date': 5,
                    'label': 2012,
                    'orange': 8794,
                    'providers': 7215,
                    'orange_var': -6,
                    'provdiers_var': -6.5 
                }, {
                    'date': 6,
                    'label': 2012,
                    'orange': 8794,
                    'providers': 7215,
                    'orange_var': -6,
                    'provdiers_var': -6.5 
                }, {
                    'date': 7,
                    'label': 2012,
                    'orange': 8794,
                    'providers': 7215,
                    'orange_var': -6,
                    'provdiers_var': -6.5 
                }, {
                    'date': 8,
                    'label': 2012,
                    'orange': 8794,
                    'providers': 7215,
                    'orange_var': -6,
                    'provdiers_var': -6.5 
                }
            ];

var maxValue = 9000,
    minValue = 6900;

var svg = d3.select("body").append("svg"),
    margin = {top: 15, bottom: 15, left: 50, right: 50},
    height = 350,
    width = 800;

svg.attr('height', height + margin.top + margin.bottom)
    .attr('width', width + margin.left + margin.right);

var scale_height = d3.scale.linear()
    .domain([minValue, maxValue])
    .range([height/18, height]);

var scale_position = d3.scale.linear()
    .domain([1, 8])
    .range([0 + margin.left, width]);

// Data join
var rects = svg.selectAll('rect')
    .data(data);

// Create elements with the enter selection
rects.enter().append('rect')
    .attr('width', 20)
    .attr('height', function(d) { return scale_height(d.orange); })
    .attr('x', function(d) {return scale_position(d.date); })
    .attr('y', function(d) {return height - scale_height(d.orange)})
    .attr('fill', 'blue');





