/* ====================================
Проверка поддержки webp, добавление класса webp или no-webp для HTML
==================================== */
function isWebp() {
	// Проверка поддержки webp
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	// Добавление класса _webp или _no-webp для HTML
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});
}
isWebp()

/* ====================================
Проверка мобильного браузера
==================================== */
let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
/* Добавление класса touch для HTML если браузер мобильный */
function addTouchClass() {
	// Добавление класса _touch для HTML если браузер мобильный
	if (isMobile.any()) document.documentElement.classList.add('touch');
}
addTouchClass()

/* ====================================
Добавление loaded для HTML после полной загрузки страницы
==================================== */
function addLoadedClass() {
	window.addEventListener("load", function () {
		setTimeout(function () {
			document.documentElement.classList.add('loaded');
		}, 0);
	});
}
addLoadedClass()

/* ====================================
Fancybox
==================================== */
Fancybox.bind("[data-fancybox]", {
	Thumbs: {
		type: 'classic',
	},
	Toolbar: {
		display: {
			left: ['prev'], // Левая кнопка
			middle: ['infobar'], // Информация по центру
			right: ['next'], // Правая кнопка и кнопка закрытия
		},
	},
	Carousel: {
		Navigation: {
			arrows: false, // Включаем стрелки навигации
		},
	},
	compact: false,
	idle: false,
	dragToClose: false,
});

/* ====================================
Бегущая строка
==================================== */
function marquee() {
	const marquees = document.querySelectorAll('.marquee');

	if (marquees.length > 0) {
		marquees.forEach(marquee => {
			const list = marquee.querySelector('ul');
			const items = list.querySelectorAll('ul li');

			let scrollAmount = 0; // Переменная для отслеживания текущего смещения
			const speed = 1; // Скорость прокрутки бегущей строки

			// Клонируем элементы для создания бесшовного эффекта
			for (let i = 0; i < 5; i++) {
				items.forEach(item => {
					const clone = item.cloneNode(true);
					list.appendChild(clone);
				});
			}

			function scrollMarquee() {
				switch (true) {
					case marquee.dataset.direction === "left":
						scrollAmount -= speed;

						const firstItem = list.firstElementChild;
						const firstItemWidth = firstItem.getBoundingClientRect().width;

						list.style.transform = `translateX(${scrollAmount}px)`;

						if (firstItem.getBoundingClientRect().right <= 0) {
							list.append(firstItem); // Перемещаем первый элемент в конец списка

							// Пересчитываем смещение, чтобы сделать переход плавным
							scrollAmount += firstItemWidth + parseFloat(getComputedStyle(firstItem).marginLeft);
							list.style.transform = `translateX(${scrollAmount}px)`;
						}
						break;

					case marquee.dataset.direction === "right":
						scrollAmount += speed;

						const lastItem = list.lastElementChild;
						const lastItemWidth = lastItem.getBoundingClientRect().width;

						list.style.transform = `translateX(${scrollAmount}px)`;

						if (lastItem.getBoundingClientRect().left >= window.innerWidth) {
							list.prepend(lastItem); // Перемещаем последний элемент в начало списка

							// Пересчитываем смещение, чтобы сделать переход плавным
							scrollAmount -= lastItemWidth + parseFloat(getComputedStyle(lastItem).marginRight);
							list.style.transform = `translateX(${scrollAmount}px)`;
						}
						break;

					default:
				}

				requestAnimationFrame(scrollMarquee); // Рекурсивно вызываем функцию для плавной анимации
			}

			scrollMarquee();
		});
	}
}
marquee()

/* ====================================
Табы
==================================== */
/*
Для родителя табов пишем атрибут data-tabs
Для родителя заголовков табов пишем атрибут data-tabs-titles
Для родителя блоков табов пишем атрибут data-tabs-content
Для родителя блоков табов можно указать data-tabs-hash, это втключит добавление хеша

Если нужно чтобы табы открывались с анимацией 
добавляем к data-tabs data-tabs-animate
По умолчанию, скорость анимации 500ms, 
указать свою скорость можно так: data-tabs-animate="1000"

Если нужно чтобы табы превращались в "спойлеры", на неком размере экранов, пишем параметры ширины.
Например: data-tabs="992" - табы будут превращаться в спойлеры на экранах меньше или равно 992px
*/
function tabs() {
	const tabs = document.querySelectorAll('[data-tabs]');
	let tabsActiveHash = [];

	if (tabs.length > 0) {
		// const hash = getHash();
		// if (hash && hash.startsWith('tab-')) {
		// 	tabsActiveHash = hash.replace('tab-', '').split('-');
		// }
		tabs.forEach((tabsBlock, index) => {
			tabsBlock.classList.add('_tab-init');
			tabsBlock.setAttribute('data-tabs-index', index);
			tabsBlock.addEventListener("click", setTabsAction);
			initTabs(tabsBlock);
		});

		// Получение слойлеров с медиа запросами
		let mdQueriesArray = dataMediaQueries(tabs, "tabs");
		if (mdQueriesArray && mdQueriesArray.length) {
			mdQueriesArray.forEach(mdQueriesItem => {
				// Событие
				mdQueriesItem.matchMedia.addEventListener("change", function () {
					setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
				});
				setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
			});
		}
	}
	// Установка позиций заголовков
	function setTitlePosition(tabsMediaArray, matchMedia) {
		tabsMediaArray.forEach(tabsMediaItem => {
			tabsMediaItem = tabsMediaItem.item;
			let tabsTitles = tabsMediaItem.querySelector('[data-tabs-titles]');
			let tabsTitleItems = tabsMediaItem.querySelectorAll('[data-tabs-title]');
			let tabsContent = tabsMediaItem.querySelector('[data-tabs-content]');
			let tabsContentItems = tabsMediaItem.querySelectorAll('[data-tabs-item]');
			tabsTitleItems = Array.from(tabsTitleItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);
			tabsContentItems = Array.from(tabsContentItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);
			tabsContentItems.forEach((tabsContentItem, index) => {
				if (matchMedia.matches) {
					tabsContent.append(tabsTitleItems[index]);
					tabsContent.append(tabsContentItem);
					tabsMediaItem.classList.add('_tab-spoller');
				} else {
					tabsTitles.append(tabsTitleItems[index]);
					tabsMediaItem.classList.remove('_tab-spoller');
				}
			});
		});
	}
	// Работа с контентом
	function initTabs(tabsBlock) {
		let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles] [data-tabs-title]');
		let tabsContent = tabsBlock.querySelectorAll('[data-tabs-content] [data-tabs-body]');
		const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
		const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

		if (tabsActiveHashBlock) {
			const tabsActiveTitle = tabsBlock.querySelector('[data-tabs-titles]>._tab-active');
			tabsActiveTitle ? tabsActiveTitle.classList.remove('_tab-active') : null;
		}
		if (tabsContent.length) {
			tabsContent = Array.from(tabsContent).filter(item => item.closest('[data-tabs]') === tabsBlock);
			tabsTitles = Array.from(tabsTitles).filter(item => item.closest('[data-tabs]') === tabsBlock);
			tabsContent.forEach((tabsContentItem, index) => {
				tabsTitles[index].setAttribute('data-tabs-title', '');
				tabsContentItem.setAttribute('data-tabs-item', '');

				if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
					tabsTitles[index].classList.toggle('_tab-active');
				}
				// tabsContentItem.hidden = !tabsTitles[index].classList.contains('_tab-active');
			});
		}
	}
	function setTabsStatus(tabsBlock) {
		let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]');
		let tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]');
		const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
		function isTabsAnamate(tabsBlock) {
			if (tabsBlock.hasAttribute('data-tabs-animate')) {
				return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
			}
		}
		const tabsBlockAnimate = isTabsAnamate(tabsBlock);
		if (tabsContent.length > 0) {
			const isHash = tabsBlock.hasAttribute('data-tabs-hash');
			tabsContent = Array.from(tabsContent).filter(item => item.closest('[data-tabs]') === tabsBlock);
			tabsTitles = Array.from(tabsTitles).filter(item => item.closest('[data-tabs]') === tabsBlock);
			tabsContent.forEach((tabsContentItem, index) => {
				if (tabsTitles[index].classList.contains('_tab-active')) {
					if (tabsBlockAnimate) {
						// _slideDown(tabsContentItem, tabsBlockAnimate);
						tabsContentItem.classList.add('_tab-active');
					} else {
						// tabsContentItem.hidden = false;
					}
					// if (isHash && !tabsContentItem.closest('.popup')) {
					// 	setHash(`tab-${tabsBlockIndex}-${index}`);
					// }
				} else {
					if (tabsBlockAnimate) {
						// _slideUp(tabsContentItem, tabsBlockAnimate);
						tabsContentItem.classList.remove('_tab-active');
					} else {
						// tabsContentItem.hidden = true;
					}
				}
			});
		}

		ScrollTrigger.refresh();
	}
	function setTabsAction(e) {
		const el = e.target;
		if (el.closest('[data-tabs-title]')) {
			const tabTitle = el.closest('[data-tabs-title]');
			const tabsBlock = tabTitle.closest('[data-tabs]');
			if (!tabTitle.classList.contains('_tab-active') && !tabsBlock.querySelector('._slide')) {
				let tabActiveTitle = tabsBlock.querySelectorAll('[data-tabs-title]._tab-active');
				tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter(item => item.closest('[data-tabs]') === tabsBlock) : null;
				tabActiveTitle.length ? tabActiveTitle[0].classList.remove('_tab-active') : null;
				tabTitle.classList.toggle('_tab-active');
				setTabsStatus(tabsBlock);
			}
			e.preventDefault();
		}

		ScrollTrigger.refresh();
	}
}
if (document.querySelector('[data-tabs]')) {
	tabs()
}

//========================================================================================================================================================
gsap.registerPlugin(ScrollTrigger);

// Обработка изменений на странице динамически
const handleResize = () => {
	requestAnimationFrame(() => {
		ScrollTrigger.refresh();
	});
};

const handleReveal = () => {
	initAnimationsBasedOnWidth();
	if (typeof refreshScrollTrigger === 'function') {
		refreshScrollTrigger();
	}
};

let currentWidthAnimation = null;
const stagger = 0.5;

//========================================================================================================================================================

// Функция анимации для указанного блока
function animateBlockFromRightToLeft(targetBlock) {
	console.log('Инициализация анимации перемещения элемента при скролле');
	const blocks = document.querySelectorAll(targetBlock);
	blocks.forEach(block => {
		// Настраиваем анимацию с GSAP и ScrollTrigger
		gsap.fromTo(block,
			{ x: '100%' },  // Начальное положение: за пределами справа
			{
				x: '-100%',                 // Конечное положение: в исходном месте
				duration: 1,             // Длительность анимации
				ease: 'none',            // Убираем замедление для равномерного движения
				scrollTrigger: {
					trigger: block,       // Блок, который анимируем
					start: 'top bottom',  // Анимация начинается, когда верх блока достигает низа экрана
					end: 'bottom top',    // Анимация заканчивается, когда низ блока достигает верха экрана
					scrub: 1.5,           // Привязываем анимацию к скроллу, плавный эффект
					// markers: true,     // Если нужно посмотреть маркеры
				}
			}
		);
	});
}

// Функция для анимации параллакса изображения
function parallaxImage(imageSelector) {
	console.log('Инициализация анимации параллакса изображения');
	gsap.utils.toArray(imageSelector).forEach(image => {
		// Настраиваем анимацию с GSAP и ScrollTrigger
		gsap.fromTo(image,
			{ y: '20%' },  // Начальное смещение вниз
			{
				y: '-50%',          // Конечное смещение вверх
				ease: 'none',       // Убираем ускорение/замедление для равномерного движения
				scrollTrigger: {
					trigger: image,  // Триггер для анимации — сам элемент
					start: 'top bottom',  // Начинаем, когда верх изображения появляется снизу экрана
					end: 'bottom top',    // Заканчиваем, когда низ изображения достигает верха экрана
					scrub: 1.5,          // Привязываем анимацию к скроллу
					// markers: true,     // Включите маркеры для отладки
				}
			}
		);
	});
}

//========================================================================================================================================================

// Дебаунсинг функции
function debounce(func, wait) {
	let timeout;
	return function () {
		const context = this, args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(context, args), wait);
	};
}
// Дебаунсинг события ресайза
const debouncedInitAnimations = debounce(initAnimationsBasedOnWidth, 100);

// Функция для удаления анимаций
function clearAnimations() {
	// Удаление всех активных ScrollTrigger
	ScrollTrigger.getAll().forEach(trigger => {
		trigger.kill();
	});

	// Удаление всех pin-spacer, созданных ScrollTrigger
	document.querySelectorAll('.pin-spacer, .gsap-pin-spacer').forEach(spacer => {
		spacer.replaceWith(...spacer.childNodes);

	});

	console.log("Все анимации и pin-spacer удалены");
}

// Инициализация анимаций для разных разрешений
function initAnimationsBasedOnWidth() {
	const width = window.innerWidth;
	// Сохраняем текущую позицию скролла
	const scrollPos = window.scrollY || window.pageYOffse;

	clearAnimations();

	// Восстанавливаем позицию скролла после обновления
	window.scrollTo(0, scrollPos);

	if (width >= 991.98) {
		// Если переключаемся с мобильной версии, очищаем мобильные анимации
		if (currentWidthAnimation === 'mobile') {
			clearAnimations();
		}
		initializeDesktopAnimations();
		currentWidthAnimation = 'desktop';
	} else {
		// Если переключаемся с десктопной версии, очищаем десктопные анимации
		if (currentWidthAnimation === 'desktop') {
			clearAnimations();
		}
		initializeMobileAnimations();
		currentWidthAnimation = 'mobile';
	}

	// Инициализация общих анимаций
	initializeCommonAnimations();

	// Обновляем точки старта/окончания для всех ScrollTrigger
	ScrollTrigger.refresh();
}

//========================================================================================================================================================
// Обработка изменения размера окна с дебаунсом
window.addEventListener('resize', debouncedInitAnimations);

// Обработка смены ориентации экрана
window.addEventListener('orientationchange', () => {
	initAnimationsBasedOnWidth();
});

// Обработка при загрузке страницы
window.addEventListener('load', () => {
	initAnimationsBasedOnWidth();
	handleResize();
});

//========================================================================================================================================================
// Общие анимации
function initializeCommonAnimations() {
	console.log("Инициализация общих анимаций");

	// Применяем анимацию к указанным элементам
	animateBlockFromRightToLeft('.rs-about .rs-about__logo_title');
	animateBlockFromRightToLeft('.rs-parallax .rs-parallax__logo');

	// Применяем анимацию к изображениям с параллаксом
	parallaxImage('.rs-parallax .rs-parallax__img img');
}

// Десктопные анимаций
function initializeDesktopAnimations() {
	console.log("Инициализация десктопных анимаций");

	if (document.querySelector('.rs-project')) {
		const stackBlocks = document.querySelectorAll('.rs-project')
		stackBlocks.forEach(stackBlock => {
			const stackBodys = stackBlock.querySelectorAll('.rs-project__body')

			stackBodys.forEach(stackBody => {
				const stackItems = stackBody.querySelectorAll('.rs-project__item');
				const stackList = stackBody.querySelector('.rs-project__list');

				const stackTimeline = gsap.timeline({
					scrollTrigger: {
						trigger: stackList,
						start: 'top top',
						end: "bottom+=50% top",
						pin: true,
						pinSpacing: true,
						scrub: true,
						invalidateOnRefresh: true,
						// markers: true,
					}
				});

				stackTimeline
					.to(stackItems, {
						yPercent: (index) => -100 * index,
						duration: 1,
						ease: "power2.inOut",
						stagger: stagger,
					})
					.to(stackItems, {
						duration: 1,
						ease: "power2.inOut",
						stagger: stagger,
					}, stagger);
			});
		});
	}

	if (document.querySelector('.rs-services')) {
		const servicesBlock = document.querySelectorAll('.rs-services');

		servicesBlock.forEach(service => {
			const serviceImages = service.querySelectorAll('.rs-services__img');
			const serviceWrapper = service.querySelector('.rs-services__blocks');

			// Получаем высоту блока, чтобы отталкиваться от неё
			const blocksHeight = serviceWrapper.offsetHeight;

			// Устанавливаем первый блок как активный при загрузке
			serviceImages[0].classList.add('active');

			// Фиксируем блок с изображениями при скролле, но снимаем фиксирование ближе к концу
			ScrollTrigger.create({
				trigger: serviceWrapper,
				start: 'top 25%',  // Начало фиксирования
				end: `bottom 65%`,  // Останавливаем фиксирование за 25% до конца блока
				pin: service.querySelector('.rs-services__imgs_list'),  // Фиксируем контейнер с картинками
			});

			serviceImages.forEach((img, index) => {
				// Определяем, сколько высоты от блока займёт каждый шаг анимации
				const imageStart = (index / serviceImages.length) * blocksHeight;
				const imageEnd = ((index + 1) / serviceImages.length) * blocksHeight;

				// Добавляем ScrollTrigger для каждой картинки
				ScrollTrigger.create({
					trigger: serviceWrapper,
					start: `${imageStart}px 50%`,  // Начало анимации, когда картинка немного в зоне видимости
					end: `${imageEnd}px 50%`,  // Завершение анимации
					toggleActions: 'play none none reverse',  // Воспроизведение анимации
					onEnter: () => {
						// Убираем активный класс у всех изображений
						serviceImages.forEach(image => image.classList.remove('active'));
						// Добавляем активный класс только текущему изображению
						img.classList.add('active');
					},
					onLeaveBack: () => {
						// Убираем активный класс у всех изображений
						serviceImages.forEach(image => image.classList.remove('active'));
						// Если возвращаемся назад, активируем предыдущее изображение
						if (index > 0) {
							serviceImages[index - 1].classList.add('active');
						}
						// Устанавливаем активным первый блок, если возвращаемся в начало
						if (index === 0) {
							serviceImages[0].classList.add('active');
						}
					}
				});
			});

			// Добавляем активный класс последнему изображению в конце блока
			ScrollTrigger.create({
				trigger: serviceWrapper,
				start: 'bottom-=25% 50%',  // Когда находимся у нижней границы
				end: 'bottom bottom',  // Конец блока
				onEnter: () => {
					// Убираем активные классы со всех изображений
					serviceImages.forEach(image => image.classList.remove('active'));
					// Добавляем активный класс последнему изображению
					serviceImages[serviceImages.length - 1].classList.add('active');
				},
				onLeaveBack: () => {
					// Убираем активный класс последнего изображения при обратном скролле
					serviceImages[serviceImages.length - 1].classList.remove('active');
					// Если возвращаемся вверх, активируем первый блок
					serviceImages[0].classList.add('active');
				}
			});
		});
	}
}

// Мобильные анимаций
function initializeMobileAnimations() {
	console.log("Инициализация мобильных анимаций");
}

//========================================================================================================================================================

// Обработа медиа запросов из атрибутов 
function dataMediaQueries(array, dataSetValue) {
	// Получение объектов с медиа запросами
	const media = Array.from(array).filter(function (item, index, self) {
		if (item.dataset[dataSetValue]) {
			return item.dataset[dataSetValue].split(",")[0];
		}
	});
	// Инициализация объектов с медиа запросами
	if (media.length) {
		const breakpointsArray = [];
		media.forEach(item => {
			const params = item.dataset[dataSetValue];
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});
		// Получаем уникальные брейкпоинты
		let mdQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
		});
		mdQueries = uniqArray(mdQueries);
		const mdQueriesArray = [];

		if (mdQueries.length) {
			// Работаем с каждым брейкпоинтом
			mdQueries.forEach(breakpoint => {
				const paramsArray = breakpoint.split(",");
				const mediaBreakpoint = paramsArray[1];
				const mediaType = paramsArray[2];
				const matchMedia = window.matchMedia(paramsArray[0]);
				// Объекты с нужными условиями
				const itemsArray = breakpointsArray.filter(function (item) {
					if (item.value === mediaBreakpoint && item.type === mediaType) {
						return true;
					}
				});
				mdQueriesArray.push({
					itemsArray,
					matchMedia
				})
			});
			return mdQueriesArray;
		}
	}
}

// Уникализация массива
function uniqArray(array) {
	return array.filter(function (item, index, self) {
		return self.indexOf(item) === index;
	});
}

//========================================================================================================================================================
// Вспомогательные модули блокировки прокрутки
let bodyLockStatus = true;
let bodyLockToggle = (delay = 300) => {
	if (document.documentElement.classList.contains('lock')) {
		bodyUnlock(delay);
	} else {
		bodyLock(delay);
	}
}
let bodyUnlock = (delay = 300) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			document.documentElement.classList.remove("lock");
		}, delay);
		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}
let bodyLock = (delay = 300) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			// el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		document.documentElement.classList.add("lock");

		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}

//========================================================================================================================================================
// Вспомогательные модули плавного раскрытия и закрытия объекта
let _slideUp = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = `${target.offsetHeight}px`;
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = showmore ? `${showmore}px` : `0px`;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = !showmore ? true : false;
			!showmore ? target.style.removeProperty('height') : null;
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			!showmore ? target.style.removeProperty('overflow') : null;
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideDown = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.hidden = target.hidden ? false : null;
		showmore ? target.style.removeProperty('height') : null;
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = showmore ? `${showmore}px` : `0px`;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}
