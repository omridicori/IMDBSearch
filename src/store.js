import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        listOfMovies: [],
        currentPage: 1,
        searchTitle: '',
        totalResults: '',
        noMoviesFound: '',
        loaderStatus: false
    },
    mutations: {
        CREATE_NEW_LIST: (state, movies) => {
            state.currentPage = 1;
            state.noMoviesFound = '';
            state.totalResults = movies.totalResults;
            Vue.set(state, 'listOfMovies', [])
            if(movies.Response == "True") {
                setTimeout(function(){
                    for(var i = 0; i < movies.Search.length; i++){
                        state.listOfMovies.push(movies.Search[i])
                    }
                },100)
            } else {
                state.noMoviesFound = "No Movies Found";
            }
            state.currentPage++


        },
        ADD_TO_LIST: (state, movies) => {
            for(var i = 0; i < movies.Search.length; i++){
                state.listOfMovies.push(movies.Search[i])
            }
            state.currentPage++

        },
        CHANGE_SEARCH_TITLE: (state, title) => {
            state.searchTitle = title;

        },
        HIDE_LOADER: (state) => {
           state.loaderStatus = false;
        },
        SHOW_LOADER: (state) => {
            state.loaderStatus = true;
        }
    },
    actions: {

    }
})
