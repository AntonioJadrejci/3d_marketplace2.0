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

  components: { FavouriteCard },
  data() {
    return {
      favourite_models: [],
    };
  },
  async created() {
    try {
      const userId = this.$store.state.userData.uid;

      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        if (userData.favourites) {
          this.favourite_models = userData.favourites;
        }
      }
    } catch (error) {
      console.error("Error fetching favourites: ", error);
    }
  },
};
</script>

<style scoped>
.home-background {
  background-image: url("../assets/star_bg.png");
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

.margin-vertical {
  margin-top: 40px;
  margin-bottom: 40px;
  margin-left: 10px;
}
</style>
