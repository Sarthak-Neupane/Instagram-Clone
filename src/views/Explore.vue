<template>
<h1>Discover More on Goalgram</h1>
 <div class="container">
  <figure>
    <img src="https://assets.codepen.io/12005/windmill.jpg" />
  </figure>
  <figure>
    <img src="https://assets.codepen.io/12005/suspension-bridge.jpg" />
  </figure>
  <figure>
    <img src="https://assets.codepen.io/12005/sunset.jpg" />
  </figure>
  <figure>
    <img src="https://assets.codepen.io/12005/snowy.jpg" />
  </figure>
  <figure>
    <img src="https://assets.codepen.io/12005/bristol-balloons1.jpg" />
  </figure>
  <figure>
    <img src="https://assets.codepen.io/12005/dog-balloon.jpg" />
  </figure>
  <figure>
    <img src="https://assets.codepen.io/12005/abq-balloons.jpg"  />
  </figure>
  <figure>
    <img src="https://assets.codepen.io/12005/disney-balloon.jpg" />
  </figure>
  <figure>
    <img src="https://assets.codepen.io/12005/bristol-harbor.jpg" />
  </figure>
  <figure>
    <img src="https://assets.codepen.io/12005/bristol-balloons2.jpg" />
  </figure>
  <figure>
  <img src="https://assets.codepen.io/12005/toronto.jpg" />
  </figure>
  <figure>
  <img src="https://assets.codepen.io/12005/toronto.jpg" />
  </figure>
  <figure>
  <img src="https://assets.codepen.io/12005/toronto.jpg" />
  </figure>
  <figure>
  <img src="https://assets.codepen.io/12005/toronto.jpg" />
  </figure>
  <figure>
  <img src="https://assets.codepen.io/12005/toronto.jpg" />
  </figure>
  <figure>
  <img src="https://assets.codepen.io/12005/toronto.jpg" />
  </figure>
  <figure>
  <img src="https://assets.codepen.io/12005/toronto.jpg" />
  </figure>
  <figure>
  <img src="https://assets.codepen.io/12005/toronto.jpg" />
  </figure>
</div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
h1{
  text-align: center;
  margin: 1.4rem 0 .4rem 0;
}
  
img {
  max-width: 100%;
  display: block;
}

figure {
  margin: 0;
  display: grid;
  grid-template-rows: 1fr auto;
  margin-bottom: 10px;
  break-inside: avoid;
}

figure > img {
  grid-row: 1 / -1;
  grid-column: 1;
}

figure a {
  color: black;
  text-decoration: none;
}


.container {
  column-count: 4;
  column-gap: 10px;
}
</style>