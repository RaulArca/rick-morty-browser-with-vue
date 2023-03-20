<template>
  <div class="grid-aside">
    <button @click="hide">{{hideFilters? "hide filters" : "show filters"}}</button>
    <transition>
    <label for="genderSelect " v-if="hideFilters">Gender: </label>
    </transition>
    <transition>
    <select id="genderSelect " v-on:change="changefilter($event.target.value)" v-if="hideFilters">
      <option v-for= "gender in genders" v-bind:value="gender.name" >{{gender.text}}</option>

    </select>
    </transition>
    <transition>
    <label for="statusSelect "  v-if="hideFilters">Status: </label>
    </transition>
    <transition>
    <select id="statusSelect " v-if="hideFilters" v-on:change="changefilter($event.target.value)">
      <option v-for= "state in status" v-bind:value="state.name" >{{state.text}}</option>
    </select>
    </transition>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { store } from '../store/store';

   export default defineComponent ({
    data() {
      return{
        hideFilters  : true
      }
    },
     computed: {
       genders() {
         return store.getters['search/getGender'];
       },
       status() {
         return store.getters['search/getStatus'];
       }
     },
     methods:{
       hide(){
         if(this.hideFilters){
           this.hideFilters=false;
         }
         else this.hideFilters= true;
       },

       changefilter(filter:string){
         store.commit('search/setSelectedFilters', filter,{root: true});

         store.dispatch('charactersAndEpisodes/search');
       }

     }
  })


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