<template>
  <div class="home-background"></div>
</template>
<script>
export default {
  name: "HomeView",
  components: {},
};
</script>

<style scoped>
.home-background {
  background-image: url("../assets/Background.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100%;
  border-radius: 0 !important;
}
</style>
