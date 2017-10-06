/*resize listener with throttling*/
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
	console.debug(domelement, data)
	var svg = d3.select(domelement).append('svg')
	var axis_shell = svg.append('g').attr('class','axis_shell')
	var marks_shell = svg.append('g').attr('class','marks_shell')
	var marks = marks_shell.selectAll('circle').attr('class','marks')
		.data(data)
		.enter()
		.append('circle').attr('class','listing')

	var make_settings = function(){
		/*cross browser solution for dimensions*/
		var ww = window.innerWidth
			|| document.documentElement.clientWidth
			|| document.body.clientWidth;

		console.debug(ww);
	};
	
	var make_scales = function(settings){

	};
	
	var render = function(){
		make_settings()
	};

	return {'render':render}
};

d3.json('all_listings.json', function(err, data) {
	var chart = init('#chart',data)
	chart.render()
	window.addEventListener('optimizedResize', function() {
		chart.render()
	})
});
