
//update dashboard

//populate meta data
function demoInfo(sample)
{
    console.log(sample);

    d3.json("samples.json").then((data) => {
      //get metadata
        let mData= data.metadata;
        let result = mData.filter(sampleR => sampleR.id == sample);
        
        let rData = result[0];
        d3.select("#sample-metadata").html("");
        
        Object.entries(rData).forEach(([key, value]) => {
            d3.select("#sample-metadata")
                .append("h5").text(`${key}: ${value}`);

        });

    });
}

function buildBarChart(sample)
{
    //console.log(sample);
    //let data=d3.json("samples.json");
    //console.log(data);

    d3.json("samples.json").then((data) => {
        
        let sampleData= data.samples;
        //console.log(sampleData);
        
        let result = sampleData.filter(sampleR => sampleR.id == sample);
          
        let rData = result[0];
        //console.log(rData);

        let otu_ids = rData.otu_ids;
        let otu_labels = rData.otu_labels;
        let sample_values = rData.sample_values;
        //console.log(otu_ids);
        //console.log(otu_labels);
        //console.log(sample_values);

        //bar chart
        let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`);
        console.log(yticks);
        let xValues = sample_values.slice(0, 10);
        let tLabels = otu_labels.slice(0, 10);

        let barChart = {
            y: yticks.reverse(),
            x: xValues.reverse(),
            text: tLabels.reverse(),
            type: "bar",
            orientation: "h"
        }

        let layout = {
            title: "Top 10 Belly Button Bacteria"
        };

        Plotly.newPlot("bar", [barChart], layout);
        
  
    });

}

function buildBubbleChart(sample)
{
    d3.json("samples.json").then((data) => {
        
        let sampleData= data.samples;
        //console.log(sampleData);
        
        let result = sampleData.filter(sampleR => sampleR.id == sample);
          
        let rData = result[0];
        //console.log(rData);

        let otu_ids = rData.otu_ids;
        let otu_labels = rData.otu_labels;
        let sample_values = rData.sample_values;
       
        let bubbleChart = {
            y: sample_values,
            x: otu_ids,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"

            }
        }

        let layout = {
            title: "Bacteria Cultures Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"}
        };

        Plotly.newPlot("bubble", [bubbleChart], layout);
    
    });

}


//initialize dashboard
function initialize()
{
    
    //let data=d3.json("samples.json");
    //console.log(data);
    
    var select = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        let sampleNames = data.names;
        console.log(sampleNames)

        sampleNames.forEach((sample) => {
            select.append("option")
                .text(sample)
                .property("value", sample);

        });

        let firstSample = sampleNames[0];
        demoInfo(firstSample);

        buildBarChart(firstSample);

        buildBubbleChart(firstSample);

    });

    

}

function optionChanged(item)
{
    demoInfo(item);
    buildBarChart(item);
    buildBubbleChart(item);

}

initialize();





//const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// data promise

//let promise = d3.json(url);
//console.log(promise);

// then function

//d3.json(url).then(function(data){

//    console.log(data);
//    let dataName = data["names"];
//    let dataSamples = data.samples;
//    let dataOtuIds = data.samples.otu_ids;

//    console.log(dataOtuIds);
//});