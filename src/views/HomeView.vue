<template>
  <div class="home">
    <WDataTable :headers="headers" :items="items" :loading="loading" />
    <WPagination :pages="pages" v-model:currentPage="currentPage"/>
  </div>
</template>

<script>
import WDataTable from '@/components/WDataTable.vue'
import WPagination from '@/components/WPagination.vue'

export default {
  name: 'HomeView',
  data() {
    return {
      order: "",
      limit: 10,
      offset: 0,
      currentPage: 1
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    headers() {
      return [
        { text: 'Date', value: 'date', sortable: false },
        { text: 'Title', value: 'title', sortable: true, sortType: 'text' },
        { text: 'Amount', value: 'amount', sortable: true, sortType: 'number' },
        { text: 'Distance', value: 'distance', sortable: true, sortType: 'number' },
      ];
    },
    items() {
      return this.$store.getters.data;
    },
    pages() {
      return Math.ceil(this.$store.getters.dataLength / this.limit);
    }
  },
  watch: {
    currentPage() {
      this.reloadData();
    }
  },
  methods: {
    reloadData() {
      this.$store.dispatch('loadData', { order: this.order, limit: this.limit, offset: this.currentPage });
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
