// Функция для анимации изображений при скролле
function initServicesScrollAnimation() {
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

// Инициализируем анимацию при загрузке страницы
document.addEventListener('DOMContentLoaded', initServicesScrollAnimation);
