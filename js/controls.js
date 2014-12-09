var margin = {top: 15, bottom: 10, left: 5, right: 50},
    height = 50,
    width = 800,
    separation = 25;


var svg_controls = d3.select("div.UI").append("svg")
    .attr('height', height + margin.top + margin.bottom)
    .attr('width', width + margin.left + margin.right)
    .append("g")
    .attr("class", "checkbox")
    .attr("transform", translation());

function translation() {
    var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
    var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
        // At least Safari 3+: "[object HTMLElementConstructor]"
    var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
    var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6

    if (isChrome | isSafari) {
        return "translate(" + margin.left + "," + 25 + ")";
    } else {
        return "translate(" + margin.left + "," + margin.top + ")";
    }

}

var legend = d3.select("svg").append("g")
    .attr("class", "legend")
    .attr("transform", "translate(40)")

legend.append("rect")
    .attr("width", 18)
    .attr("height", 18)
    .attr("fill", "#E88347");

legend.append("rect")
    .attr("width", 18)
    .attr("height", 18)
    .attr("y", separation)
    .attr("fill", "#F1C5AD");

legend.append("circle")
    .attr("cx", 9)
    .attr("cy", 9 + 2 * separation)
    .attr("r", 9)
    .attr("fill", "#777777");

legend.append("text")
    .attr("x", 22)
    .attr("y", 15)
    .attr("class", "legend")
    .style("text-anchor", "left")
    .style("font-size", "14px")
    .text("Ingresos telecomunicaciones y servicios audiovisuales");

legend.append("text")
    .attr("x", 22)
    .attr("y", 15 + separation)
    .attr("class", "legend")
    .style("text-anchor", "left")
    .style("font-size", "14px")
    .text("Ingresos principales operadores telecomunicaciones");

legend.append("text")
    .attr("x", 22)
    .attr("y", 15 + 2 * separation)
    .attr("class", "legend")
    .style("text-anchor", "left")
    .style("font-size", "14px")
    .text("Variación interanual");

svg_controls.append("foreignObject")
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', "30px")
    .attr('height', "30px")
    .append("xhtml:body")
    .html("<form><input type=checkbox id=check_providers checked></input></form>");

svg_controls.append("foreignObject")
    .attr('x', 0)
    .attr('y', separation)
    .attr('width', "30px")
    .attr('height', "30px")
    .append("xhtml:body")
    .html("<form><input type=checkbox id=check_variation checked></input></form>");

check_providers.onchange = function() {
  	var value_box = $("#check_providers").is(":checked");
    if (value_box) {
      show_providers();
    } else {
      hide_providers();
    }
  	};

check_variation.onchange = function() {
    var value_box = $("#check_variation").is(":checked");
    if (value_box) {
      show_variation();
    } else {
      hide_variation();
    }
    };

//  var x = document.createElement("INPUT");
//     x.setAttribute("type", "checkbox");
//     document.body.appendChild(x);