$(document).ready(function(){

	$('.owl-carousel').owlCarousel({
		navText: [
		    "<img src='img/left.png'>",
		    "<img src='img/right.png'>"],
		responsive : {
		    // breakpoint from 0 up
		    0 : {
			    items:1,
			    margin:10,
			    autoHeight:true,
		    },

		    768 : {
		    	items:1,
			    margin:10,
			    autoHeight:true,
			    nav: true,
			    dots: false,
				    }
			}
	});

	

	var windowWidth = $( window ).outerWidth(),
		photos = $(".filter-list").children(),
		skills = $(".skills-list").children(),
		skillIndex,
		photoIndex;

	function hrWidth(){
		$(".filter-list li p").each(function(i, value){

			var hr = $(value).next();
			var pWidth = $(value).width();
			var hrWidth = 270 - pWidth;

			$(hr).css("width", hrWidth);

		});
	}

	function hrHide(){
		$(".filter-list li p").each(function(i, value){

			$(value).css("text-transform", "initial").removeClass("active-photo");
			var hr = $(value).next();

			$(hr).css("display", "none");

		});
	}

	function lookForIt(lookingIn, lookingFor, data){
		if(data === "data-photo"){
			jQuery.each($(lookingIn), function(i, value){
				var photoValue = $(value).attr(data);
				if(lookingFor == photoValue){
					photoIndex = i;
					if (windowWidth >= 740) {
						$(value).css("display", "flex");
					} else {
						$(value).css("display", "block");
						$(value).css("opacity", 1);
					}
				}
			});				
		} else {
			jQuery.each($(lookingIn), function(i, value){
				var photoValue = $(value).attr(data);
				if(lookingFor == photoValue){
					skillIndex = i;
					$(value).css("display", "block");
				}
			});				
		}
	
	}

	function hideAll(toHide){
		$(toHide).css("display", "none");
	}

	function start(){
		hideAll(".photos");
		hideAll(".work");
		if (lookForActive()===true){
			$(".filter-list li p").eq(photoIndex).addClass("active-photo");
			if (windowWidth >= 1240) {
				$(".filter-list li hr").eq(photoIndex).css("display", "inline-block");			
			}
			if (windowWidth >= 740){
				$(".photos").eq(photoIndex).css("display", "flex");
			} else {
				$(".photos").first(photoIndex).css("display", "block");
			}			
		} else {
			$(".filter-list li p").first().addClass("active-photo");
			if (windowWidth >= 1240) {
				$(".filter-list li hr").first().css("display", "inline-block");			
			}
			if (windowWidth >= 740){
				$(".photos").first().css("display", "flex");
			} else {
				$(".photos").first().css("display", "block");
			}			
		}

	}

	function lookForActive(){
		if (photoIndex){
			return true;
		} else {
			return false;
		}
	}

	function highliteListPhotos(value){
			if (windowWidth >= 1240) {
				var parahraph = $(".filter-list li p:contains('"+ value+"')");
				$(parahraph).addClass("active-photo");
				var hr = $(parahraph).next();
				$(hr).css("display", "inline-block");				
			} else {
				var parahraph = $(".filter-list li p:contains('"+ value+"')");
				$(parahraph).toggleClass("active-photo");
			}
	}

	hrWidth();
	start();

	$( window ).resize(function(){
		hrWidth();
		hrHide();
		hideAll(".photos");
		hideAll(".work");
		windowWidth = $( window ).outerWidth();
		start();
	});

	[].forEach.call(photos, function(value){

		var filterValue = $(value).text();
		
		value.addEventListener("click", function(){
			hrHide();
			highliteListPhotos(filterValue);
			hideAll(".photos");
			$.when( hideAll(".photos", filterValue) ).done( function() {
			    lookForIt(".photos", filterValue, "data-photo");
			});

		});
	});

	[].forEach.call(skills, function(value){

		var skillValue = $(value).text();

		value.addEventListener("click", function(){
			hideAll(".work");
			$.when( hideAll(".work", skillValue) ).done( function() {
			    lookForIt(".work", skillValue, "data-work");
			});
		});
	});


});

//togglowanie active, jesli naciskasz i active juz jest to nic sie nie dzieje