<template>
  <article class="article">
    <h1>Tabs 标签页: 分隔内容上有关联但属于不同类别的数据集合</h1>
    <h3>基础用法: 基础的、简洁的标签页</h3>
    <div class="example">
      <div class="example-demo">
        <s-tab active-key="key1">
          <s-tab-pane label="标签一" key="key1">标签一的内容</s-tab-pane>
          <s-tab-pane label="标签二" key="key2">标签二的内容</s-tab-pane>
          <s-tab-pane label="标签三" key="key3">标签三的内容</s-tab-pane>
        </s-tab>
      </div>
      <div class="example-code">
                <pre><code>
&lt;s-tab active-key="key1"&gt;
    &lt;s-tab-pane label="标签一" key="key1"&gt;标签一的内容&lt;/s-tab-pane&gt;
    &lt;s-tab-pane label="标签二" key="key2"&gt;标签二的内容&lt;/s-tab-pane&gt;
    &lt;s-tab-pane label="标签三" key="key3"&gt;标签三的内容&lt;/s-tab-pane&gt;
&lt;/s-tab&gt;
&lt;script&gt;
    export default {
    }
&lt;/script&gt;
</code></pre>
      </div>
    </div>
    <h3>禁用选项卡: 禁用某一个选项</h3>
    <div class="example">
      <div class="example-demo">
        <s-tab>
          <s-tab-pane label="标签一">标签一的内容</s-tab-pane>
          <s-tab-pane label="标签二" disabled>标签二的内容</s-tab-pane>
          <s-tab-pane label="标签三">标签三的内容</s-tab-pane>
        </s-tab>
      </div>
      <div class="example-code">
            <pre><code>
&lt;s-tab&gt;
    &lt;s-tab-pane label="标签一"&gt;标签一的内容&lt;/s-tab-pane&gt;
    &lt;s-tab-pane label="标签二" disabled&gt;标签二的内容&lt;/s-tab-pane&gt;
    &lt;s-tab-pane label="标签三"&gt;标签三的内容&lt;/s-tab-pane&gt;
&lt;/s-tab&gt;
&lt;script&gt;
    export default {
    }
&lt;/script&gt;
            </code></pre>
      </div>
    </div>
    <h3>卡片样式: 卡片化的标签页</h3>
    <div class="example">
      <div class="example-demo">
        <s-tab type="card">
          <s-tab-pane label="标签一">标签一的内容</s-tab-pane>
          <s-tab-pane label="标签二">标签二的内容</s-tab-pane>
          <s-tab-pane label="标签三">标签三的内容</s-tab-pane>
        </s-tab>
      </div>
      <div class="example-code">
                <pre><code>
&lt;s-tab type="card"&gt;
    &lt;s-tab-pane label="标签一"&gt;标签一的内容&lt;/s-tab-pane&gt;
    &lt;s-tab-pane label="标签二"&gt;标签二的内容&lt;/s-tab-pane&gt;
    &lt;s-tab-pane label="标签三"&gt;标签三的内容&lt;/s-tab-pane&gt;
&lt;/s-tab&gt;
&lt;script&gt;
    export default {
    }
&lt;/script&gt;
                </code></pre>
      </div>
    </div>
    <h3>不使用动画效果: 关闭动画效果</h3>
    <div class="example">
      <div class="example-demo">
        <s-tab :animated="false">
          <s-tab-pane label="标签一">标签一的内容</s-tab-pane>
          <s-tab-pane label="标签二">标签二的内容</s-tab-pane>
          <s-tab-pane label="标签三">标签三的内容</s-tab-pane>
        </s-tab>
      </div>
      <div class="example-code">
                <pre><code>
&lt;s-tab :animated="false"&gt;
   &lt;s-tab-pane label="标签一"&gt;标签一的内容&lt;/s-tab-pane&gt;
   &lt;s-tab-pane label="标签二"&gt;标签二的内容&lt;/s-tab-pane&gt;
   &lt;s-tab-pane label="标签三"&gt;标签三的内容&lt;/s-tab-pane&gt;
&lt;/s-tab&gt;
&lt;script&gt;
    export default {
    }
&lt;/script&gt;
                </code></pre>
      </div>
    </div>
    <h3>自定义样式</h3>
    <div class="example">
      <div class="example-demo">
        <s-tab type="card">
          <s-tab-pane label="标签一">标签一的内容</s-tab-pane>
          <s-tab-pane label="标签二">标签二的内容</s-tab-pane>
          <s-tab-pane label="标签三">标签三的内容</s-tab-pane>
        </s-tab>
      </div>
    </div>
    <h3>Tabs Attributes</h3>
    <table class="table">
      <thead>
      <tr>
        <th>属性</th>
        <th>说明</th>
        <th>类型</th>
        <th>默认值</th>
      </tr>
      </thead>
      <tbody>
      <tr>
          <td>v-model</td>
          <td>绑定值，选中选项卡的 name</td>
          <td>String</td>
          <td>没有name时为选中选项卡的下标</td>
      </tr>
      <tr>
        <td>active-key</td>
        <td>当前激活 tab 面板的 key</td>
        <td>String</td>
        <td>默认为第一项的 key</td>
      </tr>
      <tr>
        <td>type</td>
        <td>页签的基本样式，可选值为 <code>line</code> 和 <code>card</code></td>
        <td>String</td>
        <td>line</td>
      </tr>
      <tr>
        <td>size</td>
        <td>尺寸，可选值为 <code>default</code> 和 <code>small</code>，仅在 <code>type="line"</code> 时有效</td>
        <td>String</td>
        <td>default</td>
      </tr>
      <tr>
        <td>closable</td>
        <td>是否可以关闭页签，仅在 <code>type="card"</code> 时有效</td>
        <td>Boolean</td>
        <td>false</td>
      </tr>
      <tr>
        <td>animated</td>
        <td>是否使用 CSS3 动画</td>
        <td>Boolean</td>
        <td>true</td>
      </tr>
      </tbody>
    </table>
    <h3>Tabs Events</h3>
    <table class="table">
      <thead>
      <tr>
        <th>事件名</th>
        <th>说明</th>
        <th>返回值</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>on-click</td>
        <td>tab 被点击时触发</td>
        <td>key</td>
      </tr>
      <tr>
        <td>on-tab-remove</td>
        <td>tab 被关闭时触发</td>
        <td>key</td>
      </tr>
      </tbody>
    </table>
    <h3>Tab-pane Attributes</h3>

    <h3>控制tab的显示</h3>
    <div class="desc">通过props：vif（Boolean）来控制某个tab的显示</div>
    <div class="example">
      <div class="example-demo">
        <s-tab>
          <s-tab-pane label="标签一">AAA</s-tab-pane>
          <s-tab-pane label="标签二" :vif="bloom">BBB</s-tab-pane>
          <s-tab-pane label="标签三">CCC</s-tab-pane>
        </s-tab>
        <s-button @click="toggle" style="margin-top: 10px;">切换标签二的状态</s-button>
      </div>
      <example-code>
        <textarea>
    <s-tab>
      <s-tab-pane label="标签一">AAA</s-tab-pane>
      <s-tab-pane label="标签二" :vif="bloom">BBB</s-tab-pane>
      <s-tab-pane label="标签三">CCC</s-tab-pane>
    </s-tab>
    <s-button @click="toggle" style="margin-top: 10px;">切换标签二的状态</s-button>
    <script>
      export default {
        data() {
          return {
            bloom: true
          }
        },
        methods: {
          toggle() {
            this.bloom = !this.bloom;
          }
        }
      }
    </script>
        </textarea>
        <pre><code></code></pre>
      </example-code>
    </div>

    <table class="table">
      <thead>
      <tr>
        <th>属性</th>
        <th>说明</th>
        <th>类型</th>
        <th>默认值</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>key</td>
        <td>用于标识当前面板，对应 active-key，默认为其索引值</td>
        <td>String | Number</td>
        <td>-</td>
      </tr>
      <tr>
        <td>label</td>
        <td>选项卡头显示文字</td>
        <td>String</td>
        <td>空</td>
      </tr>
      <tr>
        <td>icon</td>
        <td>选项卡图标</td>
        <td>String</td>
        <td>-</td>
      </tr>
      <tr>
        <td>disabled</td>
        <td>是否禁用该选项卡</td>
        <td>Boolean</td>
        <td>false</td>
      </tr>
      <tr>
        <td>closable</td>
        <td>是否可以关闭页签，仅在 <code>type="card"</code> 时有效</td>
        <td>Boolean</td>
        <td>null</td>
      </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
  export default {
    data() {
      return {
        bloom: true
      }
    },
    methods: {
      toggle() {
        this.bloom = !this.bloom;
      }
    }
  }
</script>

