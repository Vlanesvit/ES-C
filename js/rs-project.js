
function stackItemsOnScroll() {
	const stackBlocks = document.querySelectorAll('.rs-project')
	const stagger = 0.5;

	stackBlocks.forEach(stackBlock => {
		const stackBodys = stackBlock.querySelectorAll('.rs-project__body')

		stackBodys.forEach(stackBody => {
			// const stackItems = stackBody.querySelectorAll('.rs-project__item')
			const stackItems = stackBody.querySelectorAll('.rs-project__item');
			const stackList = stackBody.querySelector('.rs-project__list');

			const stackTimeline = gsap.timeline({
				scrollTrigger: {
					trigger: stackList,
					start: 'top top',
					// end: () => `+=${(stackItems.length - 1) * 100}vh`,
					end: "bottom+=50% top",
					// endTrigger: '.rs-features',
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
if (window.innerWidth >= 991.98) {
	stackItemsOnScroll();
	console.log('1')
}