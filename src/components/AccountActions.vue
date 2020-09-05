<template>
  <div class="absolut-wrapper actions-wrapper">
    <div class="actions">
      <h3 class="indents-reset actions__title">Транзакция по счету: {{ actionsData.id }}</h3>
      <div class="actions__lists">
        <div v-for="(action, i) in actionsData.actions" :key="i" class="action__list-wrapper">
          <h4 class="indents-reset action__list-title">{{ action.title }}</h4>
          <ul class="list action__list">
            <li v-for="(item, i) in action.actionsArr" :key="i" class="action__list-item">
              <p class="action__list-item-sum">{{ item.amount }}р</p>
              <span class="action__list-item-date">{{ formatDate(item.date) }}</span>
            </li>
          </ul>
        </div>
      </div>
      <CloseButton @close-click="closeActions" class-name="actions__close-btn"></CloseButton>
    </div>
  </div>
</template>

<script>
import {formatDate} from '@/utils';
import CloseButton from '@/components/elements/CloseButton';

export default {
  name: "AccountActions",
  props: {
    actionsData: {
      type: Object,
      required: true
    }
  },
  components: {
    CloseButton
  },
  methods: {
    formatDate,
    closeActions() {
      this.$emit('close-actions');
    }
  }
}
</script>

<style scoped>
.actions {
  position: relative;
  width: 800px;
  padding: 10px 15px;
  border-radius: 5px;
  background-color: #ffffff;
  color: #000000;
}

.actions__lists {
  display: flex;
  justify-content: space-between;
}

.action__list-wrapper {
  width: 48%;
}

.actions__title {
  margin-bottom: 20px;
}

.action__list-item {
  margin-bottom: 10px;
  border: 1px solid #e2e2e2;
  border-radius: 5px;
  text-align: center;
}

.action__list-title {
  margin-bottom: 10px;
  text-align: center;
}

.action__list-item-sum {
  margin: 0 0 5px;
  padding: 0;
}

.action__list-item-date {
  font-size: 13px;
}

.actions__close-btn {
  top: 10px;
  right: 10px;
}

@media (max-width: 650px) {
  .actions {
    width: calc(100% - 40px);
  }
}
</style>