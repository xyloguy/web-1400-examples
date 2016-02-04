(function(){
	"use strict";
	window.myDonuts = [];

	var updateSize = function(total){
		var ctx = document.querySelectorAll(".chart-area");
		var ratio = 1.25;
		var box = document.querySelectorAll('#canvas-holder > div');
		var span = document.querySelectorAll("#canvas-holder span.percent");
		var span2 = document.querySelectorAll('#canvas-holder span.skill');

		var items = ctx.length;
		if(total <= 768){
			items = ctx.length/2;
		}
		if(total <= 600){
			items = ctx.length/3;
		}
		if(total <= 400){
			items = 1;
			ratio = 1;
		}

		var contW = Math.floor(total/items);
		var width = contW*ratio;
		var height = width*0.5;

		for(var i=0; i<ctx.length; i++){
			var c = document.getElementById(ctx[i].id).getContext("2d");

			c.canvas.style.width = String(width)+'px';
			c.canvas.style.height = String(height)+'px';
			c.canvas.style.margin = '0px '+String( (contW-width)/2 )+'px';

			box[i].style.width = String(contW)+'px';

			span[i].style.width = String(contW)+'px';
			span[i].style.height = String(height)+'px';
			span[i].style['line-height'] = String(height)+'px';

			span2[i].style.width = String(contW)+'px';
		}
	};

	var bindClicks = function(){
		var clicks = document.querySelectorAll("#portfolio > div a");
		var overlay = document.getElementById('ups');
		var modals = document.querySelectorAll("#ups > div");
		var prev = document.getElementById('prev');
		var next = document.getElementById('next');


		for(var i=0; i<clicks.length; i++){
			clicks[i].onclick = function(e){
				e.preventDefault();				
				for(var j = 0; j<modals.length; j++){
					modals[j].style.display = 'none';
				}
				
				overlay.style.display = 'initial';
				overlay.scrollTop = 0;
				prev.style.display = 'block';
				next.style.display = 'block';
				document.body.style.overflow = 'hidden';

				var href = this.href.split("#")[1];
				var modal = document.getElementById(href);

				modal.style.display = 'block';
				var top = parseInt(overlay.offsetHeight/2 - modal.offsetHeight/2);
				var left  = parseInt(overlay.offsetWidth/2 - modal.offsetWidth/2);
				modal.style.top = String(top>20?top:20) + 'px';
				modal.style.left = String(left>20?left:20)  + 'px';

				prev.style.left = String(left) + 'px';
				next.style.left = String(left + modal.offsetWidth - next.offsetWidth) + 'px';

				prev.style.height = String(modal.offsetHeight) + 'px';
				prev.style['line-height'] = String(modal.offsetHeight) + 'px';
				prev.style.top = String(top) + 'px';

				next.style.height = String(modal.offsetHeight) + 'px';
				next.style['line-height'] = String(modal.offsetHeight) + 'px';
				next.style.top = String(top) + 'px';

				portfolioPosition = parseInt(modal.id.replace('d',''));

				window.onresize = function(){
					var top = parseInt(overlay.offsetHeight/2 - modal.offsetHeight/2);
					var left  = parseInt(overlay.offsetWidth/2 - modal.offsetWidth/2);
					modal.style.top = String(top>20?top:20) + 'px';
					modal.style.left = String(left>20?left:20)  + 'px';

					prev.style.left = String(left) + 'px';
					next.style.left = String(left + modal.offsetWidth - next.offsetWidth) + 'px';

					prev.style.height = String(modal.offsetHeight) + 'px';
					prev.style['line-height'] = String(modal.offsetHeight) + 'px';
					prev.style.top = String(top) + 'px';

					next.style.height = String(modal.offsetHeight) + 'px';
					next.style['line-height'] = String(modal.offsetHeight) + 'px';
					next.style.top = String(top) + 'px';
				};
			};

			var portfolioFirst = parseInt(modals[0].id.replace('d',''));
			var portfolioLast = parseInt(modals[modals.length-1].id.replace('d',''));
		}

		prev.onclick = function(e){
			var p,index,thumb;
			e.preventDefault();
			e.stopPropagation();

			p = portfolioPosition;
			p -= 1;
			if(p < portfolioFirst) p = portfolioLast;

			index = 'd'+String(p);

			thumb = document.querySelector('a[href="#'+index+'"]');
			thumb.click();

			portfolioPosition = p;
			return false;
		};

		next.onclick = function(e){
			var p,index,thumb;
			e.preventDefault();
			e.stopPropagation();

			p = portfolioPosition;
			p += 1;
			if(p > portfolioLast) p = portfolioFirst;

			index = 'd'+String(p);

			thumb = document.querySelector('a[href="#'+index+'"]');
			thumb.click();

			portfolioPosition = p;
			return false;
		};

		overlay.onclick = function(e){
			e.preventDefault();
			for(var i = 0; i<modals.length; i++){
				modals[i].style.display = 'none';
			}
			overlay.style.display = 'none';
			prev.style.display = 'none';
			next.style.display = 'none';
			document.body.style.overflow = '';
		};
	};

	var portfolioFirst = 1;
	var portfolioPosition = 1;
	var portfolioLast = 1;


	window.onload = function(){
		var ctx = document.querySelectorAll(".chart-area");
		var box = document.querySelectorAll('#canvas-holder > div');
		var total = Number(document.getElementById('wrapper').offsetWidth);

		for(var i=0; i<ctx.length; i++){
			ctx[i].id = 'chart'+String(i);
			var percent = parseInt(ctx[i].attributes['data-percent'].nodeValue);
			var skill = ctx[i].attributes['data-skill'].nodeValue;
			var c = document.getElementById(ctx[i].id).getContext("2d");
			var span = document.createElement('span');
			var span2 = document.createElement('span');

			window.myDonuts[i] = new Chart(c).Doughnut([
				{
					value: percent,
					color: 'rgb(53,152,219)',
				},
				{
					value: ((100-percent)>0)?100-Number(percent):0,
					color: 'rgb(225,226,227)',
				}
			],{
				segmentShowStroke : false,
				percentageInnerCutout : 70,
				animationEasing : "linear",
				animationSteps : parseInt(100*percent/100),
				showTooltips: false,
				onAnimationProgress: function(i){
					var span = document.getElementById(String(this.id));
					span.innerHTML = String(parseInt(parseInt(span.percent)*i))+"%";
				}
			});

			span.innerHTML = String(percent)+'%';
			span.className = 'percent';
			span.id = "chart-"+String(i);
			span.percent = String(percent);

			span2.innerHTML = skill;
			span2.className = 'skill';

			box[i].appendChild(span);
			box[i].appendChild(span2);
		}

		bindClicks();
		updateSize(total);

		window.onresize = function(){
			var total = Number(document.getElementById('wrapper').offsetWidth);
			updateSize(total);
		};
	};
})();
