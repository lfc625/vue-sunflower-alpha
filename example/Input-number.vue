<template>
  <article class="article">
    <h1> InputNumber 计数器</h1>
    <p>仅允许输入标准的数字值，可定义范围</p>
    <h3>基础用法</h3>
    <div class="example">
      <div class="example-demo">
        <s-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></s-input-number>
      </div>
      <div class="example-code">
        <div class="description"><p>要使用它，只需要在<code>s-input-number</code>元素中使用<code>v-model</code>绑定变量即可，变量的初始值即为默认值。</p>
        </div>
        <pre><code>
&lt;template&gt;
  &lt;s-input-number v-model="num1" @change="handleChange" :min="1" :max="10"&gt;&lt;/s-input-number&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    data() {
      return {
        num1: 1
      };
    },
    methods: {
      handleChange(value) {
        console.log(value);
      }
    }
  };
&lt;/script&gt;
        </code></pre>
      </div>
    </div>
    <h3>禁用状态</h3>
    <div class="example">
      <div class="example-demo">
        <s-input-number v-model="num2" :disabled="true"></s-input-number>
      </div>
      <div class="example-code">
        <div class="description"><p><code>disabled</code>属性接受一个<code>Boolean</code>，设置为<code>true</code>即可禁用整个组件，如果你只需要控制数值在某一范围内，可以设置<code>min</code>属性和<code>max</code>属性，不设置<code>min</code>和<code>max</code>时，最小值为 0。
        </p></div>
        <pre><code>
&lt;template&gt;
  &lt;s-input-number v-model="num2" :disabled="true">&lt;/s-input-number&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    data() {
      return {
        num2: 1
      }
    }
  };
&lt;/script&gt;
        </code></pre>
      </div>
    </div>
    <h3>步数</h3>
    <p>允许定义递增递减的步数控制</p>
    <div class="example">
      <div class="example-demo">
        <s-input-number v-model="num3" :step="2" type="topBottom"></s-input-number>
      </div>
      <div class="example-code">
        <div class="description"><p>设置<code>step</code>属性可以控制步长，接受一个<code>Number</code>。</p></div>
        <pre><code>
&lt;template&gt;
  &lt;s-input-number v-model="num3" :step="2"&gt;&lt;/s-input-number&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    data() {
      return {
        num3: 5
      }
    }
  };
&lt;/script&gt;
        </code></pre>
      </div>
    </div>
    <h3>尺寸</h3>
    <p>额外提供了 <code>large</code>、<code>small</code> 两种尺寸的数字输入框</p>
    <div class="example">
      <div class="example-demo">
        <s-input-number size="large" v-model="num4"></s-input-number>
        <s-input-number v-model="num5"></s-input-number>
        <s-input-number size="small" v-model="num6" type="topBottom"></s-input-number>
      </div>
      <div class="example">
        <pre><code>
&lt;template&gt;
  &lt;s-input-number size="large" v-model="num4"&gt;&lt;/s-input-number&gt;
  &lt;s-input-number v-model="num5"&gt;&lt;/s-input-number&gt;
  &lt;s-input-number size="small" v-model="num6"&gt;&lt;/s-input-number&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
      data() {
          return {
              num4: 1,
              num5: 1,
              num6: 1
          }
      }
  };
&lt;/script&gt;
        </code></pre>
      </div>
    </div>
    <h3 id="attributes"> Attributes</h3>
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
        <td>value</td>
        <td>绑定值</td>
        <td>number</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <td>min</td>
        <td>设置计数器允许的最小值</td>
        <td>number</td>
        <td>—</td>
        <td>0</td>
      </tr>
      <tr>
        <td>max</td>
        <td>设置计数器允许的最大值</td>
        <td>number</td>
        <td>—</td>
        <td>Infinity</td>
      </tr>
      <tr>
        <td>step</td>
        <td>计数器步长</td>
        <td>number</td>
        <td>—</td>
        <td>1</td>
      </tr>
      <tr>
        <td>size</td>
        <td>计数器尺寸</td>
        <td>string</td>
        <td>large, small</td>
        <td>—</td>
      </tr>
      <tr>
        <td>disabled</td>
        <td>是否禁用计数器</td>
        <td>boolean</td>
        <td>—</td>
        <td>false</td>
      </tr>
      <tr>
        <td>controls</td>
        <td>是否使用控制按钮</td>
        <td>boolean</td>
        <td>—</td>
        <td>true</td>
      </tr>
      </tbody>
    </table>
    <h3 id="events"> Events</h3>
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
        <td>change</td>
        <td>绑定值被改变时触发</td>
        <td>最后变更的值</td>
      </tr>
      </tbody>
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
          <td>change</td>
          <td>绑定值被改变时触发</td>
          <td>最后变更的值</td>
        </tr>
        </tbody>
      </table>
    </table>

  </article>
</template>

<script>
  export default {
    data () {
      return {
        num1: 1,
        num2: 1,
        num3: 5,
        num4: 1,
        num5: 1,
        num6: 1
      }
    },
    methods: {
      handleChange(value) {
        console.log(value);
      }
    }
  }
</script>