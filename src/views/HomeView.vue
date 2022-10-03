<template>
  <div class="home">
    <WDataTable :columns="columns" :items="items" :sortSequence="sortSequence" @update:sortSequence="updateSortSequence"
      multisort :loading="loading" />
    <WPagination :pages="pages" v-model:currentPage="currentPage" />
  </div>
</template>

<script>
import WDataTable from '@/components/WDataTable.vue'
import WPagination from '@/components/WPagination.vue'

export default {
  name: 'HomeView',
  data() {
    return {
      orderQuery: "",
      sortSequence: [],
      limit: 10,
      currentPage: 1,
      columns: [
        { text: 'Date', value: 'date', sortable: false },
        {
          text: 'Title', value: 'title',
          ascIcon: 'fa-arrow-up-a-z',
          descIcon: 'fa-arrow-down-a-z'
        },
        {
          text: 'Amount', value: 'amount',
          ascIcon: 'fa-arrow-up-1-9',
          descIcon: 'fa-arrow-down-1-9'
        },
        {
          text: 'Distance', value: 'distance',
          ascIcon: 'fa-arrow-up-1-9',
          descIcon: 'fa-arrow-down-1-9'
        },

      ]
    }
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
    }
  },
  methods: {
    updateData() {
      this.$store.dispatch('loadData', { order: this.orderQuery, limit: this.limit, offset: this.offset });
    },
    updateSortSequence(newSortSequence) {
      this.sortSequence = newSortSequence;
      let newOrderQuery = '';

      this.sortSequence.forEach(column => {
        if (column.at(0) == '-')
          newOrderQuery += column.slice(1) + '.desc,'
        else
          newOrderQuery += column + '.asc,'
      });
      this.orderQuery = newOrderQuery.slice(0, -1); // remove extra semicolon
      console.log(this.orderQuery);
    }
  },
  watch: {
    offset() {
      this.updateData();
    },
    orderQuery() {
      this.updateData();
    },
    limit() {
      this.updateData();
    }
  },
  created() {
    this.updateData();
  },
  components: {
    WDataTable,
    WPagination
  }
}
</script>

<style scoped lang="scss">
  .home {
    max-width: 70%;
    margin-inline: auto;
  }
</style>