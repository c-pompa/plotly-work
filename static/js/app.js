// Function: Make Bar Plot
function makePlot(sample_values, otu_and_id, labels) {

    var trace = {
        x: sample_values,
        y: otu_and_id,
        text: labels,
        marker: {
        color: 'blue'},
        type:"bar",
        orientation: "h",
    };

    // Data for Trace
    var data = [trace];

    // Layout
    var layout = {
        title: "Top 10 OTU",
        yaxis:{
            tickmode:"linear",
            },
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 30
            }
        };

    // create the bar plot
    Plotly.newPlot("bar", data, layout);
};

// Function: Make Bubble plot
function makeBubblePlot(sample_values_all, otu_ids_all, labels_all, id_selected) {
    var trace1 = {
        x: otu_ids_all,
        y: sample_values_all,
        text: labels_all,
        mode: 'markers',
        marker: {
          color: otu_ids_all,
          size: sample_values_all
        }
      };
      
      var data = [trace1];
      
      var layout = {
        title: ` Bubble Chart <br>Test Subject ID No. ${id_selected}`,
        xaxis: { label: "test",
            },
        showlegend: false
      };
      
      Plotly.newPlot('bubble', data, layout);
};


// Function: Get data ready for plotting and call plots needed. 
// Also pass refreshed ID number
function getPlots(id_selected) {
    d3.json("./data/samples.json").then(d => {

        let result = d.samples.filter(obj => {
            // console.log('Sample ID Test', obj.id === id_selected);
            return obj.id === id_selected;
          });
        // console.log(result[0]);
        
        // sample_values sliced - top 10
        var sample_values = result[0].sample_values.slice(0,10).reverse();
        // sample_vales all
        var sample_values_all = result[0].sample_values.reverse();
        // console.log('Must match result[0]:', sample_values);

        // Labels sliced
        var labels = result[0].otu_labels.slice(0,10);
        // Labels all
        var labels_all = result[0].otu_labels;
        // console.log(labels);

        // Top 10 otu ids sliced
        var top_10_otu = (result[0].otu_ids.slice(0,10)).reverse();
        var otu_ids_all = result[0].otu_ids.reverse();
        // console.log(top_10_otu);
        // Labels for bar plot
        var otu_and_id = top_10_otu.map(d => "OTU " + d);
        // console.log(otu_and_id);
        makeBubblePlot(sample_values_all, otu_ids_all, labels_all, id_selected);
        makePlot(sample_values, otu_and_id, labels);
    });
};

// Function: Demographic Information - id#sample-metadata
function getDemographicInfo(id_selected) {
        // read the json file to get data
        d3.json("./data/samples.json").then((d)=> {
        // get the metadata info for the demographic panel
            var metadata = d.metadata;
            // console.log(metadata);
    
            // filter meta data info by id_selected
            var result = metadata.filter(meta => meta.id.toString() === id_selected)[0];
            // select demographic panel to put data
            var demographicInfo = d3.select("#sample-metadata");
            
            // empty the demographic info panel each time before getting new id info
            demographicInfo.html("");
    
            // grab the necessary demographic data data for the id and append the info to the panel
            Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    };

// Event listener action
function optionChanged(id_selected) {
    getDemographicInfo(id_selected);  
    getPlots(id_selected);
    console.log('Option Changed Event. Bar Plot updated.')
};

// Function init
function init() {
    // select dropdown menu 
    var option_dropdown = d3.select("#selDataset");

    // Open JSON
    d3.json("./data/samples.json").then((data)=> {
        console.log('Raw Data:', data);

        // ID name for select-options dropdown
        data.names.forEach(function(name) {
            option_dropdown.append("option").text(name).property("value");
        });

       // call the functions to display the data and the plots to the page
        getPlots(data.names[0]);
        getDemographicInfo(data.names[0]);
    });
};

init();