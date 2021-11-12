<template>
    <div v-if=fetching>
        <p>{{this.sentence}}</p>
    </div>
</template>
<script>
    export default {
        props: {
            hits:{
                type: Number
            },
            total:{
                type: Number
            },
            term:{
                type: String
            }


        },
        data() {
            return {
                sentence : '',
                fetching : false,
            }
        },
        beforeMount() {
           this.sentence = `Showing ${this.hits} of ${this.total} results for ${this.term}`;
           this.fetching = true;
        }
    }
</script>