// Identify file path to samples.json file
const samples = "data/samples.json";

// Reference to the dropdown select element
var selectDropdown = d3.select("#selDataset");


// Function to populate dropdown menu and display chart based on first ID
function init() {

    // Fetch the JSON data and console log it
    d3.json(samples).then((data) => {
        console.log(data);

        //  Populate drowndown with IDs from each name in data.names
        data.names.forEach((name => {
            var option = selectDropdown.append("option");
            option.text(name);
        }));

        // Use `sample_values` as the values for the bar chart.
        var sample_values =  data.samples[0].sample_values.slice(0,10);
        console.log(`Values:\n ${sample_values}`)

        // Use `otu_ids` as the labels for the bar chart.
        var otu_ids = data.samples[0].otu_ids;
        console.log(`IDs:\n ${otu_ids}`)

        // Use `otu_labels` as the hovertext for the chart.
        var otu_labels =  data.samples[0].otu_labels.slice(0,10);
        console.log(`Labels:\n ${otu_labels}`)

        // Set horizontal bar attributes
        var bar_data = [{
            x: sample_values,
            y: otu_ids,
            orientation: 'h',
            type: 'bar'
        }];

        var bar_layout = [{
            height: 2000,
            width: 2000,
            margin: {
                l: 100,
                r: 20,
                t: 200,
                b: 70
            }
        }];

        Plotly.newPlot("bar", bar_data, bar_layout);

    });
};

init();