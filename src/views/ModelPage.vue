<template>
  <div class="home-background">
    <div class="header">
      <p
        class="mt-2"
        style="color: #3bd5ea; font-weight: bold; font-size: xx-large"
      >
        {{ modelData?.title || "Nepoznato" }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "model-page",
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
