<template>
  <div class="">
    <p class="card-header-title">Filters</p>
    <div class="card-content">
      <WDataFilter
        v-for="(filter, ix) of localFilters"
        :key="filter"
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
