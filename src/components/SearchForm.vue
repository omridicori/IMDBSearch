<template>
    <div class="form">
        <b-form @submit.prevent="searchForMovies" class="searchForMovies">
            <b-form-group id="movieTitle">
                <b-form-input v-on:focus="movieTitleError = false" type="text" class="movieTitle" v-model="movieTitle"
                              placeholder="Movie Title"></b-form-input>
            </b-form-group>
            <b-btn type="text" variant="primary" class="formSubmit">Search</b-btn>
        </b-form>
        <p class="error" v-if="movieTitleError">Please type at least 3 letters</p>
    </div>
</template>

<script>
    import axios from 'axios';
    import {mapState, mapMutations} from 'vuex'

    export default {
        name: 'SearchForm',
        data: function () {
            return {
                movieTitle: '',
                movieTitleError: false,
                currentPage: 1
            }
        },
        methods: {
            searchForMovies: function searchForMovies() {
                if (this.movieTitle.length < 3) {
                    this.movieTitleError = true;
                } else {
                    this.movieTitleError = false;
                    this.showLoader();
                    this.changeSearchTitle(this.movieTitle);
                    axios.get('http://www.omdbapi.com/?apikey=d777cf78&s=' + this.movieTitle + '&type=movie&page=' + this.currentPage).then(response => (this.createNewList(response.data, this.currentPage, response.data.Response),this.hideLoader()))

                }
            },
            ...mapMutations(['CREATE_NEW_LIST', 'CHANGE_SEARCH_TITLE','HIDE_LOADER','SHOW_LOADER']),
            createNewList: function (movies, page, status) {
                this.CREATE_NEW_LIST(movies, page, status)
            },
            changeSearchTitle: function (movies, title) {
                this.CHANGE_SEARCH_TITLE(movies, title)
            },
            hideLoader: function () {
                this.HIDE_LOADER()
            },
            showLoader: function () {
                this.SHOW_LOADER()
            }
        }
    }
</script>

<style scoped lang="scss">
    form.searchForMovies {
        position: fixed;
        top: 0;
        background: #f5c518;
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }

    fieldset#movieTitle {
        width: 300px;
        margin-bottom: 0;
    }

    button.formSubmit {
        border-radius: 0;
        width: 100px;
        height: 50px;
        font-weight: bold;
        background: #424242;
        transition: 0.5s all;
        border: 1px solid #424242;

        &:hover {
            background: #6b6b6b;
            border: 1px solid #6b6b6b;

        }
    }

    input.movieTitle {
        border-radius: 0;
        height: 50px;

        &:focus {
            border: 1px solid #424242;
            box-shadow: none;
        }
    }

    p.error {
        position: fixed;
        top: 73px;
        z-index: 10000;
        width: 100%;
        text-align: center;
        color: red;
        font-weight: bold;
    }

    @media screen and (max-width: 768px) {
        form.searchForMovies {
            padding: 0 20px;
        }
    }

</style>
