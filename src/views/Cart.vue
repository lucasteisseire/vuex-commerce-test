<template>
    <div>
        <h1>Cart</h1>
        <div v-if="cart">
            <div v-for="product in cart.products" :key="product.id">
                <i @click="incrementQuantity(product)" class="fas fa-plus-square fa-lg"></i>
                <i @click="decrementQuantity(product)" class="fas fa-minus-square fa-lg"></i>
               {{ product.quantity }} - {{ product.title }} - {{ product.price }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            incrementQuantity(product) {
                this.$store.dispatch("updateCart", product)
            },
            decrementQuantity(product) {
                this.$store.dispatch("removeOneFromcCart", product)
            }

        },
        computed: {
            cart() {
                return this.$store.state.cart 
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>