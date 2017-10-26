<template>
  <article class="article">
    <h1 id="radio-dan-xuan-kuang">Radio 单选框</h1>
    <p>在一组备选项中进行单选</p>
    <h3 id="ji-chu-yong-fa">基础用法</h3>
    <p>由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。</p>
    <div class="example">
      <div class="example-demo">
        <s-radio class="radio" v-model="radio" label="1">备选项</s-radio>
        <s-radio class="radio" v-model="radio" label="2">备选项</s-radio>
      </div>
      <div class="example-code">
        <div class="description"><p>要使用 Radio 组件，只需要设置<code>v-model</code>绑定变量，选中意味着变量的值为相应 Radio <code>label</code>属性的值，<code>label</code>可以是<code>String</code>或者<code>Number</code>。
        </p></div>
        <pre><code>
&lt;template&gt;
  &lt;s-radio class="radio" v-model="radio" label="1"&gt;备选项&lt;/s-radio&gt;
  &lt;s-radio class="radio" v-model="radio" label="2"&gt;备选项&lt;/s-radio&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
      data () {
          return {
              radio: '1'
          };
      }
  }
&lt;/script&gt;
                    </code></pre>
      </div>
    </div>
    <h3 id="jin-yong-zhuang-tai">禁用状态</h3>
    <p>单选框不可用的状态。</p>
    <div class="example">
      <div class="example-demo">
        <label class="s-radio">
                        <span class="s-radio__input is-disabled">
                            <span class="s-radio__inner"></span>
                            <input type="radio" disabled="disabled" class="s-radio__original" value="禁用">
                        </span>
          <span class="s-radio__label">备选项<!----></span>
        </label>
        <label class="s-radio">
                        <span class="s-radio__input is-disabled is-checked">
                            <span class="s-radio__inner"></span>
                            <input type="radio" disabled="disabled" class="s-radio__original" value="选中且禁用">
                        </span>
          <span class="s-radio__label">备选项<!----></span>
        </label>
      </div>
      <div class="example-code">
        <div class="description"><p>注意：请牢记，选中的条件是绑定的变量值等于<code>label</code>中的值。只要在<code>s-radio</code>元素中设置<code>disabled</code>属性即可，它接受一个<code>Boolean</code>，<code>true</code>为禁用。
        </p></div>
        <pre><code>
&lt;template&gt;
  &lt;s-radio disabled v-model="radio1" label="禁用"&gt;备选项&lt;/s-radio&gt;
  &lt;s-radio disabled v-model="radio1" label="选中且禁用"&gt;备选项&lt;/s-radio&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
      data () {
          return {
              radio1: '选中且禁用'
          };
      }
  }
&lt;/script&gt;
                    </code></pre>
      </div>
    </div>
    <h3 id="dan-xuan-kuang-zu">单选框组</h3>
    <p>适用于在多个互斥的选项中选择的场景</p>
    <div class="example">
      <div class="example-demo">
        <s-radio-group v-model="radio2">
          <s-radio :label="3">备选项</s-radio>
          <s-radio :label="6">备选项</s-radio>
          <s-radio :label="9">备选项</s-radio>
        </s-radio-group>
      </div>
      <div class="example-code">
        <div class="description"><p>
          结合<code>s-radio-group</code>元素和子元素<code>s-radio</code>可以实现单选组，在<code>s-radio-group</code>中绑定<code>v-model</code>，在<code>s-radio</code>中设置好<code>label</code>即可，无需再给每一个<code>s-radio</code>绑定变量，另外，还提供了<code>change</code>事件来响应变化，它会传入一个参数<code>value</code>。
        </p></div>
        <pre><code>
&lt;template&gt;
  &lt;s-radio-group v-model="radio2"&gt;
    &lt;s-radio :label="3"&gt;备选项&lt;/s-radio&gt;
    &lt;s-radio :label="6"&gt;备选项&lt;/s-radio&gt;
    &lt;s-radio :label="9"&gt;备选项&lt;/s-radio&gt;
    &lt;/s-radio-group&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    data () {
      return {
        radio2: 3
      };
    }
  }
&lt;/script&gt;
                    </code></pre>
      </div>
    </div>
    <h3 id="an-niu-yang-shi">按钮样式</h3>
    <p>按钮样式的单选组合。</p>
    <div class="example">
      <div class="example-demo">
        <template>
          <s-radio-group v-model="radio3">
            <s-radio-button label="上海"></s-radio-button>
            <s-radio-button label="北京"></s-radio-button>
            <s-radio-button label="广州"></s-radio-button>
            <s-radio-button label="深圳"></s-radio-button>
          </s-radio-group>
          <div style="margin: 15px 0;"></div>
          <s-radio-group v-model="radio4">
            <s-radio-button label="上海"></s-radio-button>
            <s-radio-button label="北京" :disabled="true"></s-radio-button>
            <s-radio-button label="广州"></s-radio-button>
            <s-radio-button label="深圳"></s-radio-button>
          </s-radio-group>
          <div style="margin: 15px 0;"></div>
          <s-radio-group v-model="radio5" :disabled="true">
            <s-radio-button label="上海"></s-radio-button>
            <s-radio-button label="北京"></s-radio-button>
            <s-radio-button label="广州"></s-radio-button>
            <s-radio-button label="深圳"></s-radio-button>
          </s-radio-group>
        </template>
      </div>
      <div class="example-code">
        <div class="description"><p>只需要把<code>s-radio</code>元素换成<code>s-radio-button</code>元素即可，此外，Element 还提供了<code>size</code>属性给按钮组，支持<code>large</code>和<code>small</code>两种（如果不设定为默认）。
        </p></div>
        <pre><code>
&lt;template&gt;
  &lt;s-radio-group v-model="radio3"&gt;
    &lt;s-radio-button label="上海"&gt;&lt;/s-radio-button&gt;
    &lt;s-radio-button label="北京"&gt;&lt;/s-radio-button&gt;
    &lt;s-radio-button label="广州"&gt;&lt;/s-radio-button&gt;
    &lt;s-radio-button label="深圳"&gt;&lt;/s-radio-button&gt;
  &lt;/s-radio-group>
  &lt;div style="margin: 15px 0;"&gt;&lt;/div&gt;
  &lt;s-radio-group v-model="radio4"&gt;
    &lt;s-radio-button label="上海"&gt;&lt;/s-radio-button&gt;
    &lt;s-radio-button label="北京" :disabled="true"&gt;&lt;/s-radio-button&gt;
    &lt;s-radio-button label="广州"&gt;&lt;/s-radio-button&gt;
    &lt;s-radio-button label="深圳"&gt;&lt;/s-radio-button&gt;
  &lt;/s-radio-group&gt;
  &lt;div style="margin: 15px 0;">&lt;/div&gt;
  &lt;s-radio-group v-model="radio5" :disabled="true"&gt;
    &lt;s-radio-button label="上海">v/s-radio-button>
     &lt;s-radio-button label="北京"&gt;&lt;/s-radio-button&gt;
     &lt;s-radio-button label="广州"&gt;&lt;/s-radio-button&gt;
     &lt;s-radio-button label="深圳"&gt;&lt;/s-radio-button&gt;
  &lt;/s-radio-group&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
      data () {
          return {
              radio3: '上海',
              radio4: '上海',
              radio5: '上海'
          };
      }
  }
&lt;/script&gt;                   </code></pre>
      </div>
    </div>

    <h3 id="radio-attributes"> Radio Attributes</h3>
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
        <td>Radio 的 value</td>
        <td>string,number,boolean</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <td>disabled</td>
        <td>是否禁用</td>
        <td>boolean</td>
        <td>—</td>
        <td>false</td>
      </tr>
      <tr>
        <td>name</td>
        <td>原生 name 属性</td>
        <td>string</td>
        <td>—</td>
        <td>—</td>
      </tr>
      </tbody>
    </table>
    <h3 id="radio-group-attributes"> Radio-group Attributes</h3>
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
        <td>size</td>
        <td>Radio 按钮组尺寸</td>
        <td>string</td>
        <td>large, small</td>
        <td>—</td>
      </tr>
      <tr>
        <td>fill</td>
        <td>按钮激活时的填充色和边框色</td>
        <td>string</td>
        <td>—</td>
        <td>#20a0ff</td>
      </tr>
      <tr>
        <td>text-color</td>
        <td>按钮激活时的文本颜色</td>
        <td>string</td>
        <td>—</td>
        <td>#ffffff</td>
      </tr>
      </tbody>
    </table>
    <h3 id="radio-group-events"> Radio-group Events</h3>
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
        <td>绑定值变化时触发的事件</td>
        <td>选中的 Radio label 值</td>
      </tr>
      </tbody>
    </table>
    <h3 id="radio-button-attributes"> Radio-button Attributes</h3>
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
        <td>Radio 的 value</td>
        <td>string,number</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <td>disabled</td>
        <td>是否禁用</td>
        <td>boolean</td>
        <td>—</td>
        <td>false</td>
      </tr>
      </tbody>
    </table>
  </article>


</template>

<script>
  export default {
    data () {
      return {
        radio: '1',
        radio1: '选中且禁用',
        radio2: 3,
        radio3: '上海',
        radio4: '上海',
        radio5: '上海'
      }
    }
  }
</script>
