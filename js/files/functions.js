//===========================================================
//Is it mobile?
var isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};

//=============================================================
//RemoveClasses
function _removeClasses(el, class_name) {
	for (var i = 0; i < el.length; i++) {
		el[i].classList.remove(class_name);
	}
}

//=============================================================
//AddToCart
function addToCart(productButton, productId) {
	if (!productButton.classList.contains('_hold')) {
		productButton.classList.add('_hold');
		productButton.classList.add('_fly');

		const cart = document.querySelector('.actions-header__item_basket');
		const product = document.querySelector(`[data-pid="${productId}"]`);
		const productImage = product.querySelector('.product-card__img');

		const productImageFly = productImage.cloneNode(true);

		const productImageFlyWidth = productImage.offsetWidth;
		const productImageFlyHeight = productImage.offsetHeigth;
		const productImageFlyTop = productImage.getBoundingClientRect().top;
		const productImageFlyLeft = productImage.getBoundingClientRect().left;

		productImageFly.setAttribute('class', '_flyImage _ibg');
		productImageFly.style.cssText =
			`
		left: ${productImageFlyLeft}px;
		top: ${productImageFlyTop}px;
		width:${productImageFlyWidth}px;
		height: ${productImageFlyHeight}px;
			`;
		document.body.append(productImageFly);

		const cartFlyLeft = cart.getBoundingClientRect().left;
		const cartFlyTop = cart.getBoundingClientRect().top;

		productImageFly.style.cssText =
			`
		left: ${cartFlyLeft}px;
		top: ${cartFlyTop}px;
		opacity: 0;
		height: 0px;
		`;

		productImageFly.addEventListener('transitionend', function () {
			if (productButton.classList.contains('_fly')) {
				productImageFly.remove();
				updateCart(productButton, productId);
				productButton.classList.remove('_fly');
			}
		});
	}

}

//=============================================================
//UpdateCart
function updateCart(productButton, productId, productAdd = true) {
	const cart = document.querySelector('.actions-header');
	const cartIcon = cart.querySelector('.actions-header__item_basket');
	const cartQuantity = cartIcon.querySelector('span');
	const cartProduct = document.querySelector(`[data-cart-pid="${productId}"]`);
	const cartList = document.querySelector('.content-list');

	const product = document.querySelector(`[data-pid="${productId}"]`);
	const cartProductAmount = product.querySelector('.product-card__price');
	const cartProductAmountQw = cartProductAmount.querySelector('.product-card__price span');
	const cartAmount = cart.querySelector('.actions-header__item_amount');



	//Добавляем
	if (productAdd) {
		// Количество
		if (cartQuantity) {
			cartQuantity.innerHTML = ++cartQuantity.innerHTML;
		} else {
			cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`);
		}

		// Сумму денег в корзине
		if (cartAmount) {
			const cartAmountSumNum = cart.querySelector('.actions-header__item_amount span');
			cartAmountSumNum.innerHTML = +cartAmountSumNum.innerHTML + +cartProductAmountQw.innerHTML;
		}


		if (!cartProduct) {
			const product = document.querySelector(`[data-pid="${productId}"]`);
			const cartProductImage = product.querySelector('.product-card__img').innerHTML;
			const cartProductName = product.querySelector('.product-card__name').innerHTML;
			const cartProductAmount = product.querySelector('.product-card__price');
			const cartProductAmountQw = cartProductAmount.querySelector('.product-card__price span').innerHTML;
			const cartProductContent = `
			<div class="content-list__body">
				<a href="" class="content-list__img">${cartProductImage}</a>
				<div class="content-list__items">
					<a href="" class="content-list__name">${cartProductName}</a>
					<div class="content-list__price"><span>${cartProductAmountQw}</span></div>
					<div class="content-list__quantity-items">
						<div class="content-list__minus">-</div>
						<div class="content-list__quantity"><span>1</span> шт.</div>
						<div class="content-list__plus">+</div>
					</div>
				</div>
				<div class="content-list__delete"><span></span><span></span></div>
			</div>
			`;
			cartList.insertAdjacentHTML('beforeend', `<li data-cart-pid="${productId}" class="content-list__item">${cartProductContent}</li>`);
		} else {
			const cartProductQuantity = cartProduct.querySelector('.content-list__quantity span');
			cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
			const cartProductAmountIn = cartProduct.querySelector('.content-list__price span');
			cartProductAmountIn.innerHTML = +cartProductAmountIn.innerHTML + +cartProductAmountQw.innerHTML;
		}
		// end
		productButton.classList.remove('_hold');
	} else {
		const cartProductQuantity = cartProduct.querySelector('.content-list__quantity span');
		cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
		const cartAmountSumNum = cart.querySelector('.actions-header__item_amount span');
		cartAmountSumNum.innerHTML = +cartAmountSumNum.innerHTML - +cartProductAmountQw.innerHTML;
		const cartProductAmountIn = cartProduct.querySelector('.content-list__price span');
		cartProductAmountIn.innerHTML = +cartProductAmountIn.innerHTML - +cartProductAmountQw.innerHTML;
		if (!parseInt(cartProductQuantity.innerHTML)) {
			cartProduct.remove();
		}

		const cartQuantityValue = --cartQuantity.innerHTML;
		if (cartQuantityValue) {
			cartQuantity.innerHTML = cartQuantityValue;
		} else {
			cartQuantity.remove();
			cartList.classList.remove('_active-list');
		}

	}
}