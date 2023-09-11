<template>
  <div class="home-background">
    <div class="panel">
      <div class="header">
        Favoriti
        <hr style="border: 2px solid rgb(255, 255, 255)" />
      </div>

      <div class="content">
        <v-row>
          <v-col v-for="model in favourite_models" :key="model.title">
            <FavouriteCard
              :image="model.imageURL"
              :title="model.title"
              :version="model.version"
              :description="model.description"
              :owner="model.owner"
            ></FavouriteCard>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import FavouriteCard from "@/components/FavouriteCard.vue";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
export default {
  name: "favoriti",
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
