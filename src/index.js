import Vue from 'vue'
import routes from './routes'
import './assets/lib/common.css'
import './assets/lib/bootstrap/bootstrap.css'
import './assets/lib/bootstrap/bootstrap.min.js'
import Cookies from './assets/lib/cookies.js'
const app = new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  created(){ 
    var number=Cookies.get('number');
    if(!number||number=='null'){
        //this.currentRoute='/';      
    }  
    else{
      var type=window.location.pathname.split('/').splice(1,1).pop()+'_info';
      if(type!==Cookies.get('type')){
        this.currentRoute='/';
      }
      
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
