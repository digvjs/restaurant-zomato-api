<template>
	<section>
		<div v-if="restaurantDetails" class="row">
			<div class="col-md-12">
				<h2>{{ restaurantDetails.name }}</h2>
				<p>{{ restaurantDetails.location.locality }} {{ restaurantDetails.location.city }}</p>
				<div class="overflow-hidden" style="height: 250px">
					<img v-bind:src="restaurantDetails.featured_image" width="100%">
				</div>
			</div>
		</div>
		<div class="row mt-3">
			<div class="col-md-12">
				<h3>Available dishes:</h3>
				<hr>
				<div v-if="menuError" class="alert alert-warning"><strong>Info!</strong> {{ menuError }}</div>
			</div>
		</div>
		<div v-if="menuDetails" class="row mt-3">
			<div v-for="item in menuDetails.dishes" class="col-md-3 mt-3">
                <div class="card p-2">
                    <a href="#" class="text-decoration-none text-dark">
                        <h5>{{ item.name }}</h5>
                        <p>Price: {{ item.price }}</p>
                        <button type="button" class="btn btn-danger" @click="addMenu(item.dish_id)">Add to cart</button>
                    </a>
                </div>
            </div>
		</div>
	</section>
</template>

<script>
	export default {
        
        mounted() {
            console.log('Restaurant Component mounted.')
        },

        data() {
            return {
            	restaurantDetails: null,
             	menuDetails: null,   
             	menuError: null,
            }
        },

        created() {
        	this.getRestaurantDetails();
        	this.getMenuDetails();
        },

        methods: {

        	getRestaurantDetails() {
        		let restaurantId = this.$route.params.id;
        		
	            axios.get( this.$store.state.api_url + '/restaurant', { 
	                params: { 'res_id': restaurantId }, 
	                headers: { 'user-key': this.$store.state.api_user_key } 
	            })
	            .then(response => {
	                if (response.data) {
	                    this.restaurantDetails = response.data;
	                }
	            })
	            .catch(err => {
	                console.log('error: ', err);
	                this.flashMessage.error({title: 'Error!', message: err.response.data.message});
	            })

        	},

        	getMenuDetails() {
        		let restaurantId = this.$route.params.id;
        		
        		axios.get( this.$store.state.api_url + '/dailymenu', { 
	                params: { 'res_id': restaurantId }, 
	                headers: { 'user-key': this.$store.state.api_user_key } 
	            })
	            .then(response => {
	                if (response.data) {
	                    this.menuDetails = response.data;
	                    this.menuError = null;
	                } 
	            })
	            .catch(err => {
	                console.log('error: ', err.response);
	                this.menuError = err.response.data.message;
	                this.flashMessage.error({title: 'Error!', message: err.response.data.message});
	            })

        	},

        	addMenu(itemId) {
        		// TODO
        	},

        }

    }
</script>