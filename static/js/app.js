// main function
function main(id) {
    
  // read data from JSON file
  d3.json("samples.json").then((data)=> {
      console.log(data)
	  
// main para metadata
var main_metadata = [];

      // filtering by id
      var id_fil = data.samples.filter(d => d.id.toString() === id)[0];
	  
	        // sort and slice to find top 10 
      var s_values = id_fil.sample_values.slice(0, 10);

      // trace for bar graph
      var trace_bar = {
          x: s_values,
          y: s_values,
          type:"bar",
          orientation: "h",
      };

      // data & layout for horizontal bar
      var data = [trace_bar];
      var layout_bar = {
          title: "Top 10 OTUs located for individual",
      };
      Plotly.newPlot("bar", data, layout_bar);
      
      // trace for bubble chart
      var trace_bubble = {
          x: id_fil.otu_ids,
          y: id_fil.sample_values,
          mode: "markers",
      };

      // data & layout for bubble chart
      var data1 = [trace_bubble]
      var layout_bubble = {
        title: "Top 10 OTUs placed on individual",
      };
      Plotly.newPlot("bubble", data1, layout_bubble); 
  });
  
  
  function optionChanged() {

   // Get reference to the dropdown menu
  var dropdownMenu = d3.select("#selDataset");
  
    // reading the data 
  d3.json("samples.json").then((data)=> {
      console.log(data);

      data.names.forEach(function(name) {
          dropdown.append("option").text(name).property("value");
      });
	  
  // DOM Function for Updateing changes
  
  function optionChanged(newsample) {
    builddemotable(newsample);
    barGraph(newsample);
    bubbleGraph(newsample);

}

init();

unction optionChanged(id) {
  main(id);
}

// initial function
function init() {
  // dropdown menu in HTML 
  var dropdown = d3.select("#selDataset");

  // read the data 
  d3.json("samples.json").then((data)=> {
      console.log(data);

      data.names.forEach(function(name) {
          dropdown.append("option").text(name).property("value");
      });

      // call the functions to display the data and the plots to the page
      main(data.names[0]);
  });
}