<template>
  <ul class="list accounts">
    <li v-for="account in accountsData" :key="account.id" class="block-layout accounts__item">
      <h3 @click="showAccountActions(account.id)" class="indents-reset accounts__item-title">Номер счета {{ account.id }}</h3>
      <p class="indents-reset accounts__item-balance">{{ account.balance }}р</p>
      <div class="accounts__item-actions">
        <AppButton v-for="(button, i) in buttonsData"
                   :btn-data="button"
                   :key="i"
                   @remove-click="removeAccount(account.id)"
                   @up-click="onUpClick(account.id)"
                   @spend-click="onSpendClick(account.id)"
                   class="accounts__action-btn"
        ></AppButton>
      </div>
    </li>
  </ul>
</template>

<script>
import AppButton from '@/components/elements/AppButton';

export default {
  name: "AccountsList",
  components: {
    AppButton
  },
  props: {
    accountsData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      buttonsData: [
        {
          className: 'action-btn--up',
          value: 'Пополнить',
          type: 'button',
          clickHandler() {
            this.$emit('up-click');
          }
        },
        {
          className: 'action-btn--spend',
          value: 'Потратить',
          type: 'button',
          clickHandler() {
            this.$emit('spend-click');
          }
        },
        {
          className: 'action-btn--remove',
          value: 'Удалить',
          type: 'button',
          clickHandler() {
            this.$emit('remove-click');
          }
        }
      ]
    };
  },
  methods: {
    removeAccount(id) {
      this.$store.dispatch('accounts/deleteAccount', {id});

      if (this.accountsData.length === 1) {
        this.$emit('empty');
      }
    },
    onUpClick(id) {
      this.$emit('up-click', {id});
    },
    onSpendClick(id) {
      this.$emit('spend-click', {id});
    },
    showAccountActions(id) {
      this.$emit('show-account-actions', {id});
    }
  }
}
</script>

<style scoped>
.accounts {
  margin: 0 0 10px;
}

.accounts__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;
}

.accounts__item-title {
  cursor: pointer;
}

.accounts__item-title:hover {
  text-decoration: underline;
}

.action-btn--up {
  background-color: #71b624;
}

.action-btn--spend {
  background-color: #5076f3;
}

.action-btn--remove {
  background-color: #cd3900;
}

@media (max-width: 650px) {
  .accounts__item {
    flex-direction: column;
  }

  .accounts__item-title,
  .accounts__item-balance {
    margin-bottom: 20px;
  }

  .accounts__item-actions {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .accounts__action-btn {
    width: 32%;
    margin-right: 0;
    padding-left: 0;
    padding-right: 0;
    text-align: center;
  }
}
</style>