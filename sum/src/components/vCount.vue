<template>
  <div>
		<h1>当前求和为: {{sum}}</h1>
		<h3>当前求和放大10倍为: {{bigSum}}</h3>
		<h3>我在{{school}}，学习{{subject}}</h3>
		<h3 style="color:red">Person组件的总人数是: {{personList.length}}</h3>
		<select v-model.number="n">
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
		</select>
		<button @click="increment(n)">+</button>
		<button @click="decrement(n)">-</button>
		<button @click="incrementOdd(n)">当前求和为奇数再加</button>
		<button @click="incrementWait(n)">等一等再加</button>
	</div>
</template>

<script>
	import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
	export default {
		name:'vCount',
		data() {
			return {
				n:1
			}
		},
		computed: {
			//借助mapState生成计算属性，从state中读取数据。（对象写法）
			// ...mapState({he:'sum',xuexiao:'school',xueke:'subject'}),

			//借助mapState生成计算属性，从state中读取数据。（数组写法）
			// 依照源的顺序并且与源同名，下同，都有两种写法
			...mapState('countOptions', ['sum','school','subject']),	
			...mapState('personOptions',['personList']),
			...mapGetters('countOptions', ['bigSum'])
		},
		methods: {
			// increment() {
			// 	this.$store.commit("add", this.n)
			// },
			// decrement() {
			// 	this.$store.commit("reduce", this.n)
			// },
			...mapMutations('countOptions', {increment:"add", decrement:"reduce"}),
			// ...mapMutations(["add", "reduce"])
			// incrementOdd() {
			// 	this.$store.dispatch("addOdd", this.n)
			// },
			// incrementWait() {
			// 	this.$store.dispatch("addWait", this.n)
			// },
			...mapActions('countOptions', {incrementOdd:"addOdd", incrementWait:"addWait"}),
		},
	}
</script>

<style scoped>
	button{
		margin-left: 5px;
	}
</style>
