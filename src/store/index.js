import { createStore } from 'vuex'
import { categoryget } from '../api/api'

export default createStore({
  state: {
    category: [],
    account: [],
    tags: {},
    gg: 'nihao',
    timeline:[],
    anchors_info: {
      item: [],
      top: [],
      active_anchor: 'anchor0',
    },
  },
  mutations: {
    initialize_category (state, catelist) {
      state.category = catelist.category;
      state.account = catelist.account;
      state.tags = catelist.tags

  },
    initialize_timeline (state, timeline) {
      state.timeline = timeline;
    },

    init_anchorsinfo (state, anchor_info) {
      state.anchors_info = anchor_info;
    }
  },
  actions: {
    async initialize_category( {commit} ) {
      const result =  await categoryget();
      console.log('initialize_category')
      console.log(result.data)
      commit('initialize_category', result.data)
  }

  },
  modules: {
  }
})
