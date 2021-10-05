
<template>
  <v-app>
    <!--    Контейнер верхней панели сайта-->

    <div class="text-center pa-16">
      <v-btn
          dark
          color="red darken-2"
          @click="snackbar = true"
      >
        Пожелание!
      </v-btn>

      <v-snackbar centered
                  v-model="snackbar"
                  :multi-line="multiLine"
      >
        {{ text }}

        <template v-slot:action="{ attrs }">
          <v-btn
              color="red"
              text
              v-bind="attrs"
              @click="snackbar = false"
          >
          </v-btn>
        </template>
      </v-snackbar>
    </div>





    <v-app-bar

        :collapse="!collapseOnScroll"
        absolute
        color="#78909C"
        dark
        shrink-on-scroll
        prominent

        height="160"

        src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
       class="fill-height repeating-gradient"

        scroll-target="#scrolling-techniques-6"
        scroll-threshold="500"
    >

      <v-checkbox
          v-model="collapseOnScroll"
          color="white"
          hide-details
      ></v-checkbox>

      <template v-slot:img="{ props }">
        <v-img
            v-bind="props"

        ></v-img>
      </template>



      <v-avatar

          size="153"
          rounded
      >
        <v-spacer></v-spacer>
        <p v-if="selectedImage"><img style="width:100%" :src="selectedImage" alt=""></p>
      </v-avatar>

      <v-col class="py-0">
        <v-list-item
            color="rgba(0, 0, 0, .4)"
            dark
        >
          <v-list-item-content>
            <v-list-item-title>
              Niko Papchenko
            </v-list-item-title>
            <v-list-item-subtitle>personal blog</v-list-item-subtitle>

            <v-switch
                class="ma-1 pa-1"
                v-model="$vuetify.theme.dark"
                inset
                persistent-hint
                label="Dark Mode"
            ></v-switch>

          </v-list-item-content>
        </v-list-item>
      </v-col>


      <!--      <v-spacer></v-spacer>-->
      <!--      <v-toolbar-title>Nikoitsme</v-toolbar-title>-->





      <v-btn text
             v-if="profile"
             :disabled="$route.path === '/'"
             @click="showMessages">
        Messages
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text
             v-if="profile"
             :disabled="$route.path === '/profile'"
             @click="showProfile">
        {{profile.name}}
      </v-btn>

      <v-spacer></v-spacer>

      <!---->
      <v-btn v-if="profile" icon href="/logout">
        <v-icon>exit_to_app</v-icon>
      </v-btn>
      <!---->










      <v-sheet
          id="scrolling-techniques-6"
          class="overflow-y-auto"
          max-height="600"
      >
      </v-sheet>

    </v-app-bar>


    <v-container style="height: 0px;"></v-container>
    <!--    -->
    <!--    Контейнер боковых кнопок-->





    <!--    контейнер показа сообщений (редакт поле ввод, лайки и тд..-->
    <v-main>
      <messages-list-visitors v-if="!profile" :messages="messages" />
      <router-view v-if="profile"></router-view>
    </v-main>
    <!--    -->
    <!--    Контейнер показа нижней панели на сайте-->
    <v-footer
        dark
        padless
    >
<!--         class="py-2 white&#45;&#45;text text-center">-->
<!--            {{ new Date().getFullYear() }}-->

      <v-spacer></v-spacer>

      <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 center"
          dark
          icon
      >
        <v-icon size="18px">{{ icon }}</v-icon>
      </v-btn >
    </v-footer>
    <!--    -->
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import MessagesListVisitors from 'pages/MessageListVisitors.vue'
import { addHandler } from 'util/ws'


export default {
  components: {
    MessagesListVisitors
  },
  data() {
    return {
      drawer: false,
      group: null,


      icons: [
        'mdi-facebook',
        'mdi-linkedin',
        'mdi-instagram',
      ],


      collapseOnScroll: true,


      multiLine: true,
      snackbar: false,
      text: `Сегодня ваш день!`,

      images: [
        'https://i.ibb.co/mRVYK3q/1-1.jpg',
        'https://i.ibb.co/cc0XZpt/2-2.jpg',
        'https://i.ibb.co/sRWxbpV/3-3.jpg',
        'https://i.ibb.co/7yDSmZW/4-4.jpg',
        'https://i.ibb.co/NjPrfmm/5-5.jpg',
        'https://i.ibb.co/pz3FWW7/6-6.jpg',
        'https://i.ibb.co/WpGRpzj/7-7.jpg',
        'https://i.ibb.co/p4tT5gZ/photo.jpg'
      ],
      selectedImage: null

    }
  },
  watch: {
    group () {
      this.drawer = false
    },
  },
  computed: mapState(['profile', 'messages']), //add 'message' fix
  methods: {
    ...mapMutations(['addMessageMutation', 'updateMessageMutation', 'removeMessageMutation']),
    showMessages() {
      this.$router.push('/')
    },
    showProfile() {
      this.$router.push('/profile')
    },
    randomItem (items) {
      return items[Math.floor(Math.random()*items.length)];
    }
  },
  created() {
    this.selectedImage = this.randomItem(this.images),
        addHandler(data => {
          if (data.objectType === 'MESSAGE') {
            switch (data.eventType) {
              case 'CREATE':
                this.addMessageMutation(data.body)
                break
              case 'UPDATE':
                this.updateMessageMutation(data.body)
                break
              case 'REMOVE':
                this.removeMessageMutation(data.body)
                break
              default:
                console.error(`Looks like the event type if unknown "${data.eventType}"`)
            }
          } else {
            console.error(`Looks like the object type if unknown "${data.objectType}"`)
          }
        })
  }
}
</script>

<style>
/*.main-app {*/
/*  color: maroon;*/
/*}*/
</style>