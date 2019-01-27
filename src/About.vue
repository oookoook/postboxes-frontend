<template>
  <v-dialog
      v-model="dialog"
      width="80%"
    >
      <v-btn
        slot="activator"
        color="primary"
        dark
        icon><v-icon>info</v-icon></v-btn>

      <v-card> 
        <v-card-title
          class="headline accent white--text"
          primary-title
        >
          O projektu
        </v-card-title>

        <v-card-text>
        <v-layout row>
        <v-flex xs4>
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
</v-flex>
<v-flex xs8>
    <h2>Co je tato služba?</h2>
    <p>Vítejte na Mapě poštovních schránek. Věřím, že pro Vás tato služba bude užitečná.</p>
    <p>Tuto aplikaci jsem vytvořil hned ze tří důvodů:</p>    
    <ul>
        <li>Jako službu pro veřejnost, protože jsem zjistil, že jednoduchá mapa poštovních schránek v ČR neexistuje,</li>
        <li>Jako ukázku <a href="https://nastojte.cz" about="_blank">své práce</a> pro potenciální zákazníky,</li>
        <li>Jako projekt, kde si můžu vyzkoušet zajímavé technologie: Mapy.cz API, Sklik, Vue.js, Vuex, Vuetify, AWS Lambda, AWS DynamoDB, AWS S3 a další.</li>
    </ul>
    <h2>Co to umí?</h2>
    <p>Služba umí v mapě zobrazovat poštovní schránky ze <a href="https://www.ceskaposta.cz/ke-stazeni/zakaznicke-vystupy" about="_blank">seznamu schránek České Pošty</a>.
    V součané době zobrazuje pouze ty, které mají v datovém souboru vyplněnou přesnou polohu pomocí souřadnic. Takových schránek je v seznamu zhruba 85%.</p>
    <p>Díky napojení na Mapy.cz si můžete zobrazit Panorama (snímky z místa) a schránku si přesně najít pomocí virtuální procházky ulicí. 
        Klikněte na schránku v mapě a úplně vpravo klikněte na ikonku fotoaparátu.</p>
    <h2>Co tato služba není a co neumí?</h2>
    <p>Tuto službu neprovozuje ani <a href="https://seznam.cz" about="_blank">Seznam.cz</a>, ani <a href="https://www.ceskaposta.cz" about="_blank">Česká pošta</a>.
    Nejsou tedy nijak zodpovědní za to, jestli tato služba funguje správně.</p>
    <p>Na druhou stranu, vzhledem k tomu, že já nemám žádnou kontrolu nad daty České pošty ani nad daty Mapy.cz, nemůžu nijak garantovat
        přesnost poskytovaných dat.</p>
</v-flex>
</v-layout>
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