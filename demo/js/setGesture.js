function setGesture(init){
	var el = init.el;
	var isGestrue = false; 
	var startPoint = [];
	if(!el){
		return;
	}
	el.addEventListener('touchstart', function(e) {
		if(e.touches.length >= 2){
			isGestrue = true; //记录当前用户触发了gesture
			startPoint[0] = {x:e.touches[0].pageX,y:e.touches[0].pageY};
			startPoint[1] = {x:e.touches[1].pageX,y:e.touches[1].pageY}; 
			init.start&&init.start.call(el,e);
		}
	});
	el.addEventListener('touchmove', function(e) {
		if(isGestrue&&e.touches.length >= 2){
			var nowPoint = [];
			nowPoint[0] = {x:e.touches[0].pageX,y:e.touches[0].pageY};
			nowPoint[1] = {x:e.touches[1].pageX,y:e.touches[1].pageY};
			var startDis = getDis(startPoint[0],startPoint[1]);
			var nowDis = getDis(nowPoint[0],nowPoint[1]);
			var startDeg = getDeg(startPoint[0],startPoint[1]);
			var nowDeg = getDeg(nowPoint[0],nowPoint[1]);
			e.scale = nowDis/startDis;
			e.rotation = nowDeg - startDeg;
			init.change&&init.change.call(el,e);
		}
	});
	el.addEventListener('touchend', function(e) {
		if(isGestrue){
			if(e.touches.length < 2 || e.targetTouches.length < 1){
				isGestrue = false;
				init.end&&init.end.call(el,e);
			}
		}
	});
}
