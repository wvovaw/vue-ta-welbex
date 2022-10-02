<template>
  <nav class="pagination is-centered is-small is-rounded">
    <a class="pagination-previous" @click="selectPage(currentPage - 1)">
      <span class="icon">
        <i class="fas fa-arrow-left">
        </i>
      </span>
    </a>
    <a class="pagination-next" @click="selectPage(currentPage + 1)">
      <span class="icon">
        <i class="fas fa-arrow-right">
        </i>
      </span>
    </a>


    <ul v-if="pages < 5" class="pagination-list" role="navigation">
      <li v-for="page in pages" :key="page"><a class="pagination-link" :class="{ 'is-current' : currentPage == page }"
          @click="selectPage(page)">{{ page }}</a></li>
    </ul>


    <ul v-else-if="currentPage < 3" class="pagination-list" role="navigation">
      <li><a class="pagination-link" :class="{ 'is-current' : currentPage == 1 }" @click="selectPage(1)">1</a></li>
      <li><a class="pagination-link" :class="{ 'is-current' : currentPage == 2 }" @click="selectPage(2)">2</a></li>
      <li><a class="pagination-link" :class="{ 'is-current' : currentPage == 3 }" @click="selectPage(3)">3</a></li>

      <li><span class="pagination-ellipsis">&hellip;</span></li>

      <li><a class="pagination-link" @click="selectPage(pages)"> {{ pages }}</a></li>
    </ul>

    <ul v-else-if="currentPage > pages - 2" class="pagination-list" role="navigation">
      <li><a class="pagination-link" @click="selectPage(1)">1</a></li>

      <li><span class="pagination-ellipsis">&hellip;</span></li>

      <li><a class="pagination-link" :class="{ 'is-current' : currentPage == pages - 2 }"
          @click="selectPage(pages - 2)"> {{ pages - 2 }}</a></li>
      <li><a class="pagination-link" :class="{ 'is-current' : currentPage == pages - 1 }"
          @click="selectPage( pages - 1)">{{ pages - 1 }}</a></li>
      <li><a class="pagination-link" :class="{ 'is-current' : currentPage == pages }" @click="selectPage(pages)"> {{
      pages }}</a></li>
    </ul>

    <ul v-else class="pagination-list">
      <li><a class="pagination-link" @click="selectPage(1)">1</a></li>

      <li><span class="pagination-ellipsis">&hellip;</span></li>

      <li><a class="pagination-link" @click="selectPage(currentPage - 1)">{{ currentPage - 1 }}</a></li>
      <li><a class="pagination-link is-current">{{ currentPage }}</a></li>
      <li><a class="pagination-link" @click="selectPage(currentPage + 1)">{{ currentPage + 1 }}</a></li>

      <li><span class="pagination-ellipsis">&hellip;</span></li>

      <li><a class="pagination-link" :class="{ 'is-current' : currentPage == pages }" @click="selectPage(pages)"> {{
      pages }}</a></li>
    </ul>

  </nav>
</template>

<script>
export default {
  name: "WPagination",
  methods: {
    selectPage(page) {
      if (page <= this.pages && page > 0)
        this.$emit('update:currentPage', page)
    }
  },
  props: {
    pages: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
  },
  emits: ['update:currentPage']
}
</script>

<style lang="scss" scoped>

</style>