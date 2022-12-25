<template>
  <div class="container">
    <UserSearch />
    <UserList />
  </div>
</template>

<script>
  import UserSearch from './components/UserSearch'
  import UserList from './components/UserList'


  export default {
    name: 'App',
    components: {UserSearch, UserList}
  }
</script>
