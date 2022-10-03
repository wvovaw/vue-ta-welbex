<template>
  <div class="table-container">
    <table class="table is-bordered is-striped is-hoverable is-fullwidth">
      <thead>
        <th v-for="column in localColumns" :key="column"
        :class="column.sort ? column.sort.direction != 0 ? 'table__column--sortable_active' : 'table__column--sortable' : 'table__column'"
        @click="column.sort ? toggleColumnSortState(column) : null">
          {{ column.text }}
          <span v-if="column.sort" class="icon">
            <i class="fas"
              :class="{
                [column.sort.descIcon]: column.sort.direction == -1,
                '': column.sort.direction == 0,
                [column.sort.ascIcon]: column.sort.direction == 1,
              }"
            >
            </i>
          </span>
        </th>
      </thead>
      <tbody>
        <tr>
          <td class="loading m-0 p-0" :colspan="localColumns.length">
            <progress class="progress is-small is-info p-0 m-0" max="100" :value="loading ? '' : '0'">30%</progress>
          </td>
        </tr>
        <tr v-for="(item, item_ix) in items" :key="item_ix">
          <td v-for="(cell, key, cell_ix) in item" :key="cell_ix">
            {{ cell }}
          </td>
        </tr>
      </tbody>
      <tfoot>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      localColumns: this.columns
    }
  },
  methods: {
    toggleColumnSortState(column) {
      if (column.sort.direction == -1)
        column.sort.direction = 0;
      else if (column.sort.direction == 0)
        column.sort.direction = 1;
      else if (column.sort.direction == 1)
        column.sort.direction = -1;

      this.$emit('update:columns', this.localColumns);
    },
  },
  props: {
    columns: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      required: false
    },
  },
  emits: ['update:columns']
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/colorscheme.scss";

.loading {
  max-height: 0.2rem;

  width: 100%;

  &>progress {
    max-height: 0.15rem;
    border-radius: 0;
  }
}

.table__column {
  color: $grey;

  &--sortable {
    color: $grey;
    cursor: pointer;

    &:hover,
    &_active {
      cursor: pointer;
      color: $black;
    }
  }
}
</style>
