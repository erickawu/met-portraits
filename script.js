
window.createGraphic = function(graphicSelector) {
	var graph = d3.select('#viz')

	var margin = 40
	var size = 800
	var chartSize = size - margin * 2
	var scaleX = null
	var scaleR = null
	var data = [8, 6, 7, 5, 3, 0, 9]
	var extent = d3.extent(data)
	var minR = 10
    var maxR = 24

    var directory = "file:///Users/erickawu/Desktop/arthum/"
    var faces = 1
    d3.json(directory + "json/portraits_year.json").then(function(data){ 
        faces = data
    })

    var slidenum = 0
    var maxslides = 4
	
    function translate(x, y) {
		return 'translate(' + x + ',' + y + ')'
    }

    function slides(num) {
        if (num == 1) {
            var t = d3.transition()
                .duration(800)
                .ease(d3.easeQuadInOut)
                        
            var item = graph.selectAll('.item')
                
            item.transition(t)
                .attr('transform', translate(chartSize / 2, chartSize / 2))
    
            item.select('circle')
                .transition(t)
                .attr('r', minR+50)
        }

        else if (num == 2) {
            var t = d3.transition()
                .duration(800)
                .ease(d3.easeQuadInOut)
                
            var item = graph.selectAll('.item')
                
            item.transition(t)
                .attr('transform', function(d, i) {
                    return translate(scaleX(i), chartSize / 2)
                })
    
            item.select('circle')
                .transition(t)
                .attr('r', minR)
        }
    
        else if (num == 3 ) {
            var t = d3.transition()
                .duration(800)
                .ease(d3.easeQuadInOut)

            var item = graph.selectAll('.item')
        
            item.select('circle')
                .transition(t)
                .delay(function(d, i) { return i * 200 })
                .attr('r', function(d, i) {
                    return scaleR(d)
                })
        }

        else if  (num ==4) {

        }
    }

    function update(action) {
        if (slidenum == 0 && action == 0) {
            slides(slidenum)
        }
        else if (slidenum == maxslides && action == 1){
            slides(slidenum)
        }
        else {
            if (action == 1) {
                slidenum = slidenum + 1
                slides(slidenum)
            }
            else if (action == 0) {
                slidenum = slidenum - 1
                slides(slidenum)
            }
        }
    }
    
	function setupCharts() {
		var svg = graph.append('svg')
			.attr('width', size + 'px')
            .attr('height', size  +  'px')
            
		
		var chart = svg.append('g')
            .classed('chart', true)
            .attr('transform', translate(margin, margin))  

		scaleR = d3.scaleLinear()
		scaleX = d3.scaleBand()

		var domainX = d3.range(data.length)

		scaleX
			.domain(domainX)
			.range([0, chartSize])
			.padding(1)

		scaleR
			.domain(extent)
			.range([minR, maxR])

        
        var item = chart.selectAll('.item')
			.data(faces)
			.enter().append('g')
				.classed('item', true)
				.attr('transform', translate(chartSize / 2, chartSize / 2))
		
		item.append('circle')
			.attr('cx', 0)
            .attr('cy', 0)         
	}

	function init() {
        setupCharts()
        d3.select('body')
            .on("keydown", function() {
                if(d3.event.keyCode === 37){
                    update(0)
                    console.log(slidenum)
                }
                else if (d3.event.keyCode === 39) {
                    update(1)
                    console.log(slidenum)
                }
          })
    }
    
	init()
	
}

createGraphic('#viz')