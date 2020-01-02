<template>
    <div class="row text-center">
        <div class="col-md-12">
            <div class="card p-4">
                <div>
                    <h2>Search Restaurants</h2>
                    <hr>
                    <div class="row">
                        <div class="col-md-8 offset-md-2">
                            <form action="#" class="text-justify" method="get">
                                <div class="form-group">
                                    <label for="keyword">Search keyword</label>
                                    <input type="text" class="form-control" name="keyword" placeholder="Enter restaurant name" v-model="keyword">
                                </div>
                                <div class="form-group">
                                    <label for="city">City</label>
                                    <input type="text" class="form-control" name="city" placeholder="Enter city" v-model="city.name" required @change="changeCity">
                                </div>
                                <div class="form-group">
                                    <label for="selected_cuisine">Cuisine</label>
                                    <select class="form-control" name="selected_cuisine[]" v-model="selected_cuisine" multiple>
                                        <option value="0" selected>All</option>
                                        <option v-for="cuisine in cuisines" v-bind:value="cuisine.cuisine.cuisine_id">{{ cuisine.cuisine.cuisine_name }}</option>
                                    </select>
                                </div>
                                <div class="form-group text-right">
                                    <button type="button" class="btn btn-primary" @click="search">Search</button>    
                                </div>
                            </form>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            city: {
                id: 0,
                name: ''
            },
            cuisines: [],
            selected_cuisine: [],
            keyword: null,
        }
    },

    methods: {

        /** search city from the given keyword **/
        changeCity() {
            axios.get( this.$store.state.api_url + '/cities', { 
                params: { 'q': this.city.name }, 
                headers: { 'user-key': this.$store.state.api_user_key } 
            })
            .then(response => {
                if (response.data && response.data.location_suggestions.length) {
                    let cities = response.data.location_suggestions;
                    this.city = {
                        id: cities[0].id,
                        name: cities[0].name + ', ' + cities[0].country_name
                    }

                    this.getCuisines();

                } else {
                    this.cuisines = [];
                    this.flashMessage.success({title: 'Success!', message: 'Invalid city!'});
                }
            })
            .catch(err => {
                console.log('error: ', err);
                this.cuisines = [];
                this.flashMessage.error({title: 'Error!', message: err.message});
            })
        },

        /** Get cuisines based on selected city **/
        getCuisines() {
            axios.get( this.$store.state.api_url + '/cuisines', { 
                params: { 'city_id': this.city.id }, 
                headers: { 'user-key': this.$store.state.api_user_key } 
            })
            .then(response => {
                if (response.data) {
                    this.cuisines = response.data.cuisines;
                } else {
                    this.cuisines = [];
                }
            })
            .catch(err => {
                console.log('error: ', err);
                this.cuisines = [];
                this.flashMessage.error({title: 'Error!', message: err.message});
            })
        },

        /** search restaurants based on city and cuisines **/
        search() {
            let cuisines = this.selected_cuisine.length ? this.selected_cuisine.join(',') : '';

            axios.get( this.$store.state.api_url + '/search', { 
                params: { 
                    'entity_type': 'city',
                    'entity_id': this.city.id,
                    'q': this.keyword,
                    'cuisines': (cuisines === '0') ? '' : cuisines,
                }, 
                headers: { 'user-key': this.$store.state.api_user_key } 
            })
            .then(response => {
                console.log('response: ', response);
                if (response.data) {
                    this.$store.state.restaurants = response.data;
                } else {
                    this.$store.state.restaurants = [];
                }
            })
            .catch(err => {
                console.log('error: ', err);
                this.$store.state.restaurants = [];
                this.flashMessage.error({title: 'Error!', message: err.message});
            })
        }

    },
}

</script>