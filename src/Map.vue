<template>
  <div id="mapWindow">
      <iframe v-bind:src="frameAdd" id="mapFrame"/>
  </div>
</template>

<script>
    
    export default {
        name: 'MapWindow',
        components: {
        },
        data: function () {
            return {
                frameAdd: require('./map.html'),
                mp: null,
            }
        },
        computed: {
            postboxes: function () {
                return this.$store.state.postboxes;
            }        
        },
        watch: {
            postboxes: function (newPostboxes, oldPostboxes) {
                this.mp.removeMarkers();
                this.mp.addMarkers(newPostboxes);
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
                   //mapDoc.MapProxy.clickHandler = this.showResults;
                   this.mp = mapDoc.MapProxy;
                   this.mp.extentHandler = this.getPostboxes;
                   this.mp.markerClickHandler = this.getInfo;
                   //this.mp.activateSuggest(document.querySelector('#search'));
                   console.log('Map handlers mapped to vue methods');
                   
                } else {
                    /*
                    console.log('Iframe location is:');
                    console.log(mapDoc.location.href);
                    console.log('Iframe readysttate is:');
                    console.log(mapDoc.readyState);
                    */
                }
            }
        },
        timers: {
            mapLoadCheck: { time: 100, autostart: true, immediate: true, repeat: true }
        },
        created() {

        },
        mounted() {
         }
    }
</script>
<style scoped>
#mapFrame {
    width: 100%;
    height: 570px;
    border: 0px;
    padding: 0px;
    margin: 0px;
}

#mapWindow {
    border: 0px;
    padding: 0px;
    margin: 0px;
}

</style>