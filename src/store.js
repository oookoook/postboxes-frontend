import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


function getDiff(v) {
    return v.max - v.min;
}

function isActive(e) {
    var latDiff = getDiff(e.lat);
    var lonDiff = getDiff(e.lon);
   if(latDiff > 0.35 
    || lonDiff > 0.15) {
        // zoomed out
        return false;
    }
    return true;
}

function getNewExtent(e, o) {
   if(!isActive(e)) {
        // zoomed out - no postboxes are fetched
        e.action = 'delete';
        return e;
    }
    
    // compare with existing extent
    if(e.lat.min >= o.lat.min && e.lat.max <= o.lat.max 
        && e.lon.min >= o.lon.min && e.lon.max <= e.lon.max
        // if the old extent is inactive, we have to get the postboxes again
        && isActive(o)) {
            // current view is within the existing extent
            // user either just zoomed in or panned just a little
            //e.action = 'none';
            return false;
        }

    // we have a new extent - we will expand it a bit to prevent frequent requests when panning the map just a little bit
    var latDiff = getDiff(e.lat);
    var lonDiff = getDiff(e.lon);
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
      panorama: false,
      loading: false,
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
                console.log('Store: Getting new postboxes...');
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
                console.log('Store: Delete action triggered on postboxes...');
                if(context.state.postboxes.length > 0) {
                    console.log('Store: Deleting existing postboxes.');
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
            context.commit({ type: 'loading', loading: true });
            Vue.http.get(`https://api.mapy.cz/suggest/?count=5&phrase=${input}`)
            .then(response => {
                var s = response.body.result.map(i => { 
                    return {
                       //key: i.userData.id,
                       text: i.userData.suggestFirstRow + ', ' + i.userData.suggestSecondRow,
                       value: { lat: i.userData.latitude, lon: i.userData.longitude }
                    };
                   }); 
                context.commit({ type: 'suggests', suggests: s });
                context.commit({ type: 'loading', loading: false });
            }, response => {
                console.log('error occured!' + JSON.stringify(response));
                context.commit({ type: 'loading', loading: false });
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