(function ($) {
	var i = 100;

	if($('.page-template-main').length) {

		AOS.init();

		$('.purecounter').counterUp({
			delay: 10,
			time: 1000
		});
	}

	document.addEventListener('DOMContentLoaded', function () {
		const counters = document.querySelectorAll('.count-run');

		counters.forEach(counter => {
			const target = +counter.getAttribute('data-target');
			const duration = 2000;
			const stepTime = 10;
			let count = 0;
			const increment = target / (duration / stepTime);

			const update = () => {
				count += increment;
				if (count < target) {
					counter.textContent = Math.floor(count);
					setTimeout(update, stepTime);
				} else {
					counter.textContent = target;
				}
			};

			update();
		});
	});

	$(document).click(function (event) {
		/// If *navbar-collapse* is not among targets of event
		if (!$(event.target).is('.navbar-collapse *')) {
			/// Collapse every *navbar-collapse*
			$('.navbar-collapse').collapse('hide');
		}
	});

	$(window).scroll(function () {
		if ( $(window).scrollTop() >= 100 ) {
			$('.navbar-fixed').addClass('resize');
		} else {
			$('.navbar-fixed').removeClass('resize');
		}
	});

	typeof yourFunctionName == 'function'
	if(typeof slick == 'function'){
		$(".slider").slick({
			infinite: true,
			slidesToShow: 2,
			slidesToScroll: 1,
			arrows: true,
			centerMode:true,
			prevArrow: $('.prev'),
			nextArrow: $('.next'),
			// the magic
			responsive: [
				{
					breakpoint: 800,
					settings: {
						slidesToShow: 2,
					}
				},  
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 1,
					}
				}, {
					breakpoint: 300,
					settings: "unslick" // destroys slick
				}]
		});
	}
	$(document).ready(function(){
		const isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
		if (isMobile) {
			$('#myTab .nav-item').click(function() {
				document.getElementById('myTabContent').scrollIntoView();
			});
		}
		function reset_icon() {
			$('.service_icon_light').hide();
			$('.active > .service_icon_container >.service_icon_dark').hide();
			$('.active  >.service_icon_container >.service_icon_light').show();
		}
		reset_icon();
		$(".nav-item").click(function() {
			$('.service_icon_light').hide();
			$('.service_icon_dark').show();
			$('.active > .service_icon_container >.service_icon_dark').hide();
			$('.active > .service_icon_container >.service_icon_light').css('margin', '0 auto');
			$('.active  >.service_icon_container >.service_icon_light').show();
		}); 

		$(".custom-software").slick({
			infinite: true,
			slidesToShow: 2,
			slidesToScroll: 1,
			arrows: true,
			centerMode:true,
			responsive: [
				{
					breakpoint: 800,
					settings: {
						slidesToShow: 3,
					}
				},  
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 1,
					}
				}, {
					breakpoint: 300,
					settings: "unslick" // destroys slick
				}]
		});		
	});

	$('.mobile-content-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
	});

	if($(".service-web-slider")) {
		$(".service-web-slider").owlCarousel({
			loop: true,
			center: true,
			margin: 20,
			responsiveClass: true,
			nav: false,
			responsive: {
				0: {
					items: 1,
					nav: false
				},
				680: {
					items: 2,
					nav: false,
					loop: false
				},
				1000: {
					items: 3,
					nav: true
				}
			}
		});
	};
	
// 	if($(".tool-framework-logos")) {
// 		$(".tool-framework-logos-one").owlCarousel({
// 			loop: true,
// 			center: true,
// 			autoplay: true,
// 			slideTransition: 'linear',
// 			autoplaySpeed: 6000,
// 			smartSpeed: 6000,
// 			rtl: true,
// 			margin: 20,
// 			responsiveClass: true,
// 			nav: false,
// 			stagePadding: 50,
// 			items: 6,
// 			responsive: {
// 				0: {
// 					items: 2,
// 					nav: false
// 				},
// 				680: {
// 					items: 3,
// 					nav: false,
// 				},
// 				1000: {
// 					items:6,
// 					nav: false
// 				}
// 			}
// 		});
		
// 		$(".tool-framework-logos-two").owlCarousel({
// 			loop: true,
// 			center: true,
// 			margin: 20,
// 			autoplay: true,
// 			slideTransition: 'linear',
// 			autoplaySpeed: 6000,
// 			smartSpeed: 6000,
// 			responsiveClass: true,
// 			nav: false,
// 			stagePadding: 50,
// 			items: 6,
// 			responsive: {
// 				0: {
// 					items: 2,
// 					nav: false
// 				},
// 				680: {
// 					items: 3,
// 					nav: false,
// 				},
// 				1000: {
// 					items: 6,
// 					nav: false
// 				}
// 			}
// 		});
// 	};

	if($('.page-template-main').length) {
		/*-------------------------------------
     Jquery Scollup Initiation
     -------------------------------------*/
		$.scrollUp({
			scrollText: '<i class="fa fa-arrow-up"></i>',
			easingType: 'linear',
			scrollSpeed: 900,
			animation: 'fade'
		});
	}

	var mySwiper = new Swiper ('.custom-software', {
		// If we need pagination
		pagination: {
			dynamicBullets: true,
			speed: 400,
			effect: 'slide',
		},
	});

	jQuery(document).ready(function($) {
		var tabwrapWidth= $('.tabs-wrapper').outerWidth();
		var totalWidth=0;
		jQuery("ul li").each(function() { 
			totalWidth += jQuery(this).outerWidth(); 
		});
		if(totalWidth > tabwrapWidth){
			$('.scroller-btn').removeClass('inactive');
		}
		else{
			$('.scroller-btn').addClass('inactive');
		}
		if($("#scroller").scrollLeft() == 0 ){
			$('.scroller-btn.left').addClass('inactive');
		}
		else{
			$('.scroller-btn.left').removeClass('inactive');
		}
		var liWidth= $('#scroller li').outerWidth();
		var liCount= $('#scroller li').length;
		var scrollWidth = liWidth * liCount;
		$('.right').on('click', function(){
			$('.nav-tabs').animate({scrollLeft: '+=200px'}, 300);
			console.log($("#scroller").scrollLeft() + " px");
		});
		$('.left').on('click', function(){
			$('.nav-tabs').animate({scrollLeft: '-=200px'}, 300);
		});
		scrollerHide()
		function scrollerHide(){
			var scrollLeftPrev = 0;
			$('#scroller').scroll(function () {
				var $elem=$('#scroller');
				var newScrollLeft = $elem.scrollLeft(),
					width=$elem.outerWidth(),
					scrollWidth=$elem.get(0).scrollWidth;
				if (scrollWidth-newScrollLeft==width) {
					$('.right.scroller-btn').addClass('inactive');
				}
				else{

					$('.right.scroller-btn').removeClass('inactive');
				}
				if (newScrollLeft === 0) {
					$('.left.scroller-btn').addClass('inactive');
				}
				else{

					$('.left.scroller-btn').removeClass('inactive');
				}
				scrollLeftPrev = newScrollLeft;
			});
		}
	});	

	if($('.how-web.owl-carousel')) {
		$('.custom-line').owlCarousel({
			loop:true,
			margin:30,
			nav:true,
			responsive:{
				0:{
					items:1
				},
				600:{
					items:3
				},
				1000:{
					items:3
				}
			}
		});
	}

	if($('.our-clients .kc_image_gallery.kc-carousel-image')) {
		$('.our-clients .kc_image_gallery.kc-carousel-image').owlCarousel({
			center: true,
			items:3,
			loop:true,
			margin:30,
			nav:false,
			dots:false,
			autoplay: true,
			slideTransition: 'linear',
			autoplayTimeout: 6000,
			autoplaySpeed: 6000,
			autoplayHoverPause: true,
			responsive:{
				0:{
					items:1
				},
				600:{
					items:3
				},
				1000:{
					items:8
				}
			}
		});		
	}

	if($('.how-web.owl-carousel')) {
		$('.how-web.owl-carousel').owlCarousel({
			loop:true,
			items: 3,
			margin:30,
			nav:true,
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				1200:{
					items:2
				}
			}
		})		
	}
	// 	if($('.owl-carousel')) {
	// 		$('.owl-carousel').owlCarousel({
	// 			loop: true,
	// 			margin: 10,
	// 			nav: true,
	// 			navText: [
	// 				"<i class='fa fa-caret-left'></i>",
	// 				"<i class='fa fa-caret-right'></i>"
	// 			],
	// 			autoplay: true,
	// 			autoplayHoverPause: true,
	// 			responsive: {
	// 				0: {
	// 					items: 1
	// 				},
	// 				600: {
	// 					items: 3
	// 				},
	// 				1000: {
	// 					items: 5
	// 				}
	// 			}
	// 		});
	// 	}
	if($('.beyond-list')) {
		$('.beyond-list').owlCarousel({
			loop: true,
			margin: 10,
			nav: true,
			navText: [
				"<i class='fa fa-caret-left'></i>",
				"<i class='fa fa-caret-right'></i>"
			],
			autoplay: true,
			autoplayHoverPause: true,
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 3
				},
				1000: {
					items: 5
				}
			}
		});	
	}


	$(document).ready(function() {
		if($(".mobile-app-slider")) {
			$(".mobile-app-slider").owlCarousel({
				loop:true,
				nav:false,
				autoplay: true,
				autoplayHoverPause: true,
				dots: false,
				items: 1,
				autoplayTimeout: 2000,

				center:true
			});
		}
		if($(".client-slider")) {
			$(".client-slider").owlCarousel({
				loop:true,
				nav:false,
				autoplay: true,
				autoplayHoverPause: true,
				dots: false,
				items: 7,
				margin: 50,
				slideTransition: 'linear',
				autoplayTimeout: 6000,
				autoplaySpeed: 6000,
				smartSpeed: 2500,
				responsive:{
					0:{
						items:3
					},
					600:{
						items:4
					},
					1000:{
						items:6
					}
				}
			});
		}
		// PREVENTS TAB SCROLL TO SECTION
		if ($('.kc_tabs_nav li').length>0) {
			/*$('.kc_tabs_nav li a').click(function(e) {
				e.stopPropagation(); 
				return false;
			});*/
		}

	});

	if ($('.mobile_testimonial').length) {
		$('.mobile_testimonial').slick({
			dots: true,
			infinite: true,
			autoplay: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			// 		variableWidth: true,
			prevArrow: $('.slick-prev'),
			nextArrow: $('.slick-next'),
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						infinite: true,
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						dots: false,
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					}
				}
			]
		});
	}

	/*if($('.testimonial-slider').length) {
		var testimonial_owl = $(".testimonial-slider.owl-carousel");
		testimonial_owl.owlCarousel({
			loop: false,
			nav: true,
			dots:true,
			dotsData: false,
			items: 1,
			dotsContainer: '.custom-owl-dots',
		});

		$(".next-btn").click(function () {
			testimonial_owl.trigger("next.owl.carousel");
		});

		$(".prev-btn").click(function () {
			testimonial_owl.trigger("prev.owl.carousel");
		});

		$(".prev-btn").addClass("disabled");

		$(testimonial_owl).on("translated.owl.carousel", function (event) {
			if ($(".owl-prev").hasClass("disabled")) {
				$(".prev-btn").addClass("disabled");
			} else {
				$(".prev-btn").removeClass("disabled");
			}
			if ($(".owl-next").hasClass("disabled")) {
				$(".next-btn").addClass("disabled");
			} else {
				$(".next-btn").removeClass("disabled");
			}
		});
	}*/
	
	
	if ($('.testimonial-slider').length) {
		console.log("rtest");
		var testimonial_owl_single = $(".testimonial-slider.owl-carousel");

		testimonial_owl_single.owlCarousel({
			loop: false,
			nav: true,
			dots: true,
			dotsData: false,
			items: 1,
			dotsContainer: '.custom-owl-dots',
		});

		$(".next-btn").click(function () {
			testimonial_owl_single.trigger("next.owl.carousel");
		});

		$(".prev-btn").click(function () {
			testimonial_owl_single.trigger("prev.owl.carousel");
		});
	}

	jQuery(document).ready(function() {


		if($('.technologies-main-slider').length) {
			var technologiesSync1 = $(".technologies-main-slider");
			var syncedSecondary = true;
			technologiesSync1.owlCarousel({
				items : 1,
				slideSpeed : 2000,
				nav: false,
				dots: true,
				loop: true,
				infinite: true,
				autoplay: true,
				autoplayTimeout: 3000,
				autoplaySpeed: 1000,
				smartSpeed: 2500,
				responsiveRefreshRate : 200,
				dotsContainer: '.technologies-owl-dots',
			}).on('changed.owl.carousel', syncPosition);


			function syncPosition(event) {
				var current = event.item.index;
				$(".technologies-thumb-slider .item").removeClass("synced").eq(current).addClass("synced");
			}

			technologiesSync1.on('changed.owl.carousel', function(event) {
				var current = event.item.index;
				$(".technologies-thumb-slider .item").removeClass("synced").eq(current).addClass("synced");
			});

			$(".technologies-thumb-slider .item").eq(0).addClass("synced");

			$(".technologies-thumb-slider").on("click", ".item", function(e) {
				e.preventDefault();
				var number = $(this).index();
				console.log(number);
				technologiesSync1.data('owl.carousel').to(number, 300, true);
			});

			$(".t-next-btn").click(function () {
				technologiesSync1.trigger("next.owl.carousel");
			});

			$(".t-prev-btn").click(function () {
				technologiesSync1.trigger("prev.owl.carousel");
			});

			$(".t-prev-btn").addClass("disabled");

			technologiesSync1.on("translated.owl.carousel", function (event) {
				if ($(".owl-prev").hasClass("disabled")) {
					$(".t-prev-btn").addClass("disabled");
				} else {
					$(".t-prev-btn").removeClass("disabled");
				}
				if ($(".owl-next").hasClass("disabled")) {
					$(".t-next-btn").addClass("disabled");
				} else {
					$(".t-next-btn").removeClass("disabled");
				}
			});
		}

		if($('.we-are-best').length) {
			var we_are_best = $(".we-are-best");
			we_are_best.slick({
				vertical: true,
				verticalSwiping: true,
				slidesToShow: 3,
				slidesToScroll: 1,
				draggable:true,
				swipeToSlide: true,
				infinite: true,
				dots: true,
				arrows: true,
				appendDots: $('.custom-slick-dots'),
				prevArrow: $('.z-prev'),
				nextArrow: $('.z-next'),
				responsive: [
					{
						breakpoint: 600,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
						}
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
						}
					}
				]
			});
		}
	});

	$('.nav-pills-custom .nav-item').click(function(e){
		e.preventDefault();
		$('.nav-link').removeClass('active');
		$('.tab-pane').removeClass('active');
		$(this).children().addClass('active');

		let id = $(this).children().attr('href');
		$(id).addClass('active');
		console.log(id);
	});

	if($('.wp-our-best').length) {
		var wp_our_best = $(".wp-our-best");
		wp_our_best.slick({
			vertical: true,
			verticalSwiping: true,
			slidesToShow: 2,
			slidesToScroll: 1,
			draggable:true,
			swipeToSlide: true,
			infinite: true,
			dots: true,
			arrows: true,
			appendDots: $('.custom-slick-dots'),
			prevArrow: $('.z-prev'),
			nextArrow: $('.z-next'),
			responsive: [
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
					}
				}
			]
		});
	}

	if($(".wp-aal-slider")) {
		$(".wp-aal-slider").owlCarousel({
			loop: false,
			center: false,
			margin: 20,
			responsiveClass: true,
			nav: true,
			autoplay: false,
			autoplayTimeout: 3000,
			autoplaySpeed: 1000,
			smartSpeed: 2500,
			responsive: {
				0: {
					items: 1,
				},
				680: {
					items: 2,
				},
				1000: {
					items: 3,
				}
			}
		});
	};	

// 	document.addEventListener('DOMContentLoaded', function () {
// 		document.querySelectorAll('.dropdown').forEach(function (dropdown) {
// 			dropdown.addEventListener('mouseenter', toggleDropdown);
// 			dropdown.addEventListener('mouseleave', toggleDropdown);
// 		});

// 		function toggleDropdown(e) {
// 			const dropdown = e.target.closest('.dropdown');
// 			const menu = dropdown.querySelector('.dropdown-menu');

// 			if (e.type === 'mouseenter') {
// 				dropdown.classList.add('show');
// 				menu.classList.add('show');
// 			} else {
// 				setTimeout(function () {
// 					if (!dropdown.matches(':hover')) {
// 						dropdown.classList.remove('show');
// 						menu.classList.remove('show');
// 					}
// 				}, 300);
// 			}
// 		}
// 	});

// 	$('.navbar-toggler').off( "click", "**" );
// 	$('.navbar-toggler').click(function(e){
// 		e.preventDefault();
// 		$('#bootstrap-nav-collapse').toggleClass('show');
// 	});

	function setupAccordion() {
		$('.dropdown.mega-menu-parent .mega-menu-item h2').off('click').on('click', function() {
			var $this = $(this);
			var $content = $this.next('div');

			// Close all other accordion contents
			$('.dropdown.mega-menu-parent .mega-menu-item div').not($content).slideUp();
			$('.dropdown.mega-menu-parent .mega-menu-item h2').not($this).removeClass('active');

			// Toggle the clicked accordion content
			$content.slideToggle();
			$this.toggleClass('active');
		});
	}

	$(document).ready(function() {
		if ($(window).width() <= 1200) {
			setupAccordion();
		}
		$(window).resize(function() {
			if ($(window).width() <= 1200) {
				setupAccordion();
			} else {
				$('.dropdown.mega-menu-parent .mega-menu-item h2').off('click');
				$('.dropdown.mega-menu-parent .mega-menu-item div').show();
				$('.dropdown.mega-menu-parent .mega-menu-item h2').removeClass('active');
			}
		});
	});

		if($(".ai-dev-slider")) {
			$(".ai-dev-slider").owlCarousel({
				loop: true,
				center: true,
				margin: 20,
				responsiveClass: true,
				nav: true,
				autoplay: true,
				autoplayTimeout: 3000,
				autoplaySpeed: 1000,
				smartSpeed: 2500,
				responsive: {
					0: {
						items: 1,
					},
					680: {
						items: 2,
					},
					1000: {
						items: 3,
					}
				}
			});
		};

	$(".ai-dev-slider.owl-carousel")
		.on("initialized.owl.carousel changed.owl.carousel", function(e) {
		if (!e.namespace) {
			return;
		}
		$("#ai-slider-counter").text(
			"0" + (e.relatedTarget.relative(e.item.index) + 1) + "-" + "0" + e.item.count
		);
	})
		.owlCarousel({
		loop: true,
		center: false,
		margin: 10,
		responsiveClass: true,
		nav: true,
		// 		autoplay: true,
		// 		autoplayTimeout: 3000,
		// 		autoplaySpeed: 1000,
		// 		smartSpeed: 2500,
		responsive: {
			0: {
				items: 1,
			},
			680: {
				items: 2,
			},
			1000: {
				items: 3,
			}
		}
	});

	if($(".tech-tools-title")) {
		$(".tech-tools-title").owlCarousel({
			loop: true,
			center: false,
			// 			margin: 20,
			responsiveClass: true,
			nav: true,
			responsive: {
				0: {
					items: 2,
				},
				680: {
					items: 3,
				},
				1000: {
					items: 4,
				},
				1200: {
					items: 5,
				}
			}
		});
	};	
	$('.tech-tools-title .nav-link').click(function(){
		$('.tech-tools-title .nav-link').removeClass('active');
		$(this).addClass('active');
	});


	if($(".video-full-width").length > 0){
		$(".video-full-width").find('video')
			.prop('muted', true)
			.prop('loop', true)
			.prop('playsInline', true)
			.removeAttr('controls');
	}

	$(document).ready(function($) {

		var itemClass = $('.portfolio-slider');
		itemClass.on('initialized.owl.carousel', function(e){
			var idx = e.item.index;
			$('.owl-item').removeClass('middle');
			$('.owl-item').removeClass('left');
			$('.owl-item').removeClass('right');
			$('.owl-item').removeClass('left-last');
			$('.owl-item').removeClass('right-last');
			$('.owl-item').eq(idx).addClass('middle');
			$('.owl-item').eq(idx-1).addClass('left');
			$('.owl-item').eq(idx+1).addClass('right');
			$('.owl-item').eq(idx-2).addClass('left-last');
			$('.owl-item').eq(idx+2).addClass('right-last');
		});

		$('.portfolio-slider').owlCarousel({
			loop:true,
			margin: 0,
			loop: true,
			autoplay: true,
			nav: false,
			dots: false,
			center: true,
			responsive: 
			{
				0: {
					items: 1,
				},
				600: {
					items: 1
				},
				1200: {
					items: 5
				}
			}

		});

		itemClass.on('translate.owl.carousel', function(e){
			var idx = e.item.index;
			$('.owl-item').removeClass('middle');
			$('.owl-item').removeClass('left');
			$('.owl-item').removeClass('right');
			$('.owl-item').removeClass('left-last');
			$('.owl-item').removeClass('right-last');
			$('.owl-item').eq(idx).addClass('middle');
			$('.owl-item').eq(idx-1).addClass('left');
			$('.owl-item').eq(idx+1).addClass('right');
			$('.owl-item').eq(idx-2).addClass('left-last');
			$('.owl-item').eq(idx+2).addClass('right-last');
		});

		$('.responsive-image-scroll-container').owlCarousel({
			loop: true,
			autoplay: true,
			nav: true,
			navText : ['<i class="icon-arrow-left icons"></i>','<i class="icon-arrow-right icons"></i>'],
			dots: false,
			items:1.4, 
			responsive: [
				{
					0: {
						items: 1,
					},
					600: {
						items: 1
					},
					1200: {
						items: 1.4
					}
				}
			]
		});

	}); 

// 	var $box = $('.portfolio-grid').isotope({
// 		itemSelector: '.single-item',
// 		layoutMode: 'fitRows',
// // 		masonry: {
// // 			gutter: 20,
// // 		}
// 	});

	var $box = $('.portfolio-grid').isotope({
		itemSelector: '.single-item',
		layoutMode: 'fitRows',
// 		masonry: {
// 			columnWidth: '.single-item',
// 			gutter: 20  
// 		}
	});
	
	$('.menu-item').click(function () {
		$('.menu-item').removeClass('active');
		$(this).addClass('active');
		var filterValue = $(this).attr("data-type");
		$(".isotope-toolbar-btn").removeClass("active");
		$(this).addClass("active");
		if (filterValue !== "*") {
			filterValue = '[data-type*="' + filterValue + '"]';
		}
		$box.isotope({ filter: filterValue });
	});

	$(".case-studies-owl-carousel").owlCarousel({
		items: 1, // Change this to the number of items you want to show
		loop: true,
		nav: true,
		navText : ['<i class="icon-arrow-left icons"></i>','<i class="icon-arrow-right icons"></i>'],
		dots: true,
		autoplay: false,
		autoplayTimeout: 5000,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 1
			},
			1000: {
				items: 1
			}
		}
	});

	if($(".banner-slider")) {
		$(".banner-slider").owlCarousel({
			loop:true,
			nav:false,
			autoplay: false,
			dots: false,
			items: 1,
			margin: 50,
			autoplayTimeout: 1000,
			autoplaySpeed: 1000,
			smartSpeed: 2500,
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				1000:{
					items:1
				}
			}
		});
	}
	
	if($(".business-clients")) {
		$(".business-clients").owlCarousel({
			loop:true,
			nav:false,
			autoplay: true,
			dots: false,
			items: 5,
			responsive:{
				0:{
					items:2
				},
				600:{
					items:4
				},
				1000:{
					items:5
				}
			}
		});
	}

	if($(".vertical-slider-content")) {
		$(".vertical-slider-content").slick({
			vertical: true,     
			verticalSwiping: true, 
			slidesToShow: 3,     
			slidesToScroll: 1,   
			autoplay: false,      
			autoplaySpeed: 2000, 
			dots: true,          
			arrows: false,
			responsive: [
				{
					breakpoint: 1025, 
					settings: {
						slidesToShow: 2
					}
				},
				{
					breakpoint: 769, 
					settings: {
						slidesToShow: 3
					}
				}
			]
		});
	}

	if ($('.project-items-slider').length) {
		$('.project-items-slider').slick({
			dots: true,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: false,
			arrows: true,
			prevArrow: '<button class="slide-arrow prev-arrow"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>',
			nextArrow: '<button class="slide-arrow next-arrow"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>',
		});
	}
	
	jQuery(document).ready(function ($) {
		const $navLinks = $(".intelligence-thumb-slider a");
		const $sections = $(".intelligence-main-slider .slide-item");
		
		$navLinks.on("click", function (e) {
			e.preventDefault();
			$navLinks.removeClass("active");
			$(this).addClass("active");
			
			let target = $(this).attr("href");
			
			$("html, body").animate(
				{ scrollTop: $(target).offset().top - 130 },
				800
			);
		});

		$(window).on("scroll", function () {
			let scrollPos = $(document).scrollTop();
			$sections.each(function () {
				let top = $(this).offset().top - 130;
				let bottom = top + $(this).outerHeight();
				let id = $(this).attr("id");

				if (scrollPos >= top && scrollPos < bottom) {
					$navLinks.removeClass("active");
					$navLinks.filter("[href='#" + id + "']").addClass("active");
				}
			});
		});
	});
	
	if($(".product-360")) {
		$(".product-360").owlCarousel({
			loop:true,
			nav:false,
			autoplay: true,
			dots: true,
			items: 3,
			responsive:{
				0:{
					items:1
				},
				600:{
					items:2
				},
				1000:{
					items:3
				}
			}
		});
	}
	
	
		$('.basic-product-slider').owlCarousel({
			loop:true,
			margin: 20,
			nav:false,
			autoplay: true,
			dots: true,
			items: 3,
			responsive:{
				0:{
					items:1
				},
				600:{
					items:2
				},
				1000:{
					items:3
				}
			}

		});
	
	$(document).ready(function($){
		$('.client-feedbacks').owlCarousel({
			items: 1,              
			loop: true,           
			dots: true, 
			dotsEach: true,
			nav: false,             
			autoplay: true,        
			autoplayTimeout: 3000,
			autoplayHoverPause: true,
		});
	});
	
	document.addEventListener("DOMContentLoaded", function() {
		const fileInput = document.querySelector("#upload-file");
		const fileName = document.getElementById("file-name");

		if(fileInput) {
			fileInput.addEventListener("change", function() {
				fileName.textContent = this.files.length > 0 ? this.files[0].name : "No file selected";
			});
		}
	});
	
/*N*/
	document.addEventListener("DOMContentLoaded", function() {
		const items = document.querySelectorAll(".verticle-what-we-offer .item");

		function activateOnScroll() {
			let middleOfScreen = window.innerHeight / 2;

			items.forEach(item => {
				const rect = item.getBoundingClientRect();
				if (rect.top < middleOfScreen && rect.bottom > middleOfScreen) {
					item.classList.add("active");
				} else {
					item.classList.remove("active");
				}
			});
		}

		activateOnScroll();
		window.addEventListener("scroll", activateOnScroll);
	});


	
	// ------- Blog v2 ----------- //
	jQuery(document).ready(function($){

		// Extract page number from href
		function getPageFromHref(href) {
			if (!href) return 1;
			var m = href.match(/\/page\/(\d+)/i);
			if (m) return parseInt(m[1], 10);
			var m2 = href.match(/[?&](?:paged|page)=([0-9]+)/i);
			if (m2) return parseInt(m2[1], 10);
			return 1;
		}

		function loadBlogs(cat, paged, scrollToTop = true) {
			cat = typeof cat !== 'undefined' ? cat : 'all';
			paged = typeof paged !== 'undefined' ? parseInt(paged, 10) : 1;

			$.ajax({
				url: blog_ajax_obj.ajaxurl,
				type: 'POST',
				data: {
					action: 'filter_blogs',
					category: cat,
					paged: paged
				},
				beforeSend: function(){
					$('.ajax-overlay').fadeIn(200); // show overlay
				},
				success: function(response){
					try {
						var data = JSON.parse(response);
						$('.latest-blog-wrapper').html(data.latest);
						$('#blog-posts').html(data.grid);

						// Scroll to blog section top (works on mobile + desktop)
						if (scrollToTop) {
							setTimeout(function(){
								$('html, body').animate({
									scrollTop: $('.blog-container').offset().top - 200
								}, 500);
							}, 200);
						}

					} catch (e) {
						console.error("AJAX parse error:", e, response);
					}
					setTimeout(function() {
						$('.ajax-overlay').fadeOut(200);
					}, 200);
				},
				error: function(xhr, status, err){
					console.error("AJAX error:", status, err);
					$('.ajax-overlay').fadeOut(200);
				}
			});
		}

		// Category click
		$('.category-list').on('click', 'a', function(e){
			e.preventDefault();
			var cat = $(this).data('category') || 'all';

			// active state
			$('.category-list a').removeClass('active');
			$(this).addClass('active');

			loadBlogs(cat, 1, true); // scroll to top after category load too
		});

		// Pagination click
		$('#blog-posts').on('click', '.pagination a', function(e){
			e.preventDefault();
			var href = $(this).attr('href') || '';
			var paged = getPageFromHref(href) || 1;
			var cat = $('.category-list a.active').data('category') || 'all';
			loadBlogs(cat, paged, true); // always scroll up after pagination
		});

	});
	
	document.addEventListener("DOMContentLoaded", function() {
		const cards = document.querySelectorAll('.technologies-thumb-slider .item');
		const contents = document.querySelectorAll('.technologies-main-slider .technologies-content');

		if (!cards.length || !contents.length) return;

		// Initially show the first content
		cards[0].classList.add('active');
		contents[0].classList.add('active');

		cards.forEach(card => {
			card.addEventListener('click', () => {
				const index = card.dataset.index;

				// Remove all active states
				cards.forEach(c => c.classList.remove('active'));
				contents.forEach(content => content.classList.remove('active'));

				// Add active state to clicked card and related content
				card.classList.add('active');
				const selectedContent = document.querySelector(`.technologies-content[data-index="${index}"]`);
				if (selectedContent) selectedContent.classList.add('active');
			});
		});
	});


	document.addEventListener('wpcf7mailsent', function(event) {
		// Check if the submitted form is inside the popup with ID pum-18691
		const formWrapper = document.getElementById('pum-18691');

		// Run only if this popup contains the submitted form
		if (formWrapper && formWrapper.contains(event.target)) {

			// Wait a short moment to ensure the thank-you message is rendered
			setTimeout(function() {
				const responseOutput = formWrapper.querySelector('.wpcf7-response-output');

				// Add the class only after successful submission
				if (responseOutput) {
					responseOutput.classList.add('poc-checklist');
				}

				// Close popup after 2 seconds
				setTimeout(function() {
					if (typeof PUM !== 'undefined') {
						PUM.close(18691);
					}
				}, 2000);

			}, 100); // Small delay ensures message is ready
		}
	}, false);
	
	
// 	------- Footer Mobile Dropdown ---------- //
	document.addEventListener('DOMContentLoaded', function () {
		let allTitles = document.querySelectorAll('.menu-container-ft .widgettitle');
		let isAccordionEnabled = false;

		function enableAccordion() {
			if (isAccordionEnabled) return; // Prevent double init
			isAccordionEnabled = true;

			allTitles.forEach((title, index) => {
				const content = title.nextElementSibling;

				if (content) {
					content.style.overflow = 'hidden';
					content.style.transition = 'max-height 0.3s ease';
					content.style.maxHeight = '0';
				}

				// Remove any previous listeners (clone trick)
				const newTitle = title.cloneNode(true);
				title.parentNode.replaceChild(newTitle, title);
			});

			// Re-select updated titles
			allTitles = document.querySelectorAll('.menu-container-ft .widgettitle');

			allTitles.forEach((title, index) => {
				const content = title.nextElementSibling;

				if (index === 0 && content) {
					title.classList.add('active');
					requestAnimationFrame(() => {
						content.style.maxHeight = content.scrollHeight + 'px';
					});
				}

				title.addEventListener('click', function () {
					allTitles.forEach((t) => {
						const c = t.nextElementSibling;
						if (c && t !== title) {
							t.classList.remove('active');
							c.style.maxHeight = '0';
						}
					});

					if (content) {
						const isActive = title.classList.contains('active');
						if (isActive) {
							title.classList.remove('active');
							content.style.maxHeight = '0';
						} else {
							title.classList.add('active');
							content.style.maxHeight = content.scrollHeight + 'px';
						}
					}
				});
			});
		}

		function disableAccordion() {
			if (!isAccordionEnabled) return;
			isAccordionEnabled = false;

			allTitles.forEach((title) => {
				const content = title.nextElementSibling;
				title.classList.remove('active');
				if (content) {
					content.style.overflow = '';
					content.style.transition = '';
					content.style.maxHeight = '';
				}
			});
		}

		function handleAccordion() {
			if (window.innerWidth <= 676) {
				enableAccordion();
			} else {
				disableAccordion();
			}
		}

		handleAccordion();
		window.addEventListener('resize', handleAccordion);
	});
	
	// ------------ Mega Menu V1 ---------------- //	
	document.addEventListener('DOMContentLoaded', function () {
		document.querySelectorAll('.mega-menu-wrapper').forEach(menu => {
			const leftItems = menu.querySelectorAll('.mega-left-item');
			const rightItems = menu.querySelectorAll('.tab-content');

			// Function to activate a tab by index
			function activateTab(index) {
				leftItems.forEach(l => l.classList.remove('active'));
				rightItems.forEach(r => r.classList.remove('active'));
				leftItems[index].classList.add('active');
				if (rightItems[index]) rightItems[index].classList.add('active');
			}

			// Apply hover on desktop, click on mobile
			leftItems.forEach((left, index) => {
				left.addEventListener('mouseenter', () => {
					if (window.innerWidth > 1200) { // desktop breakpoint
						activateTab(index);
					}
				});

				left.addEventListener('click', (e) => {
					if (window.innerWidth <= 1999) { // only mobile/tablet
						e.preventDefault();
						e.stopPropagation();
						activateTab(index);
					}
				});
			});

			// Default: first tab active
			if (leftItems.length && rightItems.length) {
				activateTab(0);
			}

			// Reset on mouse leave (desktop only)
			menu.addEventListener('mouseleave', function () {
				if (window.innerWidth > 991) {
					setTimeout(() => {
						if (!menu.matches(':hover')) {
							activateTab(0);
						}
					}, 300);
				}
			});
		});
	});


	// ------------ Profile PDF Download ----------- //
	document.addEventListener("click", function(e) {
		// DOWNLOAD PDF
		const downloadBtn = e.target.closest(".profile-pdf-download");
		if(downloadBtn){
			e.preventDefault();
			const link = document.createElement("a");
			link.href = "https://absoluteapplabs.com/wp-content/uploads/2025/11/Absolute_App_Labs_-_Profile_1.pdf";
			link.download = "Absolute_App_Labs_-_Profile_1.pdf";
			document.body.appendChild(link);
			link.click();
			link.remove();
		}
	});
	document.addEventListener("click", function(e) {
		const btn = e.target.closest(".profile-pdf-download");
		if(btn){
			e.preventDefault();
			window.open("https://absoluteapplabs.com/Absolute-App-Labs-Profile.pdf", "_blank");
		}
	});

	$(document).ready(function ($) {
		// Target content divs more specifically using attribute selector
		const contentDivs = $('.business-tab .kc_row_inner[class*="-content"]');

		// Hide all content sections
		contentDivs.css('display', 'none').removeClass('active');

		// Show ONLY Shopify content by default
		$('.business-tab .kc_row_inner.shopify-content').css('display', 'block').addClass('active');
		$('.tab-item.shopify-tab').addClass('active');

		// When a tab is clicked
		$('.tab-item').on('click', function () {
			// Remove active from all tabs
			$('.tab-item').removeClass('active');

			// Hide all content sections
			contentDivs.css('display', 'none').removeClass('active');

			// Add active to clicked tab
			$(this).addClass('active');

			// Find platform name from tab classes
			if ($(this).hasClass('shopify-tab')) {
				$('.business-tab .kc_row_inner.shopify-content').css('display', 'block').addClass('active');
			} else if ($(this).hasClass('magento-tab')) {
				$('.business-tab .kc_row_inner.magento-content').css('display', 'block').addClass('active');
			} else if ($(this).hasClass('woocommerce-tab')) {
				$('.business-tab .kc_row_inner.woocommerce-content').css('display', 'block').addClass('active');
			} else if ($(this).hasClass('bigcommerce-tab')) {
				$('.business-tab .kc_row_inner.bigcommerce-content').css('display', 'block').addClass('active');
			}
		});
	});
	
	document.addEventListener("DOMContentLoaded", () => {
		const words = ["CLOUD", "DATA", "FULL-STACK", "AI"];
		const span = document.querySelector(".title-multi-color");
		let index = 0;

		setInterval(() => {
			// fade out
			span.classList.add("fade-out");

			setTimeout(() => {
				// change word after fade out
				index = (index + 1) % words.length;
				span.textContent = words[index];

				// fade in
				span.classList.remove("fade-out");
				span.classList.add("fade-in");

				// remove fade-in class after animation completes
				setTimeout(() => {
					span.classList.remove("fade-in");
				}, 400);
			}, 400);
		}, 2500); // change every 2.5 seconds
	});
	

	// -------- Custom Selecter ---------- //	
	$(".custom-select2-multiple").select2({
		 minimumResultsForSearch: -1,
		selectOnClose: true,
	});
	// 	Custom Select
//         function initOnReadySelect() {
//             $(".custom-default-select").each(function () {
//                 var $this = $(this),
//                     selectOptions = $(this).children("option").length;
//                 $this.addClass("hide-select");
				
//                 $this.wrap('<div class="custom-select-wrap"></div>');
//                 $this.after('<div class="custom-default-select"></div>');
				
//                 var $customSelect = $this.next("div.custom-default-select");
//                 var option = $this.children("option:selected").text() ? $this.children("option:selected").text() : $this.children("option").eq(0).text();
//                 $customSelect.text(option);
				
//                 var $optionlist = $("<ul />", {
//                     class: "select-options",
//                 }).insertAfter($customSelect);
//                 $("ul.select-options").hide();
//                 for (var i = 0; i < selectOptions; i++) {
//                     $("<li />", {
//                         text: $this.children("option").eq(i).text(),
//                         rel: $this.children("option").eq(i).val(),
//                         class: $this.children("option").eq(i).attr("selected") ? "active" : "",
//                     }).appendTo($optionlist);
//                 }
//                 var $optionlistItems = $optionlist.children("li");
//                 $customSelect.click(function (e) {
//                     e.stopPropagation();
//                     $("div.custom-default-select.active")
//                         .not(this)
//                         .each(function () {
//                             $(this).removeClass("active").next("ul.select-options").hide();
//                         });
//                     $(this).toggleClass("active").next("ul.select-options").slideToggle();
//                 });
//                 $optionlistItems.click(function (e) {
//                     e.stopPropagation();
// 					console.log('Selecting: ' , $(this).attr("rel"));
// 					if ($('input[name="current_trail').length > 0) {
// 						$('input[name="current_trail"]').val($(this).attr("rel"));
// 					}
//                     $customSelect.text($(this).text()).removeClass("active");
//                     $this.val($(this).attr("rel"));
//                     $optionlist.hide();
//                 });
//                 $(document).click(function () {
//                     $customSelect.removeClass("active");
//                     $optionlist.hide();
//                 });
//             });
//         }

//         initOnReadySelect();


	
})(jQuery);