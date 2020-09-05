<template>
  <section class="cabinet">
    <h2 class="indents-reset cabinet__title">Личный кабинет</h2>
    <div class="cabinet__content">
      <AppButton @create-click="createAccount" :btn-data="createButtonData"></AppButton>
      <AccountsList v-if="!accountsEmpty"
                    :accounts-data="currentAccountPart"
                    @empty="setActiveAccountPartPrev"
                    @up-click="onUpClick"
                    @spend-click="onSpendClick"
                    @show-account-actions="showAccountActions"
      ></AccountsList>
      <Paginate v-if="paginationCount > 1"
                :page-count="paginationCount"
                :click-handler="switchPage"
                prev-text="Назад"
                next-text="Вперед"
                container-class="pagination"
                page-class="pagination__item"
                active-class="pagination__item--active"
                break-view-class="pagination__item--break"
      ></Paginate>
    </div>
    <Popup v-if="popupShowed"
           @close-popup="hidePopup"
           @popup-submit="refreshAccount"
           :popup-data="currentPopupData"
    ></Popup>
    <AccountActions v-if="actionsShowed"
                    :actions-data="needleAccountActions"
                    @close-actions="closeActions"
    ></AccountActions>
  </section>
</template>

<script>
import Paginate from 'vuejs-paginate';
import AccountsList from '@/components/AccountsList';
import Popup from '@/components/Popup';
import AccountActions from '@/components/AccountActions';
import AppButton from '@/components/elements/AppButton';
import {mapGetters} from 'vuex';

export default {
  name: "Cabinet",
  components: {
    AccountsList,
    Paginate,
    Popup,
    AccountActions,
    AppButton
  },
  data() {
    return {
      accountsPerStepCount: 10,
      activeAccountsPart: 0,
      popupShowed: false,
      actionsShowed: false,
      needleAccountActions: {},
      createButtonData: {
        className: 'cabinet__create-btn',
        value: 'Создать счет',
        type: 'button',
        clickHandler() {
          this.$emit('create-click');
        }
      },
      popupData: {
        up: {
          title: 'Пополнить счет',
          fields: [
            {
              type: 'text',
              id: 'amount',
              label: 'Введите сумму',
              value: '',
              regExp: /^\$?[0-9]+(\.[0-9][0-9])?$/,
              isValid: false,
              errorMsg: 'Допустимые значения: 10, 10.50 ...',
              required: true,
              className: 'popup__form-element'
            }
          ],
          btnValue: 'Пополнить',
          type: 'up'
        },
        spend: {
          title: 'Потратить деньги',
          fields: [
            {
              type: 'text',
              id: 'merchant',
              label: 'Название услуги',
              value: '',
              regExp: /./,
              isValid: false,
              errorMsg: '',
              required: true,
              className: 'popup__form-element'
            },
            {
              type: 'text',
              id: 'amount',
              label: 'Введите сумму',
              value: '',
              regExp: /^\$?[0-9]+(\.[0-9][0-9])?$/,
              isValid: false,
              errorMsg: 'Допустимые значения: 10, 10.50 ...',
              required: true,
              className: 'popup__form-element'
            }
          ],
          btnValue: 'Потратить',
          type: 'spend'
        },
        errorInsufficient: {
          title: 'Недостаточно средств для списания'
        }
      },
      currentPopupData: null,
      clickedAccount: null,
      popupAction: null
    };
  },
  methods: {
    createAccount() {
      this.$store.dispatch('accounts/createAccount');
    },
    switchPage(pageNum) {
      this.activeAccountsPart = pageNum - 1;
    },
    setActiveAccountPartPrev() {
      if (this.accountParts.length > 1) {
        this.activeAccountsPart = --this.activeAccountsPart;
      }
    },
    onUpClick(data) {
      this.clickedAccount = data.id;
      this.currentPopupData = this.popupData.up;
      this.showPopup();
    },
    onSpendClick(data) {
      this.clickedAccount = data.id;
      this.currentPopupData = this.popupData.spend;
      this.showPopup();
    },
    showPopup() {
      this.popupShowed = true;
    },
    hidePopup() {
      this.popupShowed = false;
    },
    refreshAccount(data) {
      const {amount, type} = data;
      const needleAccount = this.accounts.find((account) => account.id === this.clickedAccount);
      let payload = {
        account: needleAccount.id,
        amount: parseFloat(amount)
      };

      switch (type) {
        case 'up':
          this.hidePopup();
          this.$store.dispatch('accounts/upAccount', payload);

          break;
        case 'spend':
          payload.merchant = data.merchant;

          this.hidePopup();

          if (parseFloat(needleAccount.balance) < parseFloat(amount)) {
            this.currentPopupData = this.popupData.errorInsufficient;
            this.showPopup();
          } else {
            this.$store.dispatch('accounts/spendAccount', payload);
          }

          break;
      }
    },
    getAccountsActions() {
      return this.$store.dispatch('accounts/getAccountsActions');
    },
    async showAccountActions(data) {
      await this.getAccountsActions();

      const filterActions = (action) => {
        const filtered = [];

        action.forEach((item) => {
          if (item.account === data.id) {
            filtered.push({
              amount: item.amount,
              date: item.date
            });
          }
        });

        return filtered;
      };

      const uppers = this.accountsActions.uppers;
      const transactions = this.accountsActions.transactions;
      const needleUppers = filterActions(uppers);
      const needleTransactions = filterActions(transactions);

      this.needleAccountActions = {
        id: data.id,
        actions: [
          {
            title: 'Пополнения',
            actionsArr: needleUppers
          },
          {
            title: 'Расходы',
            actionsArr: needleTransactions
          }
        ]
      };

      this.actionsShowed = true;
    },
    closeActions() {
      this.actionsShowed = false;
    }
  },
  computed: {
    ...mapGetters('accounts', {
      accounts: 'accounts',
      accountsActions: 'accountsActions'
    }),
    accountsEmpty() {
      return this.accounts.length === 0;
    },
    accountParts() {
      return this.accounts.reduce((parts, item, index) => {
        if (index % this.accountsPerStepCount === 0) {
          parts.push([]);
        }

        parts[parts.length - 1].push(item);

        return parts;
      }, []);
    },
    currentAccountPart() {
      return this.accountParts[this.activeAccountsPart];
    },
    paginationCount() {
      return this.accountParts.length;
    }
  },
  beforeMount() {
    this.$store.dispatch('accounts/fetchAccounts');
  }
}
</script>

<style scoped>
.cabinet__title {
  margin-bottom: 20px;
  font-size: 38px;
}

.cabinet__create-btn {
  margin-bottom: 20px;
  padding: 10px 30px;
  font-size: 20px;
  background-color: #65bf00;
}

.cabinet__create-btn:active {
  transform: scale(0.925);
}
</style>