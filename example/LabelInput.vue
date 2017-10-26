<template>
      <article class="article">
        <h1>Label 标记:输入框</h1>
        <p>标记:输入框组件</p>
        <h3>基础用法</h3>
        <p>默认组宽200px，label宽80px，输入框自适应，可自定义，宽度，文字大小(配合input框大小)</p>
        <div class="example">
          <div class="example-demo">
            <s-label-input size="mini" label="姓名:">
              <s-input size="mini" v-model="value1"></s-input>
            </s-label-input>
            <s-label-input size="small" label="姓名:">
              <s-input size="small" v-model="value2"></s-input>
            </s-label-input>
            <s-label-input label="姓名:">
              <s-input v-model="value3"></s-input>
            </s-label-input>
            <s-label-input size="large" label="姓名:">
              <s-input size="large" v-model="value4"></s-input>
            </s-label-input>
          </div>
          <div class="example-code" >
          <pre>
            <code>
       &lt;s-label-input size="mini" label="姓名:"&gt;
              &lt;s-input size="mini" v-model="value1"&gt;&lt;/s-input&gt;
            &lt;/s-label-input&gt;
            &lt;s-label-input size="small" label="姓名:"&gt;
              &lt;s-input size="small" v-model="value2"&gt;&lt;/s-input&gt;
            &lt;/s-label-input&gt;
            &lt;s-label-input label="姓名:"&gt;
              &lt;s-input v-model="value3"&gt;&lt;/s-input&gt;
            &lt;/s-label-input&gt;
            &lt;s-label-input size="large" label="姓名:"&gt;
              &lt;s-input size="large" v-model="value4"&gt;&lt;/s-input&gt;
            &lt;/s-label-input&gt;
            &lt;script type="text/babel"&gt;
              export default {
                data() {
                  return {
                    value1: null,
                    value2: null,
                    value3: null,
                    value4: null
                  }
                }
              }
              &lt;script&gt;

              </code>
          </pre>
          </div>
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
            <td>label</td>
            <td>标记文字</td>
            <td>string</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>width</td>
            <td>组宽度</td>
            <td>Number</td>
            <td>-</td>
            <td>200</td>
          </tr>
          <tr>
            <td>labelWidth</td>
            <td>label宽度</td>
            <td>Number</td>
            <td>-</td>
            <td>80</td>
          </tr>
          <tr>
            <td>size</td>
            <td>label文字大小</td>
            <td>string</td>
            <td>默认,mini,small,large</td>
            <td>和input对应</td>
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
        value4: null
      }
    }
  }
</script>
