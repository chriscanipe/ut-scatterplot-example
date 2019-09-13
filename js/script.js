
function init() {
    
    let margin = {
        top: 30,
        right: 30,
        bottom: 40,
        left: 100
    };

    let targetWidth = d3.select(".chart").node().offsetWidth;
    let targetHeight = d3.select(".chart").node().offsetHeight;

    let width = targetWidth - margin.left - margin.right;
    let height = targetHeight - margin.top - margin.bottom;

    let xScale = d3.scaleLinear() //This is a linear scale
        .rangeRound([0, width]) //Its "range" is the width of `this.plot`
        .domain([0,100]); //Let's default to 0 to 100.

    let yScale = d3.scaleLinear()
        .rangeRound([height, 0])
        .domain([0,100]);

    //SVG is the container.
    let svg = d3.select(".chart").append("svg");

    //The plot is where the charting action happens.
    let plot = svg.append("g").attr("class", "plot");

    //The xAxis and yAxis group tags will hold our xAxis elements (ticks, etc.)
    let xAxis = plot.append("g")
        .classed("axis x-axis", true);

    let yAxis = plot.append("g")
        .classed("axis y-axis", true);

    //The this.svg will be the FULL width and height of the parent container (this.element)
    svg.attr("width", width + margin.left + margin.right);
    svg.attr("height", height + margin.top + margin.bottom);

    //this.plot is offset from the top and left of the this.svg
    plot.attr("transform", `translate(${margin.left},${margin.top})`);

    //This is where the axis elements get drawn. The "transform" property positions them
    //And the the .call() method draws the axis within that tag.
    //Most of the logic is behind the scenes
    xAxis.attr("transform", "translate(0," + (height + 20) + ")")
        .call(
            d3.axisBottom(xScale)
            .tickSize(-height - 20)
        );

    yAxis.attr("transform", `translate(-20,0)`)
        .call(
            d3.axisLeft(yScale)
            .tickSize(-width - 20)
        );
}


d3.csv("data/life-expectancy-vs-health-expenditure.csv", function(error, data) {
    if (error) throw error;

    init(data);

})