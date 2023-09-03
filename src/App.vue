<template>
  <div class="app-container">
    <!-- Navigation bar -->
    <nav :color="'#01090a'" dark>
      <v-btn
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
      >
      </v-text-field>
      <router-link style="text decoration: none" to="/"
        >3D MARKETPLACE</router-link
      >
      |
      <router-link style="text decoration: none" to="/Login"
        >Prijava</router-link
      >
      <router-link style="text decoration: none" to="/Signup"
        >Registracija</router-link
      >
      <router-link style="text decoration: none" to="/Opis">Opis</router-link>

      <router-link style="text decoration: none" to="/GalerijaView"
        >Galerija</router-link
      >
      <router-link style="text decoration: none" to="/ProfilView"
        >Profil</router-link
      >
      <router-link style="text decoration: none" to="/FavoritiView"
        >Favoriti</router-link
      >
      <router-link style="text decoration: none" to="/ModelPage"
        >Model Page</router-link
      >
    </nav>
    <router-view />

    <!-- Footer -->
    <v-footer padless class="app-footer p-4" style="background-color: #01090a">
      <v-container>
        <v-row>
          <v-col class="text-center blue-font" cols="12">
            Mnoštvo besplatnih 3D modela na jednom mjestu!
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </div>
</template>


<style lang="scss">
.app-container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  background-color: #000000;
}

nav {
  padding: 40px;

  a {
    font-weight: bold;
    color: #34f1f3;
    font-size: 20px;
    margin-right: 20px;

    &.router-link-exact-active {
      color: #34f1f3;
    }
  }
}
.app-footer {
  flex-shrink: 0;
}
.custom-icon-size .v-icon {
  font-size: 2rem; /* Adjust the size as needed */
  height: 2rem;
  width: 2rem;
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
</style>
