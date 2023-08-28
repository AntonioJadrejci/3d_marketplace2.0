<template>
  <div class="app-container">
    <nav :color="'#01090a'" dark>
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

.search-field {
  max-width: 250px;
}
.search-field ::placeholder {
  color: #3bd5ea !important;
  font-size: large !important;
}
</style>
