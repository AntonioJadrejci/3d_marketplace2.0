<template>
  <div class="home-background">
    <div class="panel">
      <div class="descr">
        <p2>
          Ovo je 3D marketplace, mjesto na kojemu možete pronaći veliki broj 3d
          modela koji su kompatibilni u programu blender. Isto tako možete i vi
          sami učiniti 3d marketplace boljim za upotrebu tako da objavite vaše
          vlastite 3d modele koji će pomoći drugim korisnicima.
        </p2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
};
</script>
<style scoped>
.home-Background {
  background-image: url("../assets/onama.jpeg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
  position: relative;
}

.panel {
  position: absolute;
  top: 20;
  left: 0;
  width: 50%;
  height: 300vh;
}

.descr {
  font-size: 40px;
  text-align: center;
  padding: 25px 0;
  margin-bottom: 25px;
}
</style>
