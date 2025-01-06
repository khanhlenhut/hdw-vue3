<template>
  <div class="contact-view">
    <h1>Thông tin liên hệ</h1>
    <div v-if="userStore.loading">Đang tải...</div>
    <div v-else-if="userStore.user" class="contact-card">
      <img
        :src="userStore.user.image"
        :alt="userStore.user.firstName + ' ' + userStore.user.lastName"
        class="contact-image"
      />
      <div class="contact-details">
        <h2>{{ userStore.user.firstName }} {{ userStore.user.lastName }}</h2>
        <p><strong>Username:</strong> {{ userStore.user.username }}</p>
        <p><strong>Email:</strong> {{ userStore.user.email }}</p>
        <p><strong>Điện thoại:</strong> {{ userStore.user.phone }}</p>
        <p><strong>Ngày sinh:</strong> {{ userStore.user.birthDate }}</p>
        <p><strong>Tuổi:</strong> {{ userStore.user.age }}</p>
        <p>
          <strong>Giới tính:</strong>
          {{ userStore.user.gender === "male" ? "Nam" : "Nữ" }}
        </p>
        <p><strong>Nhóm máu:</strong> {{ userStore.user.bloodGroup }}</p>
        <p><strong>Chiều cao:</strong> {{ userStore.user.height }} cm</p>
        <p><strong>Cân nặng:</strong> {{ userStore.user.weight }} kg</p>
        <p><strong>Màu mắt:</strong> {{ userStore.user.eyeColor }}</p>
      </div>
    </div>
    <div v-else>Không có dữ liệu người dùng.</div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();

onMounted(() => {
  userStore.fetchUser();
});
</script>

<style scoped>
.contact-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.contact-card {
  display: flex;
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.contact-image {
  width: 128px;
  height: 128px;
  object-fit: cover;
}

.contact-details {
  padding: 20px;
  flex-grow: 1;
}

h1 {
  text-align: center;
  color: #333;
}

h2 {
  margin-top: 0;
  color: #444;
}

p {
  margin: 8px 0;
  color: #666;
}

strong {
  color: #444;
}
</style>
