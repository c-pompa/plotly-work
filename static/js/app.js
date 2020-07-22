function descInt(array_to_filter, b, a) {
    desc_int = array_to_filter.sort((a, b) => b - a);
    return parseInt(desc_int);
};


// Function: Create Bar Plot
function createBarPlot(x_data, y_data, text_data) {
    var trace1 = {
        x: x_data,
        y: y_data,
        text: text_data,
        name: "barr",
        type: "bar",
        orientation: "h"
    };

    var data = [trace1];

    var layout = {
        title: "Test Bar Plot"
    };
    plot = Plotly.newPlot("bar", data, layout);
    return plot;
}

// Create an array of each country's numbers
// Create Empty List
var values_list = [];
var labels_list = [];
var ids = [];
var otu_ids_list = [];



// Promise Pending
url = "./data/samples.json"
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

////////////////////
// D3: Call JSON, assign name, export values.
//////////////////
d3.json("./data/samples.json").then(function(data) {

    // Sort the data by Greek search results
    data.samples.sort((a, b) => parseInt(b.sample_values) - parseInt(a.sample_values));
    
    // Verify Sample Array from data.samples
    var samples_array = Object.values(data.samples);
    console.log("Data Promise: ", samples_array);


    /////////////////////////////////////////////////
    // Create Array: User ID's in samples.id
    // After getting single ID, add to options dropdown 
    /////////////////////////////////////////////////
    var id = samples_array.map(row => row.id);
        for (var i = 0; i < samples_array.length; i++) {
                add_id_to_option = id[i];
                // console.log(id[i]);
                buildSelectOptions(add_id_to_option);
            // console.log(id[0]);


        // Function: Add id's to the select - option
        function buildSelectOptions(ids) {
            var select_dropdown = document.getElementById("selDataset");
            var option = document.createElement("option");
            option.innerHTML = ids;
            select_dropdown.options.add(option);
        };
    };
        
    /////////////////////////////////////////////////
    // Create Array: Sample Values in samples.sample_values
    /////////////////////////////////////////////////
    // Map sample_values using samples_array created above
    var values = samples_array.map(row => row.sample_values);
    // Loop through each users sample_values list and slice down to 10.
    for (var i = 0; i < values.length; i++) {
        // Slice sample values down to 10
        values_sliced = values[i].slice(0, 10);
        // Reverse the array to accommodate Plotly's defaults
        values_reversedData = values_sliced.reverse();
        // Add values of 'id' to list
        values_list.push(values_reversedData);
    };
    /////////////////////////////////////////////////
    // Create Array: Labels in samples.otu_labels
    /////////////////////////////////////////////////
    // Map otu_labels using samples_array created above
    var labels = samples_array.map(row => row.otu_labels);
    // Loop through each users otu_labels list and slice down to 10.
    for (var i = 0; i < labels.length; i++) {
        // Slice sample values down to 10
        labels_sliced = labels[i].slice(0, 10);
        // Reverse the array to accommodate Plotly's defaults
        reversedData = labels_sliced.reverse();
        // Add values of 'id' to list
        labels_list.push(reversedData);
    };
    /////////////////////////////////////////////////
    // Create Array: otu_ids in samples.otu_ids
    /////////////////////////////////////////////////
    // Map otu_ids using samples_array created above
    var otu_ids = samples_array.map(row => row.otu_ids);
    // Loop through each users otu_ids list and slice down to 10.
    for (var i = 0; i < otu_ids.length; i++) {
        // Slice sample values down to 10
        otu_ids_sliced = otu_ids[i].slice(0, 10);
        // Reverse the array to accommodate Plotly's defaults
        otu_ids_reversedData = otu_ids_sliced.reverse();
        // Add values of 'id' to list
        otu_ids_list.push(otu_ids_reversedData);
    };
});


// Test logs
console.log("User IDS: ", ids);
console.log("Sample Values: ", values_list);
console.log("OTU Labels: ", labels_list);
console.log("OTU ID's: ", otu_ids_list);

///////////////////
// Plot: KEEP
///////////////////
// createBarPlot();

///////////////////////////////////////////////////////////////////////
// On change to the DOM, call getData()
// d3.selectAll("#selDataset").on("change", getData);

// // Function called by DOM changes
// function getData() {
//   var dropdownMenu = d3.select("#selDataset");
//   // Assign the value of the dropdown menu option to a variable
//   var dataset = dropdownMenu.property("value");
//   // Initialize an empty array for the country's data
//   var data = [];

//   if (dataset == 'us') {
//       data = us;
//   }
//   else if (dataset == 'uk') {
//       data = uk;
//   }
//   else if (dataset == 'canada') {
//       data = canada;
//   }
//   // Call function to update the chart
//   updatePlotly(data);
// }

// // Update the restyled plot's values
// function updatePlotly(newdata) {
//   Plotly.restyle("pie", "values", [newdata]);
// }




















//////////////////////////////////////////////////////////
// Left Off Notes 
//////////////////////////////////////////////////////////
//  Above creates new array lists for each group data sets we are looking for.
//  We will need to tweak this in order for it to be plotted. 
//  It looks like we can add the variable before the push .push(THIS VAR).
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
// End 


///////////////////////////////////////////////////////////
// Rough Extra References
///////////////////////////////////////////////////////////
    // for (var i = 0; i < samples_array.length; i++) {
    // // Retreive id from samples.id
    //     var sample_values = data.samples.sample_values.map(row => row);
    //     values_list.push(sample_values);
    //     console.log("Sample_Values: ", sample_values);


            // Retreive sample_values from samples.sample_values list
            // var values = data.samples.map(row => row.sample_values[i]);
    
    
            // console.log(id);

    // // Slice the first 10 objects for plotting
    // slicedData = sortedByValues.slice(0, 10);

    // // Reverse the array to accommodate Plotly's defaults
    // reversedData = slicedData.reverse();

    // console.log(reversedData);
    // console.log("reversedData Completed");
    // // Fill each of the above arrays with randomly generated data
    // for (var i = 0; i < reversedData.length; i++) {
    //     // Retreive id from samples.id
    //     var id = data.samples.map(row => row);

        
    //     // Retreive sample_values from samples.sample_values list
    //     // var values = data.samples.map(row => row.sample_values[i]);


    //     console.log(id);



        // console.log(i);

        // values_list.push(id);
        // labels_list.push();
        // console.log(values_list);
    // }
    // console.log(values_list)


    // // Slice the first 10 objects for plotting
    // values_sliced = values.slice(0, 10);
    // console.log(values_sliced);

    // // Retreive otu_ids from samples.otu_ids list
    // var labels = data.samples.map(row => row.otu_ids);
    // console.log(labels[0]);

    // // Retreive otu_labels from samples.otu_labels list
    // var hovertext = data.samples.map(row => row.otu_labels);
    // console.log(hovertext[0]);

    // createBarPlot(values_sliced, labels, hovertext);