// CRUD (create read update delete) 

import axios from 'axios'

let baseUrl = "http://localhost:3000"

export default {
    getProducts() {
        return axios.get(`${baseUrl}/products`)
    },
    createProduct(book) {
        return axios.post(`${baseUrl}/products`, book)
    },
    addToCart(product) {
        // return axios.post(`${baseUrl}/cart`, product)
        return new Promise((resolve) => {
            let cartInLocalStorage = localStorage.getItem('vuex-commerce-cart')
            let cart = {}
            if(!cartInLocalStorage) {
                product.quantity = 1
                cart = { products: [ product ] }
                localStorage.setItem('vuex-commerce-cart', JSON.stringify(cart))
                resolve(cart)
            } else {
                const products = JSON.parse(localStorage.getItem('vuex-commerce-cart')).products
                const index = products.findIndex(p => p.id === product.id);
                // is the same product in the cart ? 
                if(index === -1) {
                    product.quantity = 1
                    cart = { products: [product, ...products]}
                } else {
                    products[index].quantity += 1
                    cart = {
                        products: [...products]
                    }
                }
            }
            localStorage.setItem('vuex-commerce-cart', JSON.stringify(cart))
            resolve(cart)
        })
    },
    removeOneFromCart(product) {
        return new Promise(resolve => {
            const products = JSON.parse(localStorage.getItem('vuex-commerce-cart')).products
            const index = products.findIndex(p => p.id === product.id)
            products[index].quantity -= 1
            // remove product from cart
            if(products[index].quantity === 0) {
                products.splice(index, 1)
            }
            const cart = {
                products: [...products]
            }
            localStorage.setItem("vuex-commer-cart", JSON.stringify(cart))
            resolve(cart)
        })
    }
    // getCart() {
    //     return axios.get(`${baseUrl}/cart`)
    // }
}