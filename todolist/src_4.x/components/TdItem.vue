<template>
  <li>
    <label>
      <input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)" />
      <!-- 不推荐使用 v-model，因为其修改了 props 的数据，违反了原则 -->
      <!-- <input type="checkbox" v-model="todo.done" /> -->
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
  </li>
</template>

<script>
  import pubsub from 'pubsub-js';
  export default {
    name: "TdItem",
    props: ["todo"],
    methods: {
      handleCheck(id) {
        // this.checkTodo(id)
        // this.$bus.$emit('checkTodo', id)
        pubsub.publish('checkTodo', id)
      },
      handleDelete(id) {
        if(confirm("确定删除吗？")) {
          // this.delTodo(id)
          // this.$bus.$emit('delTodo', id)
          pubsub.publish('delTodo', id)
        }
      }
    }
  }
</script>

<style scoped>
  /*item*/
  li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
  }

  li label {
    float: left;
    cursor: pointer;
  }

  li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
  }

  li button {
    float: right;
    display: none;
    margin-top: 3px;
  }

  li:before {
    content: initial;
  }

  li:last-child {
    border-bottom: none;
  }

  li:hover {
    background-color: #ddd;
  }

  li:hover button {
    display: block;
  }
</style>
