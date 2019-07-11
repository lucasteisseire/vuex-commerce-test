import Vue from "vue";
import Vuex from "vuex";
import productService from './services/productService'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    errors: [],
    cart: []
  },
  mutations: {
    GET_PRODUCTS(state, products) {
      state.products = products
    },
    CREATE_PRODUCT(state, product) {
      state.products = [product, ...state.products]
    },
    GET_PRODUCTS_ERROR(state, error) {
      state.errors = [error, ...state.errors]
    },
    UPDATE_CART(state, cart) {
      state.cart = cart
    },
    // GET_CART(state, products) {
    //   state.cart = products
    // }
  },
  actions: {
    getProducts({ commit }) {
      productService.getProducts().then(res => {
        const { data } = res
        commit('GET_PRODUCTS', data)
      })
      .catch(err => {
        const error = {
          date: new Date(),
          message: `failed to retrieve products: ${err}`
        }
        commit('GET_PRODUCTS_ERROR', error)
      })
    },
    // getCart({ commit }) {
    //   productService.getCart().then(res => {
    //     const { data } = res
    //     commit('GET_CART', data)
    //   })
    // },
    createProduct({ commit }, product) {
      productService.createProduct(product).then(() => {
        commit('CREATE_PRODUCT', product)
      })
      .catch(err => console.error(err.message))
    },
    updateCart({ commit }, product) {
      productService.addToCart(product).then(() => {
        commit('UPDATE_CART', JSON.parse(localStorage.getItem('vuex-commerce-cart'))
        )
      })
    }
  },
  getters: {
    getCart(state) {
      return state.cart
    },
    getNumberArticlesInCart(state) {
      if(!state.cart.products) return 0
        const numberArticles = state.cart.products.reduce((acc, curr) => {
          return acc + curr.quantity
        }, 0)
        return numberArticles
    }
  }
});
