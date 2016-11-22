$(document).ready(function(){
});
$(function(){
if($('.nav>ul>li').hasClass('selected')){
$('.selected').addClass('active');
var currentleft=$('.selected').position().left+"px";
var currentwidth=$('.selected').css('width');
$('.lamp').css({"left":currentleft,"width":currentwidth});
}
else{
  $('.nav>ul>li').first().addClass('active');
  var currentleft=$('.active').position().left+"px";
var currentwidth=$('.active').css('width');
$('.lamp').css({"left":currentleft,"width":currentwidth});
}
$('.nav>ul>li').hover(function(){
  $('.nav ul li').removeClass('active');
  $(this).addClass('active');
var currentleft=$('.active').position().left+"px";
var currentwidth=$('.active').css('width');
$('.lamp').css({"left":currentleft,"width":currentwidth});
},function(){
if($('.nav>ul>li').hasClass('selected')){
$('.selected').addClass('active');
var currentleft=$('.selected').position().left+"px";
var currentwidth=$('.selected').css('width');
$('.lamp').css({"left":currentleft,"width":currentwidth});
}
else{
  $('.nav>ul>li').first().addClass('active');
  var currentleft=$('.active').position().left+"px";
var currentwidth=$('.active').css('width');
$('.lamp').css({"left":currentleft,"width":currentwidth});
}
});
    
}); 

jQuery(document).ready(function(){
	jQuery('.skillbar').each(function(){
		jQuery(this).find('.skillbar-bar').animate({
			width:jQuery(this).attr('data-percent')
		},3000);
	});
});
$(document).ready(function(){
    function EasyPeasyParallax() {
	scrollPos = $(this).scrollTop();
	$('.bannertext').css({
		'margin-top': '270px',
		'opacity': 1-(scrollPos/500)
	});
        $('.scroll-btn').css({
		'margin-top': '270px',
		'opacity': 1-(scrollPos/500)
	});
}
$(document).ready(function(){
	$(window).scroll(function() {
		EasyPeasyParallax();
	});
});
//$(function(){
//     $(window).scroll(function(){
//        var distanceTop = $('.nav').offset().top - $(window).height();
//         if ($(window).scrollTop() > distanceTop) {
//             $('.nav').animate({'marginTop':'0px'},1500);
//         }
//     }); 
//  }); 

(function() {
		var lastTime = 0;
		var vendors = ['ms', 'moz', 'webkit', 'o'];
		for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
				|| window[vendors[x]+'CancelRequestAnimationFrame'];
		}

		if (!window.requestAnimationFrame)
			window.requestAnimationFrame = function(callback, element) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				var id = window.setTimeout(function() { callback(currTime + timeToCall); },
					timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};

		if (!window.cancelAnimationFrame)
			window.cancelAnimationFrame = function(id) {
				clearTimeout(id);
			};
	}());


	(function() {

    var width, height, canvas, ctx, points, target, animateHeader = true;

    // Main
    initHeader();
    initAnimation();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {x: width/2, y: height/2};

        canvas = document.getElementById('x-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create points
        points = [];
        var puntitos=20;
        for(var x = 0; x < width; x = x + width/puntitos) {
            for(var y = 0; y < height; y = y + height/puntitos) {
                var px = x + Math.random()*width/puntitos;
                var py = y + Math.random()*height/puntitos;
                var p = {x: px, originX: px, y: py, originY: py };
                points.push(p);
            }
        }

        // for each point find the 5 closest points
        for(var i = 0; i < points.length; i++) {
            var closest = [];
            var p1 = points[i];
            for(var j = 0; j < points.length; j++) {
                var p2 = points[j]
                if(!(p1 == p2)) {
                    var placed = false;
                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(closest[k] == undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }

                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }

        // assign a circle to each point
        for(var i in points) {
            var c = new Circle(points[i], 2+Math.random()*2, 'rgba(238,102,102,255)');
            points[i].circle = c;
        }
    }

    // Event handling
    function addListeners() {
        if(!('ontouchstart' in window)) {
            window.addEventListener('mousemove', mouseMove);
        }
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function mouseMove(e) {
        var posx = posy = 0;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY)    {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        target.x = posx;
        target.y = posy;
    }

    function scrollCheck() {
        if(document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }


    // animation
    function initAnimation() {
        animate();
        for(var i in points) {
            shiftPoint(points[i]);
        }
    }

    function animate() {
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);
            for(var i in points) {
                // detect points in range
                if(Math.abs(getDistance(target, points[i])) < 4000) {
                    points[i].active = 0.3;
                    points[i].circle.active = 0.6;
                } else if(Math.abs(getDistance(target, points[i])) < 20000) {
                    points[i].active = 0.1;
                    points[i].circle.active = 0.3;
                } else if(Math.abs(getDistance(target, points[i])) < 40000) {
                    points[i].active = 0.02;
                    points[i].circle.active = 0.1;
                } else {
                    points[i].active = 0;
                    points[i].circle.active = 0;
                }

                drawLines(points[i]);
                points[i].circle.draw();
            }
        }
        requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
        TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*50,
            y: p.originY-50+Math.random()*50, ease:Circ.easeInOut,
            onComplete: function() {
                shiftPoint(p);
            }});
    }

    // Манипуляция с канвас
    function drawLines(p) {
        if(!p.active) return;
        for(var i in p.closest) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.closest[i].x, p.closest[i].y);
            ctx.strokeStyle = 'rgba(238,102,102,'+ p.active+')';
            ctx.stroke();
        }
    }

    function Circle(pos,rad,color) {
        var _this = this;

        // конструктор
        (function() {
            _this.pos = pos || null;
            _this.radius = rad || null;
            _this.color = color || null;
        })();

        this.draw = function() {
            if(!_this.active) return;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 15 * Math.PI, false);
            ctx.fillStyle = 'rgba(238,102,102,'+ _this.active+')';
            ctx.fill();
        };
    }

    // Util
    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }

})();
});

$('.bxslider').bxSlider({
  auto: true,
  autoControls: true
});
