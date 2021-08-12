//============================================================
//Стрелка меню на маленьком разрешении либо тачскрин и меню бургер
window.onload = function () {
	document.addEventListener("click", documentActions);

	// Actions (события click)
	function documentActions(e) {
		const targetElement = e.target;
		const hiddenMenu = document.getElementsByClassName('menu__body');
		if (targetElement.classList.contains('burger-icon')) {
			targetElement.classList.toggle('_active');
			hiddenMenu[0].classList.toggle('_active');
		}
		if (!targetElement.closest('.menu__body') && !targetElement.closest('.burger-icon') && document.querySelectorAll('.burger-icon._active').length > 0) {
			_removeClasses(document.querySelectorAll('.burger-icon._active'), "_active");
			_removeClasses(document.querySelectorAll('.menu__body._active'), "_active");
		}
		if (window.innerWidth > 992 && isMobile.any()) {
			if (targetElement.classList.contains('menu__arrow')) {
				targetElement.closest('.menu__item').classList.toggle('_hover');
			}
			if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
				_removeClasses(document.querySelectorAll('.menu__item._hover'), "_hover");
			}
		}
		if (window.innerWidth < 992 && isMobile.any()) {
			if (targetElement.classList.contains('menu__arrow')) {
				targetElement.closest('.menu__item').classList.toggle('_hover-min');
			}
			if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover-min').length > 0) {
				_removeClasses(document.querySelectorAll('.menu__item._hover-min'), "_hover-min");
			}
		}
		if (targetElement.classList.contains('product-card__button')) {
			const productId = targetElement.closest('.product-card__body').dataset.pid;
			addToCart(targetElement, productId);
			e.preventDefault();
		}
		if (targetElement.classList.contains('content-list__plus')) {
			const productId = targetElement.closest('.content-list__item').dataset.cartPid;
			addToCart(targetElement, productId);
			e.preventDefault();
		}
		if (targetElement.classList.contains('basket-content__arrow')) {
			if (document.querySelector('.basket-content__list').children.length > 0) {
				document.querySelector('.content-list').classList.toggle('_active-list');
			}
			e.preventDefault();
		} else if (!targetElement.closest('.content-list') && !targetElement.classList.contains('product-card__button')) {
			document.querySelector('.content-list').classList.remove('_active-list');
		}

		if (targetElement.classList.contains('content-list__delete')) {
			const productId = targetElement.closest('.content-list__item').dataset.cartPid;
			updateCart(targetElement, productId, false);
			e.preventDefault();
		}
		if (targetElement.classList.contains('content-list__minus')) {
			const productId = targetElement.closest('.content-list__item').dataset.cartPid;
			updateCart(targetElement, productId, false);
			e.preventDefault();
		}
		if (targetElement.classList.contains('product-card__icon_favorite')) {
			targetElement.classList.toggle('_active-favorite');
		} else if (window.innerWidth < 992 && isMobile.any()) {

			if (targetElement.classList.contains('product-card__icon_favorite')) {
				targetElement.classList.toggle('_active-favorite');
			}
		}

	}
}

//==================================================================
$(document).ready(function () {
	$('.slider').slick({
		arrows: false,
		dots: true,
		appendDots: $('.slider-dots__body'),
	});
});
//==================================================================
$(document).ready(function () {
	$('.slider-popular').slick({
		arrows: true,
		dots: true,
		adaptiveHeight: true,
		slidesToShow: 4,
		responsive: [
			{
				breakpoint: 1191,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 769,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 426,
				settings: {
					slidesToShow: 1,
				}
			}
		],
	});
});