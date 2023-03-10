<template>


  <div class="flip-card" v-if=" character!=null">
    <div class="flip-card-inner">
      <div class="flip-card-front"> <img :src="character.image"></div>
      <div class="flip-card-back">
        <img src="../assets/images/bg-card.jpeg" alt="">
        <div>
          <h3>{{character.name.toUpperCase()}}</h3>
          <p :class="character.status.toLowerCase()">status: {{ character.status }}</p>
          <p>Type: {{character.species}} </p>
          <p>sub-specie: {{character.type}}</p>
        </div>


      </div>
    </div>
  </div>

</template>

<script>

export default {

data() {
  return {
    newCharacter:null
  };
},
  props: ['character',],
  name: "character-card",
}
</script>

<style scoped>
.flip-card {
  background-color: transparent;
  width: 300px;
  height: 300px;
  perspective: 1000px; }

.flip-card-inner {
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); }

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
  border: none; }

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden; }

.flip-card-front {
  background-color: #bbb;
  color: black;
  border: 3px solid cornflowerblue; }

.flip-card-back {
  border: 5px solid white;
  color: black;
  transform: rotateY(180deg);
 }
.flip-card-back img {
  opacity: 0.6;
  position: absolute;
  width: 300px;
  height: 300px;
}

  .alive{
    background: Green;
  }
  .dead{
    background: Red;
  }
  .unknown{
    background: orange;
  }



.flip-card-back img{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: auto; }
.flip-card-back div{
  position :relative;
}

h3{
  font-size: 2rem;
}
p{
  opacity: 1;
  font-size: 1.3rem;

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