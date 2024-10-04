
function stackItemsOnScroll() {
	const stackItems = gsap.utils.toArray('.rs-project__item');
	const stagger = 0.5;

	const stackTimeline = gsap.timeline({
		scrollTrigger: {
			trigger: '.rs-project__list',
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
}
stackItemsOnScroll();