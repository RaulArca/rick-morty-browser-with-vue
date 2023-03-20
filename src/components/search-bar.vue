<template>
<select class="select" v-on:change="setWhatToSearch($event.target.value)">
  <option v-for= "text in WhatToSearch" v-bind:value="text.name" >{{text.text}}</option>
</select>
<input class="input" placeholder="write to search" v-on:input="setQuery($event.target.value)"/>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import {store} from "../store/store";
export default defineComponent ({
  props: ['texts'],
  computed: {
    WhatToSearch() {
      return store.getters['search/getWhatToSearch'];
    },
    query(){
      return store.getters["search/getQuery"];
    },

  },
  watch: {
    query() {
      store.dispatch('charactersAndEpisodes/search');
    },
  },
  methods:{
    setQuery(query:string) {
      store.commit('search/setQuery', query)
    },
    setWhatToSearch(query:string){
      store.commit('search/setSelectedFiltersWhatToWatch', query);

      store.dispatch('charactersAndEpisodes/search');

    },
  }
})
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