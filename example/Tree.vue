<template>
  <article class="article">
      <h1> Tree 树形控件</h1>
      <p>用清晰的层级结构展示信息，可展开或折叠。</p>
      <h3> 基础用法</h3>
      <p>基础的树形结构展示。</p>
      <div class="example">
        <div class="example-demo">
          <s-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" :highlight-current="true"></s-tree>
        </div>
        <div class="example-code" ><div class="description"></div><div class="highlight"><pre><code class="hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">s-tree</span> <span class="hljs-attr">:data</span>=<span class="hljs-string">"data"</span> <span class="hljs-attr">:props</span>=<span class="hljs-string">"defaultProps"</span> <span class="hljs-attr">@node-click</span>=<span class="hljs-string">"handleNodeClick"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">s-tree</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data() {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">data</span>: [{
          <span class="hljs-attr">label</span>: <span class="hljs-string">'一级 1'</span>,
          <span class="hljs-attr">children</span>: [{
            <span class="hljs-attr">label</span>: <span class="hljs-string">'二级 1-1'</span>,
            <span class="hljs-attr">children</span>: [{
              <span class="hljs-attr">label</span>: <span class="hljs-string">'三级 1-1-1'</span>
            }]
          }]
        }, {
          <span class="hljs-attr">label</span>: <span class="hljs-string">'一级 2'</span>,
          <span class="hljs-attr">children</span>: [{
            <span class="hljs-attr">label</span>: <span class="hljs-string">'二级 2-1'</span>,
            <span class="hljs-attr">children</span>: [{
              <span class="hljs-attr">label</span>: <span class="hljs-string">'三级 2-1-1'</span>
            }]
          }, {
            <span class="hljs-attr">label</span>: <span class="hljs-string">'二级 2-2'</span>,
            <span class="hljs-attr">children</span>: [{
              <span class="hljs-attr">label</span>: <span class="hljs-string">'三级 2-2-1'</span>
            }]
          }]
        }, {
          <span class="hljs-attr">label</span>: <span class="hljs-string">'一级 3'</span>,
          <span class="hljs-attr">children</span>: [{
            <span class="hljs-attr">label</span>: <span class="hljs-string">'二级 3-1'</span>,
            <span class="hljs-attr">children</span>: [{
              <span class="hljs-attr">label</span>: <span class="hljs-string">'三级 3-1-1'</span>
            }]
          }, {
            <span class="hljs-attr">label</span>: <span class="hljs-string">'二级 3-2'</span>,
            <span class="hljs-attr">children</span>: [{
              <span class="hljs-attr">label</span>: <span class="hljs-string">'三级 3-2-1'</span>
            }]
          }]
        }],
        <span class="hljs-attr">defaultProps</span>: {
          <span class="hljs-attr">children</span>: <span class="hljs-string">'children'</span>,
          <span class="hljs-attr">label</span>: <span class="hljs-string">'label'</span>
        }
      };
    },
    <span class="hljs-attr">methods</span>: {
      handleNodeClick(data) {
        <span class="hljs-built_in">console</span>.log(data);
      }
    }
  };
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre></div></div>
      </div>

      <h3> 可选择</h3>
      <p>适用于需要选择层级时使用。在下例中，由于在点击时才进行该层数据的获取，导致层级不可预知，如果没有下层数据，则点击后下拉按钮会消失。</p>
      <div class="example">
        <div class="example-demo">
          <s-tree
            :data="regions"
            :props="props"
            :load="loadNode"
            lazy
            show-checkbox
            @check-change="handleCheckChange">
          </s-tree>
        </div>
        <div class="example-code" ><div class="description"></div><div class="highlight"><pre><code class="hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">s-tree</span>
  <span class="hljs-attr">:data</span>=<span class="hljs-string">"regions"</span>
  <span class="hljs-attr">:props</span>=<span class="hljs-string">"props"</span>
  <span class="hljs-attr">:load</span>=<span class="hljs-string">"loadNode"</span>
  <span class="hljs-attr">lazy</span>
  <span class="hljs-attr">show-checkbox</span>
  <span class="hljs-attr">@check-change</span>=<span class="hljs-string">"handleCheckChange"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">s-tree</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data() {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">regions</span>: [{
          <span class="hljs-string">'name'</span>: <span class="hljs-string">'region1'</span>
        }, {
          <span class="hljs-string">'name'</span>: <span class="hljs-string">'region2'</span>
        }],
        <span class="hljs-attr">props</span>: {
          <span class="hljs-attr">label</span>: <span class="hljs-string">'name'</span>,
          <span class="hljs-attr">children</span>: <span class="hljs-string">'zones'</span>
        },
        <span class="hljs-attr">count</span>: <span class="hljs-number">1</span>
      };
    },
    <span class="hljs-attr">methods</span>: {
      handleCheckChange(data, checked, indeterminate) {
        <span class="hljs-built_in">console</span>.log(data, checked, indeterminate);
      },
      handleNodeClick(data) {
        <span class="hljs-built_in">console</span>.log(data);
      },
      loadNode(node, resolve) {
        <span class="hljs-keyword">if</span> (node.level === <span class="hljs-number">0</span>) {
          <span class="hljs-keyword">return</span> resolve([{ <span class="hljs-attr">name</span>: <span class="hljs-string">'region1'</span> }, { <span class="hljs-attr">name</span>: <span class="hljs-string">'region2'</span> }]);
        }
        <span class="hljs-keyword">if</span> (node.level &gt; <span class="hljs-number">3</span>) <span class="hljs-keyword">return</span> resolve([]);

        <span class="hljs-keyword">var</span> hasChild;
        <span class="hljs-keyword">if</span> (node.data.name === <span class="hljs-string">'region1'</span>) {
          hasChild = <span class="hljs-literal">true</span>;
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (node.data.name === <span class="hljs-string">'region2'</span>) {
          hasChild = <span class="hljs-literal">false</span>;
        } <span class="hljs-keyword">else</span> {
          hasChild = <span class="hljs-built_in">Math</span>.random() &gt; <span class="hljs-number">0.5</span>;
        }

        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
          <span class="hljs-keyword">var</span> data;
          <span class="hljs-keyword">if</span> (hasChild) {
            data = [{
              <span class="hljs-attr">name</span>: <span class="hljs-string">'zone'</span> + <span class="hljs-keyword">this</span>.count++
            }, {
              <span class="hljs-attr">name</span>: <span class="hljs-string">'zone'</span> + <span class="hljs-keyword">this</span>.count++
            }];
          } <span class="hljs-keyword">else</span> {
            data = [];
          }

          resolve(data);
        }, <span class="hljs-number">500</span>);
      }
    }
  };
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre></div></div>
      </div>

      <h3> 默认展开和默认选中</h3>
      <p>可将 Tree 的某些节点设置为默认展开或默认选中</p>
      <div class="example">
        <div class="example-demo">
          <s-tree
            :data="data2"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps">
          </s-tree>
        </div>
        <div class="example-code" ><div class="description"><p>分别通过<code>default-expanded-keys</code>和<code>default-checked-keys</code>设置默认展开和默认选中的节点。需要注意的是，此时必须设置<code>node-key</code>，其值为节点数据中的一个字段名，该字段在整棵树中是唯一的。</p></div><div class="highlight"><pre><code class="hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">s-tree</span>
  <span class="hljs-attr">:data</span>=<span class="hljs-string">"data2"</span>
  <span class="hljs-attr">show-checkbox</span>
  <span class="hljs-attr">node-key</span>=<span class="hljs-string">"id"</span>
  <span class="hljs-attr">:default-expanded-keys</span>=<span class="hljs-string">"[2, 3]"</span>
  <span class="hljs-attr">:default-checked-keys</span>=<span class="hljs-string">"[5]"</span>
  <span class="hljs-attr">:props</span>=<span class="hljs-string">"defaultProps"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">s-tree</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data() {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">data2</span>: [{
          <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>,
          <span class="hljs-attr">label</span>: <span class="hljs-string">'一级 1'</span>,
          <span class="hljs-attr">children</span>: [{
            <span class="hljs-attr">id</span>: <span class="hljs-number">4</span>,
            <span class="hljs-attr">label</span>: <span class="hljs-string">'二级 1-1'</span>,
            <span class="hljs-attr">children</span>: [{
              <span class="hljs-attr">id</span>: <span class="hljs-number">9</span>,
              <span class="hljs-attr">label</span>: <span class="hljs-string">'三级 1-1-1'</span>
            }, {
              <span class="hljs-attr">id</span>: <span class="hljs-number">10</span>,
              <span class="hljs-attr">label</span>: <span class="hljs-string">'三级 1-1-2'</span>
            }]
          }]
        }, {
          <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>,
          <span class="hljs-attr">label</span>: <span class="hljs-string">'一级 2'</span>,
          <span class="hljs-attr">children</span>: [{
            <span class="hljs-attr">id</span>: <span class="hljs-number">5</span>,
            <span class="hljs-attr">label</span>: <span class="hljs-string">'二级 2-1'</span>
          }, {
            <span class="hljs-attr">id</span>: <span class="hljs-number">6</span>,
            <span class="hljs-attr">label</span>: <span class="hljs-string">'二级 2-2'</span>
          }]
        }, {
          <span class="hljs-attr">id</span>: <span class="hljs-number">3</span>,
          <span class="hljs-attr">label</span>: <span class="hljs-string">'一级 3'</span>,
          <span class="hljs-attr">children</span>: [{
            <span class="hljs-attr">id</span>: <span class="hljs-number">7</span>,
            <span class="hljs-attr">label</span>: <span class="hljs-string">'二级 3-1'</span>
          }, {
            <span class="hljs-attr">id</span>: <span class="hljs-number">8</span>,
            <span class="hljs-attr">label</span>: <span class="hljs-string">'二级 3-2'</span>
          }]
        }],
        <span class="hljs-attr">defaultProps</span>: {
          <span class="hljs-attr">children</span>: <span class="hljs-string">'children'</span>,
          <span class="hljs-attr">label</span>: <span class="hljs-string">'label'</span>
        }
      };
    }
  };
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre></div></div>
      </div>

      <h3> 树节点的选择</h3>
      <div class="example">
        <div class="example-demo">
          <s-tree
            :data="data2"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            :props="defaultProps">
          </s-tree>

          <div class="buttons">
            <s-button @click="getCheckedNodes">通过 node 获取</s-button>
            <s-button @click="getCheckedKeys">通过 key 获取</s-button>
            <s-button @click="setCheckedNodes">通过 node 设置</s-button>
            <s-button @click="setCheckedKeys">通过 key 设置</s-button>
            <s-button @click="resetChecked">清空</s-button>
          </div>
        </div>
        <div class="example-code" ><div class="description"><p>本例展示如何获取和设置选中节点。获取和设置各有两种方式：通过 node 或通过 key。如果需要通过 key 来获取或设置，则必须设置<code>node-key</code>。</p></div><div class="highlight"><pre><code class="hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">s-tree</span>
  <span class="hljs-attr">:data</span>=<span class="hljs-string">"data2"</span>
  <span class="hljs-attr">show-checkbox</span>
  <span class="hljs-attr">default-expand-all</span>
  <span class="hljs-attr">node-key</span>=<span class="hljs-string">"id"</span>
  <span class="hljs-attr">ref</span>=<span class="hljs-string">"tree"</span>
  <span class="hljs-attr">highlight-current</span>
  <span class="hljs-attr">:props</span>=<span class="hljs-string">"defaultProps"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">s-tree</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"buttons"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">s-button</span> <span class="hljs-attr">@click</span>=<span class="hljs-string">"getCheckedNodes"</span>&gt;</span>通过 node 获取<span class="hljs-tag">&lt;/<span class="hljs-name">s-button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">s-button</span> <span class="hljs-attr">@click</span>=<span class="hljs-string">"getCheckedKeys"</span>&gt;</span>通过 key 获取<span class="hljs-tag">&lt;/<span class="hljs-name">s-button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">s-button</span> <span class="hljs-attr">@click</span>=<span class="hljs-string">"setCheckedNodes"</span>&gt;</span>通过 node 设置<span class="hljs-tag">&lt;/<span class="hljs-name">s-button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">s-button</span> <span class="hljs-attr">@click</span>=<span class="hljs-string">"setCheckedKeys"</span>&gt;</span>通过 key 设置<span class="hljs-tag">&lt;/<span class="hljs-name">s-button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">s-button</span> <span class="hljs-attr">@click</span>=<span class="hljs-string">"resetChecked"</span>&gt;</span>清空<span class="hljs-tag">&lt;/<span class="hljs-name">s-button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">methods</span>: {
      getCheckedNodes() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$refs.tree.getCheckedNodes());
      },
      getCheckedKeys() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$refs.tree.getCheckedKeys());
      },
      setCheckedNodes() {
        <span class="hljs-keyword">this</span>.$refs.tree.setCheckedNodes([{
          <span class="hljs-attr">id</span>: <span class="hljs-number">5</span>,
          <span class="hljs-attr">label</span>: <span class="hljs-string">'二级 2-1'</span>
        }, {
          <span class="hljs-attr">id</span>: <span class="hljs-number">9</span>,
          <span class="hljs-attr">label</span>: <span class="hljs-string">'三级 1-1-1'</span>
        }]);
      },
      setCheckedKeys() {
        <span class="hljs-keyword">this</span>.$refs.tree.setCheckedKeys([<span class="hljs-number">3</span>]);
      },
      resetChecked() {
        <span class="hljs-keyword">this</span>.$refs.tree.setCheckedKeys([]);
      }
    },

    data() {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">data2</span>: [{
          <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>,
          <span class="hljs-attr">label</span>: <span class="hljs-string">'一级 1'</span>,
          <span class="hljs-attr">children</span>: [{
            <span class="hljs-attr">id</span>: <span class="hljs-number">4</span>,
            <span class="hljs-attr">label</span>: <span class="hljs-string">'二级 1-1'</span>,
            <span class="hljs-attr">children</span>: [{
              <span class="hljs-attr">id</span>: <span class="hljs-number">9</span>,
              <span class="hljs-attr">label</span>: <span class="hljs-string">'三级 1-1-1'</span>
            }, {
              <span class="hljs-attr">id</span>: <span class="hljs-number">10</span>,
              <span class="hljs-attr">label</span>: <span class="hljs-string">'三级 1-1-2'</span>
            }]
          }]
        }, {
          <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>,
          <span class="hljs-attr">label</span>: <span class="hljs-string">'一级 2'</span>,
          <span class="hljs-attr">children</span>: [{
            <span class="hljs-attr">id</span>: <span class="hljs-number">5</span>,
            <span class="hljs-attr">label</span>: <span class="hljs-string">'二级 2-1'</span>
          }, {
            <span class="hljs-attr">id</span>: <span class="hljs-number">6</span>,
            <span class="hljs-attr">label</span>: <span class="hljs-string">'二级 2-2'</span>
          }]
        }, {
          <span class="hljs-attr">id</span>: <span class="hljs-number">3</span>,
          <span class="hljs-attr">label</span>: <span class="hljs-string">'一级 3'</span>,
          <span class="hljs-attr">children</span>: [{
            <span class="hljs-attr">id</span>: <span class="hljs-number">7</span>,
            <span class="hljs-attr">label</span>: <span class="hljs-string">'二级 3-1'</span>
          }, {
            <span class="hljs-attr">id</span>: <span class="hljs-number">8</span>,
            <span class="hljs-attr">label</span>: <span class="hljs-string">'二级 3-2'</span>
          }]
        }],
        <span class="hljs-attr">defaultProps</span>: {
          <span class="hljs-attr">children</span>: <span class="hljs-string">'children'</span>,
          <span class="hljs-attr">label</span>: <span class="hljs-string">'label'</span>
        }
      };
    }
  };
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre></div></div>
      </div>

      <h3> 自定义节点内容</h3>
      <p>节点的内容支持自定义，可以在节点区添加按钮或图标等内容</p>
      <div class="example">
        <div class="example-demo">
          <s-tree
            :data="data2"
            :props="defaultProps"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            :render-content="renderContent">
          </s-tree>
        </div>
        <div class="example-code" ><div class="description"><p>使用<code>render-content</code>指定渲染函数，该函数返回需要的节点区内容即可。渲染函数的用法请参考 Vue 文档。</p></div><div class="highlight"><pre><code class="hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">s-tree</span>
  <span class="hljs-attr">:data</span>=<span class="hljs-string">"data2"</span>
  <span class="hljs-attr">:props</span>=<span class="hljs-string">"defaultProps"</span>
  <span class="hljs-attr">show-checkbox</span>
  <span class="hljs-attr">node-key</span>=<span class="hljs-string">"id"</span>
  <span class="hljs-attr">default-expand-all</span>
  <span class="hljs-attr">:expand-on-click-node</span>=<span class="hljs-string">"false"</span>
  <span class="hljs-attr">:render-content</span>=<span class="hljs-string">"renderContent"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">s-tree</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
  let id = <span class="hljs-number">1000</span>;

  export <span class="hljs-keyword">default</span> {
    data() {
      <span class="hljs-keyword">return</span> {
        data2: [{
          id: <span class="hljs-number">1</span>,
          label: <span class="hljs-string">'一级 1'</span>,
          children: [{
            id: <span class="hljs-number">4</span>,
            label: <span class="hljs-string">'二级 1-1'</span>,
            children: [{
              id: <span class="hljs-number">9</span>,
              label: <span class="hljs-string">'三级 1-1-1'</span>
            }, {
              id: <span class="hljs-number">10</span>,
              label: <span class="hljs-string">'三级 1-1-2'</span>
            }]
          }]
        }, {
          id: <span class="hljs-number">2</span>,
          label: <span class="hljs-string">'一级 2'</span>,
          children: [{
            id: <span class="hljs-number">5</span>,
            label: <span class="hljs-string">'二级 2-1'</span>
          }, {
            id: <span class="hljs-number">6</span>,
            label: <span class="hljs-string">'二级 2-2'</span>
          }]
        }, {
          id: <span class="hljs-number">3</span>,
          label: <span class="hljs-string">'一级 3'</span>,
          children: [{
            id: <span class="hljs-number">7</span>,
            label: <span class="hljs-string">'二级 3-1'</span>
          }, {
            id: <span class="hljs-number">8</span>,
            label: <span class="hljs-string">'二级 3-2'</span>
          }]
        }],
        defaultProps: {
          children: <span class="hljs-string">'children'</span>,
          label: <span class="hljs-string">'label'</span>
        }
      }
    },

    methods: {
      append(store, data) {
        store.append({ id: id++, label: <span class="hljs-string">'testtest'</span>, children: [] }, data);
      },

      remove(store, data) {
        store.remove(data);
      },

      renderContent(h, { node, data, store }) {
        <span class="hljs-keyword">return</span> (
          &lt;span&gt;
            &lt;span&gt;
              &lt;span&gt;{node.label}&lt;/span&gt;
            &lt;/span&gt;
            &lt;span style=<span class="hljs-string">"float: right; margin-right: 20px"</span>&gt;
              &lt;s-button size=<span class="hljs-string">"mini"</span> on-click={ () =&gt; <span class="hljs-keyword">this</span>.append(store, data) }&gt;Append&lt;/s-button&gt;
              &lt;s-button size=<span class="hljs-string">"mini"</span> on-click={ () =&gt; <span class="hljs-keyword">this</span>.remove(store, data) }&gt;Delete&lt;/s-button&gt;
            &lt;/span&gt;
          &lt;/span&gt;);
      }
    }
  };
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre></div></div>
      </div>

      <h3> 节点过滤</h3>
      <p>通过关键字过滤树节点</p>
      <div class="example">
        <div class="example-demo">
          <s-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
          </s-input>

          <s-tree
            class="filter-tree"
            :data="data2"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
            ref="tree2">
          </s-tree>
        </div>
        <div class="example-code" ><div class="description"><p>在需要对节点进行过滤时，调用 Tree 实例的<code>filter</code>方法，参数为关键字。需要注意的是，此时需要设置<code>filter-node-method</code>，值为过滤函数。</p></div><div class="highlight"><pre><code class="hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">s-input</span>
  <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"输入关键字进行过滤"</span>
  <span class="hljs-attr">v-model</span>=<span class="hljs-string">"filterText"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">s-input</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">s-tree</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">"filter-tree"</span>
  <span class="hljs-attr">:data</span>=<span class="hljs-string">"data2"</span>
  <span class="hljs-attr">:props</span>=<span class="hljs-string">"defaultProps"</span>
  <span class="hljs-attr">default-expand-all</span>
  <span class="hljs-attr">:filter-node-method</span>=<span class="hljs-string">"filterNode"</span>
  <span class="hljs-attr">ref</span>=<span class="hljs-string">"tree2"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">s-tree</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">watch</span>: {
      filterText(val) {
        <span class="hljs-keyword">this</span>.$refs.tree2.filter(val);
      }
    },

    <span class="hljs-attr">methods</span>: {
      filterNode(value, data) {
        <span class="hljs-keyword">if</span> (!value) <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
        <span class="hljs-keyword">return</span> data.label.indexOf(value) !== <span class="hljs-number">-1</span>;
      }
    },

    data() {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">filterText</span>: <span class="hljs-string">''</span>,
        <span class="hljs-attr">data2</span>: [{
          <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>,
          <span class="hljs-attr">label</span>: <span class="hljs-string">'一级 1'</span>,
          <span class="hljs-attr">children</span>: [{
            <span class="hljs-attr">id</span>: <span class="hljs-number">4</span>,
            <span class="hljs-attr">label</span>: <span class="hljs-string">'二级 1-1'</span>,
            <span class="hljs-attr">children</span>: [{
              <span class="hljs-attr">id</span>: <span class="hljs-number">9</span>,
              <span class="hljs-attr">label</span>: <span class="hljs-string">'三级 1-1-1'</span>
            }, {
              <span class="hljs-attr">id</span>: <span class="hljs-number">10</span>,
              <span class="hljs-attr">label</span>: <span class="hljs-string">'三级 1-1-2'</span>
            }]
          }]
        }, {
          <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>,
          <span class="hljs-attr">label</span>: <span class="hljs-string">'一级 2'</span>,
          <span class="hljs-attr">children</span>: [{
            <span class="hljs-attr">id</span>: <span class="hljs-number">5</span>,
            <span class="hljs-attr">label</span>: <span class="hljs-string">'二级 2-1'</span>
          }, {
            <span class="hljs-attr">id</span>: <span class="hljs-number">6</span>,
            <span class="hljs-attr">label</span>: <span class="hljs-string">'二级 2-2'</span>
          }]
        }, {
          <span class="hljs-attr">id</span>: <span class="hljs-number">3</span>,
          <span class="hljs-attr">label</span>: <span class="hljs-string">'一级 3'</span>,
          <span class="hljs-attr">children</span>: [{
            <span class="hljs-attr">id</span>: <span class="hljs-number">7</span>,
            <span class="hljs-attr">label</span>: <span class="hljs-string">'二级 3-1'</span>
          }, {
            <span class="hljs-attr">id</span>: <span class="hljs-number">8</span>,
            <span class="hljs-attr">label</span>: <span class="hljs-string">'二级 3-2'</span>
          }]
        }],
        <span class="hljs-attr">defaultProps</span>: {
          <span class="hljs-attr">children</span>: <span class="hljs-string">'children'</span>,
          <span class="hljs-attr">label</span>: <span class="hljs-string">'label'</span>
        }
      };
    }
  };
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre></div></div>
      </div>

      <h3> 手风琴模式</h3>
      <p>每次只打开一个同级树节点展开</p>
      <div class="example">
        <div class="example-demo">
          <s-tree
            :data="data"
            :props="defaultProps"
            accordion
            @node-click="handleNodeClick">
          </s-tree>
        </div>
        <div class="exapmle-code" ><div class="description"></div><div class="highlight"><pre><code class="hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">s-tree</span>
  <span class="hljs-attr">:data</span>=<span class="hljs-string">"data"</span>
  <span class="hljs-attr">:props</span>=<span class="hljs-string">"defaultProps"</span>
  <span class="hljs-attr">accordion</span>
  <span class="hljs-attr">@node-click</span>=<span class="hljs-string">"handleNodeClick"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">s-tree</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data() {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">data</span>: [{
          <span class="hljs-attr">label</span>: <span class="hljs-string">'一级 1'</span>,
          <span class="hljs-attr">children</span>: [{
            <span class="hljs-attr">label</span>: <span class="hljs-string">'二级 1-1'</span>,
            <span class="hljs-attr">children</span>: [{
              <span class="hljs-attr">label</span>: <span class="hljs-string">'三级 1-1-1'</span>
            }]
          }]
        }, {
          <span class="hljs-attr">label</span>: <span class="hljs-string">'一级 2'</span>,
          <span class="hljs-attr">children</span>: [{
            <span class="hljs-attr">label</span>: <span class="hljs-string">'二级 2-1'</span>,
            <span class="hljs-attr">children</span>: [{
              <span class="hljs-attr">label</span>: <span class="hljs-string">'三级 2-1-1'</span>
            }]
          }, {
            <span class="hljs-attr">label</span>: <span class="hljs-string">'二级 2-2'</span>,
            <span class="hljs-attr">children</span>: [{
              <span class="hljs-attr">label</span>: <span class="hljs-string">'三级 2-2-1'</span>
            }]
          }]
        }, {
          <span class="hljs-attr">label</span>: <span class="hljs-string">'一级 3'</span>,
          <span class="hljs-attr">children</span>: [{
            <span class="hljs-attr">label</span>: <span class="hljs-string">'二级 3-1'</span>,
            <span class="hljs-attr">children</span>: [{
              <span class="hljs-attr">label</span>: <span class="hljs-string">'三级 3-1-1'</span>
            }]
          }, {
            <span class="hljs-attr">label</span>: <span class="hljs-string">'二级 3-2'</span>,
            <span class="hljs-attr">children</span>: [{
              <span class="hljs-attr">label</span>: <span class="hljs-string">'三级 3-2-1'</span>
            }]
          }]
        }],
        <span class="hljs-attr">defaultProps</span>: {
          <span class="hljs-attr">children</span>: <span class="hljs-string">'children'</span>,
          <span class="hljs-attr">label</span>: <span class="hljs-string">'label'</span>
        }
      };
    },
    <span class="hljs-attr">methods</span>: {
      handleNodeClick(data) {
        <span class="hljs-built_in">console</span>.log(data);
      }
    }
  };
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre></div></div>
      </div>

      <h3> Attributes</h3>
      <table class="table"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>可选值</th><th>默认值</th></tr></thead><tbody><tr><td>data</td><td>展示数据</td><td>array</td><td>—</td><td>—</td></tr><tr><td>empty-text</td><td>内容为空的时候展示的文本</td><td>String</td><td>—</td><td>—</td></tr><tr><td>node-key</td><td>每个树节点用来作为唯一标识的属性，整颗树应该是唯一的</td><td>String</td><td>—</td><td>—</td></tr><tr><td>props</td><td>配置选项，具体看下表</td><td>object</td><td>—</td><td>—</td></tr><tr><td>load</td><td>加载子树数据的方法</td><td>function(node, resolve)</td><td>—</td><td>—</td></tr><tr><td>render-content</td><td>树节点的内容区的渲染 Function</td><td>Function(h, { node }</td><td>—</td><td>—</td></tr><tr><td>highlight-current</td><td>是否高亮当前选中节点，默认值是 false。</td><td>boolean</td><td>—</td><td>false</td></tr><tr><td>current-node-key</td><td>当前选中节点的 key，只写属性</td><td>string, number</td><td>—</td><td>—</td></tr><tr><td>default-expand-all</td><td>是否默认展开所有节点</td><td>boolean</td><td>—</td><td>false</td></tr><tr><td>expand-on-click-node</td><td>是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。</td><td>boolean</td><td>—</td><td>true</td></tr><tr><td>auto-expand-parent</td><td>展开子节点的时候是否自动展开父节点</td><td>boolean</td><td>—</td><td>true</td></tr><tr><td>default-expanded-keys</td><td>默认展开的节点的 key 的数组</td><td>array</td><td>—</td><td>—</td></tr><tr><td>show-checkbox</td><td>节点是否可被选择</td><td>boolean</td><td>—</td><td>false</td></tr><tr><td>check-strictly</td><td>在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false</td><td>boolean</td><td>—</td><td>false</td></tr><tr><td>default-checked-keys</td><td>默认勾选的节点的 key 的数组</td><td>array</td><td>—</td><td>—</td></tr><tr><td>filter-node-method</td><td>对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏</td><td>Function(value, data, node)</td><td>—</td><td>—</td></tr><tr><td>accordion</td><td>是否每次只打开一个同级树节点展开</td><td>boolean</td><td>—</td><td>false</td></tr><tr><td>indent</td><td>相邻级节点间的水平缩进，单位为像素</td><td>number</td><td>—</td><td>16</td></tr></tbody></table>
      <h3 id="props"> props</h3>
      <table class="table"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>可选值</th><th>默认值</th></tr></thead><tbody><tr><td>label</td><td>指定节点标签为节点对象的某个属性值</td><td>string</td><td>—</td><td>—</td></tr><tr><td>children</td><td>指定子树为节点对象的某个属性值</td><td>string</td><td>—</td><td>—</td></tr></tbody></table>
      <h3 id="fang-fa"> 方法</h3>
      <p><code>Tree</code> 拥有如下方法，返回目前被选中的节点数组：</p>
      <table class="table"><thead><tr><th>方法名</th><th>说明</th><th>参数</th></tr></thead><tbody><tr><td>filter</td><td>对树节点进行筛选操作</td><td>接收一个任意类型的参数，该参数会在 filter-node-method 中作为第一个参数</td></tr><tr><td>getCheckedNodes</td><td>若节点可被选择（即 <code>show-checkbox</code> 为 <code>true</code>），则返回目前被选中的节点所组成的数组</td><td>(leafOnly) 接收一个 boolean 类型的参数，若为 <code>true</code> 则仅返回被选中的叶子节点，默认值为 <code>false</code></td></tr><tr><td>setCheckedNodes</td><td>设置目前勾选的节点，使用此方法必须设置 node-key 属性</td><td>(nodes) 接收勾选节点数据的数组</td></tr><tr><td>getCheckedKeys</td><td>若节点可被选择（即 <code>show-checkbox</code> 为 <code>true</code>），则返回目前被选中的节点所组成的数组</td><td>(leafOnly) 接收一个 boolean 类型的参数，若为 <code>true</code> 则仅返回被选中的叶子节点的 keys，默认值为 <code>false</code></td></tr><tr><td>setCheckedKeys</td><td>通过 keys 设置目前勾选的节点，使用此方法必须设置 node-key 属性</td><td>(keys, leafOnly) 接收两个参数，1. 勾选节点的 key 的数组 2. boolean 类型的参数，若为 <code>true</code> 则仅设置叶子节点的选中状态，默认值为 <code>false</code></td></tr><tr><td>setChecked</td><td>通过 key / data 设置某个节点的勾选状态，使用此方法必须设置 node-key 属性</td><td>(key/data, checked, deep) 接收三个参数，1. 勾选节点的 key 或者 data 2. boolean 类型，节点是否选中  3. boolean 类型，是否设置子节点 ，默认为 false</td></tr></tbody></table>
      <h3 id="events"> Events</h3>
      <table class="table"><thead><tr><th>事件名称</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td>node-click</td><td>节点被点击时的回调</td><td>共三个参数，依次为：传递给 <code>data</code> 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。</td></tr><tr><td>check-change</td><td>节点选中状态发生变化时的回调</td><td>共三个参数，依次为：传递给 <code>data</code> 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点</td></tr><tr><td>current-change</td><td>当前选中节点变化时触发的事件</td><td>共两个参数，依次为：当前节点的数据，当前节点的 Node 对象</td></tr><tr><td>node-expand</td><td>节点被展开时触发的事件</td><td>共三个参数，依次为：传递给 <code>data</code> 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。</td></tr><tr><td>node-collapse</td><td>节点被关闭时触发的事件</td><td>共三个参数，依次为：传递给 <code>data</code> 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。</td></tr></tbody></table>

  </article>
</template>

<script>
  let id = 1000;
  export default {
    data() {
      return {
        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        regions: [{
          'name': 'region1'
        }, {
          'name': 'region2'
        }],
        props: {
          label: 'name',
          children: 'zones'
        },
        count: 1,
        filterText: ''
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([{ name: 'region1' }, { name: 'region2' }]);
        }
        if (node.level > 3) return resolve([]);

        var hasChild;
        if (node.data.name === 'region1') {
          hasChild = true;
        } else if (node.data.name === 'region2') {
          hasChild = false;
        } else {
          hasChild = Math.random() > 0.5;
        }

        setTimeout(() => {
          var data;
          if (hasChild) {
            data = [{
              name: 'zone' + this.count++
            }, {
              name: 'zone' + this.count++
            }];
          } else {
            data = [];
          }

          resolve(data);
        }, 500);
      },
      getCheckedNodes() {
        console.log(this.$refs.tree.getCheckedNodes());
      },
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys());
      },
      setCheckedNodes() {
        this.$refs.tree.setCheckedNodes([{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 9,
          label: '三级 1-1-1'
        }]);
      },
      setCheckedKeys() {
        this.$refs.tree.setCheckedKeys([3]);
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      },
      append(store, data) {
        store.append({ id: id++, label: 'testtest', children: [] }, data);
      },
      look(store, data) {
        console.log(data);
      },
      remove(store, data) {
        store.remove(data);
      },
      renderContent(h, { node, data, store }) {
        return (
          <span>
            <span>
              <span>{node.label}</span>
            </span>
            <span style="float: right; margin-right: 20px">
              <s-button type="transparent" icon="add" size="mini" on-click={ () => this.append(store, data) }>添加</s-button>
              <s-button type="transparent" icon="eye" size="mini" on-click={ () => this.look(store, data) }>查看</s-button>
              <s-button type="transparent" icon="close" size="mini" on-click={ () => this.remove(store, data) }>删除</s-button>
            </span>
          </span>);
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    }
  }
</script>
