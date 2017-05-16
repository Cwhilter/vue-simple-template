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
    console.log(document.cookie);
    if(!sessionStorage.number||sessionStorage.number=='null'){
        this.currentRoute='/';      
    }  
    else{
      var type=window.location.pathname.split('/').splice(1,1).pop()+'_info';
      if(type!==sessionStorage.type){
        sessionStorage.number=null;
        sessionStorage.type=null;
        sessionStorage.name=null;
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
