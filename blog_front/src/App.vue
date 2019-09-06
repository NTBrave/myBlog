<template>
  <a-layout id="components-layout-demo-top-side-2">
    <!-- <a-layout class="mid-layout" :style="screenHeight"> -->
    <a-layout class="mid-layout">
      <a-layout-sider width="200" class="antSider" v-show="isInHome&&!isTooSmall">
        <a-menu
          mode="inline"
          :defaultSelectedKeys="['1']"
          :defaultOpenKeys="['sub1']"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-menu-item style="height: 100px;cursor:grab;" disabled>
            <a-avatar shape="square" :size="100" src="http://dayy.xyz/resource/favicon.png" />
            <span></span>
          </a-menu-item>

          <a-menu-item key="1">
            <router-link to="/">
              <a-icon type="home" />
              <span>首页</span>
            </router-link>
          </a-menu-item>

          <!-- <a-menu-item key="2" v-show="checkLogin"> -->
          <a-menu-item key="2">
            <router-link to="/admin/essayEdit">
              <a-icon type="edit" />
              <span>写文章</span>
            </router-link>
          </a-menu-item>

          <a-menu-item key="3" v-show="checkLogin">
            <!-- <a-menu-item key="3"> -->
            <router-link to="/admin/essayList">
              <a-icon type="tool" />
              <span>管理</span>
            </router-link>
          </a-menu-item>

          <a-menu-item key="4">
            <router-link to="/admin/signin">
              <a-icon type="user" />
              <span>登录</span>
            </router-link>
          </a-menu-item>

          <a-menu-item key="5">
            <router-link to="/about">
              <a-icon type="info-circle" />
              <span>关于</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="6">
            <router-link to="/jumping">
              <span>3D测试</span>
            </router-link>
          </a-menu-item>

       
            <a-menu-item key="6-1">
              <router-link to="/test">
                <span>画板</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="6-2">
              <router-link to="/jumping">
                <span>3D 1</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="6-3">
              <router-link to="/bg">
                <span>3D 2</span>
              </router-link>
            </a-menu-item>
            <a-menu-item disabled key="6-4">
              <router-link to="/jumping">
                <span>3D 3</span>
              </router-link>
            </a-menu-item>
      
        </a-menu>
      </a-layout-sider>

      <a-layout style="padding: 0 24px 24px">
        <!-- <a-popover placement="topLeft" v-show="!isInHome">
          <template slot="content">
            <div class="heng-munu">
              <a-menu model="inline">
                <a-menu-item style="cursor:grab;" disabled>
                  <a-avatar shape="square" :size="40" src="http://dayy.xyz/resource/favicon.png" />
                  <span></span>
                </a-menu-item>

                <a-menu-item key="1">
                  <router-link to="/">
                    <a-icon type="home" />
                    <span>首页</span>
                  </router-link>
                </a-menu-item>

                <a-menu-item key="2">
                  <router-link to="/admin/essayEdit">
                    <a-icon type="edit" />
                    <span>写文章</span>
                  </router-link>
                </a-menu-item>



                <a-menu-item key="3" v-show="checkLogin">
                  <router-link to="/admin/essayList">
                    <a-icon type="tool" />
                    <span>管理</span>
                  </router-link>
                </a-menu-item>

                <a-menu-item key="4">
                  <router-link to="/admin/signin">
                    <a-icon type="user" />
                    <span>登录</span>
                  </router-link>
                </a-menu-item>

                <a-menu-item key="5">
                  <router-link to="/about">
                    <a-icon type="info-circle" />
                    <span>关于</span>
                  </router-link>
                </a-menu-item>
              </a-menu>
            </div>
          </template>
          <div class="small-dao"><a-button>导航</a-button></div>
        </a-popover>-->

        <a-layout-header v-show="isInHome" style="background: #fff; padding: 0">
          <div class="heng-munu" v-show="isTooSmall">
            <a-menu mode="horizontal">
              <a-menu-item style="cursor:grab;" disabled>
                <a-avatar shape="square" :size="40" src="http://dayy.xyz/resource/favicon.png" />
                <span></span>
              </a-menu-item>

              <a-menu-item key="1">
                <router-link to="/">
                  <a-icon type="home" />
                  <span>首页</span>
                </router-link>
              </a-menu-item>

              <a-menu-item key="2">
                <router-link to="/admin/essayEdit">
                  <a-icon type="edit" />
                  <span>写文章</span>
                </router-link>
              </a-menu-item>

              <a-menu-item key="3" v-show="checkLogin">
                <!-- <a-menu-item key="3"/> -->
                <router-link to="/admin/essayList">
                  <a-icon type="tool" />
                  <span>管理</span>
                </router-link>
              </a-menu-item>

              <a-menu-item key="4">
                <router-link to="/admin/signin">
                  <a-icon type="user" />
                  <span>登录</span>
                </router-link>
              </a-menu-item>

              <a-menu-item key="5">
                <router-link to="/about">
                  <a-icon type="info-circle" />
                  <span>关于</span>
                </router-link>
              </a-menu-item>

          
                <a-menu-item key="6-1">
                  <router-link to="/test">
                    <span>画板</span>
                  </router-link>
                </a-menu-item>
                <a-menu-item key="6-2">
                  <router-link to="/jumping">
                    <span>3D 1</span>
                  </router-link>
                </a-menu-item>
                <a-menu-item key="6-3">
                  <router-link to="/bg">
                    <span>3D 2</span>
                  </router-link>
                </a-menu-item>
                <a-menu-item disabled key="6-4">
                  <router-link to="/jumping">
                    <span>3D 3</span>
                  </router-link>
                </a-menu-item>
              
            </a-menu>
          </div>
        </a-layout-header>
        <div>
          <router-view></router-view>
        </div>
      </a-layout>
    </a-layout>
    <a-layout-footer
      v-show="isInHome"
      style="text-align: center;height: 70px;bottom: 0;"
    >Design ©2018 Created by DLCai</a-layout-footer>
  </a-layout>
</template>

<script>
import { mapState } from "vuex";
import * as Api from "./api/api";

export default {
  name: "app",
  data() {
    return {
      essayNumber: "",
      collapsed: false,
      screenHeight: { height: "" },
      //此API可以向任何地方启用跨源请求。
      core: "https://cors-anywhere.herokuapp.com/",
      apiUrl: "http://39.105.145.102:3000",
      isInHome: true
      // isTooSmall: false
    };
  },
  computed: {
    ...mapState(["checkLogin", "isTooSmall"])
  },
  mounted: function() {
    Api.getAllEssay()
      .then(response => {
        //  console.log(response.data);
        this.essayList = response.data;
      })
      .catch(err => {
        console.log(err);
        this.$message.error("无法获取文章");
      });

    // 获取屏幕高度
    this.screenHeight.height =
      document.documentElement.clientHeight - 40 + "px";
    this.changeKeys(window.location.hash);
    if (document.documentElement.clientWidth < 1536) {
      this.$store.commit("setIsTooSmall", true);
      // this.isTooSmall = true;
    }
  },
  watch: {
    //监测url改变
    $route() {
      this.changeKeys(window.location.hash);
    }
  },
  methods: {
    //监测url改变
    changeKeys(hash) {
      console.log(hash);
      if (
        hash.search("#/admin/essayEdit") != -1 ||
        hash == "#/jumping" ||
        hash == "#/test"||
        hash == "#/lang"||
        hash == "#/123"
      ) {
        this.isInHome = false;
      } else {
        this.isInHome = true;
      }
      // if (hash == "#/coralWork") {
      //   this.selectedKeys = "2-1";
      // }

      // if (hash.search("#/area") != -1) {
      //   this.selectedKeys = "3-1";
      //   // this.noSearchPage = false;
      // }
      // if (hash == "#/coralManage") {
      //   this.selectedKeys = "3-2";
      //   // this.noSearchPage = true;
      // }
      // if (hash == "#/chart") {
      //   this.selectedKeys = "4-1";
      //   // this.noSearchPage = true;
      // }
    }
  }
};
</script>

<style>
canvas {
  /* width: 80%; */
  /* height: 80%; */
  display: block;
}
.heng-munu ul {
  width: 50%;
  margin: 0 auto;
}
/* #components-layout-demo-top-side-2{
  min-height: 100%;  
  margin-bottom: -70px; 
} */
/* .mid-layout {
  min-height: calc(100vh - 70px);
} */
.small-dao {
  width: 5%;
  position: fixed;
  left: 2.5%;
  top: 1%;
}
.ant-layout-footer {
  height: 40px !important;
  padding: 10px 0 0 0 !important;
}
#components-layout-demo-side .logo {
  height: 32px;
  /* background: rgba(255, 255, 255, 0.2); */
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.ant-layout {
  background-color: #fff !important;
}

.ant-layout-sider-trigger {
  /* background-color: #f5f7f9 !important; */
}
.antSider {
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.16), 0 0 9px rgba(0, 0, 0, 0.08);

  background: #fff !important;
  position: fixed !important;
  max-width: 150px !important;
  min-width: 150px !important;
  width: 150px !important;
  top: 64px;
  left: 5%;
}
.header {
  position: fixed !important;
  top: 0%;
  width: 90%;
  margin-right: 5%;
  margin-left: 5%;
  z-index: 9;
}
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

a {
  color: #545455;
  cursor: pointer;
  display: block;
}

.clear {
  clear: both;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
  font-weight: bold;
  line-height: 1.5;
}

h2,
h3,
h4,
h5,
h6 {
  margin: 20px 0 15px;
}

h1 {
  font-size: 22px;
}

@media (max-width: 767px) {
  h1 {
    font-size: 18px;
  }
}

h2 {
  font-size: 20px;
}

@media (max-width: 767px) {
  h2 {
    font-size: 16px;
  }
}

h3 {
  font-size: 18px;
}

@media (max-width: 767px) {
  h3 {
    font-size: 14px;
  }
}

h4 {
  font-size: 16px;
}

@media (max-width: 767px) {
  h4 {
    font-size: 12px;
  }
}

h5 {
  font-size: 14px;
}

@media (max-width: 767px) {
  h5 {
    font-size: 10px;
  }
}

h6 {
  font-size: 12px;
}

@media (max-width: 767px) {
  h6 {
    font-size: 8px;
  }
}

p {
  margin: 0 0 25px 0;
}

body {
  background-color: #f5f7f9;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* width: 100%; */
  /* height: 100%; */
}

.black_line {
  width: 100%;
  height: 2px;
  background: #000;
}

#main {
  overflow: hidden;
  width: 15%;
  text-align: center;
  /* margin: auto; */
}

#content {
  width: 700px;
  float: left;
  background: white;
}
#left_menu {
  float: left;
  /* left:0%; */
  width: 240px;
  margin-right: 20px;
}

@media (max-width: 767px) {
  #left_menu {
    display: none;
  }
}

#left_menu a:hover {
  color: #222;
  background: #f5f7f9;
}

.menu_name {
  background: rgb(38, 42, 48);
  color: white;
  padding: 10px 0;
}

nav {
  background: white;
  padding: 20px 0;
}

.nav {
  padding: 8px 20px;
  text-align: left;
}

.info {
  margin-top: 10px;
  padding: 20px;
  background: white;
}

.info_name {
  font-weight: 600;
  padding: 5px;
}

.info img {
  width: 120px;
  height: 120px;
}

.archive {
  padding-top: 20px;
}

.archive .archive_count {
  display: block;
  color: #222;
  font-weight: 600;
  font-size: 16px;
}

.archive .archive_name {
  display: block;
  color: #999;
  font-size: 14px;
}

.communication {
  padding-top: 20px;
}

.communication_item {
  display: inline-block;
  width: 40%;
  font-size: 14px;
  font-weight: 600;
  padding: 5px;
}
</style>