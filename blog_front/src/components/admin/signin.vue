<template>
  <div id="sign_wrap">
    <div class="signpage" :style='isTooSmall?"width:75%":"width:20%"'>
      <h1>后台管理</h1>
      <el-input v-model="name" placeholder="请输入用户名"></el-input>
      <el-input v-model="$data.paword" placeholder="请输入密码" type="password"></el-input>
      <el-button v-show="checkLogin" size="mini" @click="signup">注册</el-button>
      <el-button v-show="checkLogin" size="mini" @click="signout">注销</el-button>
      <!-- v-show="checkLogin" -->
      <el-button type="primary" size="mini" @click="signin">登录</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import * as Api from "../../api/api";

export default {
  name: "signin",
  data() {
    return {
      name: "",
      paword: "",
      hasName: false // 用户名被占
    };
  },
  computed: {
    ...mapState(["checkLogin","isTooSmall"])
  },
  mounted: function() {},
  methods: {
    signup: function() {
      let _this = this;
      if (this.name.length < 6) {
        this.$message.error("用户名不能为空或小于六个字符");
        return;
      }

      if (this.$data.paword.length < 6) {
        this.$message.error("密码不能为空或小于六个字符");
        return;
      }

      Api.getUser(this.name)
        .then(res => {
          // console.log(res.data);
          if (res.data.name === _this.name) {
            _this.$message.error("该用户已存在");
            _this.name = "";
          } else {
            let obj = {
              name: _this.name,
              password: _this.$data.paword
            };
            Api.newUser(obj)
              .then(res => {
                // console.log(res);

                _this.$message({
                  message: "注册成功"+res,
                  type: "success"
                });
              })
              .catch(err => {console.log(err)});
          }
        })
        .catch(err => {console.log(err)});

    },
    signin: function() {
      let _this = this;
      if (_this.name.length < 6) {
        this.$message.error("用户名不能为空或小于六个字符");
        return;
      }

      if (_this.$data.paword.length < 6) {
        this.$message.error("密码不能为空或小于六个字符");
        return;
      }

     Api.getUser(this.name).then(
        response => {
          if (_this.$data.paword !== response.data.password) {
            _this.$message.error("用户名或密码不正确");
          } else {
            let obj = {
              name: _this.name,
              password: _this.password
            };
            Api.Login(obj)
              .then(
                response => {
                  // console.log(response);

                  _this.$message({
                    message: "登录成功"+ response,
                    type: "success"
                  });
                  _this.$store.commit("setCheckLogin", true);
                  delete _this.$data.paword;
                  _this.$router.go(-1);
                }
                // response => console.log("登录失败" + response)
              ).catch(err => {console.log(err)});
          }
        },
        response => {
          // console.log(response.data);
          _this.$message.error("该用户不存在"+response);
          return;
        }
      ).catch(err => {console.log(err)});
    },
    signout(){
      this.$store.commit("setCheckLogin",false);
    }
  }
};
</script>

<style>
#sign_wrap {
  margin-left: 15%;
  width: 80%;
  height: 20%;
  /* left: 15%; */

  /* width: 85%; */
  /* height: 100%; */
  /* width: 300px; */
  /* margin: 200px auto; */
}

#sign_wrap h1 {
  color: #383a42;
  padding: 10px;
}

#sign_wrap div {
  padding-bottom: 20px;
}
.signpage {
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

  width: 20%;
  /* height: ; */
}
</style>