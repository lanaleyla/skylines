

let monthes = [{ name: '01', observationsFS: 0, observationsEG: 0, observationsHP: 0, observationsSM: 0, observationsSD: 0 },
{ name: '02', observationsFS: 0, observationsEG: 0, observationsHP: 0, observationsSM: 0, observationsSD: 0 },
{ name: '03', observationsFS: 0, observationsEG: 0, observationsHP: 0, observationsSM: 0, observationsSD: 0 },
{ name: '04', observationsFS: 0, observationsEG: 0, observationsHP: 0, observationsSM: 0, observationsSD: 0 },
{ name: '05', observationsFS: 0, observationsEG: 0, observationsHP: 0, observationsSM: 0, observationsSD: 0 },
{ name: '06', observationsFS: 0, observationsEG: 0, observationsHP: 0, observationsSM: 0, observationsSD: 0 },
{ name: '07', observationsFS: 0, observationsEG: 0, observationsHP: 0, observationsSM: 0, observationsSD: 0 },
{ name: '08', observationsFS: 0, observationsEG: 0, observationsHP: 0, observationsSM: 0, observationsSD: 0 },
{ name: '09', observationsFS: 0, observationsEG: 0, observationsHP: 0, observationsSM: 0, observationsSD: 0 },
{ name: '10', observationsFS: 0, observationsEG: 0, observationsHP: 0, observationsSM: 0, observationsSD: 0 },
{ name: '11', observationsFS: 0, observationsEG: 0, observationsHP: 0, observationsSM: 0, observationsSD: 0 },
{ name: '12', observationsFS: 0, observationsEG: 0, observationsHP: 0, observationsSM: 0, observationsSD: 0 }];

var margin = { top: 30, right: 30, bottom: 70, left: 60 },
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

var svg = d3.select("#data").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

d3.csv("birds_observations.csv", function (error, data) {

    //changing string(from the csv file) to int 
    data.forEach(function (d) {
        if (d["species_latin"] == "Sylvia melanocephala") {
            //counter = counter + 1;
            temp = d["date"].substring(5, 7);
            num = parseInt(temp);
            monthes[num - 1].observationsSM = monthes[num - 1].observationsSM + 1;
        }
        else if (d["species_latin"] == "Falco subbuteo") {
            temp = d["date"].substring(5, 7);
            num = parseInt(temp);
            monthes[num - 1].observationsFS = monthes[num - 1].observationsFS + 1;
        } else if (d["species_latin"] == "Erythropygia galactotes") {
            temp = d["date"].substring(5, 7);
            num = parseInt(temp);
            monthes[num - 1].observationsEG = monthes[num - 1].observationsEG + 1;
        } else if (d["species_latin"] == "Hippolais pallida") {
            temp = d["date"].substring(5, 7);
            num = parseInt(temp);
            monthes[num - 1].observationsHP = monthes[num - 1].observationsHP + 1;
        } else if (d["species_latin"] == "Streptopelia decaocto") {
            temp = d["date"].substring(5, 7);
            num = parseInt(temp);
            monthes[num - 1].observationsSD = monthes[num - 1].observationsSD + 1;
        }
    });

    //append the title of the graph  
    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - ((margin.top / 2) - 15))
        .attr("text-anchor", "middle")
        .style("font-size", "24px")
        .style("text-decoration", "bold")
        .text("The observations recorded over the monthes");

    x.domain(monthes.map(function (d) { return d.name; }));
    y.domain([0, 180]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
    svg.append("text")
        .attr("class", "label")
        .attr("x", width / 2)
        .attr("y", height + 30)
        .style("text-anchor", "middle")
        .text("Monthes");


    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
    svg.append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("x", -40)
        .attr("y", -40)
        .style("text-anchor", "end")
        .text("Number of Observations");

});
function updateEG(data) {

    svg.selectAll("rect").remove();

    var u = svg.selectAll("bar")
        .data(data)
    u
        .enter().append("rect")
        .transition()
        .duration(1000)
        .style("fill", "#493e8e")
        .attr("x", function (d) { return x(d.name); })
        .attr("width", x.rangeBand())
        .attr("y", function (d) { return y(d.observationsEG); })
        .attr("height", function (d) { return height - y(d.observationsEG); });
}

function updateSD(data) {
    svg.selectAll("rect").remove();

    var u = svg.selectAll("bar")
        .data(data)
    u
        .enter().append("rect")
        .transition()
        .duration(1000)
        .style("fill", "#493e8e")
        .attr("x", function (d) { return x(d.name); })
        .attr("width", x.rangeBand())
        .attr("y", function (d) { return y(d.observationsSD); })
        .attr("height", function (d) { return height - y(d.observationsSD); });
}

function updateFS(data) {
    svg.selectAll("rect").remove();

    var u = svg.selectAll("bar")
        .data(data)
    u
        .enter().append("rect")
        .transition()
        .duration(1000)
        .style("fill", "#493e8e")
        .attr("x", function (d) { return x(d.name); })
        .attr("width", x.rangeBand())
        .attr("y", function (d) { return y(d.observationsFS); })
        .attr("height", function (d) { return height - y(d.observationsFS); });
}

function updateHP(data) {
    svg.selectAll("rect").remove();
    var u = svg.selectAll("bar")
        .data(data)
    u
        .enter().append("rect")
        .transition()
        .duration(1000)
        .style("fill", "#493e8e")
        .attr("x", function (d) { return x(d.name); })
        .attr("width", x.rangeBand())
        .attr("y", function (d) { return y(d.observationsHP); })
        .attr("height", function (d) { return height - y(d.observationsHP); });
}

function updateSM(data) {
    svg.selectAll("rect").remove();
    var u = svg.selectAll("bar")
        .data(data)
    u
        .enter().append("rect")
        .transition()
        .duration(1000)
        .style("fill", "#493e8e")
        .attr("x", function (d) { return x(d.name); })
        .attr("width", x.rangeBand())
        .attr("y", function (d) { return y(d.observationsSM); })
        .attr("height", function (d) { return height - y(d.observationsSM); });
}



