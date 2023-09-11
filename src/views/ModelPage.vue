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
    <div class="panel center-content">
      <v-img
        :src="modelData.imageURL"
        aspect-ratio="1"
        cover
        class="model-image"
      >
      </v-img>
      <h2 class="model-title text-box">
        Naslov: {{ modelData.title || "Nepoznato" }}
      </h2>
      <p class="model-description text-box">
        <b>Opis:</b> {{ modelData.description || "Nepoznato" }}
      </p>
      <p class="model-category text-box">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="47"
          viewBox="0 0 48 47"
          fill="none"
        >
          <path
            d="M40 20V16H32V8H28V16H20V8H16V16H8V20H16V28H8V32H16V40H20V32H28V40H32V32H40V28H32V20H40ZM28 28H20V20H28V28Z"
            fill="#3BD5EA"
          /></svg
        ><b>Kategorija:</b> {{ modelData.category || "Nepoznato" }}
      </p>
      <p class="model-version text-box">
        <b>Verzija:</b> {{ modelData.version || "Nepoznato" }}
      </p>
      <p class="model-owner text-box">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
        >
          <g clip-path="url(#clip0_16_1016)">
            <path
              d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM24 10C27.32 10 30 12.68 30 16C30 19.32 27.32 22 24 22C20.68 22 18 19.32 18 16C18 12.68 20.68 10 24 10ZM24 38.4C19 38.4 14.58 35.84 12 31.96C12.06 27.98 20 25.8 24 25.8C27.98 25.8 35.94 27.98 36 31.96C33.42 35.84 29 38.4 24 38.4Z"
              fill="#3BD5EA"
            />
          </g>
          <defs>
            <clipPath id="clip0_16_1016">
              <rect width="48" height="48" fill="white" />
            </clipPath>
          </defs></svg
        ><b>Vlasnik:</b> {{ modelData.owner }}
      </p>
      <div class="mt-4">
        <v-btn tile color="red" @click="addToFavourites()">
          <v-icon left> mdi-heart </v-icon>
          Dodaj u favorite
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, query, where, getDocs } from "@firebase/firestore";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { getDoc } from "firebase/firestore";

import router from "@/router";
import { db } from "@/firebase";

export default {
  name: "model-page",
  props: ["modelData"],
  components: {},
  data: () => ({}),
  methods: {
    // Adds model to user's favourites.
    async addToFavourites() {
      try {
        const userId = this.$store.state.userData.uid;

        const userRef = doc(db, "users", userId);

        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();

          if (
            userData.favourites &&
            userData.favourites.includes(this.modelData)
          ) {
            console.log("Model is already in favourites!");
            alert("Model je već u favoritima!");
            return;
          }

          await updateDoc(userRef, {
            favourites: arrayUnion(this.modelData),
          });

          console.log("Model added to favourites!");
          router.go();
        } else {
          console.error("User not found");
        }
      } catch (error) {
        console.error("Error adding model to favourites: ", error);
      }
    },
    // Fetches model data from Firestore.
    async fetchModelData(modelTitle) {
      const modelsRef = collection(db, "models");
      const querySnapshot = await getDocs(
        query(modelsRef, where("title", "==", modelTitle))
      );

      if (!querySnapshot.empty) {
        this.modelData = querySnapshot.docs[0].data();
      } else {
        console.log(`No document found with title: ${modelTitle}`);
      }
    },
  },
  computed: {},
  async mounted() {
    if (this.modelData) return;
    const modelName = this.$route.params.model;
    if (modelName) {
      await this.fetchModelData(modelName);
    }
  },
};
</script>

<style scoped>
.home-background {
  background-color: #95f9ffa6;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
  position: relative;
}

.center-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 1vh auto;
  padding: 0 20px;
}

.model-image {
  width: 50%;
  max-width: 600px; /* Adjust if needed */
  margin-bottom: 20px;
}

.model-title {
  font-size: 24px;
}

.model-description,
.model-category,
.model-owner {
  margin-bottom: 12px;
  text-align: center;
}

.header {
  background-color: #080c0c;
  color: #fff;
  font-size: 1.5em;
  padding: 5px;
  margin-bottom: 10px;
  border-radius: 5px;
}
.text-box {
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
}
</style>