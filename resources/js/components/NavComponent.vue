<template>
	<nav class="navbar navbar-expand-sm navbar-dark bg-dark mb-3">
        <div class="container-fluid">
        	<div class="navbar-header">
		    	<router-link class="navbar-brand" :to="{ name: 'home' }">Restaurant</router-link>
		    </div>
		    <ul class="nav navbar-nav navbar-right">
		      	<li><router-link type="button" class="btn btn-success" :to="{ name: 'cart' }">Cart</router-link></li>
		    </ul>
        </div>
    </nav>
</template>

<script>
	export default {
        mounted() {
            console.log('Nav Component mounted.')
        }
    }
</script>