<template>
  <!--
  <v-text-field
        flat
        solo-inverted
        prepend-icon="search"
        label="Hledat"
        class="hidden-sm-and-down"
        id="search"
      ></v-text-field>
    -->
    <v-autocomplete
    hint="Hledat"
    flat
    solo-inverted
    prepend-icon="search"
    append-icon="clear"
    hide-no-data
    return-object
    :loading="loading"
    :search-input.sync="search"
    :items="items"
    v-model="model"
    @input="changeLoc"
    @click:append="clearLoc">

    </v-autocomplete>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        name: 'MapSuggest',
        components: {
        },
        props: [],
        data: function () {
            return {
                search: null,
                model: null
            }
        },
        watch: {
            search(val) {
                console.log('Input changed...');
                if(!val || val.length < 3) {
                    return;
                }
                if(this.loading) {
                    return;
                }
                console.log('Suggest fetch started...');
                // do the fetch from store... run the action
                this.$store.dispatch({type: 'getSuggest', input: val});
            }
        },
        computed: mapState({
             items: state => state.mapSuggest,
             loading: state => state.loading
             }),
        methods: {
            changeLoc(event) {
                //console.dir(this.model);
                this.$store.dispatch({type: 'showPanorama', hide: true});
                this.$store.dispatch({type: 'changeLoc', loc: event.value});
            },
            clearLoc(event) {
                this.model = null;
                this.$store.dispatch({type: 'changeLoc', loc: null});
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