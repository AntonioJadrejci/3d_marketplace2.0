<template>
  <div class="home-background">
    <div class="panel">
      <div class="header">
        O nama
        <hr style="border: 2px solid rgb(255, 255, 255)" />
      </div>
      <div class="content">
        Ovo je 3D marketplace, mjesto na kojemu možete pronaći veliki broj 3D
        modela koji su kompatibilni u programu blender.<br /><br />
        Isto tako možete i vi sami učiniti 3D marketplace boljim za upotrebu
        tako da objavite vaše vlastite 3D modele koji će pomoći drugim
        korisnicima.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "opis",
  components: {},
};
</script>
<style scoped>
.home-background {
  background-image: url("../assets/onama.jpeg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100%;
  position: relative;
}

.panel {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.7);
}

.header {
  background-color: #3bd5ea;
  color: #fff;
  font-size: 2em;
  text-align: left;
  padding: 10px 6px;
  flex: 0 0 auto;
}

.content {
  flex-grow: 1;
  padding: 10px 6px;
  font-size: 2em;
  background: rgba(255, 255, 255, 0.7);
}
</style>
