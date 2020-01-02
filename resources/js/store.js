import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        api_url: process.env.MIX_API_URI || 'https://developers.zomato.com/api/v2.1',
        api_user_key: process.env.MIX_API_USER_KEY || '7cbe511b89f4953ed72d007237ea9e2f',
        cart: [],
        restaurants: []
    },

    getters: {

    },

    mutations: {
        
    },
})