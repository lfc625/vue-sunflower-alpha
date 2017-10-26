<template>
  <article class="article">
    <h1>Popover</h1>

    <h3>基础用法</h3>
    <p>Popover 的属性与 Tooltip 很类似，它们都是基于<code>Vue-popper</code>开发的，因此对于重复属性，请参考 Tooltip 的文档，在此文档中不做详尽解释。</p>
    <div class="example">
      <div class="example-demo">
        <s-popover
          ref="popover1"
          placement="top-start"
          title="标题"
          width="200"
          trigger="hover"
          content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
        </s-popover>

        <s-popover
          ref="popover2"
          placement="bottom"
          title="标题"
          width="200"
          trigger="click"
          content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
        </s-popover>

        <s-button v-popover:popover1>hover 激活</s-button>
        <s-button v-popover:popover2>click 激活</s-button>
        <s-popover
          placement="right"
          title="标题"
          width="200"
          trigger="focus"
          content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
          <s-button slot="reference">focus 激活</s-button>
        </s-popover>
      </div>
      <div class="example-code">
        <div class="description"><p>
          设置索引<code>ref</code>，在按钮中，我们注册了自定义指令<code>v-popover</code>，指向索引ID。<code>trigger</code>属性用于设置何时触发 Popover
          ，提供三种触发方式：<code>hover</code>, <code>click</code> 和 <code>focus</code>。第二种用法通过 <code>slot</code> 指定
          reference。</p></div>
        <pre><code>
&lt;s-popover
   ref="popover1"
   placement="top-start"
   title="标题"
   width="200"
   trigger="hover"
   content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
&lt;/s-popover&gt;
&lt;s-popover
   ref="popover2"
   placement="bottom"
   title="标题"
   width="200"
   trigger="click"
   content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
&lt;/s-popover&gt;
  &lt;s-button v-popover:popover1&gt;hover 激活&lt;/s-button&gt;
  &lt;s-button v-popover:popover2&gt;click 激活&lt;/s-button&gt;
&lt;s-popover
   placement="right"
   title="标题"
   width="200"
   trigger="focus"
   content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
  &lt;s-button slot="reference"&gt;focus 激活&lt;/s-button&gt;
&lt;/s-popover&gt;
        </code></pre>
      </div>
    </div>
    <h3>嵌套信息</h3>
    <p>可以在 Popover 中嵌套多种类型信息，以下为嵌套表格的例子。</p>
    <div class="example">
      <div class="example-demo">
        <s-popover
          ref="popover4"
          placement="right"
          width="400"
          trigger="click">
          <s-table :data="gridData">
            <s-table-column width="150" property="date" label="日期"></s-table-column>
            <s-table-column width="100" property="name" label="姓名"></s-table-column>
            <s-table-column width="300" property="address" label="地址"></s-table-column>
          </s-table>
        </s-popover>
        <s-button v-popover:popover4>click 激活</s-button>
      </div>
      <div class="example-code">
        <div class="description"><p>利用分发取代<code>content</code>属性</p></div>
        <pre><code>
&lt;s-popover
   ref="popover4"
   placement="right"
   width="400"
   trigger="click"&gt;
  &lt;s-table :data="gridData"&gt;
    &lt;s-table-column width="150" property="date" label="日期"&gt;&lt;/s-table-column&gt;
    &lt;s-table-column width="100" property="name" label="姓名"&gt;&lt;/s-table-column&gt;
    &lt;s-table-column width="300" property="address" label="地址"&gt;&lt;/s-table-column&gt;
  &lt;/s-table&gt;
&lt;/s-popover&gt;
&lt;s-button v-popover:popover4&gt;click 激活&lt;/s-butto&gt;
&lt;script&gt;
  export default {
      data() {
          return {
              gridData: [{
                  date: '2016-05-02',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1518 弄'
              }, {
                  date: '2016-05-04',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1518 弄'
              }, {
                  date: '2016-05-01',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1518 弄'
              }, {
                  date: '2016-05-03',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1518 弄'
              }]
          };
      }
  };
&lt;/script&gt;
        </code></pre>
      </div>
    </div>
    <h3>嵌套操作</h3>
    <p>当然，你还可以嵌套操作，这相比 Dialog 更为轻量：</p>
    <div class="example">
      <div class="example-demo">
        <s-popover
          ref="popover5"
          placement="top"
          width="160"
          v-model="visible2">
          <p>这是一段内容这是一段内容确定删除吗？</p>
          <div style="text-align: right; margin: 0">
            <s-button type="text" size="mini" @click="visible2 = false">取消</s-button>
            <s-button type="primary" size="mini" @click="visible2 = false">确定</s-button>
          </div>
        </s-popover>
        <s-button v-popover:popover5>删除</s-button>
      </div>
      <div class="example-code">
        <pre><code>
&lt;s-popover
   ref="popover5"
   placement="top"
   width="160"
   v-model="visible2"&gt;
  &lt;p&gt;这是一段内容这是一段内容确定删除吗？&lt;/p&gt;
  &lt;div style="text-align: right; margin: 0"&gt;
    &lt;s-button size="mini" type="text" @click="visible2 = false"&gt;取消&lt;/s-button&gt;
    &lt;s-button type="primary" size="mini" @click="visible2 = false">确定&lt;/s-button&gt;
  &lt;/div&gt;
&lt;/s-popover&gt;
&lt;s-button v-popover:popover5&gt;删除&lt;/s-button&gt;
&lt;script&gt;
  export default {
      data() {
          return {
              visible2: false,
          };
      }
  }
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
        <td>trigger</td>
        <td>触发方式</td>
        <td>String</td>
        <td>click/focus/hover/manual</td>
        <td>click</td>
      </tr>
      <tr>
        <td>title</td>
        <td>标题</td>
        <td>String</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <td>content</td>
        <td>显示的内容，也可以通过 <code>slot</code> 传入 DOM</td>
        <td>String</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <td>width</td>
        <td>宽度</td>
        <td>String, Number</td>
        <td>—</td>
        <td>最小宽度 150px</td>
      </tr>
      <tr>
        <td>placement</td>
        <td>出现位置</td>
        <td>String</td>
        <td>
          top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end
        </td>
        <td>bottom</td>
      </tr>
      <tr>
        <td>disabled</td>
        <td>Popover 是否可用</td>
        <td>Boolean</td>
        <td>—</td>
        <td>false</td>
      </tr>
      <tr>
        <td>value(v-model)</td>
        <td>状态是否可见</td>
        <td>Boolean</td>
        <td>—</td>
        <td>false</td>
      </tr>
      <tr>
        <td>offset</td>
        <td>出现位置的偏移量</td>
        <td>Number</td>
        <td>—</td>
        <td>0</td>
      </tr>
      <tr>
        <td>transition</td>
        <td>定义渐变动画</td>
        <td>String</td>
        <td>—</td>
        <td>fade-in-linear</td>
      </tr>
      <tr>
        <td>visible-arrow</td>
        <td>是否显示 Tooltip 箭头，更多参数可见<a href="https://github.com/element-component/vue-popper">Vue-popper</a></td>
        <td>Boolean</td>
        <td>—</td>
        <td>true</td>
      </tr>
      <tr>
        <td>options</td>
        <td><a href="https://popper.js.org/documentation.html">popper.js</a> 的参数</td>
        <td>Object</td>
        <td>参考 <a href="https://popper.js.org/documentation.html">popper.js</a> 文档</td>
        <td><code>{ boundariesElement: 'body', gpuAcceleration: false }</code></td>
      </tr>
      <tr>
        <td>popper-class</td>
        <td>为 popper 添加类名</td>
        <td>String</td>
        <td>—</td>
        <td>—</td>
      </tr>
      </tbody>
    </table>
    <h3 id="slot"> Slot</h3>
    <table class="table">
      <thead>
      <tr>
        <th>参数</th>
        <th>说明</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>—</td>
        <td>Popover 内嵌 HTML 文本</td>
      </tr>
      <tr>
        <td>reference</td>
        <td>触发 Popover 显示的 HTML 元素</td>
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
        <td>show</td>
        <td>显示时触发</td>
        <td>—</td>
      </tr>
      <tr>
        <td>hide</td>
        <td>隐藏时触发</td>
        <td>—</td>
      </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
  export default {


    data() {
      return {
        gridData: [{
          date: '2016-05-02',
          name: 'AAA',
          address: 'XXXXXXXXXXXXXXXX'
        }, {
          date: '2016-05-02',
          name: 'AAA',
          address: 'XXXXXXXXXXXXXXXX'
        }, {
          date: '2016-05-02',
          name: 'AAA',
          address: 'XXXXXXXXXXXXXXXX'
        }, {
          date: '2016-05-02',
          name: 'AAA',
          address: 'XXXXXXXXXXXXXXXX'
        }],
        visible2: false
      }
    }
  }
</script>