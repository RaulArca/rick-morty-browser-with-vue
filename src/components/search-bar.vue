<template>
<select class="select" v-on:change="$emit('change',$event.target.value)">
  <option v-for= "text in texts" v-bind:value="text.name" >{{text.text}}</option>
</select>
<input class="input" placeholder="write to search" v-on:input="$emit('search',$event.target.value)"/>
</template>

<script>
export default {
  props: ['texts']

}
</script>

<style scoped>
  .input{
    width: 60%;
    height: 20px;
    color: cornflowerblue;
    border-radius: 10px;
    border: 3px solid cornflowerblue;
  }
  .select{
    color: cornflowerblue;
    border-radius: 5px;
    border: 3px solid cornflowerblue;
  }
</style>