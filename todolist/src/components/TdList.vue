<template>
  <ul class="todo-main">
    <TdItem />
  </ul>
</template>

<script>
  import TdItem from './TdItem'

  export default {
    name: "TdList",
    components: {TdItem}
  }
</script>

<style scoped>
  /*main*/  
  .todo-main {
    margin-left: 0px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
  }

  .todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
  }
</style>
