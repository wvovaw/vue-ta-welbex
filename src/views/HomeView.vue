<template>
  <div class="home">
    <WDataTable :columns="columns" @update:columns="updateColumns" :items="items" :loading="loading" />
    <WPagination :pages="pages" v-model:currentPage="offset" />
  </div>
</template>

<script>
import WDataTable from '@/components/WDataTable.vue'
import WPagination from '@/components/WPagination.vue'

export default {
  name: 'HomeView',
  data() {
    return {
      order: "amount",
      limit: 10,
      offset: 1,
      columns: [
        { text: 'Date', value: 'date' },
        {
          text: 'Title', value: 'title',
          sort: {
            direction: 0,
            ascIcon: 'fa-arrow-up-a-z',
            descIcon: 'fa-arrow-down-a-z'
          }
        },
        {
          text: 'Amount', value: 'amount',
          sort: {
            direction: 0,
            ascIcon: 'fa-arrow-up-1-9',
            descIcon: 'fa-arrow-down-1-9'
          }
        },
        {
          text: 'Distance', value: 'distance',
          sort: {
            direction: 0,
            ascIcon: 'fa-arrow-up-1-9',
            descIcon: 'fa-arrow-down-1-9'
          }
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
    }
  },
  methods: {
    reloadData() {
      this.$store.dispatch('loadData', { order: this.order, limit: this.limit, offset: this.offset });
    },
    updateColumns(newColumns) {
      this.columns = newColumns;
      let newOrder = '';

      this.columns.forEach(column => {
        if (column.sort) {
          if (column.sort.direction == -1)
            newOrder += column.value + '.desc,'
          if (column.sort.direction == 1)
            newOrder += column.value + '.asc,'
          }
      });
      this.order = newOrder.slice(0,-1); // remove extra semicolon
      console.log(this.order);
    }
  },
  watch: {
    offset() {
      this.reloadData();
    },
    order() {
      this.reloadData();
    },
    limit() {
      this.reloadData();
    }
  },
  created() {
    this.reloadData();
  },
  components: {
    WDataTable,
    WPagination
  }
}
</script>
