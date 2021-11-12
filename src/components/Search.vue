<template>
    <div class="container mx-auto flex flex-col justify-center" >

        <input-search/>

        <div v-if="fetching" class="flex justify-start my-4 ml-4" >
            <SearchDetails
                :hits="this.hits"
                :total="this.total"
                :term="this.searchTerm"
            />
        </div>

        <transition name="moveUp">
            <div>
                <div v-if="fetching" class="flex flex-wrap mx-auto">
                    <div v-for="image in results" :key="image.name">
                        <ImageCard :content="image"></ImageCard>
                    </div>
                </div>
                <div v-if="fetching">
                    <Pagination :pages="this.totalPages" :currentPage="page"/>
                </div>
            </div>
        </transition>

        <div v-if="loading" class="flex h-screen flex-wrap justify-center mx-auto">
            <loader/>
        </div>

    </div>
</template>
<script>
import SearchDetails from './SearchDetails.vue'
import ImageCard from './ImageCard.vue'
import Loader from './Loader.vue'
import Pagination from './Pagination.vue'
import constants from '../assets/constants'
import axios from 'axios'

export default {
    name: 'Search',
    components: {
        SearchDetails,
        ImageCard,
        Loader,
        Pagination
    },
    data() {
        return {
            totalPages  : 0,
            page        : 1,
            itemsPerPage: 8,

            results     : '',
            fetching    : false,
            loading     : false,
            searchTerm  : '',
            hits        : 0,
            total       : 0
        }
    },
    mounted() {
        this.$root.$on('onSearch', (event) => {
            this.searchTerm = event.searchTerm
            this.fetchPixaImages()
        })
        this.$root.$on('listNewPage', (event) => {
            // let page;
            // this.fetching = false

            if (event.newPage >= this.totalPages) {
                this.page = this.totalPages
            } else {
                console.log(event.newPage)
                this.page = event.newPage
            }

            this.fetchSinglePage()
        })
    },
    // computed: {
    //     pageResults() {
    //         return this.computedResults
    //     }
    // },
    methods: {
        fetchPixaImages() {
                this.loading    = true
                this.results    = ''
                this.fetching   = false
                let buildUrl    = this.buildPixaUrl()

                axios.request(buildUrl)
                    .then(response => {
                            this.results  = response.data.hits
                            this.total    = response.data.total
                            this.hits     = response.data.totalHits
                            this.totalPages = Math.ceil(response.data.totalHits / this.itemsPerPage)

                            this.loading  = false
                            this.fetching = true

                    }).catch((reason) => {
                        console.log('error', reason.response.data);
                    });
        },
        fetchSinglePage() {
                this.loading    = true
                this.results    = ''
                this.fetching   = false
                let buildUrl    = this.buildPixaUrl()

                axios.request(buildUrl)
                    .then(response => {
                            this.results  = response.data.hits
                            this.loading  = false
                            this.fetching = true
                    }).catch((reason) => {
                        console.log('error', reason.response.data);
                    });

        },
        buildPixaUrl() {
            return `${constants.PIXA_URL}?key=${constants.API_KEY}&q=${this.formatGivenCriteria(this.searchTerm)}&page=${this.page}&per_page=${this.itemsPerPage}&image_type=photo`;
        },
        formatGivenCriteria(searchTerm) {
            return searchTerm.trim().replace(" ", "+");
        },
        // getSinglePageResults(results, page) {
        //     let index = 0;
        //     if (page > 1) {
        //         index = (page-1) * this.itemsPerPage
        //     }

        //     let temp = results.slice(index, index + this.itemsPerPage)

        //     this.fetching = true

        //     return temp
        // }
    }
}
</script>
<style scoped>

.moveUp-enter-active {
     animation: moveIn 4s ease-in;
}

@keyframes moveUp {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(400px);
    }
}
</style>