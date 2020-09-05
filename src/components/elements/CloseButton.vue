<template>
  <button @click="closeHandler" class="close-btn" :class="className" type="button"></button>
</template>

<script>
export default {
  name: "CloseButton",
  props: {
    className: {
      type: String,
      required: false
    }
  },
  methods: {
    closeHandler() {
      this.$emit('close-click');
    }
  }
}
</script>

<style scoped>
.close-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 15px;
  height: 15px;
  outline: none;
  cursor: pointer;
  border: none;
  background-color: transparent;
}

.close-btn::after,
.close-btn::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  margin: auto;
  background-color: #adadad;
  transition: 0.3s;
}

.close-btn::after {
  transform: rotate(45deg);
}

.close-btn::before {
  transform: rotate(-45deg);
}

.close-btn:hover::before,
.close-btn:hover::after {
  background-color: #313131;
  box-shadow: 0 0 5px 0 #313131;
}
</style>