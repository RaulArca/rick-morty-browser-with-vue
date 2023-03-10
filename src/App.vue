<script lang="js" xmlns="http://www.w3.org/1999/html">

import SearchBar from "@/components/search-bar.vue";
import FiltersAside from "@/components/filters-aside.vue";
import CharacterCard from "@/components/character-card.vue";
import Grid from "@/components/Grid.vue";
import episodesGrid from "@/components/episodes-grid.vue";
export default {
  components: {
    Grid,
    episodesGrid,
    CharacterCard,
    FiltersAside,
    SearchBar
  },
  data() {
    return {
      searchByEpisode: false,
      filtersSelected: {status:"",gender:"",whatToSearch:"name"},
      characters: [],
      episodes:[],
      query: '',
      status: '',
      url: 'https://rickandmortyapi.com/api/character/',
      nextUrlCharacters:"",
      urlEpisodes:"https://rickandmortyapi.com/api/episode",
      nextUrlEpisodes:"",
      filters: {
        texts :  [
            {name: "name", text: "Name"},
          {name: "species", text: "Species"},
          {name: "type", text: "Sub-species"},
          {name: "episodes", text: "Episode name"}],
        comboFilters: {
          status:[{name: "notStatus", text: "---"},{name: "unknownStatus", text: "Unknown"}, {name: "Alive", text: "Alive"}, {name: "Dead", text: "Dead"}],
          gender:[{name: "notGender", text: "---"},{name: "Female", text: "Female"}, {name: "Male", text: "Male"}, {name: "Genderless", text: "Genderless"},{name: "unknown", text: "Unknown"}]}
      }
    };
  },
  watch: {
    query() {
      this.search();
    },
    filtersSelected: {
      handler(newValue, oldValue) {
        this.search()
      },
      deep: true
    },


  },
  methods: {
    setWhatToSearch(query){
      if(query=="episodes")
        this.searchByEpisode=true
      else
        this.searchByEpisode=false
      this.filtersSelected.whatToSearch= query
    },
    setFilters(filter){
      switch (filter.target.value) {
        case "Alive":
          this.filtersSelected.status=filter.target.value;
          break;
        case "Dead" :
          this.filtersSelected.status=filter.target.value;
          break;
        case "unknownStatus":
          this.filtersSelected.status= "unknown";
          break;
        case "notStatus":
          this.filtersSelected.status="";
          break;
        case "Female":
          this.filtersSelected.gender= filter.target.value;
          break;
        case "Male":
          this.filtersSelected.gender= filter.target.value;
          break;
        case "Genderless":
          this.filtersSelected.gender= filter.target.value;
          break;
        case "unknown":
          this.filtersSelected.gender= filter.target.value;
          break;
        case "notGender":
          this.filtersSelected.gender="";
          break
      }
    },

    setQuery(query) {
      this.query = query;
    },
    search(){
      if(this.filtersSelected.whatToSearch=="episodes"){
        fetch(this.urlEpisodes +"?name=" + this.query).then(response => response.json())
            .then(data => {
              this.nextUrlEpisodes= data.info.next;
              this.episodes = data.results;
              console.log(this.characters);
            });
      }
      else
        fetch(this.url + '?'+ this.filtersSelected.whatToSearch+'=' + this.query + (this.filtersSelected.status ? '&status=' + this.filtersSelected.status : '')+
            (this.filtersSelected.gender ? '&gender=' + this.filtersSelected.gender : '')).then(response => response.json())
            .then(data => {
              this.nextUrlCharacters=data.info.next;
              this.characters = data.results;
              console.log(this.characters);
            });
    },
    next() {
      if(this.filtersSelected.whatToSearch=="episodes"){
        fetch(this.nextUrlEpisodes).then(response => response.json())
            .then(data => {
              this.nextUrlEpisodes= data.info.next;
              this.episodes.push(...data.results);
            });
      }
      else
      fetch(this.nextUrlCharacters).then(response => response.json())
          .then(data => {
            this.nextUrlCharacters=data.info.next;
            this.characters.push(...data.results);
            console.log(this.characters);
          });
    },
  },
  created() {

    this.search()
  },

};
</script>

<template class="template">

    <header class="header">

      <search-bar v-bind:texts="filters.texts" v-on:change="setWhatToSearch" v-on:search="setQuery"/>
    </header>
  <div class="body" >
    <transition>
      <aside class = "aside" v-if="!searchByEpisode">
        <filters-aside v-bind:filters="filters.comboFilters" v-on:change="setFilters" ></filters-aside>
      </aside>
    </transition>
    <transition>
    <main class = "main characters" v-if="!searchByEpisode">
      <grid class="scrolling-component" ref="scrollComponent">
        <transition-group  name="card">

          <character-card class="card" v-for= "character in characters" v-bind:key="character.id" v-bind:url="null" v-bind:character="character"></character-card>
        </transition-group>
      </grid>
      <button id="loadMore" @click="next">Load More</button>
    </main>
    </transition>

    <transition>
    <main class = "main" v-if="searchByEpisode">
      <transition-group  name="card" >
        <div class="scrolling-component" ref="scrollComponent">
        <episodes-grid class="card"  v-for="episode in episodes" v-bind:key="episode.id" v-bind:data="episode"></episodes-grid>
        </div>
      </transition-group>
      <button id="loadMore" @click="next">Load More</button>
    </main>
    </transition>
    <footer class = "footer"></footer>
  </div>



</template>

<style scoped>
 .header{
   display: flex;
   justify-content: center;
    margin-bottom: 10px;

 }

 .aside{
   display: grid;
   grid-area: aside;
   grid-row: 1/3;

 }
 .main{
   grid-area: main;
   grid-column-start: 2;
   grid-row-start: 1;

 }

 .characters{
   padding: 10px;
   border: 3px solid cornflowerblue;
   background: antiquewhite;
 }
 .body{
   display: grid;
   grid-template-columns: max-content max-content;
   grid-template-rows: max-content max-content ;
   grid-column-gap:  1px;
   grid-column-gap: 10px;
   grid-template-areas: "aside" "main"  ;
   background: #b3d4fc;
 }

 #loadMore{
   margin-top: 20px;
   width: 100%;
   height: 50px;
   border-radius: 10px;
   background: white;
   color:cornflowerblue;
   font-size: 1.5rem;
 }
 .card {
   transition: all 0.6s;

 }
 .card-enter, .card-leave-to
   /* .card-leave-active for <2.1.8 */ {
   opacity: 0;
   transform: scale(0);
 }
 .card-enter-to {
   opacity: 1;
   transform: scale(1);
 }

 .card-leave-active {
   /*position: absolute;*/
 }

 .card-move {
   opacity: 1;
   transition: all 0.5s;
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
