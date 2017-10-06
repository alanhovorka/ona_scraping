/*resize listener with throttling*/
// color by establishment
// 
(function() {
	var throttle = function(type, name, obj) {
		obj = obj || window;
		var running = false;
		var func = function() {
			if (running) { return; }
			running = true;
             requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

   throttle('resize', 'optimizedResize');
})();


var init = function(domelement,data){
	var svg = d3.select(domelement).append('svg')
	var axis_shell = svg.append('g').attr('class','axis_shell is_transformed')
	var y_axis_shell = axis_shell.append('g')
	var x_axis_shell = axis_shell.append('g')
	var marks_shell = svg.append('g').attr('class','marks_shell is_transformed')
	var marks = marks_shell.selectAll('circle').attr('class','marks')
		.data(data.filter(function(d){
			if (d.aggregateRating) {
				return true
			}

		}))
		.enter()
		.append('circle').attr('class','listing')

	var make_settings = function(){
		/*cross browser solution for dimensions*/
		var ww = window.innerWidth
			|| document.documentElement.clientWidth
			|| document.body.clientWidth;

		var width = ww;
		var height = 500;
		var margin = {
			'top':40,
			'bottom':20,
			'left':40,
			'right':20
		}

		return {
			'width':width,
			'height':height,
			'margin':margin
		}
	};
	
	var make_scales = function(settings){

		var x = d3.scaleLinear()
			.domain([1,5])
			.range([0, settings.width - settings.margin.left - settings.margin.right])
		
		var y = d3.scalePow()
			.domain([0,5000])
			.range([settings.height - settings.margin.top - settings.margin.bottom, 0])
			.exponent(.35)
			.clamp(true)

		return {
			'x' : x,
			'y' : y
		}
	};
	
	var render = function(){

		var settings = make_settings()
		var scales = make_scales(settings) 

		svg.attr('width',settings.width)
			.attr('height',settings.height)

		x_axis_shell
			.attr("transform","translate(0,"+( settings.height - settings.margin.bottom - settings.margin.top)+")")
			.call(
				d3.axisBottom(scales.x)
					.tickValues([1,2,3,4,5])
					.tickFormat(function(d){
						return parseInt(d)
					})

			)

		y_axis_shell.attr("transform","translate(-10,0)").call(
			d3.axisLeft(scales.y)
				.tickValues([0,10,100,250,500,1000,2500,5000])
				.tickSize(-(settings.width - settings.margin.left - settings.margin.right + 10))


		)

		d3.selectAll('.is_transformed')
			.attr('transform','translate('+settings.margin.left+','+settings.margin.top+')')

		marks.attr('r',2)
			.attr('cx', function(d,i){
				/*d.aggregateRating.ratingValue*/
				if (d.aggregateRating){
					var converted = parseFloat(d.aggregateRating.ratingValue.substring(0,3))

					return scales.x(converted)
				}
			})
			.attr('cy', function(d,i) {
				if (d.aggregateRating) {
					var converted = parseFloat(d.aggregateRating.reviewCount)

					return scales.y(converted)
				}
			})
	};

	return {'render':render}
};

d3.json('all_listings.json', function(err, data) {
	var chart = init('#chart',data)
	console.debug(data[1])
	chart.render()
	window.addEventListener('optimizedResize', function() {
		chart.render()
	})
});
