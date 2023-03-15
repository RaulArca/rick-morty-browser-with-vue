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
  },computed: {
    characters() {
      return this.$store.getters['charactersAndEpisodes/getCharacters'];
    },
    episodes() {
      return this.$store.getters['charactersAndEpisodes/getEpisodes'];
    },
    searchByEpisode(){
      return this.$store.getters['search/getSearchByEpisode'];
    }
  },
  methods: {
    next() {
      this.$store.dispatch('charactersAndEpisodes/next',{root: true});
    },
  },
  created() {
    this.$store.dispatch('charactersAndEpisodes/search');
  },

};
</script>

<template class="template">

    <header class="header">

      <search-bar />
    </header>
  <div class="body" >
    <transition>
      <aside class = "aside" v-if="!searchByEpisode">
        <filters-aside></filters-aside>
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
