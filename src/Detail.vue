<template>
    <v-scroll-x-transition mode="out-in">
        <v-list two-lines v-if="detail && detail.id" :key="detail.id">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="accent">location_on</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ addressLines[0] }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ addressLines.slice(1).join(', ') }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action @click="showPhoto">
              <v-btn icon><v-icon color="accent">photo_camera</v-icon></v-btn>
            </v-list-tile-action>
          </v-list-tile>

          <v-list-tile v-if="desc">
            <v-list-tile-action>
              <v-icon color="accent">help_outline</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-sub-title>Upřesnění:</v-list-tile-sub-title>
              <v-list-tile-title>{{ desc }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile v-for="(item, index) in schedules" :key="index">
            <v-list-tile-action>
              <v-icon color="accent" v-if="index == 0">schedule</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.time }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.days }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
            

          <v-divider inset></v-divider>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="accent">mail</v-icon>
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
        <v-list two-lines v-else key="placeholder">
          <v-list-tile>
            <v-list-tile-action>
                <v-icon color="accent">local_post_office</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Schránka nevybrána</v-list-tile-title>
              <v-list-tile-sub-title>Vyberte schránku z mapy...</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        </v-scroll-x-transition>
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
            },
            desc () {
                return this.detail.info.misto_popis == '?' ? null : this.detail.info.misto_popis
            }

        },
        methods: {
            showPhoto () {
                this.$store.dispatch({type: 'showPanorama' });
            }
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