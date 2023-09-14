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
          <div v-if="toggle_upload_window">
            <v-card-text>
              <v-text-field
                dark
                label="Naslov"
                v-model="model.title"
              ></v-text-field>
              <v-text-field
                dark
                label="Blender Verzija"
                v-model="model.version"
              ></v-text-field>
            </v-card-text>
            <v-textarea
              v-model="model.description"
              solo
              name="input-7-4"
              label="Opis modela"
            ></v-textarea>
            <v-text-field
              dark
              label="Kategorija"
              v-model="model.category"
            ></v-text-field>

            <v-card-actions class="btn-container">
              <v-btn
                class="custom-btn mt-16"
                @click="toggle_upload_window = !toggle_upload_window"
                :color="'#3bd5ea'"
                >Dalje</v-btn
              >
            </v-card-actions>
          </div>
          <div v-else>
            <v-file-input
              :rules="rules"
              v-model="model.upload"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an avatar"
              prepend-icon="mdi-camera"
              label="Avatar"
            ></v-file-input>
            <v-row class="mb-4 mt-4">
              <v-btn class="custom-btn" @click="uploadModel">Objavi</v-btn>
            </v-row>
            <v-row>
              <v-btn
                class="custom-btn"
                @click="toggle_upload_window = !toggle_upload_window"
                >Povratak</v-btn
              >
            </v-row>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import router from "@/router";
import { storage, db } from "../firebase";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import {
  ref as firestoreRef,
  addDoc,
  collection,
  updateDoc,
  arrayUnion,
  doc,
} from "@firebase/firestore";

export default {
  name: "UploadNew",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    rules: [
      (value) => {
        return (
          !value ||
          !value.length ||
          value[0].size < 256000000 ||
          "Model size should be less than 256 MB!"
        );
      },
    ],
  },
  data() {
    return {
      showModal: false,
      toggle_upload_window: true,
      model: {
        title: "",
        version: "",
        description: "",
        category: "",
        upload: null,
      },
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
    async uploadModel() {
      if (!this.model.upload) {
        console.error("No file selected");
        return;
      }

      const storageReference = storageRef(
        storage,
        `uploads/${this.$store.state.userData.name}/${this.model.upload.name}`
      );

      const snapshot = await uploadBytes(storageReference, this.model.upload);
      const imageURL = await getDownloadURL(snapshot.ref);

      const modelData = {
        title: this.model.title,
        version: this.model.version,
        description: this.model.description,
        category: this.model.category,
        imageURL: imageURL,
        owner: this.$store.state.userData.name,
      };

      const modelDocRef = await addDoc(collection(db, "models"), modelData);

      const userDocRef = doc(db, "users", this.$store.state.userData.uid);
      await updateDoc(userDocRef, {
        my_models: arrayUnion(modelDocRef.id),
      });

      console.log("Model uploaded successfully!");

      router.go();
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
  width: 70% !important;
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
  overflow: hidden;
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