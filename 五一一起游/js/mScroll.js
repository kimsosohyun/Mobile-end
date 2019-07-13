function mScroll(init){
	if(!init.el){
		return;
	}
	var wrap = init.el;
	var inner = init.el.children[0];
	var scrollBar = document.createElement("div");	
	var startPoint = 0;
	var startEl = 0;
	var lastY = 0;
	var lastDis = 0;
	var lastTime = 0;
	var lastTimeDis = 0;
	var back=init.back;
	// var back = document.documentElement.clientWidth/8;//除以16是1rem。
	var maxTranslate = wrap.clientHeight - inner.offsetHeight;
	scrollBar.id = "scrollBar";
	if(!init.offBar){
		var scale = wrap.clientHeight/inner.offsetHeight;
		inner.style.minHeight = "100%";
		scrollBar.style.cssText = "width:4px;background:rgba(0,0,0,.5);position:absolute;right:0;top:0;border-radius:2px;opacity:0;transition:.3s opacity;";
		wrap.appendChild(scrollBar);
	}
	css(inner,"translateZ",0.01);
	inner.addEventListener('touchstart', function(e) {
		maxTranslate = wrap.clientHeight - inner.offsetHeight;
		if(!init.offBar){
			if(maxTranslate >= 0) {
				scrollBar.style.display = "none";
			} else {
				scrollBar.style.display = "block";
			}
			scale = wrap.clientHeight/inner.offsetHeight;
			scrollBar.style.height = wrap.clientHeight * scale + "px";
		}
		clearInterval(inner.timer);
		startPoint = e.changedTouches[0].pageY;
		startEl = css(inner,"translateY");
		lastY = startEl;
		lastTime = new Date().getTime();
		lastTimeDis = lastDis = 0;
		(init.offBar)||(scrollBar.style.opacity = 1);
		init.start&&init.start.call(main,e);
	});
	inner.addEventListener('touchmove', function(e) {
		var nowTime = new Date().getTime();
		var nowPoint = e.changedTouches[0].pageY;
		var dis = nowPoint - startPoint;
		var translateY = startEl + dis;
		if (translateY<wrap.clientHeight - inner.offsetHeight-back) {
			translateY=wrap.clientHeight - inner.offsetHeight-back;
		}
		if (translateY>back) {
			translateY=back;
		}
		css(inner,"translateY",translateY);
		(init.offBar)||css(scrollBar,"translateY",-translateY*scale);
		lastDis = translateY - lastY;
		lastY = translateY;
		lastTimeDis = nowTime - lastTime;
		lastTime = nowTime;
		init.move&&init.move.call(main,e);
	});
	inner.addEventListener('touchend', function(e) {
		var type = "easeOut";
		var speed = Math.round(lastDis / lastTimeDis*10);
		speed = lastTimeDis <= 0?0 :speed;
		var target = Math.round(speed*30 + css(inner,"translateY"));
		if(target > 0){
			target = 0;
			type = "backOut";
		} else if(target < maxTranslate){
			target = maxTranslate;
			type = "backOut";
		}
		MTween({
			el:inner,
			target: {translateY:target},
			time: Math.round(Math.abs(target - css(inner,"translateY"))*1.8),
			type: type,
			callBack: function(){
				(init.offBar) || (scrollBar.style.opacity = 0);
				init.over&&init.over.call(main,e);
			},
			callIn: function(){
				var translateY = css(inner,"translateY");
				init.offBar||css(scrollBar,"translateY",-translateY*scale);
				init.move&&init.move.call(main,e);
			}
		});
		init.end&&init.end.call(main,e);
	});
}