<template>
  <div id="app">
    <loader v-if="loaderStatus"></loader>
    <SearchForm></SearchForm>
    <div class="moviesList">
      <h3 v-if="noMoviesFound != '' && searchTitle != ''">{{noMoviesFound}}</h3>
      <single-movie v-for="(movie, index) in listOfMovies" v-bind:key="movie.idData" :id="movie.imdbID" :year="movie.Year" :title="movie.Title" :poster="movie.Poster"></single-movie>
    </div>
    <b-btn class="loadMore" :disabled="((currentPage - 1) * 10) > parseInt(totalResults)" v-if="parseInt(totalResults) > 0" @click.prevent="loadMoreMovies()">Load More</b-btn>
  </div>
</template>

<script>
import SearchForm from './components/SearchForm.vue'
import SingleMovie from './components/SingleMovie.vue'
import {mapState, mapMutations } from 'vuex'
import axios from 'axios';
import Loader from "./components/Loader";


export default {
  name: 'app',
  components: {
      Loader,
      SearchForm,
      SingleMovie
  },
    methods:{
        loadMoreMovies: function loadMoreMovies(){
            this.showLoader()
            axios.get('http://www.omdbapi.com/?apikey=d777cf78&s=' + this.searchTitle + '&type=movie&page=' + this.currentPage).then(response => (this.addToList(response.data, this.currentPage),this.hideLoader()))
        },
        ...mapMutations(['ADD_TO_LIST','HIDE_LOADER','SHOW_LOADER']),
        addToList: function(movies, page){
            this.ADD_TO_LIST(movies, page)
        },
        hideLoader: function(){
            this.HIDE_LOADER()
        },
        showLoader: function(){
            this.SHOW_LOADER()
        }
    },
    computed: mapState(['listOfMovies','currentPage','totalResults','searchTitle','noMoviesFound','loaderStatus']),

}
</script>

<style lang="scss">
  .moviesList {
    margin-top: 110px;
  }

  button.btn.loadMore {
    width: 100%;
    border-radius: 0;
    margin-bottom: 30px;
  }

  .moviesList h3 {
    text-align: center;
  }

  @media screen and (min-width: 769px) {
    .moviesList {
      padding: 0 25%;
    }

    button.btn.loadMore {
      width: 50%;
      margin: 0 25% 30px;
    }
  }
</style>
