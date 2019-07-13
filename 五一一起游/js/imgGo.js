 function imgGo(imgwrap,awrap,rem,time){
		var disX=0;
		var listL=0;		
		var ali1=imgwrap.getElementsByTagName("li");
		var ali2=awrap.getElementsByTagName('li');
		var iw=ali1[0].offsetWidth;
	    var inow=0;
	    var timer=null;

		iul.addEventListener("touchstart",function(ev){
	       iul.style.transition="none";
		    var ipage=Math.round(this.offsetLeft/iw);

			var e=ev.changedTouches[0];
			disX=e.pageX;

	        if (ipage==0) {
	        	this.style.left=-ali1.length/2*iw/rem+"rem";
	        }
	        if (ipage==-(ali1.length-1)) {
	        	this.style.left=-(ali1.length/2-1)*iw/rem+"rem";
	        }     
			
			listL=this.offsetLeft;

		},false);

		iul.addEventListener("touchmove",function(ev){
			var e = ev.changedTouches[0];
			this.style.left=(e.pageX-disX)+listL+"px";
		},false);

		iul.addEventListener("touchend",function(ev){
			iul.style.transition="none";
		    clearInterval(timer);

			for(var i=0;i<ali2.length;i++){
	  			ali2[i].className="";
			}
			var page=-Math.round(this.offsetLeft/iw);
			ali2[page%(ali1.length/2)].className="a_active";
			
			this.style.left=-page*iw/rem+"rem";		
			inow=page;
			if (inow==ali1.length-1) {/*由于下面（auto函数）是先使inow++，
			然后就设置left值再进行判断，所以必须在这里就必须进行值的判断，并进行
			相应的改变，然后再进入auto函数。*/
				iul.style.transition="none";
				inow=ali1.length/2-1;
				iul.style.left=-(ali1.length/2-1)*iw/rem+"rem";
			}
			setTimeout(function(){
				clearInterval(timer);
		    	timer=setInterval(function(){    
	    			auto();
	    		},time);
		    },1000)
		},false);
		   
	    timer=setInterval(function(){
	        
	    	auto();
	    },time);

		function auto(){

			iul.style.transition="0.5s";
			inow++;
			for(var i=0;i<ali2.length;i++){
				ali2[i].className="";
			}
			ali2[inow%(ali1.length/2)].className="a_active";

			iul.style.left=-inow*iw/rem+"rem";
			if (inow==ali1.length-1) {	
				setTimeout(function(){								
					iul.style.transition="none";
					inow=ali1.length/2-1;
					iul.style.left=-(ali1.length/2-1)*iw/rem+"rem";		       
				},1000)
			}					
		}
    }