<template>
  <article class="article">
    <h1>Tag标签</h1>
    <p>用于标记和选择</p>
    <h3>基础用法</h3>
    <div class="example">
      <div class="example-demo">
        <s-tag>标签一</s-tag>
        <s-tag type="gray">标签二</s-tag>
        <s-tag type="primary">标签三</s-tag>
        <s-tag type="success">标签四</s-tag>
        <s-tag type="warning">标签五</s-tag>
        <s-tag type="danger">标签六</s-tag>
      </div>
      <div class="example-code" >
        <pre><code>
         &lt;s-tag &gt;标签一&lt;/s-tag&gt;
         &lt;s-tag type=&quot;gray&quot;&gt;标签二&lt;/s-tag&gt;
         &lt;s-tag type=&quot;primary&quot;&gt;标签三&lt;/s-tag&gt;
         &lt;s-tag type=&quot;success&quot;&gt;标签四&lt;/s-tag&gt;
         &lt;s-tag type=&quot;warning&quot;&gt;标签五&lt;/s-tag&gt;
         &lt;s-tag type=&quot;danger&quot;&gt;标签六&lt;/s-tag&gt;
        </code></pre>
      </div>
    </div>
    <h3>可移除标签</h3>
    <div class="example">
      <div class="example-demo">
        <s-tag
                v-for="tag in tags"
                :closable="true"
                :type="tag.type"
                :key="tag.name"
        >
          {{tag.name}}

        </s-tag>
      </div>
      <div class="example-code" >
        <pre><code>
&lt;s-tag
v-for=&quot;tag in tags &quot;
:closable=&quot;true&quot;
:type=&quot;tag.type&quot;
:key=&quot;tag.name&quot;
 &gt;
 &#123; &#123;tag.name&#125; &#125;
 &lt;/s-tag&gt;

        </code></pre>
      </div>
    </div>
    <h3>动态编辑标签</h3>
    <p>动态编辑标签可以通过点击标签关闭按钮后触发的
      <code>close</code> 事件来实现</p>
    <h3> 动态编辑标签</h3>
    <div class="example">
      <div class="example-demo">
        <s-tag
                :key="tag"
                v-for="tag in dynamicTags"
                :closable="true"
                :close-transition="false"
                @close="handleClose(tag)"
        >
          {{tag}}
        </s-tag>
        <s-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="mini"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
        >
        </s-input>

        <s-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</s-button>
      </div>
      <div class="example-code" >
        <pre><code>
 &lt;s-tag
:key=&quot;tag&quot;
v-for=&quot;tag in  dynamicTags &quot;
:closable=&quot;true&quot;
:close-transition=&quot;false&quot;
:@close=&quot;handleClose(tag)&quot;
&gt;
 &#123; &#123;tag&#125; &#125;
&lt;/s-tag&gt;

        </code></pre>
      </div>
    </div>
      <h3 id="attributes"> Attributes</h3>
      <table class="table"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>可选值</th><th>默认值</th></tr></thead><tbody><tr><td>type</td><td>主题</td><td>string</td><td>primary/gray/success/warning/danger</td><td>—</td></tr><tr><td>closable</td><td>是否可关闭</td><td>boolean</td><td>—</td><td>false</td></tr><tr><td>close-transition</td><td>是否禁用关闭时的渐变动画</td><td>boolean</td><td>—</td><td>false</td></tr><tr><td>hit</td><td>是否有边框描边</td><td>boolean</td><td>—</td><td>false</td></tr><tr><td>color</td><td>背景色</td><td>string</td><td>—</td><td>—</td></tr></tbody></table>
      <h3 id="events"> Events</h3>
      <table class="table"><thead><tr><th>事件名称</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td>close</td><td>关闭tag时触发的事件</td><td>—</td></tr></tbody></table>
  </article>
</template>

<script>
  export default {
    data(){
      return {
        tags: [
          {name: '标签一', type: ''},
          {name: '标签二', type: 'gray'},
          {name: '标签三', type: 'primary'},
          {name: '标签四', type: 'success'},
          {name: '标签五', type: 'warning'},
          {name: '标签六', type: 'danger'}
        ],
        dynamicTags: ['标签一', '标签二', '标签三'],
        inputVisible: false,
        inputValue: ''
      }
    },
    methods: {
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    },
  }
</script>