<template>
  <article class="article">
    <h1>Notification 通知</h1>
    <h3> 基本用法</h3>
    <div class="example">
      <div class="example-demo">
        <s-button
          plain
          @click="open">
          可自动关闭
        </s-button>
        <s-button
          plain
          @click="open2">
          不会自动关闭
        </s-button>
      </div>
      <div class="example-code">
        <div class="description">
          <p>Notification 组件提供通知功能，Element 注册了<code>$notify</code>方法，接收一个<code>options</code>字面量参数，在最简单的情况下，你可以设置<code>title</code>字段和<code>message</code>字段，用于设置通知的标题和正文。默认情况下，经过一段时间后
            Notification 组件会自动关闭，但是通过设置<code>duration</code>，可以控制关闭的时间间隔，特别的是，如果设置为<code>0</code>，则不会自动关闭。注意：<code>duration</code>接收一个<code>Number</code>，单位为毫秒，默认为<code>4500</code>。
          </p>
        </div>
        <pre><code>
&lt;template&gt;
  &lt;s-button
    plain
    @click="open"&gt;
    可自动关闭
  &lt;/s-button&gt;
  &lt;s-button
    plain
    @click="open2"&gt;
    不会自动关闭
    &lt;/s-button&gt;
&lt;/template&gt;

&lt;script&gt;
  export default {
    methods: {
      open() {
        const h = this.$createElement;

        this.$notify({
          title: '标题名称',
          message: h('p', { style: 'color: red'}, '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案')
        });
      },

      open2() {
        this.$notify({
          title: '提示',
          message: '这是一条不会自动关闭的消息',
          duration: 0
        });
      }
    }
  }
&lt;/script&gt;

          </code>
        </pre>
      </div>
    </div>

    <h3> 带有倾向性</h3>
    <div class="example">
      <div class="example-demo">
        <s-button
          plain
          @click="open3">
          成功
        </s-button>
        <s-button
          plain
          @click="open4">
          警告
        </s-button>
        <s-button
          plain
          @click="open5">
          消息
        </s-button>
        <s-button
          plain
          @click="open6">
          错误
        </s-button>
      </div>
      <div class="example-code">
        <div class="description">
          <p>Element 为 Notification 组件准备了四种通知类型：<code>success</code>, <code>warning</code>,
            <code>info</code>, <code>error</code>。通过<code>type</code>字段来设置，除此以外的值将被忽略。同时，我们也为 Notification 的各种 type
            注册了方法，可以在不传入<code>type</code>字段的情况下像<code>open5</code>和<code>open6</code>那样直接调用。</p>
        </div>
        <pre>
          <code>
&lt;template&gt;
  &lt;s-button
    plain
    @click="open3"&gt;
    成功
  &lt;/s-button>
  &lt;s-button
    plain
    @click="open4"&gt;
    警告
  &lt;/s-button&gt;
  &lt;s-button
    plain
    @click="open5"&gt;
    消息
  &lt;/s-button&gt;
  &lt;s-button
    plain
    @click="open6"&gt;
    错误
  &lt;/s-button&gt;
&lt;/template&gt;

&lt;script&gt;
  export default {
    methods: {
      open3() {
        this.$notify({
          title: '成功',
          message: '这是一条成功的提示消息',
          type: 'success'
        });
      },

      open4() {
        this.$notify({
          title: '警告',
          message: '这是一条警告的提示消息',
          type: 'warning'
        });
      },

      open5() {
        this.$notify.info({
          title: '消息',
          message: '这是一条消息的提示消息'
        });
      },

      open6() {
        this.$notify.error({
          title: '错误',
          message: '这是一条错误的提示消息'
        });
      }
    }
  }
&lt;/script&gt;
          </code>
        </pre>
      </div>
    </div>

    <h3>带有偏移</h3>
    <div class="example">
      <div class="example-demo">
        <s-button
          plain
          @click="open7">
          偏移的消息
        </s-button>
      </div>
      <div class="example-code">
        <div class="description"><p>Notification 提供设置偏移量的功能，通过设置 <code>offset</code>
          字段，可以使弹出的消息距屏幕顶部偏移一段距离。注意在同一时刻，所有的 Notification 实例应当具有一个相同的偏移量。</p>
        </div>

        <pre><code>
&lt;template&gt;
  &lt;s-button
    plain
    @click="open7"&gt;
    偏移的消息
  &lt;/s-button&gt;
&lt;/template&gt;

&lt;script&gt;
  export default {
    methods: {
      open7() {
        this.$notify.success({
          title: '成功',
          message: '这是一条成功的提示消息',
          offset: 100
        });
      }
    }
  }
&lt;/script&gt;
        </code></pre>
      </div>
    </div>
    <h3 id="quan-ju-fang-fa"> 全局方法</h3>
    <p>Element 为 <code>Vue.prototype</code> 添加了全局方法 <code>$notify</code>。因此在 vue instance 中可以采用本页面中的方式调用 Notification。
    </p>
    <h3 id="dan-du-yin-yong"> 单独引用</h3>
    <p>单独引入 Notification：</p>
    <pre><code class="hljs language-javascript"><span class="hljs-keyword">import</span> { Notification } <span
      class="hljs-keyword">from</span> <span class="hljs-string">'element-ui'</span>;
</code></pre>
    <p>此时调用方法为 <code>Notification(options)</code>。我们也为每个 type 定义了各自的方法，如 <code>Notification.success(options)</code>。
    </p>
    <h3 id="options"> Options</h3>
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
        <td>title</td>
        <td>标题</td>
        <td>string</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <td>message</td>
        <td>说明文字</td>
        <td>string/Vue.VNode</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <td>type</td>
        <td>主题样式，如果不在可选值内将被忽略</td>
        <td>string</td>
        <td>success/warning/info/error</td>
        <td>—</td>
      </tr>
      <tr>
        <td>iconClass</td>
        <td>自定义图标的类名。若设置了 <code>type</code>，则 <code>iconClass</code> 会被覆盖</td>
        <td>string</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <td>customClass</td>
        <td>自定义类名</td>
        <td>string</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <td>duration</td>
        <td>显示时间, 毫秒。设为 0 则不会自动关闭</td>
        <td>number</td>
        <td>—</td>
        <td>4500</td>
      </tr>
      <tr>
        <td>onClose</td>
        <td>关闭时的回调函数</td>
        <td>function</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <td>offset</td>
        <td>偏移的距离，在同一时刻，所有的 Notification 实例应当具有一个相同的偏移量</td>
        <td>number</td>
        <td>—</td>
        <td>0</td>
      </tr>
      </tbody>
    </table>
    <h3 id="fang-fa"> 方法</h3>
    <p>调用 <code>Notification</code> 或 <code>this.$notify</code> 会返回当前 Notification 的实例。如果需要手动关闭实例，可以调用它的
      <code>close</code> 方法。</p>
    <table class="table">
      <thead>
      <tr>
        <th>方法名</th>
        <th>说明</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>close</td>
        <td>关闭当前的 Notification</td>
      </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
  export default {


    methods: {
      open() {
        const h = this.$createElement;

        this.$notify({
          title: '标题名称',
          message: h('p', {style: 'color: red'}, '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案'),
          offset: 10
        });
      },

      open2() {
        this.$notify({
          title: '提示',
          message: '这是一条不会自动关闭的消息',
          duration: 0,
          offset: 10
        });
      },

      open3() {
        this.$notify({
          title: '成功',
          message: '这是一条成功的提示消息',
          type: 'success',
          offset: 10
        });
      },

      open4() {
        this.$notify({
          title: '警告',
          message: '这是一条警告的提示消息',
          type: 'warning',
          offset: 10
        });
      },

      open5() {
        this.$notify.info({
          title: '消息',
          message: '这是一条消息的提示消息',
          offset: 10
        });
      },

      open6() {
        this.$notify.error({
          title: '错误',
          message: '这是一条错误的提示消息',
          offset: 10
        });
      },

      open7() {
        this.$notify.success({
          title: '成功',
          message: 'NO' + Math.floor(Math.random()*400 + 100) + ':这是一条成功<br>的提示消息' + new Date().toUTCString(),
          offset: 10
        });
      }
    }
  }
</script>