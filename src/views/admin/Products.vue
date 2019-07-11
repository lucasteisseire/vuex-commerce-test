<template>
    <div>
        <router-link to="/admin/product-add"><h2> + add new book</h2></router-link>
        <ProductList/>
    </div>
</template>

<script>
import ProductList from "@/components/admin/ProductList"
    export default {
        components: {
            ProductList
        },
    }
</script>

<style scoped>

</style>