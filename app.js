  

function buildCharts(sample) {

// Grab the data using d3
d3.json("samples.json").then((data) => {
  var samples= data.samples;
  var array= samples.filter(sampleobject => sampleobject.id == sample);
  var result= array[0]
  var id = result.otu_ids;
  var values = result.sample_values;
  var labels = result.otu_labels;
  // Bubble Chart 
  var LayoutBubble = {
    margin: { t: 0 },
    xaxis: { title: "Id's" },
    hovermode: "closest",
    };
    var DataBubble = [
    {
      x: id,
      y: values,
      text: labels,
      mode: "markers",
      marker: {
        color: id,
        size: values,}
    }
  ];
  Plotly.plot("bubble", DataBubble, LayoutBubble);
  //  Bar Chart
  var bardata =[
    {
      y:id.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
      x:values.slice(0,10).reverse(),
      text:labels.slice(0,10).reverse(),
      type:"bar",
      orientation:"h"
    }
  ];
  var barLayout = {
    title: "Top 10 Bacteria Cultures Found",
    margin: { t: 30, l: 150 }
  };
  Plotly.newPlot("bar", bardata, barLayout);
});
}
function init() {
// dropdown menu
var selector = d3.select("#selDataset");
// pull names 
d3.json("samples.json").then((data) => {
  var sampleNames = data.names;
  sampleNames.forEach((sample) => {
    selector
      .append("option")
      .text(sample)
      .property("value", sample);
  });
  // display first set of data 
  const SampleI = sampleNames[0];
  buildCharts(SampleI);
  buildMetadata(SampleI);
});
}
function optionChanged(SampleII) {
// pull new data when selected
buildCharts(SampleII);
buildMetadata(SampleII);
}
// dashboard
init();