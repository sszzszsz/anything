<template>
  <div class="container">
    <div>
      <h1 class="title">
        dir
      </h1>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">
          Documentation
        </a>
        <nuxt-link to="/" class="button--green">
          top
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  head() {
    return {
      title: 'dir'
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
})
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
