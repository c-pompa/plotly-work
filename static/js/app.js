// Build bar plot with sample json data
function buildPlot() {

    d3.json("data/samples.json").then(function(data) {

        // Grab values from the response json object to build the plots
        var s_values = data.samples.sample_values; // used as values on bar chart
        var otu_ids = data.samples.otu_ids; // used for labels on bar chart
        var otu_labels = data.samples.otu_labels; // used for hovertext


        // getMonthlyData();

        var trace1 = {
            type: "bar",
            x: s_values,
            y: otu_labels
        };

        // Candlestick Trace
        // var trace2 = {
        //     type: "candlestick",
        //     x: dates,
        //     high: highPrices,
        //     low: lowPrices,
        //     open: openPrices,
        //     close: closePrices
        // };

        var data = [trace1];

        var layout = {
            title: `Top 10 OTUs`,
            // xaxis: {
            //     range: [startDate, endDate],
            //     type: "date"
            // },
            // yaxis: {
            //     autorange: true,
            //     type: "linear"
            // },
            showlegend: false
        };

        Plotly.newPlot("bar", data, layout);

    });
}
buildPlot();