//本地语言包
import lzhCN from './zh-CN/index.js';
import lenUS from './en-US/index.js';

//i18n.js
import Vue from 'vue'
import VueI18n from 'vue-i18n';
//iview语言包
import izhCN from 'iview/src/locale/lang/zh-CN';
import ienUS from 'iview/src/locale/lang/en-US';
import izhTW from 'iview/src/locale/lang/zh-TW';

// 自动设置语言
const navLang = navigator.language;
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;
const lang = window.localStorage.lang || localLang || 'zh-CN';
Vue.use(VueI18n);

// 多语言配置
const messages = {
    'zh-CN': Object.assign(izhCN, lzhCN),
    'en-US': Object.assign(ienUS, lenUS)
};
const i18n = new VueI18n({
    locale: lang,
    messages: messages
});
export default i18n