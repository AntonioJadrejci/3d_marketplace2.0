<template>
  <div class="home-background pt-4">
    <v-row>
      <v-col cols="3">
        <div class="panel">
          <div class="header">
            Profil
            <hr style="border: 2px solid rgb(255, 255, 255)" />
          </div>
          <div class="avatar-container">
            <v-avatar color="#3bd5ea" size="256">
              <img :src="userData.image" alt="User" />
            </v-avatar>
          </div>
          <div class="text-center mt-4" style="color: #3bd5ea">
            <p>{{ userData.name }}</p>
            <p>{{ userData.email }}</p>
          </div>
          <v-row class="d-flex justify-center">
            <v-col cols="12" md="6">
              <v-file-input
                dark
                v-model="selectedImage"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                label="Avatar"
              >
              </v-file-input>
            </v-col>
          </v-row>

          <v-row class="d-flex justify-center">
            <v-col cols="12" md="6">
              <v-btn class="custom-btn" @click="changeProfilePicture"
                >Promjeni sliku</v-btn
              >
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col></v-col>
      <v-col class="text-h4 mt-6 text-center"
        ><span style="color: #3bd5ea">Level </span>

        <v-avatar
          :color="'#3bd5ea'"
          style="color: #c500f6; font-weight: bold"
          size="64"
          >{{ userData.level }}</v-avatar
        >
      </v-col>
      <v-col class="text-h4 mt-6">
        <div class="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="72"
            height="72"
            viewBox="0 0 72 72"
            fill="none"
          >
            <g clip-path="url(#clip0_15_472)">
              <path
                d="M27 39H45V21H57L36 0L15 21H27V39ZM15 45H57V51H15V45Z"
                fill="#00F0FF"
              />
            </g>
            <defs>
              <clipPath id="clip0_15_472">
                <rect width="72" height="72" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <span style="color: #3bd5ea">{{ brojObjava }} objava </span>
        </div>
      </v-col>
      <div class="bottom-buttons">
        <v-btn
          @click="changePassword"
          class="large-btn mb-12"
          dark
          style="color: white"
          >Promjenite zaporku</v-btn
        >
        <v-btn
          @click="deleteAccount"
          class="large-btn"
          dark
          style="color: white"
          >Izbriši račun</v-btn
        >
      </div>
    </v-row>
  </div>
</template>

<script>
import router from "@/router";
import { mapState } from "vuex";
import { auth, storage, db } from "@/firebase";
import { getAuth, updatePassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export default {
  name: "profili",
  components: {},
};
</script>

<style scoped>
.home-background {
  background-image: url("../assets/profil_bg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 83vh;
  width: 100%;
  position: relative;
}

.panel {
  position: absolute;
  top: 0;
  left: 0;
  width: 40%;
  height: 75vh;
  display: flex;
  flex-direction: column;
  background: #01090a;
}

.header {
  background-color: #3bd5ea;
  color: #fff;
  font-size: 2em;
  text-align: left;
  padding: 10px 6px;
  flex: 0 0 auto;
  z-index: 1;
}
.avatar-container {
  margin-top: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bottom-buttons {
  position: absolute;
  right: 2%;
  width: 25%;
  bottom: 1%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10%;
  gap: 1rem;
}
.large-btn {
  font-size: 1.5rem;
  padding: 15px 30px;
  border-radius: 5px;
}
</style>
