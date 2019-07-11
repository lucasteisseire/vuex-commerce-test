<template>
  <div class="home">
    <h1>Book Shop</h1>
    <Products/>
  </div>
</template>

<script>
import Products from "@/views/Products"
// @ is an alias to /src

export default {
  name: "home",
  components: {
    Products
  }
};
</script>
