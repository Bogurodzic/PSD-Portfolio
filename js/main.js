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

	function hrWidth(whichHr){
			$(whichHr).each(function(i, value){

				var hr = $(value).next();
				var pWidth = $(value).width();
				var hrWidth = 275 - pWidth;

				$(hr).css("width", hrWidth);

			});			
	}

	function hrHide(toHide){
		$(toHide).each(function(i, value){

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
						$(value).css({
							width: "0%",
							opacity: 0.5,
							display: "flex"
						}).animate({
							width: "100%",
							opacity: 1,
							display: "block"
						});
					} else {
						$(value).css({
							opacity: 0.5,
							display: "block"
						}).animate({
							opacity: 1,
							display: "block"
						});
					}
				}
			});				
		} else {
			jQuery.each($(lookingIn), function(i, value){
				var photoValue = $(value).attr(data);
				if(lookingFor == photoValue){
					skillIndex = i;
					$(value).css("display", "flex");
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
		if (lookForActive(photoIndex)===true){
			$(".filter-list li p").eq(photoIndex).addClass("active-photo");
			if (windowWidth >= 1240) {
				$(".filter-list li hr").eq(photoIndex).css("display", "inline-block");			
			}
			if (windowWidth >= 740){
				$(".photos").eq(photoIndex).css({
							opacity: 1,
							display: "flex"
						});
			} else {
				$(".photos").first(photoIndex).css({
							opacity: 1,
							display: "block"
						});
			}			
		} else if (lookForActive(photoIndex) === false) {
			$(".filter-list li p").first().addClass("active-photo");
			if (windowWidth >= 1240) {
				$(".filter-list li hr").first().css("display", "inline-block");			
			}
			if (windowWidth >= 740){
				$(".photos").first().css({
							opacity: 1,
							display: "flex"
						});
			} else {
				$(".photos").first().css({
							opacity: 1,
							display: "block"
						});
			}			
		}
		if (lookForActive(skillIndex)===true){
			$(".skills-list li p").eq(skillIndex).addClass("active-photo");
			if (windowWidth >= 1240) {
				$(".skills-list li hr").eq(skillIndex).css("display", "inline-block");			
			}
			if (windowWidth >= 740){
				$(".work").eq(skillIndex).css("display", "flex");
			} else {
				$(".work").first(skillIndex).css("display", "block");
			}			
		} else if (lookForActive(skillIndex) === false) {
			$(".skills-list li p").first().addClass("active-photo");
			if (windowWidth >= 1240) {
				$(".skills-list li hr").first().css("display", "inline-block");			
			}
			if (windowWidth >= 740){
				$(".work").first().css("display", "flex");
			} else {
				$(".work").first().css("display", "block");
			}			
		}
	}

	function lookForActive(indexType){
		if (indexType){
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

	function highliteListSkills(value){
			if (windowWidth >= 1240) {
				var parahraph = $(".skills-list li p:contains('"+ value+"')");
				$(parahraph).addClass("active-photo");
				var hr = $(parahraph).next();
				$(hr).css("display", "inline-block");				
			} else {
				var parahraph = $(".skills-list li p:contains('"+ value+"')");
				$(parahraph).toggleClass("active-photo");
			}
	}	

	hrWidth(".filter-list li p");
	hrWidth(".skills-list li p");
	start();

	$( window ).resize(function(){
		hrWidth(".filter-list li p");
		hrWidth(".skills-list li p");
		hrHide(".filter-list li p");
		hrHide(".skills-list li p");
		hideAll(".photos");
		hideAll(".work");
		windowWidth = $( window ).outerWidth();
		start();
		resizeContact();
	});

	[].forEach.call(photos, function(value){

		var filterValue = $(value).text();
		
		value.addEventListener("click", function(){
			hrHide(".filter-list li p");
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
			hrHide(".skills-list li p");
			highliteListSkills(skillValue);
			hideAll(".work");
			$.when( hideAll(".work", skillValue) ).done( function() {
			    lookForIt(".work", skillValue, "data-work");
			});
		});
	});

resizeContact();

function resizeContact(){
	var h2ContactWidth = $(".contact h2").width();
	var hrContactWidth = $(window).width();
	$(".contact hr").width(hrContactWidth/2 - h2ContactWidth/2);	
}


});

//togglowanie active, jesli naciskasz i active juz jest to nic sie nie dzieje