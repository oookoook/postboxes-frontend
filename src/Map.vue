<template>
  <v-flex grow id="mapWindow" xs12 d-flex child-flex p-0 m-0>
      <v-btn color="accent" dark small absolute top right fab v-if="panorama" @click="hidePanorama"><v-icon>close</v-icon></v-btn>
      <iframe v-bind:src="frameAdd" id="mapFrame"></iframe>
      <!-- <v-progress-linear :indeterminate="true" height="2" v-if="loading"></v-progress-linear> -->
  </v-flex>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        name: 'MapWindow',
        components: {
        },
        data: function () {
            return {
                frameAdd: require('./map.html'),
                mp: null,
                geoloc: null
            }
        },
        computed: mapState([
            'postboxes', 'panorama', 'detail', 'loading', 'loc'
        ]),
        watch: {
            postboxes: function (newPostboxes, oldPostboxes) {
                this.mp.removeMarkers();
                this.mp.addMarkers(newPostboxes);
                this.$store.dispatch({type: 'endLoading' });
            },
            panorama: function(newP, oldP) {
                if(newP) {
                    this.mp.showPanorama({ lat: this.detail.lat, lon: this.detail.lon});
                } else {
                    this.mp.hidePanorama();
                }
            },
            loc: function(loc) {
                if(loc) {
                    this.mp.setExtent(loc, true);
                } else {
                    this.mp.removeLocMarker();
                }
            }
        },
        methods: {
            getInfo: function(id) {
                console.log(id);
                this.$store.dispatch({type: 'getDetail', id });
                //this.$emit('show-postbox', postbox);
            },
            getPostboxes: function(extent) {
                //console.log(extent);
                this.$store.dispatch({type: 'updateExtent', extent });
            },
            mapLoadCheck: function() {
                // https://stackoverflow.com/questions/9249680/how-to-check-if-iframe-is-loaded-or-it-has-a-content
                var iframe = document.getElementById("mapFrame");
                var mapDoc = (iframe.contentWindow.document || iframe.contentDocument);
                if(mapDoc.location.href.indexOf(this.frameAdd) > -1 && mapDoc.readyState  == 'complete' ) {
                   this.$timer.stop('mapLoadCheck');
                   this.mp = mapDoc.MapProxy;
                   this.mp.extentHandler = this.getPostboxes;
                   this.mp.markerClickHandler = this.getInfo;
                   this.mp.postboxMarkerOptions = { url: require('../assets/postbox_icon.svg')};
                   this.mp.loadMap(this.geoloc);
                   console.log('Map handlers mapped to vue methods');
                   
                } else {
                    /*
                    console.log('Iframe location is:');
                    console.log(mapDoc.location.href);
                    console.log('Iframe readysttate is:');
                    console.log(mapDoc.readyState);
                    */
                }
            },
            hidePanorama() {
                this.$store.dispatch({type: 'showPanorama', hide: true });
            }
        },
        timers: {
            mapLoadCheck: { time: 100, autostart: true, immediate: true, repeat: true }
        },
        created() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    var loc = { lat: position.coords.latitude, lon: position.coords.longitude };
                    if(!this.mp) {
                        this.geoloc = loc;
                    } else {
                        this.mp.setExtent(loc);
                    }
                });
            }
        },
        mounted() {
         }
    }
</script>
<style scoped>
#mapFrame {
    flex: 1 1 auto;
    border: 0px;
    padding: 0px;
    margin: 0px;
}
</style>