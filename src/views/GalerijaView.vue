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

      <v-row class="mt-2">
        <v-col
          v-for="model in filteredModels"
          :key="model.imageURL"
          class="d-flex child-flex flex-column"
          cols="4"
        >
          <div @click.prevent="navigateToModel(model)">
            <v-img
              :src="model.imageURL"
              aspect-ratio="1"
              cover
              class="bg-grey-lighten-2 mb-2"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey-lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <div class="model-title">{{ model.title }}</div>
            <div class="model-title2">{{ model.version }}</div>
          </div>
        </v-col>

        <v-pagination
          class="mb-16"
          v-model="currentPage"
          :length="totalPages"
          :total-visible="6"
        ></v-pagination>
      </v-row>
    </div>
  </div>
</template>

<script>
import router from "../router/index.js";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "@/firebase";

export default {
  name: "galerija",

  components: {},
  data() {
    return {
      router: router,
      blender_versions: [
        "sve verzije",
        "3.4",
        "3.3",
        "3.2",
        "3.1",
        "3.0, 2.9, 2.8, 1.7",
      ],
      selected_blender_version: "sve verzije",
      models: [],
      currentPage: 1,
      itemsPerPage: 6,
    };
  },
  async mounted() {
    this.models = this.$store.state.models;
    if (!this.model) this.callAgain();
  },
  methods: {
    // Fetch models from database and store them in Vuex store.
    async callAgain() {
      const querySnapshot = await getDocs(collection(db, "models"));
      let models = querySnapshot.docs.map((doc) => doc.data());
      this.models = models;
      this.$store.commit("setModels", models);
    },
    // Navigate to model's personal page.
    navigateToModel(model) {
      this.$router.push({
        name: "model-page",
        params: { model: model.title, modelData: model },
      });
    },
  },
  watch: {
    selected_blender_version() {
      this.currentPage = 1;
    },
  },

  computed: {
    // Filter models by search query
    filteredModels() {
      const query = this.$store.state.searchQuery;

      if (!query) return this.models;

      return this.models.filter((model) =>
        model.title.toLowerCase().includes(query.toLowerCase())
      );
    },
    // Pagination
    totalPages() {
      let filteredModels = this.models;
      if (this.selected_blender_version !== "sve verzije") {
        filteredModels = this.models.filter(
          (model) => model.version === this.selected_blender_version
        );
      }
      return Math.ceil(filteredModels.length / this.itemsPerPage);
    },
    // Pagination
    paginatedModels() {
      let filteredModels = this.models;
      if (this.selected_blender_version !== "sve verzije") {
        filteredModels = this.models.filter(
          (model) => model.version === this.selected_blender_version
        );
      }

      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return filteredModels.slice(start, end);
    },
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
  position: relative;
}

.model-title {
  background-color: white;
  color: black;
  text-align: center;
  padding: 5px 0;
  border-radius: 4px;
}
.model-title2 {
  background-color: #3bd5ea;
  color: black;
  text-align: center;
  padding: 5px 0;
  border-radius: 4px;
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
.v-img {
  height: 200px;
  width: 200px;
}
</style>
