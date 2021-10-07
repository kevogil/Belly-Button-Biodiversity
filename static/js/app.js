// Identify file path to samples.json file
const dataset = "data/samples.json";

// Reference to the dropdown select element
var dropdown = d3.select("#selDataset");



// Populate dropdown menu and populate charts based off default ID
function init() {
    // Fetch the JSON data and console log it
    d3.json(dataset).then((data) => {
        console.log(data);
    
        //  Populate drowndown with IDs from each name in data.names
        data.names.forEach((name => {
            var option = dropdown.append("option");
            option.text(name);
        }));
  
        // Use first dataset to populate default charts
        var defaultID = data.names[0];
        console.log(`ID: ${defaultID}`)

        chartTable(defaultID);
        plotCharts(defaultID);
    });
};


// Update all of the plots any time that a new sample is selected
function optionChanged(id_num) {
    // Fetch new data each time a new sample is selected
    chartTable(id_num);
    plotCharts(id_num);
};


function chartTable(id_num) {
    // Fetch the JSON data for metadata
    d3.json(dataset).then((data) => {
        var metadata = data.metadata;

        // Filter metadata for selected ID
        var sampleMetaData = metadata.filter(row => row.id == id_num)[0];

        // Create variable to hold data and clear any existing data
        var chartData = d3.select("#sample-metadata");
        chartData.html("");

        // Add key and value to chart data
        Object.entries(sampleMetaData).forEach(([key, value]) => {
            chartData.append("h5").text(`${key}: ${value}`);
        });
    });
};


function plotCharts(id_num) {
    // Fetch the JSON data for samples data
    d3.json(dataset).then((data) => {
        var sampledata = data.samples;
        
        // Filter samples dataset for selected ID
        var sample = sampledata.filter(row => row.id == id_num)[0];

        // Use `sample_values` as the values
        var sample_values = sample.sample_values;
        console.log(`Values:\n ${sample_values}`);

        // Use `otu_ids` as the labels
        var otu_ids = sample.otu_ids;
        console.log(`IDs:\n ${otu_ids}`);

        // Use `otu_labels` as the hovertext
        var otu_labels = sample.otu_labels;
        console.log(`Labels:\n ${otu_labels}`);

        // ----------------------------
        //     Horizontal bar chart    
        // ----------------------------
        var barData = [{
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h"
        }];

        var barLayout = {
            title: "Top 10 Bacteria Cultures",
            margin: { t: 50, l: 100 }
        };

        Plotly.newPlot("bar", barData, barLayout);


        // ----------------------------
        //         Bubble chart         
        // ----------------------------
        var bubbleData = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: 'YlGnBu'
            }
        }];

        var bubbleLayout = {
            title: "Bacteria Cultures per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU IDs"}
        };

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    });
};

init();