<template>
  <div class="home-background">
    <div class="panel">
      <div class="header">
        Galerija
        <hr style="border: 2px solid rgb(255, 255, 255)" />

        <v-select
          v-model="selected_blender_version"
          :items="blender_versions"
          label="Blender verzija"
          small
          class="ml-0 mr-auto"
          style="width: 200px"
        >
        </v-select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "galerija",
  components: {},
};
</script>

<style scoped>
.home-background {
  background-color: #95f9ffa6;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  position: relative;
}

.header {
  background-color: #3bd5ea;
  color: #fff;
  font-size: 2em;
  text-align: left;
  padding: 10px 6px;
  flex: 0 0 auto;
}
</style>
