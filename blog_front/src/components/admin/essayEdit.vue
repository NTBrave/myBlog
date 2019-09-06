<template>
  <div id="content" style="margin-left:0;width: 100%;">
    <div class="edit_wrap">
      <div class="return_button">
        <a-tooltip placement="topLeft">
          <template slot="title">
            <span>返回</span>
          </template>
          <a-button type="primary" @click="goBack">
            <a-icon style="font-size:17px;" type="left" />
          </a-button>
        </a-tooltip>
        <a-tooltip placement="topLeft" style="margin-left:5px">
          <template slot="title">
            <span>保存</span>
          </template>
          <a-button @click="saveessay">
            <a-icon style="font-size:17px;" type="save" />
          </a-button>
        </a-tooltip>
        <span style="margin-left:5%">
          <span class="edit_head">标题:</span>
          <el-input style="width: 40%;margin-left:10px" v-model="title" placeholder="请输入标题"></el-input>
        </span>
        <span>
          <span class="tag_wrap" style="margin-left:5%">
            <span style="margin-right:10px">标签:</span>
            <el-tag
              class="tag_margin"
              :key="tag"
              v-for="tag in labels"
              :closable="true"
              :close-trasition="true"
              @close="handleClose(tag)"
              type="primary"
            >{{ tag }}</el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="mini"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            ></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </span>
        </span>
      </div>

      <div>
        简介:
        <span>
          <el-input type="textarea" :rows="2" placeholder="请输入简介" v-model="gist"></el-input>
        </span>
      </div>

      <div class="edit_head">
        内容 (Markdown编辑器)
        <a-button @click="showHelp()">
          <a-icon type="question-circle" />
        </a-button>
      </div>
      <div class="markdown" :style="markedHeight">
        <textarea class="markdown_input" :style="inputW" v-model="content" @input="update"></textarea>
        <div class="markdown_compiled" :style="compileW" v-html="compiledMarkdown()"></div>
        <div class="help-infor" :style="helpW">
          <span @click="hidenHelp()"  style="float:right;margin:2% 4%">
            <a-icon type="arrow-right" />
          </span>
          <div style="background-color: inherit;">
            <h1>帮助文档</h1>
          </div>
          <div style="padding:1%">
            <div>
              <h1>
                <span>#</span> 一级标题
              </h1>
            </div>
            <div>
              <h2>
                <span>##</span> 二级标题
              </h2>
            </div>
            <div>
              <h3>
                <span>###</span> 三级标题
              </h3>
            </div>
            <div>
              <span>#...#</span>
            </div>

            <div>
              <h1>文本样式</h1>
            </div>
            <div>
              <span>*文字* _文字_ 斜体</span>
            </div>
            <div>
              <span>**文字** __文字__ 加粗</span>
            </div>
            <div>
              <span>==文字== 字体黄色背景</span>
            </div>

            <div>
              <h1>列表</h1>
            </div>
            <div>
              <span>-项目</span>
            </div>
            <div>
              <span>&nbsp;&nbsp;*项目</span>
            </div>
            <div>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;+项目</span>
            </div>
            <div>
              <span>1.项目</span>
            </div>
            <div>
              <span>2.项目</span>
            </div>
            <div>
              <span>3.项目</span>
            </div>
            <div>
              <span>-[&nbsp;]&nbsp;计划任务</span>
            </div>
            <div>
              <span>-[x]&nbsp;完成任务</span>
            </div>

            <div>
              <h1>链接</h1>
            </div>
            <div>
              <span>链接: [link](https://mp.csdn.net).</span>
            </div><div>&nbsp;</div>
            <div>
              <span>
                居中并且带尺寸的图片: 
                ![Alt](https://imgconvert.csdnimg.cn/
                aHR0cHM6Ly#pic_center =30x30)
              </span>
            </div>
            <div>
              <span>==文字== 字体黄色背景</span>
            </div>

            <div>
              <h1>代码</h1>
            </div>
            <div>
              <span>```</span>
            </div>
            <div>
              <span>code</span>
            </div>
            <div>
              <span>```</span>
            </div>
            <div>
              <span>或者</span>
            </div>
            <div>
              <span>```javascript</span>
            </div>
            <div>
              <span>code</span>
            </div>
            <div>
              <span>```</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import marked from "marked";
import hightlight from "highlight.js";
import "../../assets/atom-one-light.css";
import { mapState } from "vuex";
import * as Api from "../../api/api";

marked.setOptions({
  hightlight: function(code) {
    return hightlight.hightlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: true,
  sanitize: false,
  smartLists: true,
  smartypants: true,
  xhtml: false
});
export default {
  name: "essayEdit",
  data() {
    return {
      title: "",
      date: "",
      content: "",
      gist: "",
      labels: [],
      inputVisible: false,
      inputValue: "",
      inputW: { width: "42%" },
      compileW: { width: "42%" },
      helpW: { width: "16%" },
      markedHeight: { height: "" }

      // apiUrl: 'http://39.105.145.102:3000',
    };
  },
  computed: {
    ...mapState(["checkLogin"])
  },
  mounted: function() {
    // if(!this.checkLogin){
    //   this.$message.warning("请先登陆");
    //    this.$router.push('/admin/signin');
    // }
    // else
    // console.log(this.$route.params.id);

    // 获取屏幕高度
    this.markedHeight.height =
      document.documentElement.clientHeight - 310 + "px";

    if (this.$route.params.id) {
      Api.getEssay(this.$route.params.id)
        .then(
          response => {
            let essay = response.data;
            this.title = essay.title;
            this.date = essay.date;
            this.content = essay.content;
            this.gist = essay.gist;
            this.labels = essay.labels;
          }
          // response => console.log(response)
        )
        .catch(err => {
          console.log(err);
        });
    }
  },
  methods: {
    // 编译Markdown
    compiledMarkdown: function() {
      // return marked(this.content, { sanitize: true });
      return marked(this.content, {});
    },
    // 延时赋值给content
    update: _.debounce(function(e) {
      this.content = e.target.value;
    }, 300),
    // 获取发表时间
    getDate: function() {
      let mydate, y, m, d, hh, mm, ss;
      mydate = new Date();
      y = mydate.getFullYear();
      m = mydate.getMonth();
      d = mydate.getDate();
      hh = mydate.getHours();
      mm = mydate.getMinutes();
      ss = mydate.getSeconds();
      if (m < 10) m = "0" + m;
      if (d < 10) d = "0" + d;
      if (hh < 10) hh = "0" + hh;
      if (mm < 10) mm = "0" + mm;
      if (ss < 10) ss = "0" + ss;
      this.date = y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss;
    },
    // 保存文章
    saveessay: function() {
      let self = this;
      if (this.title.length === 0) {
        this.$notify({
          title: "提醒",
          message: "请输入标题",
          type: "warning"
        });
        return;
      }
      if (this.content.length === 0) {
        this.$notify({
          title: "提醒",
          message: "请输入内容",
          type: "warning"
        });
        return;
      }
      if (this.gist.length === 0) {
        this.$notify({
          title: "提醒",
          message: "请输入简介",
          type: "warning"
        });
        return;
      }
      if (this.$route.params.id) {
        // 更新文章

        let obj = {
          _id: this.$route.params.id,
          title: this.title,
          date: this.date,
          content: this.content,
          gist: this.gist,
          labels: this.labels
        };
        // console.log(obj);
        Api.updateEssay(obj)
          .then(
            response => {
              // console.log(response);
              self.$message({
                message: "更新文章成功" + response,
                type: "success"
              });
              // 更新完成后跳转至该文章的详情页
              self.$router.push("/essayDetail/" + self.$route.params.id);
            }
            // response => console.log(response)
          )
          .catch(err => {
            console.log(err);
          });
      } else {
        // 新建文章
        // 获取时间
        this.getDate();
        let obj = {
          title: this.title,
          date: this.date,
          content: this.content,
          gist: this.gist,
          labels: this.labels
        };
        // console.log(obj);

        Api.saveEssay(obj)
          .then(
            response => {
              // console.log(response);
              self.$message({
                message: "发表文章成功" + response,
                type: "success"
              });
              // 保存成功后跳转至文章列表页
              self.refreshessayList();
            }
            // response => console.log(response)
          )
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 保存成功后跳转至文章列表页
    refreshessayList: function() {
      this.$router.push("/admin/essayList");
    },
    goBack: function() {
      this.$router.go(-1);
    },
    // element标签组件
    handleClose: function(tag) {
      this.labels.splice(this.labels.indexOf(tag), 1);
    },
    showInput: function() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        console.log(_);

        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm: function() {
      let inputValue = this.inputValue;
      if (inputValue) this.labels.push(inputValue);
      this.inputVisible = false;
      this.inputValue = "";
    },

    showHelp() {
      this.inputW.width = "42%";
      this.compileW.width = "42%";
      this.helpW.width = "16%";
    },
    hidenHelp() {
      this.inputW.width = "50%";
      this.compileW.width = "50%";
      this.helpW.width = "0%";
    }
  }
};
</script>

<style>
.edit_wrap {
  /* margin: 5%; */
  /* left: 15%; */
  width: 100%;
  height: 100%;
  padding: 1%;
  font-size: 16px;
}

.return_button {
  padding-left: 5%;
  text-align: left;
  margin-bottom: 1%;
}

.tag_wrap {
  text-align: left;
  padding: 20px 0;
}

.tag_wrap .input-new-tag {
  width: 80px;
  height: 28px;
}

.edit_wrap textarea {
  outline: none;
  font-size: 16px;
}

.edit_head {
  margin: 20px 0;
  text-align: left;
}

.markdown {
  text-align: left;
  border: 1px solid #bfcbd9;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  width: 100%;
  height: 800px;
  vertical-align: top;
  background: #f5f7f9;
  overflow: hidden;
}

.markdown textarea {
  border: none;
  resize: none; /*不可拖动*/
}

.markdown_input {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

  float: left;
  display: inline-block;
  width: 50%;
  height: 100%;
  background-color: white;
  padding-left: 1%;
  padding-top: 1%;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
}

.markdown_compiled {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

  overflow: auto;
  /* float: right; */
  display: inline-block;
  width: 50%;
  height: 100%;
  padding: 5px 0 5px 1%;
}
.help-infor {
  background-color: rgba(0, 0, 0, 0.05);
  overflow: auto;
  float: right;
  height: 100%;
}

.save_button {
  padding: 40px 0;
}
</style>