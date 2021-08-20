<template>
<div class="backdrop"></div>
  <div class="spinner-1"></div>
</template>

<script>
export default {

}
</script>

<style scoped>
.backdrop{
    height: 100vh;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    background: rgba(0, 0, 0, .5);
}
.spinner-1 {
  width:50px;
  height:50px;
  border-radius:50%;
  border:8px solid;
  border-color:#000 #0000;
  animation:s1 1s infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 999;
}
@keyframes s1 {to{transform: rotate(.5turn)}}

</style>