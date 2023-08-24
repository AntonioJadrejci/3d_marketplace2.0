<template>
  <div class="home">
    <img
      alt="Pozadinska slika"
      class="Background"
      src="../assets/Background.png"
    />
  </div>
</template>
<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
};
</script>
<style scoped>
.Background {
  position: relative;
  width: 100%;
  top: 0;
  left: 0;
}
</style>
