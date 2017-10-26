<template>
  <article class="article">
    <h2 style="font-weight: 400;    font-size: 28px;
    color: #1f2f3d;"> Message 消息提示: </h2>
      <p>常用于主动操作后的反馈提示。与 Notification 的区别是后者更多用于系统级通知的被动提醒。</p>
    <h3 id="ji-chu-yong-fa"> </h3>
      <p>从顶部出现，3 秒后自动消失。</p>
    <div class="example">
      <div class="example-demo">
        <s-button :plain="true" @click="open">打开消息提示</s-button>
        <div class="description"><p>Message 在配置上与 Notification 非常类似，所以部分 options 在此不做详尽解释，文末有 options 列表，可以结合
        Notification 的文档理解它们。Element 注册了一个<code>$message</code>方法用于调用，Message 可以接收一个字符串作为参数，它会被显示为正文内容。</p></div>
      </div>
      <example-code>
        <pre><code>
&lt;template&gt;
  &lt;s-button :plain="true" @click="open"&gt;打开消息提示&lt;/s-button&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    methods: {
      open() {
        this.$message('这是一条消息提示');
      }
    }
  }
&lt;/script&gt;
        </code></pre>
      </example-code>
    </div>
    <h3 id="bu-tong-zhuang-tai"> 不同状态: </h3>
      <p>用来显示「成功、警告、消息、错误」类的操作反馈。</p>
    <div class="example">
      <div class="example-demo">
          <s-button :plain="true" @click="open2">成功</s-button>
          <s-button :plain="true" @click="open3">警告</s-button>
          <s-button :plain="true" @click="open">消息</s-button>
          <s-button :plain="true" @click="open4">错误</s-button>
          <div class="description"><p>当需要自定义更多属性时，Message
            也可以接收一个对象为参数。比如，设置<code>type</code>字段可以定义不同的状态，默认为<code>info</code>。此时正文内容以<code>message</code>的值传入。同时，我们也为
            Message 的各种 type 注册了方法，可以在不传入<code>type</code>字段的情况下像<code>open4</code>那样直接调用。</p></div>
        </div>
      <example-code>
          <pre><code>
&lt;template&gt;
  &lt;s-button :plain="true" @click="open2"&gt;成功&lt;/s-button&gt;
  &lt;s-button :plain="true" @click="open3"&gt;警告&lt;/s-button&gt;
  &lt;s-button :plain="true" @click="open"&gt;消息&lt;/s-button&gt;
  &lt;s-button :plain="true" @click="open4"&gt;错误&lt;/s-button&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    methods: {
      open() {
        this.$message('这是一条消息提示');
      },
      open2() {
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
      },
      open3() {
        this.$message({
          message: '警告哦，这是一条警告消息',
          type: 'warning'
        });
      },
      open4() {
        this.$message.error('错了哦，这是一条错误消息');
      }
    }
  }
&lt;/script&gt;
          </code></pre>
        </example-code>
    </div>

    <h3 id="ke-guan-bi"> 可关闭:</h3>
      <p> 可以添加关闭按钮</p>
    <div class="example">
      <div class="example-demo">
        <s-button :plain="true" @click="open5">消息</s-button>
        <s-button :plain="true" @click="open6">成功</s-button>
        <s-button :plain="true" @click="open7">警告</s-button>
        <s-button :plain="true" @click="open8">错误</s-button>
        <div class="description"><p>默认的 Message 是不可以被人工关闭的，如果需要可手动关闭的 Message，可以使用<code>showClose</code>字段。此外，和
        Notification 一样，Message 拥有可控的<code>duration</code>，设置<code>0</code>为不会被自动关闭，默认为 3000 毫秒。</p></div>
      </div>
      <example-code>
        <pre><code>
&lt;template&gt;
  &lt;s-button :plain="true" @click="open5">消息&lt;/s-button&gt;
  &lt;s-button :plain="true" @click="open6"&gt;成功&lt;/s-button&gt;
  &lt;s-button :plain="true" @click="open7"&gt;警告&lt;/s-button&gt;
  &lt;s-button :plain="true" @click="open8"&gt;错误&lt;/s-button&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    methods: {
      open5() {
        this.$message({
          showClose: true,
          message: '恭喜你，这是一条成功消息'
        });
      },
      open6() {
        this.$message({
          showClose: true,
          message: '警告哦，这是一条警告消息',
          type: 'warning'
        });
      },
      open7() {
        this.$message({
          showClose: true,
          message: '错了哦，这是一条错误消息',
          type: 'error'
        });
      },
      open8() {
        this.$message({
          showClose: true,
          message: '错了哦，这是一条错误消息',
          type: 'error',
          duration: 0
        });
      }
    }
  }
&lt;/script&gt;
        </code></pre>
      </example-code>
    </div>

    <h3 id="quan-ju-fang-fa"> 全局方法</h3>
    <p>Element 为 Vue.prototype 添加了全局方法 $message。因此在 vue instance 中可以采用本页面中的方式调用 <code>Message</code>。</p>
    <h3 id="dan-du-yin-yong"> 单独引用</h3>
    <p>单独引入 <code>Message</code>：</p>
    <div class="example">
      <example-code>
        <pre><code>
import { Message } from 'element-ui';
        </code></pre>
      </example-code>
    </div>
      <p>此时调用方法为 <code>Message(options)</code>。我们也为每个 type 定义了各自的方法，如 <code>Message.success(options)</code>。</p>
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
          <td>message</td>
          <td>消息文字</td>
          <td>string</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>type</td>
          <td>主题</td>
          <td>string</td>
          <td>success/warning/info/error</td>
          <td>info</td>
        </tr>
        <tr>
          <td>iconClass</td>
          <td>自定义图标的类名，会覆盖 <code>type</code></td>
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
          <td>3000</td>
        </tr>
        <tr>
          <td>showClose</td>
          <td>是否显示关闭按钮</td>
          <td>boolean</td>
          <td>—</td>
          <td>false</td>
        </tr>
        <tr>
          <td>onClose</td>
          <td>关闭时的回调函数, 参数为被关闭的 message 实例</td>
          <td>function</td>
          <td>—</td>
          <td>—</td>
        </tr>
        </tbody>
      </table>
      <h3 id="fang-fa"> 方法</h3>
      <p>调用 <code>Message</code> 或 <code>this.$message</code> 会返回当前 Message 的实例。如果需要手动关闭实例，可以调用它的 <code>close</code> 方法。
      </p>
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
          <td>关闭当前的 Message</td>
        </tr>
        </tbody>
      </table>
    </article>
</template>

<script>
  export default {
    methods: {
      open() {
        this.$message("这是一条消息提示")
      },
      open2() {
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        })
      },
      open3() {
        this.$message({
          message: '警告哦，这是一条警告消息',
          type: 'warning'
        });
      },
      open4() {
        this.$message.error('错了哦，这是一条错误消息');
      },
      open5() {
        this.$message({
          showClose: true,
          message: '恭喜你，这是一条成功消息'
        });
      },

      open6() {
        this.$message({
          showClose: true,
          message: '警告哦，这是一条警告消息',
          type: 'success'
        });
      },

      open7() {
        this.$message({
          showClose: true,
          message: '错了哦，这是一条错误消息',
          type: 'warning'
        });
      },

      open8() {
        this.$message({
          showClose: true,
          message: '错了哦，这是一条错误消息',
          type: 'error',
          duration: 0
        });
      }
    }
  }
</script>