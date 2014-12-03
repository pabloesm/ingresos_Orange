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


var duration = 1000,
    providers = true,
    variation = true;

function add_name(d) {
    d.vector = [ {'value': d.orange, 'variation': d.orange_var}, {'value': d.providers, 'variation': d.provdiers_var}];
}
data.forEach(add_name)


var maxValue = 8794,
    minValue = 6378;

var margin = {top: 15, bottom: 15, left: 50, right: 50},
    height = 350,
    width = 800;

var svg = d3.select("body").append("svg")
    .attr('height', height + margin.top + margin.bottom)
    .attr('width', width + margin.left + margin.right)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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

var scale_color = d3.scale.ordinal()
    .domain([0, 1])
    .range(["#E88347", "#F1C5AD"]);

var scale_yAxis = d3.scale.linear()
    .domain([8794, 0])
    .range([0, height]);

var yAxis = d3.svg.axis()
    .scale(scale_yAxis)
    .orient("left");

svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(0, 0)")
    .call(yAxis);

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
    .attr("x", function(d, i) { return scale_position(i); })
    .attr("y", function(d) { return height - scale_height(d.value); })
    .attr('fill', function(d, i) { return scale_color(i); })
    .attr('class', function(d, i) { return which_class(d, i); });

function which_class(d, i) {
    if (i === 0) {
        class_id = 'orange';
    } else if (i === 1) {
        class_id = 'providers';
    };
    return class_id;
}

var points = trimestre.selectAll("circle")
    .data(function(d) { return d.vector; })
  .enter().append("circle")
    .attr("cx", function(d, i) { return scale_position(i) + scale_position.rangeBand(); })
    .attr("cy", function(d) { return scale_cy(d.variation); })
    .attr("r", 7)
    .attr('fill', "#777777")
    .attr('class', function(d, i) { return which_class(d,i); });

function update_bars_orange() {
    svg.selectAll("g")
      .selectAll("rect.orange")
        .attr("x", function() { return parseFloat(d3.select(this).attr("x")) + 1; })
        .attr("width", function() { return parseFloat(d3.select(this).attr("width")) + 5; });
}

function hide_providers() {
    providers = false;

    svg.selectAll("g")
      .selectAll("rect.providers")
        .transition().duration(duration)
        .attr("width", 0);

    svg.selectAll("g")
        .selectAll("circle.providers")
        .transition().duration(duration)
        .attr("r", 0);
}

function show_providers() {
    providers = true;

    svg.selectAll("g")
      .selectAll("rect.providers")
        .transition().duration(duration)
        .attr("width", scale_position.rangeBand());

    if (variation) {
        svg.selectAll("g")
          .selectAll("circle.providers")
            .transition().duration(duration)
            .attr("r", 7);
    }

}

function hide_variation() {
    variation = false;

    svg.selectAll("g")
      .selectAll("circle")
        .transition().duration(duration)
        .attr("r", 0);
}

function show_variation() {
    variation = true;

    svg.selectAll("g")
      .selectAll("circle.orange")
        .transition().duration(duration)
        .attr("r", 7);

    if (providers) {
        svg.selectAll("g")
          .selectAll("circle.providers")
            .transition().duration(duration)
            .attr("r", 7);
    }
}


$(document).ready(function() {
    $( "rect" ).tipsy({
        gravity: 's',
        html: true,
        title: function() {
            return 'Ingresos: <b>8746</b><br>Var. interanual: 345'; }
    });
});






// var margin = {top: 15, bottom: 15, left: 50, right: 50},
//     height = 350,
//     width = 800;

// var svg = d3.select("body").append("svg")
//     .attr('height', height + margin.top + margin.bottom)
//     .attr('width', width + margin.left + margin.right)
//   .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// svg.append("g")
//     .attr("class", "x axis")
//     .attr("transform", "translate(0," + height + ")");


// var margin = {top: 15, bottom: 15, left: 50, right: 50},
//     height = 350,
//     width = 800;

// var svg = d3.select("body").append("svg");

// svg.attr('height', height + margin.top + margin.bottom)
//     .attr('width', width + margin.left + margin.right)
//   .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// svg.append("g")
//     .attr("class", "x axis")
//     .attr("transform", "translate(0," + height + ")");







