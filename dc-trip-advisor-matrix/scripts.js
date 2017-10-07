/*resize listener with throttling*/
// color by establishment
// 

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

var getQuad = function(coords,size) {

	var l = []

	if (coords[1] > size[1]/2) {
		l.push('s')
	} else {
		l.push('n')
	}

	if (coords[0] > (size[0]*.65) ) {
		l.push('e')
	}

	if (coords[0] < (size[0]*.35)) {
		l.push('w')
	}

	return l.join('')

}

var initTooltip = function() {

	var formats = {
		'none' : function(v) {
			return v
		},
		'comma' : d3.format(',')
	}
	
	var theTooltip = d3.select('.has-tooltip').select('.tooltip')

	var fields = theTooltip.selectAll('.tt-update')

	var updateFields = function(data) {
		fields.each(function() {
			var f = d3.select(this)
			var o = this.dataset
			if (o.format) {
				f.text(formats[o.format](data[o.field]))
			} else {
				f.text(data[o.field])
			}
			
		})

	}

	var position = function(data,coords,widthHeight) {

		var region = getQuad(coords,widthHeight)

		updateFields(data)

		theTooltip
			.classed('tooltip-active',true)
			.classed('tooltip-' + region, true)
			.style('left', coords[0] + 'px')
			.style('top', coords[1] + 'px')
	}

	var deposition = function() {
		
		theTooltip.attr('class','tooltip')

	}
	
	return {
		'position': position,
		'deposition' : deposition,
		'updateFields' : updateFields
	};

};

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

var catDict = {}

var init = function(domelement,data){
	var svg = d3.select(domelement).append('svg')
	var axis_shell = svg.append('g').attr('class','axis_shell is_transformed')
	var y_axis_shell = axis_shell.append('g')
	var x_axis_shell = axis_shell.append('g')
	var marks_shell = svg.append('g').attr('class','marks_shell is_transformed')
	var marks = marks_shell.selectAll('circle').attr('class','marks')
		.data(data.filter(function(d){
			if (catDict[d.category]) {
				catDict[d.category]++
			} else {
				catDict[d.category] = 1
			}
			return true
		}))
		.enter()
		.append('circle').attr('class', function(d) {
			return slugify(d.category) + ' listing'
		})
	
	var select_menu_data = []

	for (var prop in catDict) {
		select_menu_data.push({
			'display' : prop,
			'slug' : slugify(prop),
			'count' : catDict[prop]
		})
	}

	var theTooltip = initTooltip()
	var cm = d3.select('#select-menu')
		
	cm.selectAll('option')
		.data(select_menu_data)
		.enter().append('option')
		.attr('value', function(d) {
			return d.slug
		})
		.text(function(d) {
			return d.display + ' (' +d.count+ ')'
		})
		
	cm.on('change', function(d) {
		highlight(this.value)
	})

	var make_settings = function(){
		/*cross browser solution for dimensions*/
		var ww = window.innerWidth
			|| document.documentElement.clientWidth
			|| document.body.clientWidth;

		var width = ww;
		var height = 500;
		var margin = {
			'top':60,
			'bottom':20,
			'left':60,
			'right':60
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

		marks.attr('r',6)
			.attr('cx', function(d,i){
				/*d.aggregateRating.ratingValue*/
				var converted = parseFloat(d.ratingValue.substring(0,3))
				return scales.x(converted)
			})
			.attr('cy', function(d,i) {
				var converted = parseFloat(d.reviewCount)
				return scales.y(converted)
			})
			.on('mouseover', function(d) {
				var _this = d3.select(this).classed('hover',true).raise()
				theTooltip.position(d,
					[settings.margin.left+parseFloat(_this.attr('cx')), settings.margin.top+parseFloat(_this.attr('cy'))],
					[settings.width, settings.height]
				)
			})
			.on('mouseout', function() {
				d3.select(this).classed('hover',false)
				theTooltip.deposition()
			})
	};

	d3.select('#reset').on('click', function() {
		unhighlight()
	})

	var unhighlight = function() {
		marks.classed('fade', false)
	}

	var highlight = function(key) {
		unhighlight()
		marks.classed('fade', true)
		d3.selectAll('.listing.'+key).classed('fade', false).raise()
	}

	return {'render':render}
};

d3.json('all_listings.json?c=10', function(err, data) {
	var pymChild = new pym.Child()
	var chart = init('#chart',data)
	chart.render()
	pymChild.sendHeight()
	window.addEventListener('optimizedResize', function() {
		chart.render()
		pymChild.sendHeight()
	})
});
