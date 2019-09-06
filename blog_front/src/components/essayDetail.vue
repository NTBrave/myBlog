<template>
  <div id="content">
    <div class="article_wrap">
      <div class="essay_title">
        <h1>{{ article.title }}</h1>
      </div>
      <div class="article_info">
        <span class="article_info_date">
          <h4>发表于：{{ article.date }}</h4>
        </span>
        <span class="article_info_label">
          标签：
          <span v-if="article.labels.length === 0">未分类</span>
          <el-tag
            v-else
            class="tag_margin"
            type="primary"
            v-for="(tag,index) in article.labels"
            :key="index"
          >{{ tag }}</el-tag>
        </span>
      </div>
      <div class="article_detail_content" v-html="compiledMarkdown()"></div>
    </div>
  </div>
</template>

<script>
import * as Api from "../api/api";

import marked from "marked";
import highlight from "highlight.js";
import "highlight.js/styles/monokai.css";
// import "../assets/atom-one-light.css";
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function(code) {
    return highlight.highlightAuto(code).value;
  },
  //任何相对链接的前缀url。
  baseUrl: null,
  //允许回车换行 如果为true，则添加<br>一个换行符
 breaks: false,
 gfm: true,
 headerIds: true,
 //如果为true，则id在发出标题时包含属性（h1，h2，h3等）。
 headerPrefix: "",
 //允许支持表格语法
  tables: true,
//用于在<code>块中为className添加前缀的字符串。用于语法突出显示。
 langPrefix: "language-",
 mangle: true,
 pedantic: false,
 //对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
 sanitize: false,
 sanitizer: null,
 silent: false,
//  使用比原生markdown更时髦的列表。
 smartLists: true,
 //使用更为时髦的标点
 smartypants: true,
 xhtml: false
});
export default {
  name: "articleDetail",
  data() {
    return {
      article: { labels: [] }
    };
  },
  mounted: function() {
    let id = this.$route.params.id;
    Api.getEssay(id)
      .then(
        response => {
          // console.log(JSON.stringify(response.data));
          this.article = JSON.parse(JSON.stringify(response.data));
          // console.log(this.article.labels.length);
        }
        // response => console.log(response)
      )
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    compiledMarkdown: function() {
      // return marked(this.article.content || "", { sanitize: true });
      return marked(this.article.content || "",this.compiled());
    },
    compiled(){
      console.log("完成");

    },
  }
};
</script>

<style>
#content {
  margin-left: 15%;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.16), 0 0 9px rgba(0, 0, 0, 0.08);
  /* left: 15%; */
  width: 75%;
  height: 100%;
}
.article_detail_title {
  cursor: default;
  /* margin: 40px 0 0; */
}

.article_detail_content {
  /* text-align: left; */
  /* padding: 60px 0; */
  font-size: 18px;
}
.article_wrap {
  padding: 2%;
}
code {
  color: #66d9ef !important;
  background: #383a42 !important;
}
/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 14px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  /* -webkit-box-shadow:inset 006 pxrgba(0,0,0,0.3); */
  border-radius: 10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
  /* -webkit-box-shadow:inset 006 pxrgba(0,0,0,0.5); */
}
::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(0, 0, 0, 0.1);
}
.essay_title{
      font-size: 24px;
    word-wrap: break-word;
}
</style>