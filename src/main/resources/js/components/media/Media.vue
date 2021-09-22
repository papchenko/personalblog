<template>
  <v-card>
    <v-flex v-if="type === 'href'" xs12 sm6 offset-sm3>
      <v-img v-if="message.linkCover" :src="message.linkCover" aspect-ratio="2.75"></v-img>
      <v-card-title>
        <div>
          <h3>
            <a :href="message.link">{{message.linkTitle || message.link}}</a>
          </h3>
          <div v-if="message.linkDescription">{{message.linkDescription}}</div>
        </div>
      </v-card-title>
    </v-flex>
    <v-flex v-if="type === 'image'" xs12 sm6 offset-sm3>
      <a :href="message.link">
        <v-img v-if="message.linkCover" :src="message.linkCover" aspect-ratio="2.75"></v-img>
        {{message.link}}
      </a>
    </v-flex>
    <v-flex v-if="type === 'youtube'" xs12 sm6 offset-sm3>
      <you-tube :src="message.link"></you-tube>
    </v-flex>

    <v-card-actions class="justify-center">
      <v-btn
          color="orange"
          text
      >
        Share
      </v-btn>

      <v-btn
          text
          color="teal accent-4"
          @click="reveal = true"
      >
        Learn More
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <v-card
          v-if="reveal"
          class="transition-fast-in-fast-out v-card--reveal"
          style="height: 100%;"
      >
        <v-card-text class="pb-0">
          <p class="text-h4 text--primary">
            Описание
          </p>
          <p>Описание видео</p>
          <p>Описание фото </p>
          <p>Описание статьи </p>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-btn
              text
              color="teal accent-7"
              @click="reveal = false"
          >
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script>
import YouTube from './YouTube.vue'
export default {
  name: 'Media',
  components: { YouTube },
  props: ['message'],
  data: () => ({

      type: 'href',
      reveal: false,

  }),
  beforeMount() {
    if (this.message.link.indexOf('youtu') > -1) {
      this.type = 'youtube'
    } else if (this.message.link.match(/\.(jpeg|jpg|gif|png)$/) !== null) {
      this.type = 'image'
    } else {
      this.type = 'href'
    }
  }
}
</script>

<style scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>