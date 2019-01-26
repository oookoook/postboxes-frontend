<template>
  <v-list two-lines v-if="detail">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>location_on</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ addressLines[0] }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ addressLines.slice(1).join(', ') }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action @click="showPhoto">
              <v-btn icon><v-icon>photo_camera</v-icon></v-btn>
            </v-list-tile-action>
          </v-list-tile>

          <v-list-tile v-for="(item, index) in schedules" :key="index">
            <v-list-tile-action>
              <v-icon v-if="index == 0">schedule</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.time }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.days }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
            

          <v-divider inset></v-divider>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon>mail</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ office.name }}</v-list-tile-title>
              <v-list-tile-sub-title>Název pošty</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-action>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ office.zip }}</v-list-tile-title>
              <v-list-tile-sub-title>PSČ pošty</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>
        </v-list>
</template>

<script>
    
    export default {
        name: 'Detail',
        components: {
        },
        props: [],
        data: function () {
            return {
                
            }
        },
        computed: {
            detail () {
                return this.$store.state.detail;
            },
            addressLines () {
                return this.detail.info.adresa.split(',');
            },
            schedules () {
                var d = this.detail.info.omezeni.split(';').map(i => i.replace(/(\d-\d - )|(\d - )/, '')); 
                return this.detail.info.cas.split(';').map((item, i) => {
                  return {
                      time: item,
                      days: d[i]
                  };  
                })
            },
            office () {
                return {
                    name: this.detail.info.zkrnaz_posty,
                    zip: this.detail.info.psc
                }
            }

        },
        methods: {
            
        },
        timers: {
        },
        created() {

        },
        mounted() {
         }
    }
</script>
<style scoped>

</style>