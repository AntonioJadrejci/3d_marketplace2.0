<template>
  <div>
    <v-dialog content-class="elevation-0" v-model="showModal" max-width="500">
      <v-card class="custom-shape svg-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="458"
          height="700"
          viewBox="0 0 458 700"
          fill="none"
        >
          <path
            d="M5 5H453V637.137L229.995 694.837L5 637.128V5Z"
            fill="#403D3D"
            stroke="#3BD5EA"
            stroke-width="10"
          />
        </svg>
        <div class="content-center">
          <div class="">
            <a href="/">
              <v-img
                alt="3D MARKETPLACE"
                contain
                :src="require('../assets/Naslov.png')"
                transition="scale-transition"
                max-height="100"
                max-width="600"
              />
            </a>
          </div>
          <hr
            style="
              height: 5px;
              border: none;
              color: white;
              background-color: white;
            "
          />
          <div v-if="toggle_login_window">
            <v-card-text>
              <v-text-field
                dark
                label="Vaša e-pošta"
                v-model="email"
              ></v-text-field>
              <v-text-field
                dark
                label="Vaša zaporka"
                type="password"
                v-model="password"
              ></v-text-field>
            </v-card-text>
            <v-card-actions class="btn-container">
              <v-btn class="custom-btn" @click="login">Prijava</v-btn>
              <v-btn class="custom-btn" text>Zaboravili ste zaporku?</v-btn>
              <v-btn
                class="custom-btn mt-16"
                @click="toggle_login_window = !toggle_login_window"
                :color="'#3bd5ea'"
                >Registracija</v-btn
              >
            </v-card-actions>
          </div>
          <div v-else>
            <h2>Registracija</h2>
            <v-card-text>
              <v-text-field dark label="Ime" v-model="name"></v-text-field>
              <v-text-field
                dark
                label="E-pošta"
                type="text"
                v-model="email"
              ></v-text-field>
              <v-text-field
                dark
                label="Zaporka"
                type="password"
                v-model="password"
              ></v-text-field>
            </v-card-text>

            <v-btn class="custom-btn" @click="register">Stvorite račun</v-btn>
            <div style="color: white">
              Već imate račun?
              <a
                style="color: #3bd5ea"
                @click="toggle_login_window = !toggle_login_window"
              >
                Prijavi se</a
              >
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase";
import router from "../router";
import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

export default {
  name: "LoginWindow",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showModal: false,
      name: "",
      email: "",
      password: "",
      toggle_login_window: true,
    };
  },
  watch: {
    value(val) {
      this.showModal = val;
    },
    showModal(val) {
      this.$emit("input", val);
    },
  },

  methods: {
    async login() {
      try {
        console.log("Logging in with:", this.email, this.password);
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        const user = userCredential.user;
        console.log("Logged in as:", user.uid);
        router.go();
      } catch (error) {
        console.error("Error logging in:", error.message);
        router.go();
      }
    },
    async register() {
      try {
        console.log("Registering with:", this.email, this.password);
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        const user = userCredential.user;
        console.log("Registered as:", user.uid);

        let result = await setDoc(doc(db, "users", user.uid), {
          name: this.name,
          email: this.email,
          uid: user.uid,
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/640px-SNice.svg.png",
          subscribers: [],
          my_models: [],
          level: 1,
          favourites: [],
        });

        console.log("User data added to Firestore");
        router.go();
      } catch (error) {
        console.error("Error registering:", error.message);
      }
    },
  },
};
</script>

<style scoped>
.custom-shape {
  background-color: transparent !important;
  box-shadow: none !important;
  position: relative;
  width: 100%;
  height: 100%;
}
.content-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  color: #3bd5ea !important;
  text-align: center;
  width: 60%;
}
.v-dialog {
  box-shadow: none;
}
.svg-container {
  position: relative;
  width: 100%;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.text-green input {
  color: #3bd5ea !important;
}

.btn-container {
  flex-direction: column;
}

.custom-btn {
  background-color: gray !important;
  color: #3bd5ea !important;
  margin-bottom: 10px;
}

.custom-btn:hover {
  background-color: darkgray !important;
}
</style>
