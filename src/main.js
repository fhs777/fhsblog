import { createApp } from 'vue'
import App from './App';

/*
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
*/
import { Menu, Pagination, Layout, Input, Affix, List, Modal  } from 'ant-design-vue';

import router from './router'
import store from './store'

import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});



const Vue = createApp(App)

Vue.config.errorHandler = (error, vm, info) => {
  console.info('error_info!!!!!!!!!!!!!!!!!!!!!!!!!')
  console.info(error);
  console.info(vm);
  console.info(info);
};
Vue.use(Menu).use(Pagination).use(Layout).use(Input).use(Affix).use(List).use(Modal)

Vue.use(VMdPreview).use(store).use(router).mount('#app')
