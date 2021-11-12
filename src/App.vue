<template>
  <div id="#app" class="flex container mx-auto h-auto justify-center">
    <div class="flex flex-col">
      <div v-if="this.load" class="flex h-screen text-3xl" @click="disable">
          <router-link class="m-auto px-2 py-2 border-solid border-2 border-black border-solid rounded"
            to="/search">Start
          </router-link>
      </div>

      <transition name="slide" mode="out-in">
        <router-view/>
      </transition>
    </div>

  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      load : true,
    }
  },
  methods: {
    disable() {
      this.load = !this.load
    }
  }
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 1s, transform 1s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}

</style>
