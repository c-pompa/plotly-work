// Build bar plot with sample json data
// function buildPlot() {

//     d3.json("./data/samples.json").then(function(data) {

//         // Grab values from the response json object to build the plots
//         var s_values = data.sample_values; // used as values on bar chart
//         var values = s_values.sort((a, b) => b - a);

//         console.log(s_values);
//         var otu_ids = data.samples.otu_ids; // used for labels on bar chart
//         var otu_labels = data.samples.otu_labels; // used for hovertext


//         // getMonthlyData();

//         var trace1 = {
//             type: "bar",
//             x: s_values,
//             y: otu_ids

//         };

//         // Candlestick Trace
//         // var trace2 = {
//         //     type: "candlestick",
//         //     x: dates,
//         //     high: highPrices,
//         //     low: lowPrices,
//         //     open: openPrices,
//         //     close: closePrices
//         // };

//         var data = [trace1];

//         var layout = {
//             title: "Top 10"
//         };


//         Plotly.newPlot("bar", data, layout);

//     });
// };
// buildPlot();

// Function: Descending integer filter
function descInt(array_to_filter, b, a) {
    desc_int = array_to_filter.sort((a, b) => b - a);
    return parseInt(desc_int);
}

d3.json("./data/samples.json").then(function(data) {
    // console.log(data.samples);

    var values = data.samples.sort((a, b) => b.sample_values - a.sample_values);
    // Slice the first 10 objects for plotting
    slicedData = values.slice(0, 10);

    // Reverse the array to accommodate Plotly's defaults
    reversedData = slicedData.reverse();

    console.log(reversedData);

    var trace1 = {
        x: reversedData.map(object => object.sample_values),
        y: reversedData.map(object => object.otu_ids),
        text: reversedData.map(object => object.otu_labels),
        name: "bar",
        type: "bar",
        orientation: "h"
    };

    var data = [trace1];

    var layout = {
        title: "Greek gods search results",
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        }
    };


    Plotly.newPlot("bar", data, layout);

});