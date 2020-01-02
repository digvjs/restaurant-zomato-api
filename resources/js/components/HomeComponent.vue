<template>
    <section>
        <SearchComponent></SearchComponent>

        <div class="row mt-4">
            <div class="col-md-12">
                <h2 v-if="this.$store.state.restaurants.results_found && this.$store.state.restaurants.results_found != 0">Search results: <small><small>(Found {{ this.$store.state.restaurants.results_found }} results, showing {{ this.$store.state.restaurants.results_shown }})</small></small></h2>
                <div v-else>
                    <h2>Search results: <small><small>(Found 0 results)</small></small></h2>
                    <div class="alert alert-info text-center">
                        No records found!
                    </div>
                </div>
                <hr>
            </div>
        </div>

        <div class="row mt-4">
            <div v-for="item in this.$store.state.restaurants.restaurants" class="col-md-3 mt-3">
                <div class="card p-2">
                    <a href="#" class="text-decoration-none text-dark">
                        <div class="mt-2 mb-2"><img height="200" width="100%" v-bind:src="item.restaurant.thumb"></div>
                        <h4>{{ item.restaurant.name }}</h4>
                        <p>
                            <small>
                            cuisines: <div v-for="cuisine in item.restaurant.cuisines.split(',')" class="badge badge-success ml-1">{{ cuisine }}</div><br>
                            Average Cost for 2: {{ item.restaurant.currency }} {{ item.restaurant.average_cost_for_two }}<br>
                            Rating: {{ item.restaurant.user_rating.aggregate_rating === 0 ? 'Not rated!' : item.restaurant.user_rating.aggregate_rating + '/5' }}<br>
                            </small>
                        </p>
                        <router-link :to="{ name: 'restaurant', params: { id: item.restaurant.id } }" class="btn btn-danger btn-block btn-sm">Search menu</router-link>
                    </a>
                </div>
            </div>
        </div>

    </section>
</template>

<script>
    import SearchComponent from './SearchComponent';

    export default {
        
        components: {
            SearchComponent
        },

        mounted() {
            console.log('Home Component mounted.')
        },

        data() {
            return {
                
            }
        },

    }
</script>