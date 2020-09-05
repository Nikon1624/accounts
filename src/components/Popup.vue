<template>
  <div class="absolut-wrapper popup-wrapper">
    <div class="popup">
      <h3 class="indents-reset popup__title">{{ popupData.title }}</h3>
      <form @submit.prevent="onSubmit" v-if="popupData.fields" class="popup__form">
        <AppInput v-for="(field, i) in popupData.fields"
                  @changed="validateInput($event.target, field.regExp, i)"
                  :input-data="field"
                  :key="i"
        ></AppInput>
        <AppButton :btn-data="submitButtonData"></AppButton>
      </form>
      <CloseButton @close-click="closePopup"></CloseButton>
    </div>
  </div>
</template>

<script>
import CloseButton from '@/components/elements/CloseButton';
import AppButton from '@/components/elements/AppButton';
import AppInput from '@/components/elements/AppInput';

export default {
  name: "Popup",
  props: {
    popupData: {
      type: Object,
      required: true
    }
  },
  components: {
    CloseButton,
    AppButton,
    AppInput
  },
  data() {
    return {
      submitButtonData: {
        className: 'popup__submit-btn',
        value: this.popupData.btnValue,
        type: 'submit',
        clickHandler() {}
      }
    };
  },
  methods: {
    closePopup() {
      this.$emit('close-popup');
    },
    onSubmit() {
      let fieldData = {
        type: this.popupData.type
      };

      for (let field of this.popupData.fields) {
        fieldData[field.id] = field.value;
      }

      this.$emit('popup-submit', fieldData);
    },
    validateInput(target, regExp, index) {
      const valid = regExp.test(target.value);
      this.popupData.fields[index].isValid = valid;

      if (!valid) {
        target.value = '';
        target.placeholder = this.popupData.fields[index].errorMsg;
      } else {
        this.popupData.fields[index].value = target.value;
      }
    }
  }
}
</script>

<style scoped>
.popup {
  position: relative;
  width: 400px;
  padding: 10px 15px;
  border-radius: 5px;
  background-color: #ffffff;
  color: #000000;
}

.popup__form-element {
  margin-top: 10px;
  margin-bottom: 10px;
}

.popup__submit-btn {
  width: 100%;
  background-color: #65bf00;
}

@media (max-width: 650px) {
  .popup {
    width: calc(100% - 40px);
  }
}
</style>