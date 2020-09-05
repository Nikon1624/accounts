<template>
  <button :class="`action-btn ${btnData.className}`"
          @click="clickHandler"
          :type="btnData.type"
  >{{ btnData.value }}</button>
</template>

<script>
export default {
  name: "AppButton",
  props: {
    btnData: {
      type: Object,
      required: true
    }
  },
  methods: {
    clickHandler() {
      this.btnData.clickHandler.call(this);
    }
  }
}
</script>

<style scoped>
.action-btn {
  padding: 5px 10px;
  font-size: 18px;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  transition: 0.3s;
  user-select: none;
}

.action-btn:active {
  transform: scale(0.955);
}

.action-btn:not(:last-child) {
  margin-right: 15px;
}
</style>