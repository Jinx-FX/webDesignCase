<template>
  <div id="app">
    <vCount />
    <hr>
    <vPerson />
  </div>
</template>

<script>
import vCount from './components/vCount'
import vPerson from './components/vPerson.vue'

export default {
  name: 'App',
  components: {
    vCount,
    vPerson
  }
}
</script>
