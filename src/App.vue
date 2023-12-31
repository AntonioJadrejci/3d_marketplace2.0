<template>
  <v-app>
    <div class="app-container">
      <!-- Navigation Bar -->
      <v-app-bar :color="'#01090a'" dark>
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          color="#3bd5ea"
          class="custom-icon-size"
        >
        </v-app-bar-nav-icon>

        <div v-if="this.$store.state.userData.name" class="position-relative">
          <v-avatar
            class="ml-6"
            style="cursor: pointer"
            color="primary"
            size="42"
            @click="goToProfile()"
            ><v-img :src="this.$store.state.userData.image"></v-img
          ></v-avatar>
          <!--Level-->
          <span class="number-badge">{{
            this.$store.state.userData.level
          }}</span>
        </div>

        <v-btn
          v-if="this.$store.state.userData.name"
          class="mx-2 ml-12 square-btn"
          @click="toggleUploadWindow()"
          dark
          :color="'#3bd5ea'"
        >
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>

        <v-spacer></v-spacer>
        <div class="flex-center-image">
          <a href="/">
            <v-img
              alt="3D MARKETPLACE"
              contain
              :src="require('./assets/Naslov.png')"
              transition="scale-transition"
              max-height="100"
              max-width="600"
            />
          </a>
        </div>
        <v-spacer></v-spacer>

        <v-text-field
          class="white-background search-field"
          hide-details
          prepend-icon="mdi-magnify"
          single-line
          placeholder="Pretraživanje"
          ref="searchField"
          @input="handleSearchInput"
        >
        </v-text-field>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        color="#3bd5ea"
        width="350"
        absolute
        bottom
        temporary
      >
        <v-list nav dense>
          <v-list-item-group v-model="group" active-class="">
            <v-list-item-group v-model="group">
              <v-list-item
                class="custom-border"
                v-for="item in userComputed
                  ? menuItemsLoggedIn
                  : menuItemsLoggedOut"
                :key="item.title"
                @click="handleMenuItemClick(item)"
              >
                <v-list-item-title
                  class="drawer-item"
                  style="font-size: 2rem !important; padding: 25px"
                  >{{ item.title }}</v-list-item-title
                >
              </v-list-item>
            </v-list-item-group>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <!-- Content Area -->
      <div class="content">
        <v-card class="mx-auto">
          <router-view />

          <LoginWindow v-model="showLoginWindow" />
          <UploadNew v-model="showUploadWindow" />
        </v-card>
      </div>
      <!-- Footer -->
      <v-footer
        padless
        class="app-footer p-4"
        style="background-color: #01090a"
      >
        <v-container>
          <v-row>
            <v-col class="text-center blue-font" cols="12">
              Mnoštvo besplatnih 3D modela na jednom mjestu!
            </v-col>
          </v-row>
        </v-container>
      </v-footer>
    </div>
  </v-app>
</template>

<script>
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";

import router from "./router";
import LoginWindow from "./components/LoginWindow.vue";
import UploadNew from "./components/UploadNew.vue";

import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { collection, getDocs } from "@firebase/firestore";

export default {
  name: "App",
  components: {
    LoginWindow,
    UploadNew,
  },
  data: () => ({
    drawer: false,
    group: null,
    user: null,
    userData: [],
    router: router,
    showLoginWindow: false,
    showUploadWindow: false,
    menuItemsLoggedOut: [
      { title: "O nama", route: "/opis" },
      { title: "Prijava", action: "toggleLoginWindow" },
    ],
    menuItemsLoggedIn: [
      { title: "O nama", route: "/opis" },
      { title: "Galerija", route: "/galerija" },
      { title: "Profil", route: "/profil" },
      { title: "Favoriti", route: "/favoriti" },

      { title: "Odjava", action: "logout" },
    ],
  }),

  methods: {
    async logout() {
      try {
        await signOut(auth);
        console.log("Logged out successfully");
        router.go();
      } catch (error) {
        console.error("Error logging out:", error.message);
      }
    },
    // Search bar
    handleSearchInput() {
      const query =
        this.$refs.searchField && this.$refs.searchField.internalValue;
      this.$store.commit("setSearchQuery", query);

      if (this.$route.path !== "/galerija") {
        this.$router.push("/galerija");
      }
    },
    goToProfile() {
      if (this.user && this.$route.path !== "/profil")
        this.$router.push("/profil");
    },
    toggleLoginWindow() {
      this.showLoginWindow = !this.showLoginWindow;
    },
    toggleUploadWindow() {
      this.showUploadWindow = !this.showUploadWindow;
    },
    handleMenuItemClick(item) {
      if (item.action && typeof this[item.action] === "function") {
        this[item.action]();
        //Prevent redundant navigation
      } else if (item.route && this.$route.path !== item.route) {
        this.$router.push(item.route);
      }
    },
    // Fetch user data from Firestore
    async fetchUserData() {
      let data = null;
      if (auth.currentUser) {
        const userRef = doc(db, "users", this.user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          data = userSnap.data();
        } else {
          console.log("No user data found in Firestore");
        }
      }
      return data;
    },
    // Fetch models from Firestore
    async fetchModels() {
      const querySnapshot = await getDocs(collection(db, "models"));
      let models = querySnapshot.docs.map((doc) => doc.data());
      console.log(models);
      this.$store.commit("setModels", models);
    },
  },
  computed: {
    userComputed() {
      return this.user;
    },
  },

  watch: {
    group() {
      this.drawer = false;
    },
  },

  created() {
    // Listen for auth state changes
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User is logged in:", user.uid);
        this.user = user;
        // Use a mutation to update the Vuex store
        const fetchedData = await this.fetchUserData();
        this.userData = fetchedData;
        this.$store.commit("setUserData", fetchedData);
      } else {
        console.log("User is not logged in");
        this.user = null;
      }
    });
  },

  mounted() {
    this.fetchModels();
  },
};
</script>
<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1 0 auto;
}

.app-footer {
  flex-shrink: 0;
}
.drawer-item {
  color: white;
}
.custom-icon-size .v-icon {
  font-size: 2rem; /* Adjust the size as needed */
  height: 2rem;
  width: 2rem;
}
.blue-font {
  color: #3bd5ea;
  text-align: center;
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
}
v-text-field {
  border-radius: 4px;
  overflow: hidden;
}
.flex-center-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-field {
  max-width: 250px;
}
.search-field ::placeholder {
  color: #3bd5ea !important;
  font-size: large !important;
}
.custom-border:not(:last-child) {
  border-bottom: 3px solid white;
}
/*Add button*/
.square-btn.v-btn {
  width: 40px;
  height: 40px;
  min-width: 40px;
  padding: 0 !important;
}
/*Avatar*/
.position-relative {
  position: relative;
  display: inline-block; /* so it doesn't take full width */
}

.number-badge {
  position: absolute;
  font-weight: bold;
  bottom: -15px;
  right: -10px;
  color: #c500f6;
  border-radius: 50%;
  font-size: 1.4rem;
}
</style>
