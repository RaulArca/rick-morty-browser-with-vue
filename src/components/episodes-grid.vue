<template>
<div class="episode-card" v-if="episodecharacters!=[]">
  <h3>{{data.name}}</h3>
  <grid>
      <character-card v-for= "character in episodecharacters" v-bind:character="character"></character-card>
  </grid>
</div>
</template>

<script lang="ts">
import CharacterCard from "./character-card.vue";
import Grid from "./Grid.vue";
import { defineComponent } from 'vue'
export default defineComponent ({
  components: {
    Grid,
    CharacterCard,
  },
  created() {
    for(let url of this.data.characters){
      fetch(url)
          .then(response => response.json())
          .then(data => {
            this.episodecharacters.push(data)
          });
    }
  },
  props: ['data'],
  name: "episodes-grid",
  data() {
    return {
      episodecharacters  : []
    }
  }
})
</script>

<style scoped>
.episode-card{
  background: antiquewhite;
  padding-left: 2%;
  padding-right: 2%;
  padding-bottom: 1%;
  padding-top: 1%;
  margin-bottom: 1%;
  border-radius: 10px;
}


</style>