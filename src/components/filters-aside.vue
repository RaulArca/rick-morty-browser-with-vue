<template>
  <div class="grid-aside">
    <button @click="hide">{{hideFilters? "hide filters" : "show filters"}}</button>
    <transition>
    <label for="genderSelect " v-if="hideFilters">Gender: </label>
    </transition>
    <transition>
    <select id="genderSelect " v-on:change="$emit('change',$event.value)" v-if="hideFilters">
      <option v-for= "gender in filters.gender" v-bind:value="gender.text" >{{gender.text}}</option>

    </select>
    </transition>
    <transition>
    <label for="statusSelect " v-on:change="$emit('change',$event.value)" v-if="hideFilters">Status: </label>
    </transition>
    <transition>
    <select id="statusSelect " v-if="hideFilters">
      <option v-for= "status in filters.status" v-bind:value="status.name" >{{status.text}}</option>
    </select>
    </transition>
  </div>

</template>

<script>
export default {
  props: ['filters'],
  data() {
    return{
      hideFilters : false
    }
  },
  methods:{
    hide(){
      if(this.hideFilters){
        this.hideFilters=false;
      }
      else this.hideFilters= true;
    }
  }
}
</script>

<style scoped>
  .grid-aside{
    display: grid;
    grid-template: repeat(5, max-content)/ auto;
  }
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }

</style>