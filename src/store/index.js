import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    data: [],
    dataLength: 0,
    loading: true
  },
  getters: {
    data(state) {
      return state.data;
    },
    dataLength(state) {
      return state.dataLength
    },
    loading(state) {
      return state.loading
    }
  },
  mutations: {
    WRITE_LENGTH(state, length) {
      state.dataLength = length;
    },
    WRITE_DATA(state, data) {
      state.data = data;
      state.loading = false;
    },
    LOADING(state) {
      state.loading = true;
    }
  },
  actions: {
    async loadData({ commit }, payload) {
      commit('LOADING');
      const params = {
        select: 'date,title,amount,distance',
      };
      if (payload.order) params.order = payload.order;
      if (payload.limit) params.limit = payload.limit;
      if (payload.offset) params.offset = payload.offset;
      // Using PostgREST interface of Supabase https://postgrest.org/, https://supabase.com/
      try {
        const res = await axios({
          method: 'get',
          url: '/w2', // Using proxy in vue.config.js
          params,
          headers: {
            apikey: process.env.VUE_APP_API_KEY,
            Authorization: `Bearer ${process.env.VUE_APP_TOKEN}`,
            Prefer: 'count=exact'
          },
        });
        commit('WRITE_LENGTH', Number(res.headers['content-range'].replace(/\d+-\d+\//, '')));
        commit('WRITE_DATA', res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    }
  },

})
