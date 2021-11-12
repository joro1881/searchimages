<template>
    <div  class="container mt-2 ml-4 h-40">
        <ul class="flex flex-wrap">
          <div  v-for="pageNumber in pages" :key="pageNumber">
            <li v-if="Math.abs(pageNumber - currentPage) < 3 || pageNumber == pages || pageNumber == 1">
              <a href="#"
                @click="setPage(pageNumber)"
                :class="{
                    current: currentPage === pageNumber,
                    last: (pageNumber == pages && Math.abs(pageNumber - currentPage) > 3),
                    first:(pageNumber == 1 && Math.abs(pageNumber - currentPage) > 3)
                }"
              >
                  {{ pageNumber }}
              </a>
            </li>
          </div>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        pages: {
            type: Number,
            required: true,
        },
        currentPage: {
            type: Number,
            required: true,
        }
    },
    methods: {
        setPage(pageNumber) {
          this.$root.$emit('listNewPage', {
              'newPage': pageNumber
          })
        },
    }
}
</script>
<style scoped>
a {
  color: rgb(0, 0, 0);
}
.current {
  color: red;
}
ul {
  padding: 0;
  list-style-type: none;
}
li {
  display: inline;
  margin: 5px 5px;
}

a.first::after {
  content:'...'
}

a.last::before {
  content:'...'
}
</style>