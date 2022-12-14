import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    data: [],
    dataLength: 0,
    loading: true,
    error: {},
    resultUrl: "https://hjvapokvksuwtchyqkzx.supabase.co/rest/v1/w2/",
  },
  getters: {
    data(state) {
      return state.data;
    },
    dataLength(state) {
      return state.dataLength;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
    resultUrl(state) {
      return state.resultUrl;
    },
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
    },
    WRITE_ERROR(state, error) {
      state.error = error;
    },
    WRITE_URL(state, qs) {
      state.resultUrl =
        "https://hjvapokvksuwtchyqkzx.supabase.co/rest/v1/w2/" + qs;
    },
  },
  actions: {
    async loadData({ commit }, payload) {
      commit("LOADING");
      const params = new URLSearchParams();
      params.append("select", "date,title,amount,distance");
      if (payload.order) params.append("order", payload.order);
      if (payload.limit) params.append("limit", payload.limit);
      if (payload.offset) params.append("offset", payload.offset);
      if (payload.filters) {
        payload.filters.forEach((filter) => {
          params.append(filter.column, filter.operation + "." + filter.query);
        });
      }
      commit("WRITE_URL", params.toString());
      // Using PostgREST interface of Supabase https://postgrest.org/, https://supabase.com/
      try {
        const res = await axios({
          method: "get",
          url: "https://hjvapokvksuwtchyqkzx.supabase.co/rest/v1/w2",
          params,
          headers: {
            apikey: process.env.VUE_APP_API_KEY,
            Authorization: `Bearer ${process.env.VUE_APP_TOKEN}`,
            Prefer: "count=exact",
          },
        });
        commit(
          "WRITE_LENGTH",
          Number(res.headers["content-range"].replace(/\d+-\d+\//, ""))
        );
        commit("WRITE_DATA", res.data);
        commit("WRITE_ERROR", {});
      } catch (err) {
        console.error(err.response.data);
        commit("WRITE_ERROR", {
          hint: err.response.data.hint,
          message: err.response.data.message,
        });
      }
    },
  },
});
