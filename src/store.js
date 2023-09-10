import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        userData: {
            uid: "",
            name: "",
            email: "",
            favourites: [],
            subscriptions: [],
            level: 0,
            image: "",
            my_models: [],
        },
        models: [],
        searchQuery: "",
    },
    mutations: {
        setUserData(state, payload) {
            state.userData = payload;
        },
        setModels(state, models) {
            state.models = models;
        },
        setSearchQuery(state, query) {
            state.searchQuery = query;
        },
    },
});