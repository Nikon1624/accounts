<template>
  <div class="app-input-wrapper" :class="inputData.className">
    <label :for="inputData.id" class="app-input__label">{{ inputData.label }}</label>
    <input @change="inputChanged($event)"
           :id="inputData.id"
           :type="inputData.type"
           :value="inputData.value"
           :required="inputData.required"
           class="app-input"
    >
  </div>
</template>

<script>
export default {
  name: "AppInput",
  props: {
    inputData: {
      type: Object,
      required: true
    }
  },
  methods: {
    inputChanged(evt) {
      this.$emit('changed', evt)
    }
  },
  beforeMount() {
    this.inputData.value = '';
  }
}
</script>

<style scoped>
.app-input__label {
  display: block;
  margin-bottom: 5px;
}

.app-input {
  display: block;
  width: 100%;
  margin: 0;
  padding: 5px 10px;
  border: 1px solid #e2e2e2;
  border-radius: 5px;
  outline: none;
}

.app-input:focus {
  border-color: #313131;
}
</style>