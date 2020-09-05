<template>
  <div id="app">
    <div class="container">
      <Cabinet></Cabinet>
    </div>
  </div>
</template>

<script>
import Cabinet from '@/components/Cabinet';

export default {
  name: 'App',
  components: {
    Cabinet
  }
}
</script>

<style>
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 20px;
}

.pagination__item,
.pagination li {
  margin-right: 10px;
  border-radius: 5px;
  user-select: none;
}

.pagination__item:hover,
.pagination li:hover {
  box-shadow: 0 0 0 1px #ffffff;
}

.pagination__item a,
.pagination li a {
  display: block;
  padding: 10px;
  outline: none;
}

.pagination__item--active {
  box-shadow: 0 0 0 1px #ffffff;
  background-color: rgba(255, 255, 255, 0.4);
}

@media (max-width: 650px) {
  .pagination {
    font-size: 14px;
  }

  .pagination__item a,
  .pagination li a {
    padding: 5px;
  }
}
</style>
