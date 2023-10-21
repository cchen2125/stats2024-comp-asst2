
// SVG Size
var width = 700,
	height = 500;

var genre = [];


// Load CSV file
d3.csv("data/spotify_data.csv", function(data){

	// Analyze the dataset in the web console

	var preparedData = prepareData(data);
	console.log(preparedData)

	createVisualization(preparedData);
});

var prepareData = function(data) {
	// Step 1: Analyze and prepare the data
	// Use the web console to get a better idea of the dataset
	// Convert numeric values to numbers.
	// Make sure the genres array has the name of each genre
	
	for (i=0; i < data.length; i++) {
		data[i].songs = +data[i].songs
		data[i].songs_with_mil_plus_streams = +data[i].songs_with_mil_plus_streams
		data[i].streams_in_mils = +data[i].streams_in_mils

		if (!genre.includes(data[i].genre)) {
			genre.push(data[i].genre)
		}

	}
	console.log(genre)

	return data

}

var createVisualization = function(data) {
	data.sort(function (a, b) {
		return b.songs_with_mil_plus_streams - a.songs_with_mil_plus_streams;
	})

	// Step 2: Append a new SVG area with D3
	// The ID of the target div container in the html file is #chart-area
	// Use the margin convention with 50 px of bottom margin and 30 px of margin on other sides!
	margin = {top: 30, right:30, bottom: 50, left:50}
	width = 960 - margin.left - margin.right
	height = 500 - margin.top - margin.bottom
	
	svg = d3.select("#chart-area").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

	// Step 3: Create linear scales by using the D3 scale functions
	// You will need an songs scale (x-axis) and a scale function for the streams (y-axis).
	// Call them numSongsScale and streamsScale.
	// Use d3.min() and d3.max() (or d3.extent()) for the input domain
	// Use the variables height and width for the output range
	numSongsScale = d3.scaleLinear()
		.domain([d3.min(data, d=> d.songs)-15, d3.max(data, d=> d.songs)+15])
		.range([0, width])
		
	streamsScale = d3.scaleLinear()
		.range([height, 0])
		.domain([d3.min(data, d=> d.streams_in_mils)-25000, d3.max(data, d=> d.streams_in_mils)+25000])


	// Step 4: Try the scale functions
	// You can call the functions with example values and print the result to the web console.
	console.log(numSongsScale(100))
	console.log(streamsScale(100))

	// Step 5: Map the countries to SVG circles
	// Use select(), data(), enter() and append()
	// Instead of setting the x- and y-values directly,
	// you have to use your scale functions to convert the data values to pixel measures
	svg.selectAll("circle")
		.data(data)
		.enter()	
		.append("circle")
		.attr("cx", d=> numSongsScale(d.songs))
		.attr("cy", d=> streamsScale(d.streams_in_mils))
		.attr("stroke", "gray")


	// Step 6: Use your scales (songs and streams) to create D3 axis functions
	let xAxis = d3.axisBottom()
		.scale(numSongsScale);
	
	let yAxis = d3.axisLeft()
		.scale(streamsScale);

	// Step 7: Append the x- and y-axis to your scatterplot
	// Add the axes to a group element that you add to the SVG drawing area.
	// Use translate() to change the axis position
	let xAxisGroup = svg.append("g")
    	.attr("class", "x-axis axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	let yAxisGroup = svg.append("g")
    	.attr("class", "y-axis axis")
		.call(yAxis);

	// Step 8: Refine the domain of the scales
	// Notice that some of the circles are positioned on the outer edges of the svg area
	// You can include buffer values to widen the domain and to prevent circles and axes from overlapping
	
	// *adjusted step 3 to account for this*

	// Step 9: Label your axes
	svg.append("text")
		.attr("x", width - 75)
		.attr("y", height + margin.top)
		.attr("class", "axis-label")
		.text("Number of Songs")

	svg.append("text")
		.attr("x", -margin.right)
		.attr("y", -10)
		.attr("class", "axis-label")
		.text("Streams")


	// Step 10: Add a scale function for the circle radius
	// Create a linear scale function dependent on the number of million plus streamed songs
	// The radius should be between 4 - 30px.
	// Then use the scale function to specify a dynamic radius
	radiusScale = d3.scaleLinear()
		.domain([d3.min(data, d=> d.songs_with_mil_plus_streams), d3.max(data, d=> d.songs_with_mil_plus_streams)])
		.range([4, 30])

	svg.selectAll("circle")
		.attr("r", d=> radiusScale(d.songs_with_mil_plus_streams))


	// Step 11: Change the drawing order
	// Larger circles should not overlap or cover smaller circles.
	// Sort the artists by streams before drawing them.

	// *added this at the beginning of the function*


	// Step 12: Color the circles depending on their genres
	// Use a D3 color scale
	genreScale = d3.scaleOrdinal()
		.domain(genre)
		.range(d3.schemeCategory10)

	svg.selectAll("circle")
		.attr("fill", d=> genreScale(d.genre))

}
