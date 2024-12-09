<template>
  <h1>Danh sách sản phẩm</h1>

  <ul>
    <li v-for="product in products" :key="product.id">
      <router-link :to="'/products/' + product.id">{{
        product.name
      }}</router-link>
      <img :src="product.image" alt="Product Image" />
      <p>{{ product.price }}</p>
      <p>{{ product.description }}</p>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      products: [
        {
          id: 1,
          name: "Product 1",
          image: "https://via.placeholder.com/150",
          price: 19.99,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
          id: 2,
          name: "Product 2",
          image: "https://via.placeholder.com/150",
          price: 29.99,
          description:
            "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec in velit vel arcu semper aliquet.",
        },
        {
          id: 3,
          name: "Product 3",
          image: "https://via.placeholder.com/150",
          price: 39.99,
          description:
            "Quisque euismod mauris vel massa pharetra, vel ullamcorper mauris fringilla.",
        },
        {
          id: 4,
          name: "Product 4",
          image: "https://via.placeholder.com/150",
          price: 49.99,
          description:
            "Ut rutrum tortor at ipsum dignissim, at placerat nunc facilisis.",
        },
        {
          id: 5,
          name: "Product 5",
          image: "https://via.placeholder.com/150",
          price: 59.99,
          description:
            "In hac habitasse platea dictumst. Duis vel ante vel velit consectetur tristique.",
        },
      ],
    };
  },
};
</script>
