<template>
  <div class="home columns">
    <WDataFiltersList
      class="column is-one-third"
      :filters="filters"
      @update:filters="updateFilters"
    />
    <div class="table column">
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
      console.log(this.orderQuery);
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
.home {
  margin-inline: auto;
  padding: 2rem 1rem;
}
</style>
