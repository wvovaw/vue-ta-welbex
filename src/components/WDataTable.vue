<template>
  <div class="table-container">
    <table class="table is-bordered is-striped is-hoverable is-fullwidth">
      <thead>
        <th
          v-for="column in localColumns"
          :key="column"
          :class="
            column.sortable !== false
              ? sortSequenceIncludes(column.value)
                ? 'table__column--sortable_active'
                : 'table__column--sortable'
              : 'table__column'
          "
          @click="
            column.sortable !== false ? updateSortSequence(column.value) : null
          "
        >
          <div class="column__title">
            {{ column.text }}
            <span v-show="column.sortable !== false" class="icon">
              <i
                class="fas"
                :class="{
                  [column.descIcon]: localSortSequence.includes(
                    String('-' + column.value)
                  ),
                  [column.ascIcon]: localSortSequence.includes(column.value),
                }"
              >
              </i>
            </span>
            <span
              v-if="multisort && sortSequenceIncludes(column.value)"
              class="tag is-rounded is-small"
              >{{ `${columnSortSequenceIndex(column.value) + 1}` }}</span
            >
          </div>
        </th>
      </thead>
      <tbody>
        <tr>
          <td class="loading m-0 p-0" :colspan="localColumns.length">
            <progress
              class="progress is-small is-info p-0 m-0"
              max="100"
              :value="loading ? '' : '0'"
            >
              30%
            </progress>
          </td>
        </tr>
        <tr v-for="(item, item_ix) in items" :key="item_ix">
          <td
            v-for="(cell, key, cell_ix) in item"
            :key="cell_ix"
            class="table__cell"
          >
            {{ cell }}
          </td>
        </tr>
      </tbody>
      <tfoot></tfoot>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      localColumns: this.columns,
      localSortSequence: this.sortSequence,
    };
  },
  methods: {
    columnSortSequenceIndex(columnValue) {
      let ix = this.localSortSequence.indexOf(columnValue);
      if (ix == -1) ix = this.localSortSequence.indexOf("-" + columnValue);
      return ix;
    },
    sortSequenceIncludes(columnValue) {
      if (this.columnSortSequenceIndex(columnValue) != -1) return true;
      else return false;
    },
    updateSortSequence(columnValue) {
      const lss = this.localSortSequence;
      if (lss.length != 0) {
        const ix = this.columnSortSequenceIndex(columnValue);
        if (ix != -1) {
          if (lss[ix] == columnValue) lss[ix] = "-" + columnValue;
          else if (lss[ix] == "-" + columnValue) lss.splice(ix, 1);
          else if (this.multisort) lss.push(columnValue);
          else {
            console.log("here");
            lss.splice(ix, 1);
            lss.push(columnValue);
          }
        } else if (this.multisort) lss.push(columnValue);
        else {
          console.log("here");
          lss.splice(ix, 1);
          lss.push(columnValue);
        }
      } else lss.push(columnValue);
      this.$emit("update:sortSequence", lss);
    },
  },
  props: {
    columns: {
      type: Array,
      required: true,
    },
    sortSequence: {
      type: Array,
      required: true,
    },
    multisort: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      required: false,
    },
  },
  emits: ["update:columns", "update:sortSequence"],
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/colorscheme.scss";

.loading {
  max-height: 0.2rem;
  width: 100%;

  & > progress {
    max-height: 0.15rem;
    border-radius: 0;
  }
}
.table {
  &__column {
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
  .column {
    &__title {
      display: inline-flex;
    }
  }
}
</style>
