<template>
  <div id="app">
<v-app>
  <v-navigation-drawer fixed clipped v-model="drawer" width="350" app>
      <iframe id="ads" :src="addsUrl" />
  </v-navigation-drawer>
  <v-navigation-drawer fixed clipped right app v-model="detail">
      <detail></detail>
  </v-navigation-drawer>
  <v-toolbar app clipped-right clipped-left fixed dark color="primary">
       
        
      <v-toolbar-title style="width: 400px" class="ml-0 pl-3">
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          
          <span class="hidden-sm-and-down">{{ title }}</span></v-toolbar-title>
      <map-suggest/>
      <v-spacer></v-spacer>
      <about />
  </v-toolbar>
  <v-content fluid>
    <v-container pa-0 fluid fill-height>
      <v-layout fill-height column>
      <Map />
      </v-layout>
    </v-container>
  </v-content>
  <v-footer app color="secondary">
      <v-layout justify-center row wrap>
        <v-flex secondary pa-2 text-xs-center xs12>
            &copy;2019, <a href="https://nastojte.cz">Adam Kučera</a>
        </v-flex>
      </v-layout>
    </v-footer>
   </v-app> 
  </div>
</template>

<script>
    import Map from './Map.vue';
    import Detail from './Detail.vue';
    import About from './About.vue';
    import MapSuggest from './MapSuggest.vue'
    export default {
        name: 'postboxes-frontend',
        components: {
            Map,
            Detail,
            About,
            MapSuggest
        },
        data: function () {
            return {
                title: 'Mapa poštovních schránek',
                drawer: true,
                detail2 : false,
                addsUrl: require('./sklik.html'),
            }
        },
        computed: {
            detail: {
                get () {
                    return this.$store.state.detail;
                },
                set (val) {
                    this.$store.commit({ type: 'detail', detail: val });
                }
            }    
        },
        methods: {
        },
        created() {
         }
    }
</script>
<style scoped>
 iframe#ads {
     width: 320px;
     height: 620px;
     border:0px;
     padding:0px;
     margin:0px;
 }
</style>