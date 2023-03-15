<template>
<select class="select" v-on:change="setWhatToSearch($event.target.value)">
  <option v-for= "text in WhatToSearch" v-bind:value="text.name" >{{text.text}}</option>
</select>
<input class="input" placeholder="write to search" v-on:input="setQuery($event.target.value)"/>
</template>

<script>
export default {
  props: ['texts'],
  computed: {
    WhatToSearch() {
      return this.$store.getters['search/getWhatToSearch'];
    },
    query(){
      return this.$store.getters["search/getQuery"];
    },

  },
  watch: {
    query() {
      this.$store.dispatch('charactersAndEpisodes/search');
    },
  },
  methods:{
    setQuery(query) {
      this.$store.commit('search/setQuery', query)
    },
    setWhatToSearch(query){
      this.$store.commit('search/setSelectedFiltersWhatToWatch', query);

      this.$store.dispatch('charactersAndEpisodes/search');

    },
  }
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