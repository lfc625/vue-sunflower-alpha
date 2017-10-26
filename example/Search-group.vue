<template>
  <article class="article">
    <h1>SearchGroup 输入框组</h1>
    <p>输入框组组件</p>
    <h3>基础用法</h3>
    <p>组件有两个slot, 一个name为button的(插入button)和一个匿名的(插入输入框), 拖动浏览器窗口看效果</p>
    <div class="example">
      <div class="example-demo">
        <s-search-group :style="groupWidth" :searchHandler="test()">
          <s-form :inline="true" :model="formInline" class="demo-form-inline">
            <s-form-item label="审批人">
              <s-input v-model="formInline.user" placeholder="审批人"></s-input>
            </s-form-item>
            <s-form-item label="审批人">
              <s-input v-model="formInline.user" placeholder="审批人"></s-input>
            </s-form-item>
            <s-form-item label="审批人">
              <s-input v-model="formInline.user" placeholder="审批人"></s-input>
            </s-form-item>
            <s-form-item label="审批人">
              <s-input v-model="formInline.user" placeholder="审批人"></s-input>
            </s-form-item>
          </s-form>
        </s-search-group>
      </div>
      <example-code>
            <pre><code>
&lt;s-search-group :style="groupWidth"&gt;
    &lt;s-form :inline="true" :model="formInline" class="demo-form-inline"&gt;
        &lt;s-form-item label="审批人"&gt;
            &lt;s-input v-model="formInline.user" placeholder="审批人"&gt;&lt;/s-input&gt;
        &lt;/s-form-item&gt;
        &lt;s-form-item label="审批人"&gt;
            &lt;s-input v-model="formInline.user" placeholder="审批人"&gt;&lt;/s-input&gt;
        &lt;/s-form-item&gt;
        &lt;s-form-item label="审批人"&gt;
            &lt;s-input v-model="formInline.user" placeholder="审批人"&gt;&lt;/s-input&gt;
        &lt;/s-form-item&gt;
    &lt;/s-form&gt;
&lt;/s-search-group&gt;
  export default {
    data() {
      return {
        value1: null,
        value2: null,
        value3: null,
        value4: null,
        width: '100%'
      }
    }
  }
&lt;/script&gt;
            </code></pre>
      </example-code>
    </div>

    <h3>Attributes</h3>
    <table class="table">
      <thead>
      <tr>
        <th>参数</th>
        <th>说明</th>
        <th>类型</th>
        <th>可选值</th>
        <th>默认值</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>background</td>
        <td>header颜色</td>
        <td>string</td>
        <td>合法的CSS color</td>
        <td>#d1dbe5</td>
      </tr>
      </tbody>
    </table>
    <h3>Events</h3>
    <table class="table">
      <thead>
      <tr>
        <th>事件名称</th>
        <th>说明</th>
        <th>回调参数</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>-</td>
        <td>-</td>
        <td>-</td>
      </tr>
      </tbody>
    </table>
  </article>
</template>

<script type="text/babel">
  export default {
    data() {
      return {
        value1: null,
        value2: null,
        value3: null,
        value4: null,
        width: '100%',
        formInline: {
          user: ''
        }
      }
    },
    methods: {
      test() {
        return function () {
          console.log('测试方法');
        }
      }
    },
    computed: {
      groupWidth() {
        return 'width:' + this.width;
      }
    }
  }
</script>
