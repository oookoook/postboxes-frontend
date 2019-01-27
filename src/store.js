import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


function getNewExtent(e, o) {
    var latDiff = e.lat.max - e.lat.min;
    var lonDiff = e.lon.max - e.lon.min;
    console.log(`latDiff ${latDiff} lonDiff ${lonDiff}`);
    /*
    if(latDiff > 0.65 
    || lonDiff > 0.25) {
    */ 
   if(latDiff > 0.35 
    || lonDiff > 0.12) {
        // zoomed out - no postboxes are fetched
        e.action = 'delete';
        return e;
    }
    
    // compare with existing extent
    if(e.lat.min >= o.lat.min && e.lat.max <= o.lat.max 
        && e.lon.min >= o.lon.min && e.lon.max <= e.lon.max) {
            // current view is within the existing extent
            // user either just zoomed in or panned just a little
            //e.action = 'none';
            return false;
        }

    // we have a new extent - we will expand it a bit to prevent frequent requests when panning the map just a little bit
    e.lat.min -= latDiff / 4;
    e.lat.max += latDiff / 4;
    e.lon.min -= lonDiff / 4;
    e.lon.max += lonDiff / 4;
    e.action = 'refresh';
    return e;
}

export default new Vuex.Store({
    state: {
      extent: { lat: { min: 0, max: 0}, lon: { min: 0, max: 0}},
      postboxes: [],
      mapSuggest: [],
      loc: null,
      detail: null,
      panorama: false
    },
    mutations: {
      postboxes(state, payload) {
        state.postboxes = payload.postboxes;
        //console.dir(payload.postboxes);
      },
      extent(state, payload) {
        state.extent = payload.extent;
      },
      detail(state, payload) {
          state.detail = payload.detail;
      },
      panorama(state, payload) {
          state.panorama = payload.panorama;
      },
      loading(state, payload) {
          state.loading = payload.loading;
      },
      suggests(state, payload) {
          state.mapSuggest = payload.suggests;
      },
      loc(state,payload)  {
          state.loc = payload.loc;
      }
    },
    actions: {
        updateExtent(context, payload) {
            //console.log(`Lat diff: ${payload.extent.lat.max - payload.extent.lat.min} Lon diff: ${payload.extent.lon.max - payload.extent.lon.min}`);
            var e = getNewExtent(payload.extent, context.state.extent);
            if(e && e.action && e.action == 'refresh') {
                context.commit({ type: 'loading', loading: true });
                Vue.http.get(`https://ygytf5wc4e.execute-api.eu-central-1.amazonaws.com/latest/query/${e.lat.min}/${e.lat.max}/${e.lon.min}/${e.lon.max}/0`)
                .then(response => {
                    context.commit({ type: 'postboxes', postboxes: response.body });
                    context.commit({ type: 'extent', extent: e });
                }, response => {
                    console.log('error occured!' + JSON.stringify(response));
                    context.commit({ type: 'loading', loading: false });
                });
            } else if(e.action == 'delete'){
                // erase existing postboxes when zoomed out
                if(context.state.postboxes.length > 0) {
                    context.commit({ type: 'postboxes', postboxes: [] });
                }
            }
        },

        getDetail (context, payload) {
            var id = payload.id;
            Vue.http.get(`https://ygytf5wc4e.execute-api.eu-central-1.amazonaws.com/latest/postboxes/${id}`)
            .then(response => {
                context.commit({ type: 'detail', detail: response.body });
            }, response => {
                console.log('error occured!' + JSON.stringify(response));
            });
        },

        getSuggest (context, payload) {
            var input = payload.input;
            Vue.http.get(`https://api.mapy.cz/suggest/?count=5&phrase=${input}`)
            .then(response => {
                context.commit({ type: 'suggests', suggests: response.body.result });
            }, response => {
                console.log('error occured!' + JSON.stringify(response));
            });
        },

        changeLoc (context, payload) {
            context.commit({ type: 'loc', loc: payload.loc });
        },

        showPanorama(context, payload) {
            var h = payload.hide;
            context.commit({ type: 'panorama', panorama: !h });
        },
        endLoading(context, payload) {
            context.commit({ type: 'loading', loading: false });
        }
    }
  });