import { createStore } from 'vuex'
import { categoryget } from '../api/api'

export default createStore({
  state: {
    category: [],
    account: [],
    tags: {},
    gg: 'nihao',
    timeline:[],
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
  },
  actions: {
    async initialize_category( {commit} ) {
      const result =  await categoryget();
      commit('initialize_category', result.data)
  }

  },
  modules: {
  }
})
