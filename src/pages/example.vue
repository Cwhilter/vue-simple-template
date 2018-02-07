<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            Item 1
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            Item 2
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            Item 3
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            Item 4
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                Item 1
                            </template>
                            <MenuItem name="1-1">Option 1</MenuItem>
                            <MenuItem name="1-2">Option 2</MenuItem>
                            <MenuItem name="1-3">Option 3</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                Item 2
                            </template>
                            <MenuItem name="2-1">Option 1</MenuItem>
                            <MenuItem name="2-2">Option 2</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                Item 3
                            </template>
                            <MenuItem name="3-1">Option 1</MenuItem>
                            <MenuItem name="3-2">Option 2</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <span>
                            {{ $t("message.hello") }}
                        </span>
                        <div style="cursor:pointer;width:100px;height:40px;background:#fff;border:1px solid #ccc;line-height:40px;text-align:center;" @click="changeLang">
                            点我切换语言
                        </div>
                        <div><img src="../assets/images/404.jpg" alt=""></div>
                        <span v-for="(value,key) in menu_list" :key="key">
                        {{value}}
                        {{ $t("message.hello") }}
                        
                        </span>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>

import { mapGetters, mapActions } from 'vuex';

export default {
    computed: mapGetters({
        menu_list: 'menu_list'
    }),
    data(){
        return {
            lang: 'zh-CN',
            username: '',
            password: ''
        }
    },
    created() {
        console.log(this.$i18n.locale)
        this.$store.dispatch('get_menu_list',2).then(()=>{
            console.log(this.$store.state.menu_list)
        }); 
        this.$http({url:'/user'},(res) => {
            this.username = res.username;
        },(error) => {
            console.log(error)
        })
    },
    methods:{
        changeLang(){
            if(this.lang == 'en-US'){
                this.$i18n.locale = 'zh-CN';    
                this.lang = 'zh-CN';                        
            }else{
                this.$i18n.locale = 'en-US';     
                this.lang = 'en-US';                   
            }
        }
    }
}
</script>
<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
</style>
