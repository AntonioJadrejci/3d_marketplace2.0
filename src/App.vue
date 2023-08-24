<template>
  <div id="app">
    <nav>
      <div class="home">
        <img
          alt="Pozadinska slika"
          class="Background"
          src="./assets/Naslov.png"
          width="200px"
        />
      </div>
      <form class="navbar-form navbar-left" role="search">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Pretraživanje" />
        </div>
      </form>
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
  </div>
</template>

<style lang="scss">
#app {
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
</style>
