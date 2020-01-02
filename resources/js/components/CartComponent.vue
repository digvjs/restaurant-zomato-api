<template>
	<section>
		<div class="row">
			<div class="col-md-12">
				<h3>Items in cart:</h3>
				<hr>
				<div v-if="this.$store.state.cart.length === 0" class="alert alert-warning"><strong>Info! </strong>Cart is empty.</div>
			</div>
		</div>
	</section>
</template>
