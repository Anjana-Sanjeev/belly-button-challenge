// Declaring url as a constant variable

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Console log the JSON data

d3.json(url).then(function(data) {
    console.log(data);
});

// Initialize the dashboard

function init() {

    // Use D3 to select the dropdown

    let dropdown = d3.select("#selDataset");

    // Get the id as dropdown

    d3.json(url).then((data) => {
        
        // Get the sample names

        let names = data.names;

        names.forEach((id) => {

            // Log the id for each

            console.log(id);

            dropdown.append("option").text(id);
        
        });

        // Get the first sample

        let first_sample = names[0];

        // Log the first sample

        console.log(first_sample);

        // Plot with the first sample

        MetaData(first_sample);
        HBarChart(first_sample);
        BubbleChart(first_sample);

    });
};

// Call the initialize function

init();

// Function for optionChanged (when a new sample is selected, the dropdown will update)

function optionChanged(value) { 

    // Plot with the new sample 

    MetaData(value);
    HBarChart(value);
    BubbleChart(value);

};

// Function for metadata 

function MetaData(metadatainfo) {

    // Get the metadata

    d3.json(url).then((data) => {

        let metadata = data.metadata;

        // Get the metadata info for the value selected

        let value = metadata.filter(sample_id => sample_id.id == metadatainfo);

        // Console log the value

        console.log(value)

        // Get the first value

        let first_value = value[0];

        // Clear the exisiting metadata using .html("")
        
        d3.select("#sample-metadata").html("");

        // Get each key value pair 

        Object.entries(first_value).forEach(([key,value]) => {

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);

        });

    });

};

// Function for horizontal bar chart

function HBarChart(sample) {

    d3.json(url).then((data) => {

        // Get the sample data

        let samples_data = data.samples;

        // Get the info for the id selected

        let value = samples_data.filter(sample_id => sample_id.id == sample);

        // Get the first value

        let first_value = value[0];

        // Get the sample values, otu_ids, lables

        let sample_values = first_value.sample_values;
        let otu_ids = first_value.otu_ids;
        let otu_labels = first_value.otu_labels;

        // Log the data to the console

        console.log(otu_ids,otu_labels,sample_values);

        // Get the top ten items in descending order

        let xvalue = sample_values.slice(0,10).reverse();
        let yvalue = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let labels = otu_labels.slice(0,10).reverse();
        
        // Create the trace

        let trace_bar_chart = {
            x: xvalue,
            y: yvalue,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        // Plot the bar chart

        Plotly.newPlot("bar", [trace_bar_chart])

    });

};

// Function for bubble chart

function BubbleChart(sample) {

    d3.json(url).then((data) => {
        
        // Get the sample data

        let sample_data = data.samples;

        // Get the info for the id selected

        let value = sample_data.filter(sample_id => sample_id.id == sample);

        // Get the first value

        let first_value = value[0];

        // Get the sample values, otu_ids, lables

        let sample_values = first_value.sample_values;
        let otu_ids = first_value.otu_ids;
        let otu_labels = first_value.otu_labels;
        
        // Create the trace 

        let trace_bubble_chart = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
            }
        };

        // Create the layout

        let layout = {
            xaxis: {title: "OTU ID"},
        };

        // Plot the bubble chart
        
        Plotly.newPlot("bubble", [trace_bubble_chart], layout)

    });

};





