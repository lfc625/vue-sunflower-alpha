<template>
  <article class="article">
    <h1> MessageBox 弹框</h1>

    <h3> 消息提示</h3>
    <p>当用户进行操作时会被触发，该对话框中断用户操作，直到用户确认知晓后才可关闭。</p>
      <div class="example">
        <div class="example-demo">
          <s-button @click="open">点击打开 Message Box</s-button>
        </div>
        <div class="example-code" >
          <div class="description"><p>调用<code>$alert</code>方法即可打开消息提示，它模拟了系统的 <code>alert</code>，无法通过按下 ESC
            或点击框外关闭。此例中接收了两个参数，<code>message</code>和<code>title</code>。值得一提的是，窗口被关闭后，它默认会返回一个<code>Promise</code>对象便于进行后续操作的处理。若不确定浏览器是否支持<code>Promise</code>，可自行引入第三方
            polyfill 或像本例一样使用回调进行后续处理。</p>
          </div>
            <pre><code >
&lt;template&gt;
  &lt;s-button @click="open"&gt;点击打开 Message Box&lt;/s-button&gt;
&lt;/template&gt;

&lt;script&gt;
  export default {
    methods: {
      open() {
        this.$alert('这是一段内容', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      }
    }
  }
&lt;/script&gt;
            </code></pre>
        </div>
      </div>
      <h3> 确认消息</h3>
      <p>提示用户确认其已经触发的动作，并询问是否进行此操作时会用到此对话框。</p>
      <div class="example">
        <div class="example-demo">
          <s-button @click="open2">点击打开 Message Box</s-button>
        </div>
        <div class="example-code" >
          <div class="description"><p>调用<code>$confirm</code>方法即可打开消息提示，它模拟了系统的 <code>confirm</code>。Message Box
            组件也拥有极高的定制性，我们可以传入<code>options</code>作为第三个参数，它是一个字面量对象。<code>type</code>字段表明消息类型，可以为<code>success</code>，<code>error</code>，<code>info</code>和<code>warning</code>，无效的设置将会被忽略。注意，第二个参数<code>title</code>必须定义为<code>String</code>类型，如果是<code>Object</code>，会被理解为<code>options</code>。在这里我们用了
            Promise 来处理后续响应。</p></div>
          <pre><code>
&lt;template&gt;
  &lt;s-button @click="open2"&gt;点击打开 Message Box&lt;/s-button>
            &lt;/template&gt;

&lt;script&gt;
  export default {
    methods: {
      open2() {
        var confirmHtml = '&lt;label class="batchDelLabel"&gt;&lt;input type="radio" name="isBatchDel" checked value="1"&gt;删除所有拓扑连线&lt;/label&gt;' +
          '&lt;label class="batchDelLabel"&gt;&lt;input type="radio" name="isBatchDel" value="2"&gt;删除当前拓扑连线&lt;/label&gt;';
        this.$confirm('confirmHtml, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
&lt;/script&gt;
          </code></pre>
        </div>
      </div>
      <h3> 提交内容</h3>
      <p>当用户进行操作时会被触发，中断用户操作，提示用户进行输入的对话框。</p>
      <div class="example">
        <div class="example-demo">
          <s-button @click="open3">点击打开 Message Box</s-button>
        </div>
        <div class="example-code" >
          <div class="description"><p>调用<code>$prompt</code>方法即可打开消息提示，它模拟了系统的
            <code>prompt</code>。可以用<code>inputPattern</code>字段自己规定匹配模式，或者用<code>inputValidator</code>规定校验函数，可以返回<code>Boolean</code>或<code>String</code>，<code>Boolean</code>为<code>false</code>或字符串时均表示校验未通过，<code>String</code>相当于定义了<code>inputErrorMessage</code>字段。此外，可以用<code>inputPlaceholder</code>字段来定义输入框的占位符。
          </p></div>
            <pre><code>
&lt;template&gt;
  &lt;s-button @click="open3"&gt;点击打开 Message Box&lt;/s-button&gt;
&lt;/template&gt;

&lt;script&gt;
  export default {
    methods: {
      open3() {
        this.$prompt('请输入邮箱', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      }
    }
  }
&lt;/script&gt;
</code></pre>
        </div>
      </div>
      <h3> 自定义</h3>
      <p>可自定义配置不同内容。</p>
      <div class="example">
        <div class="example-demo">
          <s-button @click="open4">点击打开 Message Box</s-button>
        </div>
        <div class="example-code" >
          <div class="description"><p>以上三个方法都是对<code>$msgbox</code>方法的再包装。本例直接调用<code>$msgbox</code>方法，使用了<code>showCancelButton</code>字段，用于显示取消按钮。另外可使用<code>cancelButtonClass</code>为其添加自定义样式，使用<code>cancelButtonText</code>来自定义按钮文本（Confirm
            按钮也具有相同的字段，在文末的字段说明中有完整的字段列表）。此例还使用了<code>beforeClose</code>属性，它的值是一个方法，会在 MessageBox
            的实例关闭前被调用，同时暂停实例的关闭。它有三个参数：<code>action</code>、实例本身和<code>done</code>方法。使用它能够在关闭前对实例进行一些操作，比如为确定按钮添加<code>loading</code>状态等；此时若需要关闭实例，可以调用<code>done</code>方法（若在<code>beforeClose</code>中没有调用<code>done</code>，则实例不会关闭）。
          </p></div>
          <pre><code>
&lt;template&gt;
  &lt;s-button @click="open4"&gt;点击打开 Message Box&lt;/s-button&gt;
&lt;/template&gt;

&lt;script&gt;
  export default {
    methods: {
      open4() {
        this.$msgbox({
          title: '消息',
          message: '这是一段内容, 这是一段内容, 这是一段内容, 这是一段内容, 这是一段内容, 这是一段内容, 这是一段内容',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 3000);
            } else {
              done();
            }
          }
        }).then(action => {
          this.$message({
            type: 'info',
            message: 'action: ' + action
          });
        });
      },
    }
  }
&lt;/script&gt;
</code></pre>
          </div>
        </div>
      <h3> 全局方法</h3>
      <p>Element 为 Vue.prototype 添加了如下全局方法：$msgbox, $alert, $confirm 和 $prompt。因此在 vue instance 中可以采用本页面中的方式调用 <code>MessageBox</code>。
      </p>
      <h3> 单独引用</h3>
      <p>单独引入 <code>MessageBox</code>：</p>
      <div class="example-code" >
        <pre><code>import { MessageBox } from 'element-ui';</code></pre>
      </div>
      <p>对应于上述四个全局方法的调用方法依次为：MessageBox, MessageBox.alert, MessageBox.confirm 和 MessageBox.prompt。</p>
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
          <td>MessageBox 标题</td>
          <td>string</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>message</td>
          <td>MessageBox 消息正文内容</td>
          <td>string</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>type</td>
          <td>消息类型，用于显示图标</td>
          <td>string</td>
          <td>success/info/warning/error</td>
          <td>—</td>
        </tr>
        <tr>
          <td>customClass</td>
          <td>MessageBox 的自定义类名</td>
          <td>string</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>callback</td>
          <td>若不使用 Promise，可以使用此参数指定 MessageBox 关闭后的回调</td>
          <td>function(action, instance)，action 的值为'confirm'或'cancel', instance 为 MessageBox 实例，可以通过它访问实例上的属性和方法</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>beforeClose</td>
          <td>MessageBox 关闭前的回调，会暂停实例的关闭</td>
          <td>function(action, instance, done)，action 的值为'confirm'或'cancel'；instance 为 MessageBox
            实例，可以通过它访问实例上的属性和方法；done 用于关闭 MessageBox 实例
          </td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>lockScroll</td>
          <td>是否在 MessageBox 出现时将 body 滚动锁定</td>
          <td>boolean</td>
          <td>—</td>
          <td>true</td>
        </tr>
        <tr>
          <td>showCancelButton</td>
          <td>是否显示取消按钮</td>
          <td>boolean</td>
          <td>—</td>
          <td>false（以 confirm 和 prompt 方式调用时为 true）</td>
        </tr>
        <tr>
          <td>showConfirmButton</td>
          <td>是否显示确定按钮</td>
          <td>boolean</td>
          <td>—</td>
          <td>true</td>
        </tr>
        <tr>
          <td>cancelButtonText</td>
          <td>取消按钮的文本内容</td>
          <td>string</td>
          <td>—</td>
          <td>取消</td>
        </tr>
        <tr>
          <td>confirmButtonText</td>
          <td>确定按钮的文本内容</td>
          <td>string</td>
          <td>—</td>
          <td>确定</td>
        </tr>
        <tr>
          <td>cancelButtonClass</td>
          <td>取消按钮的自定义类名</td>
          <td>string</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>confirmButtonClass</td>
          <td>确定按钮的自定义类名</td>
          <td>string</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>closeOnClickModal</td>
          <td>是否可通过点击遮罩关闭 MessageBox</td>
          <td>boolean</td>
          <td>—</td>
          <td>true（以 alert 方式调用时为 false）</td>
        </tr>
        <tr>
          <td>closeOnPressEscape</td>
          <td>是否可通过按下 ESC 键关闭 MessageBox</td>
          <td>boolean</td>
          <td>—</td>
          <td>true（以 alert 方式调用时为 false）</td>
        </tr>
        <tr>
          <td>showInput</td>
          <td>是否显示输入框</td>
          <td>boolean</td>
          <td>—</td>
          <td>false（以 prompt 方式调用时为 true）</td>
        </tr>
        <tr>
          <td>inputPlaceholder</td>
          <td>输入框的占位符</td>
          <td>string</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>inputValue</td>
          <td>输入框的初始文本</td>
          <td>string</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>inputPattern</td>
          <td>输入框的校验表达式</td>
          <td>regexp</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>inputValidator</td>
          <td>输入框的校验函数。可以返回布尔值或字符串，若返回一个字符串, 则返回结果会被赋值给 inputErrorMessage</td>
          <td>function</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>inputErrorMessage</td>
          <td>校验未通过时的提示文本</td>
          <td>string</td>
          <td>—</td>
          <td>输入的数据不合法!</td>
        </tr>
        </tbody>
      </table>
  </article>
</template>

<script>
  export default {

    methods: {
      open() {
        this.$alert('这是一段内容', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${action}`
            });
          }
        });
      },
      open2() {
        var confirmHtml = '<label class="batchDelLabel"><input type="radio" name="isBatchDel" checked value="1">删除所有拓扑连线</label>' +
          '<label class="batchDelLabel"><input type="radio" name="isBatchDel" value="2">删除当前拓扑连线</label>';
        this.$confirm(confirmHtml, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      open3() {
        this.$prompt('请输入邮箱', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      open4() {
        this.$msgbox({
          title: '消息',
          message: '<s-button>haha</s-button>',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 3000);
            } else {
              done();
            }
          }
        }).then(action => {
          this.$message({
            type: 'info',
            message: 'action: ' + action
          });
        });
      }
    }
  }
</script>