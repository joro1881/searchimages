<template>
    <div v-if="load" 
        class="flex w-64 h-80 justify-center mx-3 my-2 border border-2 border-black rounded tile entranceFromRight"
    >
        <div class="flex flex-col w-full mx-4 my-4">
            <img class="w-11/12 mx-auto h-56 mb-2"
                :src="this.image" 
            >
            <div class="flex flex-wrap justify-between w-11/12 mx-auto">
                <p class="inline truncate w-3/5"
                    :title="this.author"
                >By {{this.author}}</p>
                <img class="w-8 h-8 rounded-full inline ml-4 border border-black"
                    :src="this.avatar"
                >
            </div>
            <div>
                <p class="truncate w-11/12 mx-auto" 
                    :title="this.rawTags"
                >Tags: {{this.tags}}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'image-card',
    props: {
        content: {}
    },
    data() {
        return {
            image   : '',
            author  : '',
            avatar  : '',
            tags    : '',
            rawTags : '',
            load    : false,
        }
    },
    beforeMount() {
        this.image  = this.content.largeImageURL
        this.author = this.content.user
        this.avatar = this.content.userImageURL !== "" ? this.content.userImageURL : 'images/default_avatar.png'
        this.tags   = this.formatTags(this.content.tags)
        this.rawTags= this.content.tags

        this.load   = true;
    },
    methods: {
        formatTags(strTags) {
            let arr = strTags.split(", ")
            let cut = arr.splice(0,3)

            return `${cut[0]}, ${cut[1]}, ${cut[2]}`
        }
    }

}
</script>
<style scoped>
.entranceFromRight {
  animation-name: entranceFromRight;
  animation-duration: 1.5s;
}

@keyframes entranceFromRight {
  from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.tile {
    -webkit-box-shadow: 5px 5px 15px -3px rgba(0,0,0,0.59); 
    box-shadow: 5px 5px 15px -3px rgba(0,0,0,0.59);
}


</style>