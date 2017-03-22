function modal(){
	$('.modal-open').click(function(event) {
        event.preventDefault();
		$('.modal').show();
        if($('.form-head__input').val().length > 0) {
            console.log($('.form-head__input').val());
            $('.modal__phone').val($('.form-head__input').val());
        }
	});
	$(document).mouseup(function (e){
		var elem = $('.modal');
		var elems = $('.modal__wrap');
		if (!elems.is(e.target) 
			&& elems.has(e.target).length === 0) {
			$('.modal').hide();
	}
});
}
function scrollbottom() {
    $('.scroll-bottom__wrap').click( function(event){ // ловим клик по ссылке с классом go_to
        event.preventDefault();
	    $('html, body').animate({ scrollTop: $('.section_one .title').offset().top }, 500); // анимируем скроолинг к элементу scroll_el
	    return false; // выключаем стандартное действие
    });
}

function slider() {
	var translate = 0;
	var activeslide = 1; //Текущий слайдер
	var slidetime = 5000; //Скорость смены слайда
	var slidercount = $('.reviews-center__item').length; //Кол-во слайдов
	var sliderwidth = 100 * slidercount; //Ширина всего слайдера
	var slidewidth = 100 / slidercount; // Ширина слайда
	var sliderwrap = $('.reviews-center__wrapper'); //Сам слайдер
	var slideitem = $('.reviews-center__item'); //Сам слайд
	var interval = setInterval(Slide, slidetime);
	sliderwrap.css('width', sliderwidth + "%");
	slideitem.css({
		'width': slidewidth + "%"
	});
	function buttonslide(items){
		$('.reviews-top__people').removeClass('active');
		$('#slide-button'+items).addClass('active');
	}
	function Slide() {
		if (activeslide == slidercount || activeslide <= 0 || activeslide > slidercount) { // если истина то возвращаемся на 1-й слайд
			sliderwrap.css({
				'transform': 'translate(' + 0 + 'px, 0)',
				'-webkit-transform': 'translate(' + 0 + 'px, 0)',
				'-ms-transform': 'translate(' + 0 + 'px, 0)'
			})
			activeslide = 1;

			buttonslide(activeslide);
		}
		else { // в ином случае переходим на следующий слайд
			translate = -$('.reviews-center__viewport').width() * (activeslide);
			sliderwrap.css({
				'transform': 'translate(' + translate + 'px, 0)',
				'-webkit-transform': 'translate(' + translate + 'px, 0)',
				'-ms-transform': 'translate(' + translate + 'px, 0)'
			});
			activeslide++;
			buttonslide(activeslide);
		}
	}
}


jQuery(document).ready(function($) {
	modal();

	slider();
    $('.modal__phone').mask("+7(999) 999-9999");
	$(".form-head__input").mask("+7(999) 999-9999");

	$('.reviews-top__people').each(function(index, el) {
		$(this).css('left',-15*index+'px');
	});


	// Примеры работ табуляция
	$(".quality-nav__item").click(function(event) {
		event.preventDefault();
		if($(this).hasClass('active')) {}
		else {
			var attrr = $(this).attr("data-qualitytab");
			$('.quality-nav__item').removeClass('active');
			$(this).addClass('active');
			$('.quality-tabs__tab').removeClass('active');
			$('.quality-tabs__tab_'+attrr).addClass('active');
		}
	});
	$('.quality-tabs__tab_photo').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			tCounter: '',
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
		}
	});
    scrollbottom();
    map();
	$(document).resize(function(event) {
		resize();
	});
});

function map() {
    ymaps.ready(init);
    var myMap,
        myPlacemark;

    function init(){     
        myMap = new ymaps.Map("map", {
            center: [44.570168, 33.469908],
            zoom: 15
        });
        myPlacemark = new ymaps.Placemark([44.571859, 33.469736], { hintContent: 'ЕВРОЗАБОРЫ ПО ВСЕМУ КРЫМУ! ФИОЛЕНТОВСКОЕ ШОССЕ, 35Б, КОРПУС 5'});
        myMap.geoObjects.add(myPlacemark);
    }
}



