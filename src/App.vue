<template>
  <div id="app">
<v-app>
  <v-toolbar app clipped-right clipped-left fixed dark>
       
        
      <v-toolbar-title style="width: 400px" class="ml-0 pl-3">
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          
          <span class="hidden-sm-and-down">{{ title }}</span></v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        prepend-icon="search"
        label="Hledat"
        class="hidden-sm-and-down"
        id="search"
      ></v-text-field>
      <v-spacer></v-spacer>
      
  </v-toolbar>
  <v-navigation-drawer fixed clipped v-model="drawer" width="350" app>
      <iframe id="ads" :src="addsUrl" />
  </v-navigation-drawer>
  <v-navigation-drawer fixed clipped right app>
      <detail></detail>
  </v-navigation-drawer>
  <v-content>
    <v-container>
      <Map v-on:show-postbox="showDetail" />
    </v-container>
  </v-content>
  <v-footer app>Bleble</v-footer>
   </v-app> 
  </div>
</template>

<script>
    import Map from './Map.vue';
    import Detail from './Detail.vue';
    export default {
        name: 'postboxes-frontend',
        components: {
            Map,
            Detail
        },
        data: function () {
            return {
                title: 'Mapa poštovních schránek',
                drawer: true,
                addsUrl: require('./sklik.html'),
            }
        },
        computed: {
                
        },
        methods: {
            showDetail: function(event) {
                var id = event;
            }
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