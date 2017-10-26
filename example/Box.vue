<template>
  <article class="article">
    <h1>Box 盒子</h1>
    <h3>基础用法1</h3>
    <p>默认</p>
    <div class="example">
      <div class="example-demo">
        <s-box :data="data">
        </s-box>
      </div>
      <example-code>
        <pre><code>
        &lt;s-box :data=&quot;data&quot;&gt;
        &lt;/s-box&gt;
        &lt;script&gt;
          export default {
            data() {
              return {
                data: [{
                  icon: &#x27;file&#x27;,
                  title: &#x27;标题&#x27;,
                  des: &#x27;描述&#x27;
                }]
              }
            }
          }
        &lt;/script&gt;
        </code></pre>
      </example-code>
    </div>
    <h3>基础用法2</h3>
    <p>分栏，默认内容为水平(horizontal)</p>
    <div class="example">
      <div class="example-demo">
        <s-box :data="data1" :bars="[3,2,3]">
        </s-box>
      </div>
      <example-code>
        <pre><code>
        &lt;s-box :data=&quot;data1&quot; :bars=&quot;[3,2,3]&quot;&gt;
        &lt;/s-box&gt;
        &lt;script&gt;
          export default {
            data() {
              return {
                data1: [
                  {
                    icon: &#x27;folder&#x27;,
                    title: &#x27;标题&#x27;,
                    des: &#x27;很很长长的描述信息&#x27;
                  },
                  {
                    icon: &#x27;file&#x27;,
                    title: &#x27;标题&#x27;,
                    des: &#x27;短描述&#x27;
                  },
                  {
                    icon: &#x27;email&#x27;,
                    title: &#x27;标题&#x27;,
                    des: &#x27;长长的描述&#x27;
                  }
                ]
              }
            }
          }
        &lt;/script&gt;
        </code></pre>
      </example-code>
    </div>
    <h3>基础用法3</h3>
    <p>分栏，内容为竖直(vertical)</p>
    <div class="example">
      <div class="example-demo">
        <s-box :data="data1" :bars="[3,2,3]" type="vertical">
        </s-box>
      </div>
      <div class="example-code"  style="clear:both">
        <pre><code>
        &lt;s-box :data=&quot;data1&quot; :bars=&quot;[3,2,3]&quot; type=&quot;vertical&quot; &gt;
        &lt;/s-box&gt;
        &lt;script&gt;
          export default {
            data() {
              return {
                data1: [
                  {
                    icon: &#x27;folder&#x27;,
                    title: &#x27;标题&#x27;,
                    des: &#x27;很很长长的描述信息&#x27;
                  },
                  {
                    icon: &#x27;file&#x27;,
                    title: &#x27;标题&#x27;,
                    des: &#x27;短描述&#x27;
                  },
                  {
                    icon: &#x27;email&#x27;,
                    title: &#x27;标题&#x27;,
                    des: &#x27;长长的描述&#x27;
                  }
                ]
              }
            }
          }
        &lt;/script&gt;
        </code></pre>
      </div>
    </div>
    <h3>基础用法4</h3>
    <p>分栏，大图标</p>
    <div class="example">
      <div class="example-demo">
        <s-box :data="data2" :bars="5" type="big">
        </s-box>
      </div>
      <div class="example-code"
           style="clear:both">
        <pre><code>
        &lt;s-box :data=&quot;data2&quot; :bars=&quot;5&quot; type=&quot;big&quot;&gt;
        &lt;/s-box&gt;
        &lt;script&gt;
          export default {
            data() {
              return {
                data2: [
                  {
                    icon: &#x27;folder&#x27;,
                    title: &#x27;标题&#x27;
                  },
                  {
                    icon: &#x27;file&#x27;,
                    title: &#x27;标题&#x27;
                  },
                  {
                    icon: &#x27;eye&#x27;,
                    title: &#x27;标题&#x27;
                  },
                  {
                    icon: &#x27;email&#x27;,
                    title: &#x27;标题&#x27;,
                    type: &#x27;cancel&#x27;,
                    color: &#x27;#ff0000&#x27;
                  },
                  {
                    icon: &#x27;screen&#x27;,
                    title: &#x27;标题&#x27;
                  }
                ]
              }
            }
          }
        &lt;/script&gt;
        </code></pre>
      </div>
    </div>
  </article>
</template>

<script type="text/babel">
  export default {
    data() {
      return {
        data: [{
          icon: 'file',
          title: '标题',
          des: '描述'
        }],
        data1: [
          {
            icon: 'folder',
            title: '标题',
            des: '很很长长的描述信息'
          },
          {
            icon: 'file',
            title: '标题',
            des: '短描述'
          },
          {
            icon: 'email',
            title: '标题',
            des: '长长的描述'
          }
        ],
        data2: [
          {
            icon: 'folder',
            title: '标题'
          },
          {
            icon: 'file',
            title: '标题'
          },
          {
            icon: 'eye',
            title: '标题'
          },
          {
            icon: 'email',
            title: '标题',
            type: 'cancel',
            color: '#ff0000'
          },
          {
            icon: 'screen',
            title: '标题'
          }
        ]
      }
    }
  }
</script>