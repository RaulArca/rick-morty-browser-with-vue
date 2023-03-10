<template>
<div class="grid-template">
    <slot></slot>
</div>
</template>

<script>
export default {
  name: "Grid"
}
</script>

<style scoped>
.grid-template{
  display: grid;
  grid-template-columns: repeat(4,minmax(200px, 1fr));
  grid-gap: 15px;

}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
</style>