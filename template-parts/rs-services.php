<?php $services_1_img = get_field('services_1_img', 'option');?>
<?php $services_1 = get_field('services_1', 'option');?>
<link rel="stylesheet" href="<?php echo esc_url(get_template_directory_uri()); ?>/css/rs-services.css">
<section class="rs-services rs-services-1">
	<div class="section__container">
		<div class="section__wrapper">
			<div class="section__header">
				<?if (get_field('services_1_title', 'options')){?>
				<div class="section__header_title" data-aos="fade-up" data-aos-delay="100">
					<h2><?php echo get_field('services_1_title', 'options') ?></h2>
				</div>
				<?}?>
				<div class="section__header_action" data-aos="fade-up" data-aos-delay="200">
					<a href="/services/proektirovanie-obektov-kapitalnog/" class="rs-btn _btn-primary">Подробнее о
						нас</a>
				</div>
			</div>
		</div>

		<div class="rs-services__wrapper">
			<div class="rs-services__imgs">
				<div class="rs-services__imgs_list">
					<?php if ( is_array($services_1_img) ) { ?>
					<?php foreach ( $services_1_img as $key => $item ) { ?>
					<?php if($item[ 'img' ]){?>
					<div class="rs-services__img <?if($key == 0) echo 'active'?> ">
						<img src="<?= $item[ 'img' ] ?>" alt="">
					</div>
					<?}?>
					<?php } ?>
					<?php } ?>
				</div>
			</div>
			<div class="rs-services__blocks" data-aos="fade" data-aos-delay="100">
				<div class="rs-services__slider swiper">
					<div class="rs-services__swiper swiper-wrapper">
						<?php if ( is_array($services_1) ) { ?>
						<?php foreach ( $services_1 as $item ) { ?>
						<div class="rs-services__slide swiper-slide">
							<div class="rs-services__desc">
								<div class="rs-services__head">
									<?php if($item[ 'name' ]){?><h4><?= $item[ 'name' ] ?></h4>
									<?}?>
								</div>
								<div class="rs-services__foot">
									<?php if($item[ 'text' ]){?><p><?= $item[ 'text' ] ?></p>
									<?}?>
								</div>
							</div>
						</div>
						<?php } ?>
						<?php } ?>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<?php unset($services_1_img);
unset($services_1); ?>