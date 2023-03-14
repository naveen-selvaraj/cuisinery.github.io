(function () {

	'use strict';

	// parsely validation
	$('#form').parsley();

	// clear parsley empty elements
	if ($('#form').length > 0) {
		$('#form').parsley().on('field:success', function () {
			$('ul.parsley-errors-list').not(':has(li)').remove();
		});
	}

	$(document).ready(function () {

		var timeout = 1000
		$('html').addClass('is-animating');

		$(".mry-loader").animate({
			width: "100%",
			height: "100%"
		}, timeout);

		setTimeout(function () {
			$('.mry-preloader').removeClass('mry-active');
		}, timeout);

		setTimeout(function () {
			$('html').removeClass('is-animating');
		}, timeout);

	});

	
	Scrollbar.use(OverscrollPlugin);
	var scrollbar = Scrollbar.init(document.querySelector('#scroll'), {
		damping: 0.07,
		renderByPixel: true,
		continuousScrolling: true,
		plugins: {
			overscroll: {
				effect: 'none',
				damping: 0.15,
				maxOverscroll: 80
			},
			mobile: {
				speed: 0.2,
				alwaysShowTracks: false
			}
		},
	});

	$('.mry-scroll-hint').on('click', function () {
		scrollbar.scrollTo(0, 550, 1800);
	}); 

	// portfolio filter
	$('.mry-filter a').on('click', function () {
		$('.mry-filter .mry-current').removeClass('mry-current');
		$(this).addClass('mry-current');

		var selector = $(this).data('filter');
		$('.mry-masonry-grid').isotope({
			filter: selector
		});
		return false;
	});

	// masonry grid
	$('.mry-masonry-grid').isotope({
		filter: '*',
		itemSelector: '.mry-masonry-grid-item',
		percentPosition: true,
		masonry: {
			columnWidth: '.mry-grid-sizer'
		}
	});

	// fancybox
	$('[data-fancybox="works"]').fancybox({
		animationEffect: "zoom-in-out",
		animationDuration: 600,
		transitionDuration: 1000,
		buttons: [
			"zoom",
			"slideShow",
			"thumbs",
			"close",
		],
	});

	$('[data-fancybox="works-slider"]').fancybox({
		animationEffect: "zoom-in-out",
		animationDuration: 600,
		transitionDuration: 1000,
		buttons: [
			"zoom",
			"slideShow",
			"thumbs",
			"close",
		],
	});

	$.fancybox.defaults.hash = false;	

	if ($('html').hasClass('is-rendering')) {
		$("html, body").animate({
			scrollTop: 0
		}, 0);
	}

	// menu
	$('.mry-menu-btn').on('click', function () {
		$('.mry-menu-btn , .mry-menu').toggleClass('mry-active');
	});

	$('.menu-item').on('click', function () {
		$(this).toggleClass('mry-active');
		$(this).children('.sub-menu').toggleClass('mry-active');
	});

	$(document).on('click', function (e) {
		var el = '.mry-menu , .mry-menu-btn-frame , .mry-menu-btn';
		if (jQuery(e.target).closest(el).length) return;
		$('.mry-menu , .mry-menu-btn-frame , .mry-menu-btn').removeClass('mry-active');
	});

	$('.mry-anima-link').on('click', function () {
		$('.mry-menu , .mry-menu-btn-frame , .mry-menu-btn').removeClass('mry-active');
		$('.menu-item a').on('click', function () {
			$(this).toggleClass('mry-active');
			$(this).children('.sub-menu').toggleClass('mry-active');
		});
	});

	// cursor	
	const element = document.querySelector(".mry-ball");
	const target = document.querySelector(".mry-magnetic-link");
	const text = document.querySelector(".mry-magnetic-object");
	class Cursor {
		constructor(el, target, text) {
			this.el = el;
			this.bind();
		}

		bind() {
			document.addEventListener("mousemove", this.move.bind(this), false);
		}

		move(e) {
			const cursorPosition = {
				left: e.clientX,
				top: e.clientY
			};

			document.querySelectorAll(".mry-magnetic-link").forEach(single => {
				const triggerDistance = single.getBoundingClientRect().width / 2;

				const targetPosition = {
					left: single.getBoundingClientRect().left +
						single.getBoundingClientRect().width / 2,
					top: single.getBoundingClientRect().top +
						single.getBoundingClientRect().height / 2
				};

				const distance = {
					x: targetPosition.left - cursorPosition.left,
					y: targetPosition.top - cursorPosition.top
				};

				const angle = Math.atan2(distance.x, distance.y);
				const hypotenuse = Math.sqrt(
					distance.x * distance.x + distance.y * distance.y);

				if (hypotenuse < triggerDistance) {
					TweenMax.to(single.querySelector(".mry-magnetic-object"), 0.4, {
						x: -(Math.sin(angle) * hypotenuse / 2),
						y: -(Math.cos(angle) * hypotenuse / 2),
					});
				} else {
					TweenMax.to(this.el, .6, {
						left: cursorPosition.left - 20,
						top: cursorPosition.top - 20,
					});

					TweenMax.to(single.querySelector(".mry-magnetic-object"), 0.4, {
						x: 0,
						y: 0
					});
				}
			});
		}
	}

	$(".mry-default-link").mouseenter(function (e) {
		TweenMax.to(element, 0.3, {
			scale: .6,
		});
		TweenMax.to(element, 0.3, {
			opacity: '1'
		});
	});

	$(".mry-default-link").mouseleave(function (e) {
		TweenMax.to(element, 0.3, {
			scale: 1
		});
		TweenMax.to(element, 0.3, {
			opacity: '.5'
		});
	});

	$(".mry-magnetic-link").mouseenter(function (e) {
		TweenMax.to(element, 0.3, {
			scale: 1.4,
		});
		TweenMax.to(element, 0.3, {
			opacity: '1'
		});
	});

	$(".mry-magnetic-link").mouseleave(function (e) {
		TweenMax.to(element, 0.3, {
			scale: 1
		});
		TweenMax.to(element, 0.3, {
			opacity: '.5'
		});
	});

	const cursor = new Cursor(element, target);

	// sliders
	var progressbar = $(".mry-slider-progress-bar");

	var swiper = new Swiper(".mry-main-slider", {
		autoplay: {
			delay: 500,
			disableOnInteraction: false
		},
		loop: true,
		parallax: true,
		keyboard: true,
		speed: 1500,
		navigation: {
			nextEl: '.mry-button-next',
			prevEl: '.mry-button-prev',
		},
		pagination: {
			el: '.mry-slider-pagination',
			clickable: true,
		},
		on: {
			init: function () {
				progressbar.removeClass("animate");
				progressbar.removeClass("active");
				progressbar.eq(0).addClass("animate");
				progressbar.eq(0).addClass("active");
			},
			slideChangeTransitionStart: function () {
				progressbar.removeClass("animate");
				progressbar.removeClass("active");
				progressbar.eq(0).addClass("active");
			},
			slideChangeTransitionEnd: function () {
				progressbar.eq(0).addClass("animate");
			}
		}
	});

	var swiper = new Swiper(".mry-team-slider", {
		slidesPerView: 3,
		spaceBetween: 30,
		loop: true,
		navigation: {
			nextEl: '.mry-button-team-next',
			prevEl: '.mry-button-team-prev',
		},
		speed: 1200,
		breakpoints: {
			768: {
				slidesPerView: 2,
			},
		},
	});

	var swiper = new Swiper(".mry-testimonials-slider", {
		slidesPerView: 1,
		spaceBetween: 30,
		loop: true,
		navigation: {
			nextEl: '.mry-button-testimonials-next',
			prevEl: '.mry-button-testimonials-prev',
		},
		speed: 1200,
		breakpoints: {
			768: {
				slidesPerView: 1,
			},
		},
	});

	var swiper = new Swiper(".mry-blog-slider", {
		slidesPerView: 3,
		spaceBetween: 60,
		loop: true,
		navigation: {
			nextEl: '.mry-button-blog-next',
			prevEl: '.mry-button-blog-prev',
		},
		speed: 1200,
		breakpoints: {
			768: {
				slidesPerView: 1,
			},
		},
	});

	// scroll magic
	var controller = new ScrollMagic.Controller();

	var fadestyles = {
		opacity: "0",
		transform: 'translateY(50px) scale(.98)'
	};

	$('.mry-fo').css(fadestyles);

	var scrolAnimation1 = document.getElementsByClassName('mry-fo');

	function createProjectScenes(object) {
		for (let i = 0; i < object.length; i++) {
			createScene(object[i], i);
		}
	};

	function createScene(element, i) {
		var scene = new ScrollMagic.Scene({
			triggerElement: element,
			offset: -400,
		})
			.setTween(element, .6, {
				opacity: 1,
				scale: '1',
				y: 0
			})
			.addTo(controller)
	};

	createProjectScenes(scrolAnimation1);
	

	var scrolAnimation3 = document.getElementsByClassName('mry-curtain');

	function createProjectScenes3(object3) {
		for (let i = 0; i < object3.length; i++) {
			createScene3(object3[i], i);
		}
	};

	function createScene3(element3, i) {
		var scene = new ScrollMagic.Scene({
			triggerElement: element3,
			offset: -200,
		})
			.setTween(element3, .8, {
				x: '-100%'
			})
			.addTo(controller)
	}

	createProjectScenes3(scrolAnimation3);

	// maps
	if ($("div").is("#map-dark")) {
		mapboxgl.accessToken = 'pk.eyJ1Ijoic3Rvc2NhciIsImEiOiJja2VpbDE4b2UwbDg3MnNwY2d3YzlvcDV5In0.e26tLedpKwxrkOmPkWhQlg';
		var map = new mapboxgl.Map({
			container: 'map-dark',
			style: 'mapbox://styles/stoscar/ckk75h29r02ol17rrilp215vd',
			center: [-79.394900, 43.643102],
			zoom: 11
		});

		var marker = new mapboxgl.Marker()
			.setLngLat([-79.394900, 43.643102])
			.addTo(map);
	}

	if ($("div").is("#map-light")) {
		mapboxgl.accessToken = 'pk.eyJ1Ijoic3Rvc2NhciIsImEiOiJja2VpbDE4b2UwbDg3MnNwY2d3YzlvcDV5In0.e26tLedpKwxrkOmPkWhQlg';
		var map = new mapboxgl.Map({
			container: 'map-light',
			style: 'mapbox://styles/stoscar/ckkb5d37l0euf17r0wws7op4i',
			center: [-79.394900, 43.643102],
			zoom: 11
		});

		var marker = new mapboxgl.Marker()
			.setLngLat([-79.394900, 43.643102])
			.addTo(map);
	}

	// map lock/unlock
	$(".mry-lock").on('click', function () {
		$('.mry-map').toggleClass('mry-active');
		$('.mry-lock').toggleClass('mry-active');
		$('.mry-lock .fas').toggleClass('fa-unlock');
	});

	// reinit
	document.addEventListener("swup:contentReplaced", function () {

		// parsely validation
		$('#form').parsley();

		// clear parsley empty elements
		if ($('#form').length > 0) {
			$('#form').parsley().on('field:success', function () {
				$('ul.parsley-errors-list').not(':has(li)').remove();
			});
		}

		$(document).ready(function () {

			var timeout = 1000
			$('html').addClass('is-animating');

			$(".mry-loader").animate({
				width: "100%"
			}, timeout);

			setTimeout(function () {
				$('.mry-preloader').removeClass('mry-active');
			}, timeout);

			setTimeout(function () {
				$('html').removeClass('is-animating');
			}, timeout);

		});

		Scrollbar.use(OverscrollPlugin);
		var scrollbar = Scrollbar.init(document.querySelector('#scroll'), {
			damping: 0.07,
			renderByPixel: true,
			continuousScrolling: true,
			plugins: {
				overscroll: {
					effect: 'bounce',
					damping: 0.15,
					maxOverscroll: 80
				},
				mobile: {
					speed: 0.2,
					alwaysShowTracks: false
				}
			},
		});

		$('.mry-scroll-hint').on('click', function () {
			scrollbar.scrollTo(0, 550, 1800);
		});

		window.oncontextmenu = function () {
			return false;
		}
		document.onkeydown = function (e) {
			if (window.event.keyCode == 123 || e.button == 2)
				return false;
		}

		// portfolio filter
		$('.mry-filter a').on('click', function () {
			$('.mry-filter .mry-current').removeClass('mry-current');
			$(this).addClass('mry-current');

			var selector = $(this).data('filter');
			$('.mry-masonry-grid').isotope({
				filter: selector
			});
			return false;
		});

		$('.mry-masonry-grid').isotope({
			filter: '*',
			itemSelector: '.mry-masonry-grid-item',
			percentPosition: true,
			masonry: {
				columnWidth: '.mry-grid-sizer'
			}
		});

		$('[data-fancybox="works"]').fancybox({
			animationEffect: "zoom-in-out",
			animationDuration: 600,
			transitionDuration: 1000,
			buttons: [
				"zoom",
				"slideShow",
				"thumbs",
				"close",
			],
		});

		$('[data-fancybox="works-slider"]').fancybox({
			animationEffect: "zoom-in-out",
			animationDuration: 600,
			transitionDuration: 1000,
			buttons: [
				"zoom",
				"slideShow",
				"thumbs",
				"close",
			],
		});

		$.fancybox.defaults.hash = false;

		$('.mry-smooth-scroll').on("click", function () {
			$('html, body').stop().animate({
				scrollTop: $($(this).attr('href')).offset().top - 0
			}, 1000);
			return false;
		});

		$('.menu-item').on('click', function () {
			$(this).toggleClass('mry-active');
			$(this).children('.sub-menu').toggleClass('mry-active');
		});

		$(document).on('click', function (e) {
			var el = '.mry-menu , .mry-menu-btn-frame , .mry-menu-btn';
			if (jQuery(e.target).closest(el).length) return;
			$('.mry-menu , .mry-menu-btn-frame , .mry-menu-btn').removeClass('mry-active');
		});

		$('.mry-anima-link').on('click', function () {
			$('.mry-menu , .mry-menu-btn-frame , .mry-menu-btn').removeClass('mry-active');
			$('.menu-item a').on('click', function () {
				$(this).toggleClass('mry-active');
				$(this).children('.sub-menu').toggleClass('mry-active');
			});
		});

		if ($('html').hasClass('is-rendering')) {
			$("html, body").animate({
				scrollTop: 0
			}, 0);
		}

		$(".mry-default-link").mouseenter(function (e) {
			TweenMax.to(element, 0.3, {
				scale: .6,
			});
			TweenMax.to(element, 0.3, {
				opacity: '1'
			});
		});

		$(".mry-default-link").mouseleave(function (e) {
			TweenMax.to(element, 0.3, {
				scale: 1
			});
			TweenMax.to(element, 0.3, {
				opacity: '.5'
			});
		});

		$(".mry-magnetic-link").mouseenter(function (e) {
			TweenMax.to(element, 0.3, {
				scale: 1.4,
			});
			TweenMax.to(element, 0.3, {
				opacity: '1'
			});
		});

		$(".mry-magnetic-link").mouseleave(function (e) {
			TweenMax.to(element, 0.3, {
				scale: 1
			});
			TweenMax.to(element, 0.3, {
				opacity: '.5'
			});
		});

		var progressbar = $(".mry-slider-progress-bar");

		var swiper = new Swiper(".mry-main-slider", {
			autoplay: {
				delay: 100000,
				disableOnInteraction: false
			},
			spaceBetween: 0,
			loop: true,
			parallax: true,
		
			keyboard: true,
			speed: 100,
			navigation: {
				nextEl: '.mry-button-next',
				prevEl: '.mry-button-prev',
			},
			pagination: {
				el: '.mry-slider-pagination',
				clickable: true,
			},
			on: {
				init: function () {
					progressbar.removeClass("animate");
					progressbar.removeClass("active");
					progressbar.eq(0).addClass("animate");
					progressbar.eq(0).addClass("active");
				},
				slideChangeTransitionStart: function () {
					progressbar.removeClass("animate");
					progressbar.removeClass("active");
					progressbar.eq(0).addClass("active");
				},
				slideChangeTransitionEnd: function () {
					progressbar.eq(0).addClass("animate");
				}
			}
		});

		var swiper = new Swiper(".mry-team-slider", {
			slidesPerView: 3,
			spaceBetween: 30,
			loop: true,
			navigation: {
				nextEl: '.mry-button-team-next',
				prevEl: '.mry-button-team-prev',
			},
			speed: 1200,
			breakpoints: {
				768: {
					slidesPerView: 2,
				},
			},
		});

		var swiper = new Swiper(".mry-testimonials-slider", {
			slidesPerView: 1,
			spaceBetween: 30,
			loop: true,
			navigation: {
				nextEl: '.mry-button-testimonials-next',
				prevEl: '.mry-button-testimonials-prev',
			},
			speed: 1200,
			breakpoints: {
				768: {
					slidesPerView: 1,
				},
			},
		});

		var swiper = new Swiper(".mry-blog-slider", {
			slidesPerView: 3,
			spaceBetween: 60,
			loop: true,
			navigation: {
				nextEl: '.mry-button-blog-next',
				prevEl: '.mry-button-blog-prev',
			},
			speed: 1200,
			breakpoints: {
				768: {
					slidesPerView: 1,
				},
			},
		});

		var fadestyles = {
			opacity: "0",
			transform: 'translateY(50px)'
		};

		$('.mry-fo').css(fadestyles);

		var scrolAnimation1 = document.getElementsByClassName('mry-fo');

		function createProjectScenes(object) {
			for (let i = 0; i < object.length; i++) {
				createScene(object[i], i);
			}
		};

		function createScene(element, i) {
			var scene = new ScrollMagic.Scene({
				triggerElement: element,
				offset: -360,
			})
				.setTween(element, .6, {
					opacity: 1,
					y: 0
				})
				.addTo(controller)
		};

		createProjectScenes(scrolAnimation1);

		var scrolAnimation2 = document.getElementsByClassName('mry-scale-object');

		function createProjectScenes2(object2) {
			for (let i = 0; i < object2.length; i++) {
				createScene2(object2[i], i);
			}
		};

		function createScene2(element2, i) {
			var scene = new ScrollMagic.Scene({
				triggerElement: element2,
				duration: 1800,
				offset: -350,
			})
				.setTween(element2, .6, {
					scale: '1.2',
					y: '10%'
				})
				.addTo(controller)
		}

		createProjectScenes2(scrolAnimation2);

		var scrolAnimation3 = document.getElementsByClassName('mry-curtain');

		function createProjectScenes3(object3) {
			for (let i = 0; i < object3.length; i++) {
				createScene3(object3[i], i);
			}
		};

		function createScene3(element3, i) {
			var scene = new ScrollMagic.Scene({
				triggerElement: element3,
				offset: -150,
			})
				.setTween(element3, .8, {
					x: '-100%'
				})
				.addTo(controller)
		}

		createProjectScenes3(scrolAnimation3);

		if ($("div").is("#map-dark")) {
			mapboxgl.accessToken = 'pk.eyJ1Ijoic3Rvc2NhciIsImEiOiJja2VpbDE4b2UwbDg3MnNwY2d3YzlvcDV5In0.e26tLedpKwxrkOmPkWhQlg';
			var map = new mapboxgl.Map({
				container: 'map-dark',
				style: 'mapbox://styles/stoscar/ckk75h29r02ol17rrilp215vd',
				center: [-79.394900, 43.643102],
				zoom: 11
			});

			var marker = new mapboxgl.Marker()
				.setLngLat([-79.394900, 43.643102])
				.addTo(map);
		}

		if ($("div").is("#map-light")) {
			mapboxgl.accessToken = 'pk.eyJ1Ijoic3Rvc2NhciIsImEiOiJja2VpbDE4b2UwbDg3MnNwY2d3YzlvcDV5In0.e26tLedpKwxrkOmPkWhQlg';
			var map = new mapboxgl.Map({
				container: 'map-light',
				style: 'mapbox://styles/stoscar/ckkb5d37l0euf17r0wws7op4i',
				center: [-79.394900, 43.643102],
				zoom: 11
			});

			var marker = new mapboxgl.Marker()
				.setLngLat([-79.394900, 43.643102])
				.addTo(map);
		}

		// map lock/unlock
		$(".mry-lock").on('click', function () {
			$('.mry-map').toggleClass('mry-active');
			$('.mry-lock').toggleClass('mry-active');
			$('.mry-lock .fas').toggleClass('fa-unlock');
		});

	});

})()

  
