<template>
  <v-container>
  <v-layout align-space-around justify-start column>
    <message-row-visitors v-for="message in sortedMessages"
                 :key="message.id"
                 :message="message"
                 :editMessage="editMessage" />
  </v-layout>
  </v-container>
</template>


<script>
import { mapGetters } from 'vuex'
import MessageRowVisitors from 'components/messages/MessageRowVisitors.vue'

export default {
  name: 'app',
  props: ['messages'],
  components: {
    MessageRowVisitors,
  },
  data() {
    return {
      message: null
    }
  },
  computed: mapGetters(['sortedMessages']),
  methods: {
    editMessage(message) {
      this.message = message
    }
  }
}
</script>

<style>

</style>