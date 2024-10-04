/*
Документация слайдера: https://swiperjs.com/
*/

// Инициализация слайдеров
function initSliders() {
	// Перечень слайдов
	if (document.querySelector('.rs-slider__slider')) {
		const sliderBlocks = document.querySelectorAll('.rs-slider');
		sliderBlocks.forEach(sliderBlock => {
			const slider = sliderBlock.querySelector('.rs-slider__slider');
			const pagination = sliderBlock.querySelector('.rs-slider__pagination');
			const arrowNext = sliderBlock.querySelector('.rs-slider__button-next');
			const arrowPrev = sliderBlock.querySelector('.rs-slider__button-prev');

			const sliderSwiper = new Swiper(slider, {
				// // Автопрокрутка
				// autoplay: {
				// 	// Пауза между прокруткой
				// 	delay: 10000,
				// 	// Закончить на последнем слайде
				// 	stopOnLastSlide: false,
				// 	// Отключить после ручного переключения
				// 	disableOnInteraction: false,
				// },

				// Обновить свайпер
				// при изменении элементов слайдера
				observer: true,
				// при изменении родительских элементов слайдера
				observeParents: true,
				// при изменении дочерних элементов слайдера
				observeSlideChildren: true,

				// Скорость смены слайдов
				speed: 800,

				// Включение/отключение
				// перетаскивание на ПК
				simulateTouch: true,
				// Чувствительность свайпа
				touchRadio: 1,
				// Угол срабатывания свайпа/перетаскивания
				touchAngle: 45,

				// Цикличность слайдера
				loop: true,

				// Анимация переключения
				effect: 'fade',

				// Пагинация
				pagination: {
					el: pagination,
					clickable: true,
					// dynamicBullets: true
					// type: '',
				},

				// Стрелки
				navigation: {
					nextEl: arrowNext,
					prevEl: arrowPrev,
				},

				slidesPerView: 1,
			});
		});
	}

	if (document.querySelector('.rs-services__slider')) {
		// Инициализация слайдера
		const sliderBlocks = document.querySelectorAll('.rs-services');

		sliderBlocks.forEach(sliderBlock => {
			const sliders = sliderBlock.querySelectorAll('.rs-services__slider');

			sliders.forEach(slider => {
				const arrowPrev = sliderBlock.querySelector('.rs-services__button-prev');
				const arrowNext = sliderBlock.querySelector('.rs-services__button-next');
				const pagination = sliderBlock.querySelector('.rs-services__pagination');

				// До этой ширины слайдер будет неактивным
				const breakpoint = window.matchMedia('(min-width: 991.98px)');

				let sliderSwiper;

				const breakpointChecker = function () {
					if (breakpoint.matches === true) {
						// Выключаем слайдер
						if (sliderSwiper !== undefined) sliderSwiper.destroy(true, true);
						return;
					} else if (breakpoint.matches === false) {
						// Включаем слайдер
						return enableSwiper();
					}
				};

				const enableSwiper = function () {
					sliderSwiper = new Swiper(slider, {
						// // Автопрокрутка
						// autoplay: {
						// 	// Пауза между прокруткой
						// 	delay: 10000,
						// 	// Закончить на последнем слайде
						// 	stopOnLastSlide: false,
						// 	// Отключить после ручного переключения
						// 	disableOnInteraction: false,
						// },

						// Обновить свайпер
						// при изменении элементов слайдера
						observer: true,
						// при изменении родительских элементов слайдера
						observeParents: true,
						// при изменении дочерних элементов слайдера
						observeSlideChildren: true,

						// Скорость смены слайдов
						speed: 500,

						// Включение/отключение
						// перетаскивание на ПК
						simulateTouch: true,
						allowTouchMove: true,
						// Чувствительность свайпа
						touchRadio: 1,
						// Угол срабатывания свайпа/перетаскивания
						touchAngle: 45,

						// Цикличность слайдера
						// loop: true,

						// Анимация переключения
						// effect: 'fade',

						// Стрелки
						navigation: {
							prevEl: arrowPrev,
							nextEl: arrowNext,
						},

						// Пагинация
						pagination: {
							el: pagination,
							clickable: true,
						},

						// Брекпоинты (адаптив)
						breakpoints: {
							320: {
								slidesPerView: 1.1,
								spaceBetween: 0,
							},
							767.98: {
								slidesPerView: 2.2,
								spaceBetween: 0,
							},
						},
					});
				}

				breakpoint.addListener(breakpointChecker);
				breakpointChecker();
			});
		});
	}

	if (document.querySelector('.rs-logo__slider')) {
		const sliderBlocks = document.querySelectorAll('.rs-logo');
		sliderBlocks.forEach(sliderBlock => {
			const slider = sliderBlock.querySelector('.rs-logo__slider');
			const pagination = sliderBlock.querySelector('.rs-logo__pagination');
			const arrowNext = sliderBlock.querySelector('.rs-logo__button-next');
			const arrowPrev = sliderBlock.querySelector('.rs-logo__button-prev');

			const sliderSwiper = new Swiper(slider, {
				// // Автопрокрутка
				// autoplay: {
				// 	// Пауза между прокруткой
				// 	delay: 10000,
				// 	// Закончить на последнем слайде
				// 	stopOnLastSlide: false,
				// 	// Отключить после ручного переключения
				// 	disableOnInteraction: false,
				// },

				// Обновить свайпер
				// при изменении элементов слайдера
				observer: true,
				// при изменении родительских элементов слайдера
				observeParents: true,
				// при изменении дочерних элементов слайдера
				observeSlideChildren: true,

				// Скорость смены слайдов
				speed: 500,

				// Включение/отключение
				// перетаскивание на ПК
				simulateTouch: true,
				// Чувствительность свайпа
				touchRadio: 1,
				// Угол срабатывания свайпа/перетаскивания
				touchAngle: 45,

				// Цикличность слайдера
				// loop: true,

				// Пагинация
				pagination: {
					el: pagination,
					clickable: true,
					// dynamicBullets: true
					// type: '',
				},

				// Стрелки
				navigation: {
					nextEl: arrowNext,
					prevEl: arrowPrev,
				},

				// Брекпоинты (адаптив)
				breakpoints: {
					320: {
						slidesPerView: 2,
						spaceBetween: 16,
					},
					767.98: {
						slidesPerView: 3,
						spaceBetween: 24,
					},
					1169.98: {
						slidesPerView: 4,
						spaceBetween: 30,
					},
					1439.98: {
						slidesPerView: 4,
						spaceBetween: 171,
					},
				},
			});
		});
	}

	if (document.querySelector('.rs-gallery__slider')) {
		const sliderBlocks = document.querySelectorAll('.rs-gallery');
		sliderBlocks.forEach(sliderBlock => {
			const slider = sliderBlock.querySelector('.rs-gallery__slider');
			const pagination = sliderBlock.querySelector('.rs-gallery__pagination');
			const arrowNext = sliderBlock.querySelector('.rs-gallery__button-next');
			const arrowPrev = sliderBlock.querySelector('.rs-gallery__button-prev');

			const sliderSwiper = new Swiper(slider, {
				// // Автопрокрутка
				// autoplay: {
				// 	// Пауза между прокруткой
				// 	delay: 10000,
				// 	// Закончить на последнем слайде
				// 	stopOnLastSlide: false,
				// 	// Отключить после ручного переключения
				// 	disableOnInteraction: false,
				// },

				// Обновить свайпер
				// при изменении элементов слайдера
				observer: true,
				// при изменении родительских элементов слайдера
				observeParents: true,
				// при изменении дочерних элементов слайдера
				observeSlideChildren: true,

				// Скорость смены слайдов
				speed: 500,

				// Включение/отключение
				// перетаскивание на ПК
				simulateTouch: true,
				// Чувствительность свайпа
				touchRadio: 1,
				// Угол срабатывания свайпа/перетаскивания
				touchAngle: 45,

				// Цикличность слайдера
				// loop: true,

				// Пагинация
				pagination: {
					el: pagination,
					clickable: true,
					// dynamicBullets: true
					type: 'progressbar',
				},

				// Стрелки
				navigation: {
					nextEl: arrowNext,
					prevEl: arrowPrev,
				},

				// Брекпоинты (адаптив)
				breakpoints: {
					320: {
						slidesPerView: 2,
						spaceBetween: 16,
					},
					767.98: {
						slidesPerView: 3,
						spaceBetween: 24,
					},
					1169.98: {
						slidesPerView: 4,
						spaceBetween: 30,
					},
					1439.98: {
						slidesPerView: 4,
						spaceBetween: 30,
					},
				},
			});
		});
	}
}

// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	if (document.querySelector('.swiper')) {
		initSliders();
	}
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});