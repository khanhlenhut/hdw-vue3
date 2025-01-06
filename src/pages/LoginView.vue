<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="username"
                label="Username"
                name="username"
                prepend-icon="mdi-account"
                type="text"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/plugins/axios";
import { useAuthStore } from "@/stores/authStore";

const username = ref("");
const password = ref("");
const router = useRouter();
const authStore = useAuthStore();

const login = async () => {
  try {
    const response = await api.post("/auth/login", {
      username: username.value,
      password: password.value,
      expiresInMins: 2,
    });

    // Store the token in localStorage
    authStore.setAccessToken(response.data.accessToken);
    authStore.setRefreshToken(response.data.refreshToken);

    // Redirect to home page or dashboard
    router.push("/contact");
  } catch (error) {
    console.error("Login failed:", error);
    // Handle login error (e.g., show error message)
  }
};
</script>
