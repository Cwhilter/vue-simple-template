import Vue from 'vue'
import routes from './routes'
import './assets/lib/common.css'
import './assets/lib/bootstrap/bootstrap.css'
import './assets/lib/bootstrap/bootstrap.min.js'
const app = new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  created(){ 
    if(!sessionStorage.number||sessionStorage.number=='null'){
        //this.currentRoute='/';      
    }  
  },
  computed: {
    ViewComponent () {
      const matchingView = routes[this.currentRoute]
      return matchingView
        ? require('./pages/' + matchingView + '.vue')
        : require('./pages/404.vue')
    }
  },
  render (h) {
    return h(this.ViewComponent)
  }
})
window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname
})
