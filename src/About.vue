<template>
  <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-btn
        slot="activator"
        color="primary"
        dark
        icon><v-icon>info</v-icon></v-btn>

      <v-card> 
        <v-card-title
          class="headline text-white accent"
          primary-title
        >
          O projektu
        </v-card-title>

        <v-card-text>
        <blockquote class="blockquote font-weight-thin font-italic">
Poštovní schránka na rohu ulice,<br />
to není nějaká lecjaká věc.<br />
Kvete modře,<br />
lidé si jí váží velice,<br />
svěřují se jí docela,<br />
Psaníčka do ní házejí ze dvou stran,<br />
z jedné smutná a z druhé veselá.<br />
<!--
<br />
Psaníčka jsou bílá jako pel<br />
a čekají na vlaky, lodě a člověka,<br />
aby jak čmelák a vítr je do dálek rozesel,<br />
&mdash; tam, kde jsou srdce,<br />
blizny červené,<br />
schované v růžovém okvětí.<br />
<br />
Když na ně psaní doletí,<br />
narostou na nich plody<br />
sladké nebo trpké.
-->
<footer>
<em>&mdash;Jiří Wolker</em>
</footer>
</blockquote>
<v-divider></v-divider>
Blble
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="accent"
            flat
            @click="dialog = false"
          >Zavřít</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
    
    export default {
        name: 'About',
        components: {
        },
        props: [],
        data: function () {
            return {
                dialog: false,
                
            }
        },
        computed: {
                
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