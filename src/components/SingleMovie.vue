<template>
    <div class="movieRow">
        <div class="posterSection"><img v-if="posterData != 'N/A'" :src="posterData" :alt="titleData + ' Poster'" :title="titleData + ' Poster'">
            <div class="placeholder" v-if="posterData == 'N/A'">No Poster Image</div>
        </div>
        <div class="dataSection">
            <h2 class="movieTitle">
                {{titleData}} ({{yearData}})
            </h2>
            <div class="moreData" :class="{'shown': showMore}" v-if="moreData.Response == 'True'">
                <div class="movieDataSquare" v-if="moreData.Rated != 'N/A'">
                    <p class="question">Rated:</p>
                    <p class="answer">{{moreData.Rated}}</p>
                </div>
                <div class="movieDataSquare" v-if="moreData.Runtime != 'N/A'">
                    <p class="question">Runtime:</p>
                    <p class="answer">{{moreData.Runtime}}</p>
                </div>
                <div class="movieDataSquare" v-if="moreData.Genre != 'N/A'">
                    <p class="question">Genre:</p>
                    <p class="answer">{{moreData.Genre}}</p>
                </div>
                <div class="movieDataSquare" v-if="moreData.Director != 'N/A'">
                    <p class="question">Director:</p>
                    <p class="answer">{{moreData.Director}}</p>
                </div>
                <div class="movieDataSquare" v-if="moreData.Actors != 'N/A'">
                    <p class="question">Actors:</p>
                    <p class="answer">{{moreData.Actors}}</p>
                </div>
                <div class="movieDataSquare" v-if="moreData.Plot != 'N/A'">
                    <p class="question">Plot:</p>
                    <p class="answer">{{moreData.Plot}}</p>
                </div>
                <div class="movieDataSquare" v-if="moreData.Awards != 'N/A'">
                    <p class="question">Awards:</p>
                    <p class="answer">{{moreData.Awards}}</p>
                </div>
            </div>
            <div class="buttonsSection">
                <a class="movieButton goToIMDB" :href="'https://www.imdb.com/title/' + idData" target="_blank">To
                    IMDB</a>
                <a class="movieButton toggleButton" href="#" @click.prevent="getMoreData()">Show <span
                        v-if="showMore">Less</span><span v-if="!showMore">More</span></a>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {mapState, mapMutations} from 'vuex'


    export default {
        name: "SingleMovie",
        props: ['poster', 'title', 'year', 'link', 'id'],
        data: function () {
            return {
                showMore: false,
                posterData: this.poster,
                titleData: this.title,
                yearData: this.year,
                linkData: this.link,
                idData: this.id,
                moreData: ''
            }
        }, methods: {
            getMoreData: function getMoreData() {
                if (this.moreData == '') {
                    this.showLoader()
                    axios.get('http://www.omdbapi.com/?apikey=d777cf78&i=' + this.idData).then(response => (this.moreData = response.data, this.hideLoader()))
                }
                if (this.showMore) {
                    this.showMore = false;
                } else {
                    this.showMore = true;
                }


            },
            ...mapMutations(['HIDE_LOADER','SHOW_LOADER']),
            hideLoader: function(){
                this.HIDE_LOADER()
            },
            showLoader: function(){
                this.SHOW_LOADER()
            }
        }
    }
</script>

<style scoped lang="scss">
    .movieRow {
        background: #e4e4e4;
        padding: 15px;
        margin-bottom: 15px;
        display: flex;
    }

    .posterSection {
        min-width: 120px;
        max-width: 120px;
        height: 180px;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: nowrap;

        & img {
            width: 100%;
        }
    }

    .dataSection {
        margin-left: 15px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        & h2 {
            font-size: 18px;
            margin-bottom: 0;
        }
    }

    .buttonsSection {
        display: flex;
        justify-content: space-between;

        & a.movieButton {
            display: inline-block;
            text-decoration: none;
            width: 110px;
            text-align: center;
            height: 35px;
            line-height: 35px;
            font-weight: 500;
            transition: 0.5s all;
            opacity: 1;
            cursor: pointer;

            &.goToIMDB {
                background: #f5c518;
                color: #424242;

                &:hover {
                    opacity: 0.7;
                }
            }

            &.toggleButton {
                background: #424242;
                color: white;

                &:hover {
                    opacity: 0.7;
                }
            }
        }
    }

    .moreData {
        overflow: hidden;
        height: auto;
        transition: 0.5s all;
        max-height: 0;
        opacity: 0;

        &.shown{
            max-height: 1000px;
            opacity: 1;
        }

        p.question {
            margin-bottom: 0;
            font-weight: bold;
            font-size: 16px;
        }

        p.answer {
            margin-bottom: 0;
            font-size: 15px;
            line-height: 15px;
        }

        .movieDataSquare {
            padding-bottom: 3px;
            margin-bottom: 3px;
            border-bottom: 1px solid #cacaca;

            &:last-child {
                border-bottom: 0px solid transparent;
                margin-bottom: 10px;
            }
        }


    }

    .placeholder {
        background: #bbbbbb;
        display: inline-flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        padding: 26px;
        text-align: center;
        font-weight: bold;
        color: #888;
    }

    @media screen and (max-width: 768px) {
        .movieRow {
            flex-direction: column;
        }

        .posterSection {
            min-width: 0;
            max-width: 100%;
            height: auto;
            width: auto;
            display: flex;
            margin-bottom: 10px;

            img {
                width: 100%;
                height: auto;
            }
        }

        .dataSection {
            margin-left: 0;
        }

        h2.movieTitle {
            margin-bottom: 10px;
        }
    }

</style>