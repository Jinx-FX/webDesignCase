<template>
  <ul class="todo-main">
    <transition-group name="todo" appear>
      <TdItem v-for="todo of todos" :key="todo.id" :todo="todo" />
    </transition-group>
  </ul>
</template>

<script>
import TdItem from "./TdItem";

export default {
  name: "TdList",
  components: { TdItem },
  props: ["todos"],
};
</script>

<style scoped>
  /*main*/
  .todo-main {
    overflow: hidden;
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
	.todo-enter-active{
		animation: atguigu 0.5s linear;
	}

	.todo-leave-active{
		animation: atguigu 0.5s linear reverse;
	}

	@keyframes atguigu {
		from{
			transform: translateX(100%);
		}
		to{
			transform: translateX(0);
		}
	}
</style>
