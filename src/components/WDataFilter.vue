<template>
  <div class="field tag is-large pl-0 is-white has-addons">
    <div class="control has-icons-left">
      <div class="select">
        <select v-model="localModelValue.column">
          <option v-for="c in columns" :key="c.value" :value="c.value">
            {{ c.text }}
          </option>
        </select>
      </div>
      <div class="icon is-small is-left">
        <i class="fas fa-table"></i>
      </div>
    </div>
    <div class="control has-icons-left">
      <div class="select">
        <select v-model="localModelValue.operation">
          <option value="eq">&#61;</option>
          <option value="imatch">&#8715;</option>
          <option value="lt">&#60;</option>
          <option value="gt">&#62;</option>
        </select>
      </div>
      <div class="icon is-small is-left">
        <i class="fas fa-filter"></i>
      </div>
    </div>
    <input type="text" class="input" v-model.lazy="localModelValue.query" />
    <button class="delete" @click="$emit('delete:modelValue')"></button>
  </div>
</template>

<script>
export default {
  name: "WDataFilter",
  data() {
    return {
      localModelValue: JSON.parse(JSON.stringify(this.modelValue)),
    };
  },
  watch: {
    localModelValue: {
      handler() {
        if (
          this.localModelValue.column &&
          this.localModelValue.operation &&
          this.localModelValue.query
        ) {
          console.log("filter is ready");
          this.$emit("update:modelValue", this.localModelValue);
        }
      },
      deep: true,
    },
  },
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
  },
  inject: ["columns"],
};
</script>
