<template>
  <v-card class="my-2">
    <v-card-text primary-title>
      <i>({{ message.id }})</i>
      {{ message.text }}
    </v-card-text>
    <media v-if="message.link" :message="message"></media>

    <v-card-actions>
      <v-dialog
          v-model="dialog"
          width="500"
      >
      <template v-slot:activator="{ on, attrs }">
      <v-btn
          icon
          @click=""
          small
          class="ma-2"
          text
          color="blue lighten-2"
          v-bind="attrs"
          v-on="on"
      >
        <v-icon>mdi-thumb-up</v-icon>
      </v-btn>
      <v-btn
          icon
          @click=""
          small
          class="ma-2"
          text
          color="red lighten-2"
          v-bind="attrs"
          v-on="on"
      >
        <v-icon>mdi-thumb-down</v-icon>
      </v-btn>
      </template>
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
          </v-card-title>

          <v-card-text class="text-center font-weight-black">
            <strong>Спасибо! Мы учтем Ваше мнение!</strong>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                text
                @click="dialog = false"
            >
              Закрыть
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import Media from 'components/media/Media.vue'

export default {
  data () {
    return {
      dialog: false,
    }
  },
  props: ['message', 'editMessage'],
  components: { Media },
  methods: {
    ...mapActions(['removeMessageAction']),
    edit() {
      this.editMessage(this.message)
    },
    del() {
      this.removeMessageAction(this.message)
    }
  }
}
</script>

<style scoped>

</style>