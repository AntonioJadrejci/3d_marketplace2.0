<template>
  <v-card class="mx-auto" max-width="400">
    <v-img class="white--text align-end" height="200px" :src="image">
      <v-card-title>{{ title }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0"> {{ owner }} </v-card-subtitle>

    <v-card-text class="text--primary">
      <div><b>Version:</b> {{ version }}</div>
      <div><b>Description:</b> {{ description }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn class="" fab dark small color="red">
        <v-icon dark> mdi-heart </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: ["image", "title", "owner", "description", "version"],
};
</script>
