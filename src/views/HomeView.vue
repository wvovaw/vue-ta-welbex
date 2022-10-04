<template>
  <div class="home container">
    <div class="field">
      <label class="label">Result PostgREST API query</label>
      <div class="control">
        <input
          class="input is-small"
          type="text"
          readonly
          :value="$store.getters.resultUrl"
        />
      </div>
      <p class="help">
        This is a query that depends on filters and columns sort selection
      </p>
    </div>
    <div class="columns">
      <div class="column is-one-third py-0">
        <WDataFiltersList
          class="box is-size-7"
          :filters="filters"
          @update:filters="updateFilters"
        />
        <div
          v-show="$store.getters.error != null"
          class="notification is-size-7 is-danger is-light"
        >
          <a>{{ $store.getters.error.message }}</a>
          <br />
          <strong>{{ $store.getters.error.hint }}</strong>
        </div>
      </div>
      <div class="column box">
        <div class="table">
          <WDataTable
            :columns="columns"
            :items="items"
            :sortSequence="sortSequence"
            @update:sortSequence="updateSortSequence"
            multisort
            :loading="loading"
          />
          <WPagination :pages="pages" v-model:currentPage="currentPage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WDataFiltersList from "@/components/WDataFiltersList.vue";
import WDataTable from "@/components/WDataTable.vue";
import WPagination from "@/components/WPagination.vue";

export default {
  name: "HomeView",
  data() {
    return {
      limit: 10,
      currentPage: 1,
      sortSequence: [],
      orderQuery: "",
      filters: [],
      columns: [
        { text: "Date", value: "date", type: "date", sortable: false },
        {
          text: "Title",
          value: "title",
          type: "text",
          ascIcon: "fa-arrow-up-a-z",
          descIcon: "fa-arrow-down-a-z",
        },
        {
          text: "Amount",
          value: "amount",
          type: "number",
          ascIcon: "fa-arrow-up-1-9",
          descIcon: "fa-arrow-down-1-9",
        },
        {
          text: "Distance",
          value: "distance",
          type: "number",
          ascIcon: "fa-arrow-up-1-9",
          descIcon: "fa-arrow-down-1-9",
        },
      ],
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    items() {
      return this.$store.getters.data;
    },
    pages() {
      return Math.ceil(this.$store.getters.dataLength / this.limit);
    },
    offset() {
      return (this.currentPage - 1) * this.limit;
    },
  },
  methods: {
    updateData() {
      this.$store.dispatch("loadData", {
        order: this.orderQuery,
        limit: this.limit,
        offset: this.offset,
        filters: this.filters,
      });
    },
    updateFilters(newFilters) {
      this.filters = newFilters;
    },
    updateSortSequence(newSortSequence) {
      this.sortSequence = newSortSequence;
      let newOrderQuery = "";

      this.sortSequence.forEach((column) => {
        if (column.at(0) == "-") newOrderQuery += column.slice(1) + ".desc,";
        else newOrderQuery += column + ".asc,";
      });
      this.orderQuery = newOrderQuery.slice(0, -1); // remove extra semicolon
    },
  },
  watch: {
    offset() {
      this.updateData();
    },
    limit() {
      this.updateData();
    },
    orderQuery() {
      this.updateData();
    },
    filters: {
      deep: true,
      handler() {
        this.currentPage = 1;
        this.updateData();
      },
    },
  },
  provide() {
    return {
      columns: this.columns,
    };
  },
  created() {
    this.updateData();
  },
  components: {
    WDataTable,
    WPagination,
    WDataFiltersList,
  },
};
</script>

<style scoped lang="scss">
body {
  background-color: magenta;
}
.home {
  padding: 2rem 1rem;
}
</style>
