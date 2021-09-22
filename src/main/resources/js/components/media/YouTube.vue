<template>
  <iframe
      :width="width"
      :height="height"
      :src="targetSrc"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
  ></iframe>
</template>

<script>
export default {
  name: 'YouTube',
  props: ['src'],
  computed: {
    targetSrc() {
      const parts = this.src.split(/[\\/|\\=]/)
      return `https://www.youtube.com/embed/${parts[parts.length - 1]}`
    },
    width () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 350
        case 'sm': return 400
        case 'md': return 560
        case 'lg': return 560
        case 'xl': return 800
      }
    },
    height () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 315
        case 'sm': return 315
        case 'md': return 315
        case 'lg': return 315
        case 'xl': return 800
      }
    },
  }
}
</script>

<style scoped>
</style>