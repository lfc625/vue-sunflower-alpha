<template>
  <article class="article">
    <h1>Checkbox</h1>

    <h3>基础用法</h3>
    <p>单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍。</p>
    <div class="example">
      <div class="example-demo">
        <s-checkbox v-model="checked">备选项</s-checkbox>
      </div>
      <div class="example-code">
        <div class="description"><p>在<code>s-checkbox</code>元素中定义<code>v-model</code>绑定变量，单一的<code>checkbox</code>中，默认绑定变量的值会是<code>Boolean</code>，选中为<code>true</code>。
        </p></div>
        <pre><code>
    &lt;s-checkbox v-model="checked"&gt;备选项&lt;/s-checkbox&gt;
    &lt;script&gt;
    export default {
      data() {
        return {
          checked: true
        }
      }
    }
    &lt;/script&gt;
        </code></pre>
      </div>
    </div>

    <h3 id="jin-yong-zhuang-tai"> 禁用状态</h3>
    <p>多选框不可用状态。</p>
    <div class="example">
      <div class="example-demo">
        <s-checkbox v-model="checked1" disabled>备选项1</s-checkbox>
        <s-checkbox v-model="checked2" disabled>备选项</s-checkbox>
      </div>
      <div class="example-code">
        <div class="description"><p>设置<code>disabled</code>属性即可。</p></div>
        <pre><code>
&lt;template&gt;
  &lt;s-checkbox v-model="checked1" disabled&gt;备选项1&lt;/s-checkbox&gt;
  &lt;s-checkbox v-model="checked2" disabled&gt;备选项&lt;/s-checkbox&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
      data() {
          return {
              checked1: false,
              checked2: true
          };
      }
  };
&lt;/script&gt;
        </code></pre>
      </div>
    </div>

    <h3>多选框组</h3>
    <p>适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。</p>
    <div class="example">
      <div class="example-demo">
        <s-checkbox-group v-model="checkList">
          <s-checkbox label="复选框 A"></s-checkbox>
          <s-checkbox label="复选框 B"></s-checkbox>
          <s-checkbox label="复选框 C"></s-checkbox>
          <s-checkbox label="禁用" disabled></s-checkbox>
          <s-checkbox label="选中且禁用" disabled></s-checkbox>
        </s-checkbox-group>
      </div>
      <div class="example-code">
        <div class="description"><p><code>checkbox-group</code>元素能把多个 checkbox 管理为一组，只需要在 Group 中使用<code>v-model</code>绑定<code>Array</code>类型的变量即可。 <code>s-checkbox</code>
          的 <code>label</code>属性是该 checkbox 对应的值，若该标签中无内容，则该属性也充当 checkbox 按钮后的介绍。<code>label</code>与数组中的元素值相对应，如果存在指定的值则为选中状态，否则为不选中。
        </p></div>
        <pre><code>
&lt;template&gt;
  &lt;s-checkbox-group v-model="checkList"&gt;
  &lt;s-checkbox label="复选框 A"&gt;&lt;/s-checkbox&gt;
  &lt;s-checkbox label="复选框 B"&gt;&lt;/s-checkbox&gt;
  &lt;s-checkbox label="复选框 C"&gt;&lt;/s-checkbox&gt;
  &lt;s-checkbox label="禁用" disabled&gt;&lt;/s-checkbox&gt;
  &lt;s-checkbox label="选中且禁用" disabled&gt;&lt;/s-checkbox&gt;
&lt;/s-checkbox-group&gt;
&lt;/template>
&lt;script&gt;
  export default {
      data () {
          return {
              checkList: ['选中且禁用','复选框 A']
          };
      }
  };
&lt;/script&gt;
        </code></pre>
      </div>
    </div>

    <h3>indeterminate 状态</h3>
    <p><code>indeterminate</code> 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果</p>
    <div class="example">
      <div class="example-demo">
        <s-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</s-checkbox>
        <div style="margin: 15px 0;"></div>
        <s-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <s-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</s-checkbox>
        </s-checkbox-group>
      </div>
      <div class="example-code">
        <pre><code>
&lt;template&gt;
  &lt;s-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"&gt;全选&lt;/s-checkbox&gt;
  &lt;div style="margin: 15px 0;"&gt;&lt;/div&gt;
  &lt;s-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange"&gt;
    &lt;s-checkbox v-for="city in cities" :label="city"&gt;{ { city } }&lt;/s-checkbox&gt;
  &lt;/s-checkbox-group&gt;
&lt;/template&gt;
&lt;script&gt;
  const cityOptions = ['上海', '北京', '广州', '深圳'];
  export default {
      data() {
          return {
              checkAll: true,
              checkedCities: ['上海', '北京'],
              cities: cityOptions,
              isIndeterminate: true
          };
      },
      methods: {
          handleCheckAllChange(event) {
              this.checkedCities = event.target.checked ? cityOptions : [];
              this.isIndeterminate = false;
          },
          handleCheckedCitiesChange(value) {
              let checkedCount = value.length;
              this.checkAll = checkedCount === this.cities.length;
              this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
          }
      }
  };
&lt;/script&gt;
        </code></pre>
      </div>
    </div>

    <h3 id="checkbox-attributes"> Checkbox Attributes</h3>
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
        <td>选中状态的值（只有在<code>checkbox-group</code>或者绑定对象类型为<code>array</code>时有效）</td>
        <td>string</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <td>true-label</td>
        <td>选中时的值</td>
        <td>string, number</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <td>false-label</td>
        <td>没有选中时的值</td>
        <td>string, number</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <td>name</td>
        <td>原生 name 属性</td>
        <td>string</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <td>disabled</td>
        <td>按钮禁用</td>
        <td>boolean</td>
        <td>—</td>
        <td>false</td>
      </tr>
      <tr>
        <td>checked</td>
        <td>当前是否勾选</td>
        <td>boolean</td>
        <td>—</td>
        <td>false</td>
      </tr>
      <tr>
        <td>indeterminate</td>
        <td>设置 indeterminate 状态，只负责样式控制</td>
        <td>boolean</td>
        <td>—</td>
        <td>false</td>
      </tr>
      </tbody>
    </table>
    <h3 id="checkbox-group-events"> Checkbox-group Events</h3>
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
        <td>当绑定值变化时触发的事件</td>
        <td>event 事件对象</td>
      </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
  const cityOptions = ['上海', '北京', '广州', '深圳'];
  export default {
    data() {
      return {
        checked: true,
        checked1: false,
        checked2: true,
        checkList: ['选中且禁用', '复选框 A'],
        checkAll: true,
        checkedCities: ['上海', '北京'],
        cities: cityOptions,
        isIndeterminate: true
      }
    },
    methods: {
      handleCheckAllChange(event) {
        this.checkedCities = event.target.checked ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      }
    }
  }
</script>