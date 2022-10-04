<template>
  <div class="card">
    <p class="card-header-title">Filters</p>
    <div v-auto-animate class="card-content px-0">
      <WDataFilter
        v-for="(filter, ix) of localFilters"
        :key="filter"
        class="mx-0 px-0"
        v-model="localFilters[ix]"
        @delete:modelValue="deleteFilter(ix)"
      />
    </div>
    <footer class="card-footer">
      <a class="card-footer-item" @click="addFilter">Add filter</a>
      <a class="card-footer-item" @click="clearFilters">Clear filters</a>
    </footer>
  </div>
</template>

<script>
import WDataFilter from "@/components/WDataFilter.vue";
export default {
  name: "WDataFiltersList",
  data() {
    return {
      localFilters: this.filters,
      filterQuery: "",
    };
  },
  methods: {
    addFilter() {
      this.localFilters.push({
        column: "",
        operation: "",
        query: "",
      });
    },
    deleteFilter(ix) {
      this.localFilters.splice(ix, 1);
    },
    clearFilters() {
      this.localFilters = [];
    },
  },
  watch: {
    localFilters: {
      deep: true,
      handler() {
        this.$emit("update:filters", this.localFilters);
      },
    },
  },
  props: {
    filters: {
      type: Array,
      required: true,
    },
  },
  emits: ["update:filters"],
  inject: ["columns"],
  components: {
    WDataFilter,
  },
};
</script>

<style lang="scss" scoped></style>
