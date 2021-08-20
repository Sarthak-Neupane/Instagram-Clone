<template>
  <div class="overlay" @click="close"></div>
  <div class="dialogBox">
    <div class="header" :class="mode">
      <slot name="title"></slot>
      <div class="circle" :class="circleMode"></div>
    </div>

    <main>
      <p><slot name="main"></slot></p>
    </main>
    <footer>
      <button @click="close">Close</button>
    </footer>
  </div>
</template>

<script>
export default {
  props: ["mode", "circleMode"],
  emits:['close-dialog'],
  methods: {
    close() {
      this.$emit("close-dialog");
    },
  },
};
</script>

<style lang="scss" scoped>
.overlay {
  height: 100vh;
  position: fixed;
  z-index: 998;
  width: 100vw;
  background: rgba(0, 0, 0, 0.4);
}
.dialogBox {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  min-width: 25rem;
  height: 15rem;
  //   border: 1px solid black;
  border-radius: 10px;
  overflow: hidden;
  background: whitesmoke;
  box-shadow: 1px 1px 7px 18px rgba(0, 0, 0, 0.4);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  .red {
    background: rgb(252, 28, 28);
  }

  .green {
    background: #189b1e;
  }

  .header {
    border-bottom: 1px solid black;
    font-size: 2.5rem;
    color: white;
    height: 40%;
    font-family: "Comic Neue", cursive;
    font-weight: 1000;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 .5rem;

    .circle {
      position: absolute;
      min-height: 50px;
      min-width: 50px;
      // background: white;
      background-image: url("../../assets/football.jpg");
      background-position: center;
      background-size: cover;
      border-radius: 50%;
      top: 100%;
      left: 50%;
      transform: translate(-50%, -50%);
      //   border: 5px solid green;
    }

    .circleRed {
      border: 5px solid rgb(223, 27, 27);
    }
    .circleGreen {
      border: 5px solid green;
    }
  }
  footer {
    width: 100%;
    height: 20%;

    button {
      width: 100%;
      height: 100%;
      background: rgba(145, 146, 202, 0.4);
      border: none;
      outline: none;
      cursor: pointer;

      &:hover {
        background: rgba(145, 146, 202, 0.2);
      }
    }
  }

  main {
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      padding: 1rem;
    }
  }
}
</style>
