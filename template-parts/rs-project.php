<?php $projects = get_field('projects', 'option');?>
<link rel="stylesheet" href="<?php echo esc_url(get_template_directory_uri()); ?>/css/rs-project.css">
<section class="rs-project">
	<div class="section__container">
		<div class="rs-project__block" data-tabs data-tabs-animate="500">
			<div class="section__wrapper">
				<div class="section__header">
					<?if (get_field('projects_title', 'options')){?>
					<div class="section__header_title" data-aos="fade-up" data-aos-delay="100">
						<h2><?php echo get_field('projects_title', 'options') ?></h2>
					</div>
					<?}?>
					<div class="section__header_action" data-aos="fade-up" data-aos-delay="200">
						<nav data-tabs-titles class="rs-project__navigation">
							<?php if ( is_array($projects) ) { ?>
							<?php foreach ( $projects as $key => $item ) { ?>
							<?php if($item[ 'direction' ]){?>
							<button type="button" data-tabs-title
								class="rs-project__navigation_title <?if($key == 0) echo '_tab-active'?>"><?= $item[ 'direction' ] ?></button>
							<?}?>
							<?php } ?>
							<?php } ?>
						</nav>
					</div>
				</div>
			</div>

			<div data-tabs-content class="rs-project__wrapper">
				<?php if ( is_array($projects) ) { ?>
				<?php foreach ( $projects as $key => $item ) { ?>
				<?php $project = $item[ 'project' ];?>
				<div data-tabs-body class="rs-project__body <?if($key == 0) echo '_tab-active'?>">
					<div class="rs-project__list">
						<?php if ( is_array($project) ) { ?>
						<?php foreach ( $project as $item2 ) { ?>
						<div class="rs-project__item">
							<div class="rs-project__item_body">
								<div class="rs-project__content">
									<div class="rs-project__head">
										<div class="rs-project__desc">
											<?php if($item2[ 'name' ]){?><h4><?= $item2[ 'name' ] ?></h4>
											<?}?>
											<?php if($item2[ 'text' ]){?><p><?= $item2[ 'text' ] ?></p>
											<?}?>
											<ul>
												<?php if($item2[ 'adress' ]){?>
												<li>
													<img src="<?php echo esc_url(get_template_directory_uri()); ?>/img/icons/location.svg"
														alt="">
													<?= $item2[ 'adress' ] ?>
												</li>
												<?}?>
												<?php if($item2[ 'year' ]){?>
												<li>
													<img src="<?php echo esc_url(get_template_directory_uri()); ?>/img/icons/calendar.svg"
														alt="">
													<?= $item2[ 'year' ] ?>
												</li>
												<?}?>
											</ul>
										</div>

										<div class="rs-project__btn">
											<a href="<?= $item2[ 'link' ] ?>" class="rs-btn _btn-primary">Подробнее</a>
										</div>
									</div>
									<?php $images = $item2[ 'images' ];?>
									<div class="rs-project__imgs">
										<?php if ( is_array($images) ) { ?>
										<?php foreach ( $images as $item3 ) { ?>
										<?php if($item3[ 'foto_obekta' ]){?>
										<div class="rs-project__img">
											<img src="<?= $item3[ 'foto_obekta' ] ?>" alt="">
										</div>
										<?}?>
										<?php } ?>
										<?php } ?>
									</div>
								</div>
							</div>
						</div>

						<?php } ?>
						<?php } ?>
					</div>
				</div>
				<?php } ?>
				<?php } ?>
			</div>
		</div>
	</div>
</section>

<?php unset($projects); ?>