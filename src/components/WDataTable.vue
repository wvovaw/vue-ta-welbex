<template>
  <div class="table-container">
    <table class="table is-bordered is-striped is-hoverable is-fullwidth">
      <thead>
        <th v-for="header in localHeaders" :key="header.text"
          :class="header.sortable ? header.state.sort != '' ? 'table__column--sortable_active' : 'table__column--sortable' : 'table__column'"
          @click="header.sortable ? toggleColumnSortState(header) : null">
          {{ header.text }}
          <span v-if="header.sortable" class="icon">
            <i class="fas" :class="header.state.class">
            </i>
          </span>
        </th>
      </thead>
      <tbody>
        <tr>
          <td class="loading m-0 p-0" :colspan="localHeaders.length">
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
      localHeaders: this.headers
    }
  },
  methods: {
    toggleColumnSortState(header) {
      console.log('click at ', header)
      if (header.state.sort == '') {
        header.state.sort = 'ascending';
        header.state.class = header.sortType == 'text' ? 'fa-arrow-up-a-z'
          : header.sortType == 'number' ? 'fa-arrow-up-1-9'
            : 'fa-arrow-up';
      }
      else if (header.state.sort == 'ascending') {
        header.state.sort = 'descending';
        header.state.class = header.state.class.replace('up', 'down');
      }
      else {
        header.state.sort = '';
        header.state.class = header.state.class = '';
      }
    }
  },
  created() {
    this.headers.forEach(header => {
      if (header.sortable) {
        header.state = {
          sort: '', // '':'ascending':'descending'
          class: '' // '':'fa-arrow-up-1-9':'fa-arrow-up-a-z':'fa-arrow-up':'fa-arrow-down-1-9':'fa-arrow-down-a-z':'fa-arrow-down'
        }
      }
    });
  },
  props: {
    headers: {
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
