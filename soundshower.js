var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var audioElement = document.getElementById('audioElement');
var audioSrc = audioCtx.createMediaElementSource(audioElement);
var analyser = audioCtx.createAnalyser();

// Bind our analyser to the media element source.
audioSrc.connect(analyser);
audioSrc.connect(audioCtx.destination)
analyser.fftSize = 128;

var frequencyData = new Uint8Array(20);

var svgHeight = '600';
var svgWidth = '1200';

function createSvg(parent, height, width) {
  return d3.select(parent).append('svg').attr('height', height).attr('width', width);
}

var svg = createSvg('body', svgHeight, svgWidth);

var marginX = Math.floor(svgWidth/10);
var marginY = Math.floor(svgHeight/10);
var w = Math.floor((svgWidth - marginX*2)/21);

// Create our initial D3 chart.
svg.selectAll('rect')
   .data(frequencyData)
   .enter()
   .append('rect')
   .attr('x', function (d, i) {
      return i * (svgWidth / frequencyData.length);
   })
   .attr('width', svgWidth / frequencyData.length - w);

function renderChart() {
   requestAnimationFrame(renderChart);

   // Copy frequency data to frequencyData array.
  analyser.getByteFrequencyData(frequencyData);

  var x = d3.scaleLinear()
			.domain([0, frequencyData.length])
			.range([marginX, svgWidth-marginX]);

   var y = d3.scaleLinear()
			.domain([1, 1])
			.range([0,svgHeight-marginY*3]);

   // Update d3 chart with new data.
   svg.selectAll('rect')
      .data(frequencyData)
      .attr("transform", function(d,i) { return "translate(" + 0 + "," + ((svgHeight/2)-(y(d)/2)) + ")"; })
      .attr('height', function(d, i) {
         return d;
      })
      .attr('width', w + "px")
      .attr('fill', function(d) {
         return 'rgb(0, 0, ' + d + ')';
      });
}

// Run the loop
renderChart();
