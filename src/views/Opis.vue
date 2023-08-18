<template>
  <div>
    <div class="descr">
      <p2>
        Ovo je 3D marketplace, mjesto na kojemu možete pronaći veliki broj 3d
        modela koji su kompatibilni u programu blender. Isto tako možete i vi
        sami učiniti 3d marketplace boljim za upotrebu tako da objavite vaše
        vlastite 3d modele koji će pomoći drugim korisnicima.
      </p2>
    </div>
    <div class="home">
      <img
        alt="Pozadinska slika"
        class="Background"
        src="../assets/Background.png"
      />
    </div>
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
.descr {
  font-size: 40px;
  text-align: center;
  padding: 25px 0;
  margin-bottom: 25px;
}
</style>
