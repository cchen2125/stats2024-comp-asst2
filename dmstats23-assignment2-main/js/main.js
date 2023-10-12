
// SVG Size
var width = 700,
	height = 500;

var genre = [];


// Load CSV file
d3.csv("data/spotify_data.csv", function(data){

	// Analyze the dataset in the web console

	var preparedData = prepareData(data);

	createVisualization(preparedData);
});

var prepareData = function(data) {
	// Step 1: Analyze and prepare the data
	// Use the web console to get a better idea of the dataset
	// Convert numeric values to numbers.
	// Make sure the genres array has the name of each genre

}

var createVisualization = function(data) {
	// Step 2: Append a new SVG area with D3
	// The ID of the target div container in the html file is #chart-area
	// Use the margin convention with 50 px of bottom margin and 30 px of margin on other sides!


	// Step 3: Create linear scales by using the D3 scale functions
	// You will need an songs scale (x-axis) and a scale function for the streams (y-axis).
	// Call them numSongsScale and streamsScale.
	// Use d3.min() and d3.max() (or d3.extent()) for the input domain
	// Use the variables height and width for the output range


	// Step 4: Try the scale functions
	// You can call the functions with example values and print the result to the web console.


	// Step 5: Map the countries to SVG circles
	// Use select(), data(), enter() and append()
	// Instead of setting the x- and y-values directly,
	// you have to use your scale functions to convert the data values to pixel measures


	// Step 6: Use your scales (songs and streams) to create D3 axis functions


	// Step 7: Append the x- and y-axis to your scatterplot
	// Add the axes to a group element that you add to the SVG drawing area.
	// Use translate() to change the axis position


	// Step 8: Refine the domain of the scales
	// Notice that some of the circles are positioned on the outer edges of the svg area
	// You can include buffer values to widen the domain and to prevent circles and axes from overlapping


	// Step 9: Label your axes



	// Step 10: Add a scale function for the circle radius
	// Create a linear scale function dependent on the number of million plus streamed songs
	// The radius should be between 4 - 30px.
	// Then use the scale function to specify a dynamic radius


	// Step 11: Change the drawing order
	// Larger circles should not overlap or cover smaller circles.
	// Sort the artists by streams before drawing them.


	// Step 12: Color the circles depending on their genres
	// Use a D3 color scale



}
