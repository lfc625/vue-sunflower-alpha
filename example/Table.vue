<template>
  <article class="article">
    <h1>Table 表格</h1>

    <h3>基础表格</h3>
    <div class="desc">当 s-table 元素中注入data对象数组后，在 s-table-column 中用 prop 属性来对应对象中的键名即可填入数据，用 label 属性来定义表格的列名。可以使用 width 属性来定义列宽。</div>
    <div class="example">
      <div class="example-demo">
        <s-table
          :data="tableDataA"
          style="width: 100%">
          <s-table-column
            prop="date"
            label="日期"
            width="180">
          </s-table-column>
          <s-table-column
            prop="name"
            label="姓名"
            width="180">
          </s-table-column>
          <s-table-column
            prop="address"
            label="地址">
          </s-table-column>
        </s-table>
      </div>
      <example-code>
        <textarea>
    <s-table
      :data="tableDataA"
      style="width: 100%">
      <s-table-column
        prop="date"
        label="日期"
        width="180">
      </s-table-column>
      <s-table-column
        prop="name"
        label="姓名"
        width="180">
      </s-table-column>
      <s-table-column
        prop="address"
        label="地址">
      </s-table-column>
    </s-table>
    <script>
      export default {
        data() {
          return {
            tableDataA: [{
              date: '2017-01-01',
              name: '傻妞',
              address: '上海市普陀区金沙江路 1666 弄'
            }, {
              date: '2017-01-01',
              name: '傻妞',
              address: '上海市普陀区金沙江路 1666 弄'
            }, {
              date: '2017-01-01',
              name: '傻妞',
              address: '上海市普陀区金沙江路 1666 弄'
            }]
          }
        }
      }
    </script>
        </textarea>
        <pre><code></code></pre>
      </example-code>
    </div>

    <h3>带索引</h3>
    <div class="desc">如果需要显示索引，可以增加一列 s-table-column，设置 type 属性为 index 即可显示从 1 开始的索引号。</div>
    <div class="example">
      <div class="example-demo">
        <s-table
          :data="tableDataA"
          style="width: 100%">
          <s-table-column
            type="index"
            width="50"></s-table-column>
          <s-table-column
            prop="date"
            label="日期"
            width="180">
          </s-table-column>
          <s-table-column
            prop="name"
            label="姓名"
            width="180">
          </s-table-column>
          <s-table-column
            prop="address"
            label="地址">
          </s-table-column>
        </s-table>
      </div>
      <example-code>
        <textarea>
    <s-table
      :data="tableDataA"
      style="width: 100%">
      <s-table-column
        type="index"
        width="50"></s-table-column>
      <s-table-column
        prop="date"
        label="日期"
        width="180">
      </s-table-column>
      <s-table-column
        prop="name"
        label="姓名"
        width="180">
      </s-table-column>
      <s-table-column
        prop="address"
        label="地址">
      </s-table-column>
    </s-table>
        </textarea>
        <pre><code></code></pre>
      </example-code>
    </div>

    <h3>带斑马纹的表格</h3>
    <div class="desc">stripe 属性可以创建带斑马纹的表格。它接受一个 Boolean，默认为 false，设置为 true 即为启用。</div>
    <div class="example">
      <div class="example-demo">
        <s-table
          :data="tableDataA"
          style="width: 100%"
          stripe>
          <s-table-column
            prop="date"
            label="日期"
            width="180">
          </s-table-column>
          <s-table-column
            prop="name"
            label="姓名"
            width="180">
          </s-table-column>
          <s-table-column
            prop="address"
            label="地址">
          </s-table-column>
        </s-table>
      </div>
      <example-code>
        <textarea>
    <s-table
      :data="tableDataA"
      style="width: 100%"
      stripe>
      <s-table-column
        prop="date"
        label="日期"
        width="180">
      </s-table-column>
      <s-table-column
        prop="name"
        label="姓名"
        width="180">
      </s-table-column>
      <s-table-column
        prop="address"
        label="地址">
      </s-table-column>
    </s-table>
        </textarea>
        <pre><code></code></pre>
      </example-code>
    </div>

    <h3>带边框的表格</h3>
    <div class="desc">默认情况下，Table 组件是不具有竖直方向的边框的，如果需要，可以使用 border 属性，它接受一个 Boolean，设置为 true 即可启用。</div>
    <div class="example">
      <div class="example-demo">
        <s-table
          :data="tableDataA"
          style="width: 100%"
          border>
          <s-table-column
            prop="date"
            label="日期"
            width="180">
          </s-table-column>
          <s-table-column
            prop="name"
            label="姓名"
            width="180">
          </s-table-column>
          <s-table-column
            prop="address"
            label="地址">
          </s-table-column>
        </s-table>
      </div>
      <example-code>
        <textarea>
    <s-table
      :data="tableDataA"
      style="width: 100%"
      border>
      <s-table-column
        prop="date"
        label="日期"
        width="180">
      </s-table-column>
      <s-table-column
        prop="name"
        label="姓名"
        width="180">
      </s-table-column>
      <s-table-column
        prop="address"
        label="地址">
      </s-table-column>
    </s-table>
        </textarea>
        <pre><code></code></pre>
      </example-code>
    </div>

    <h3>带状态表格</h3>
    <div class="desc">可将表格内容 highlight 显示，方便区分「成功、信息、警告、危险」等内容。可以通过指定 Table 组件的 row-class-name 属性来为 Table 中的某一行添加 class，表明该行处于某种状态。</div>
    <div class="example">
      <div class="example-demo">
        <s-table
          :data="tableDataA"
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <s-table-column
            prop="date"
            label="日期"
            width="180">
          </s-table-column>
          <s-table-column
            prop="name"
            label="姓名"
            width="180">
          </s-table-column>
          <s-table-column
            prop="address"
            label="地址">
          </s-table-column>
        </s-table>
      </div>
      <example-code>
        <textarea>
    <s-table
      :data="tableDataA"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <s-table-column
        prop="date"
        label="日期"
        width="180">
      </s-table-column>
      <s-table-column
        prop="name"
        label="姓名"
        width="180">
      </s-table-column>
      <s-table-column
        prop="address"
        label="地址">
      </s-table-column>
    </s-table>
    <script>
      export default {
        methods: {
          tableRowClassName(row, index) {
            if (index === 0) {
              return 'normal-row'
            } else if (index === 1) {
              return 'info-row'
            } else if (index === 2) {
              return 'warning-row'
            }
            return '';
          }
        }
      }
    </script>
        </textarea>
        <pre><code></code></pre>
      </example-code>
    </div>

    <h3>固定表头</h3>
    <div class="desc">只要在 s-table 元素中定义了 height 属性，即可实现固定表头的表格，而不需要额外的代码</div>
    <div class="example">
      <div class="example-demo">
        <s-table
          :data="tableDataA"
          style="width: 100%"
          height="250">
          <s-table-column
            prop="date"
            label="日期"
            width="180">
          </s-table-column>
          <s-table-column
            prop="name"
            label="姓名"
            width="180">
          </s-table-column>
          <s-table-column
            prop="address"
            label="地址">
          </s-table-column>
        </s-table>
      </div>
      <example-code>
        <textarea>
    <s-table
      :data="tableDataA"
      style="width: 100%"
      height="250">
      <s-table-column
        prop="date"
        label="日期"
        width="180">
      </s-table-column>
      <s-table-column
        prop="name"
        label="姓名"
        width="180">
      </s-table-column>
      <s-table-column
        prop="address"
        label="地址">
      </s-table-column>
    </s-table>
        </textarea>
        <pre><code></code></pre>
      </example-code>
    </div>

    <h3>固定列</h3>
    <div class="desc">横向内容过多时，可选择固定列。固定列需要使用 fixed 属性，它接受 Boolean 值或者 left right，表示左边固定还是右边固定。</div>
    <div class="example">
      <div class="example-demo">
        <s-table
          :data="tableDataB"
          style="width: 100%">
          <s-table-column
            prop="date"
            label="日期"
            width="180"
            fixed>
          </s-table-column>
          <s-table-column
            prop="name"
            label="姓名"
            width="150">
          </s-table-column>
          <s-table-column
            prop="province"
            label="省份"
            width="150">
          </s-table-column>
          <s-table-column
            prop="city"
            label="市区"
            width="150">
          </s-table-column>
          <s-table-column
            prop="address"
            label="地址"
            width="450">
          </s-table-column>
          <s-table-column
            prop="zip"
            label="邮编"
            width="150">
          </s-table-column>
          <s-table-column
            fixed="right"
            label="操作"
            width="180">
            <template slot-scope="scope">
              <i class="iconfont icon-eye" title="查看"></i>
              <i class="iconfont icon-error" title="删除"></i>
            </template>
          </s-table-column>
        </s-table>
      </div>
      <example-code>
        <textarea>
    <s-table
      :data="tableDataB"
      style="width: 100%">
      <s-table-column
        prop="date"
        label="日期"
        width="180"
        fixed>
      </s-table-column>
      <s-table-column
        prop="name"
        label="姓名"
        width="150">
      </s-table-column>
      <s-table-column
        prop="province"
        label="省份"
        width="150">
      </s-table-column>
      <s-table-column
        prop="city"
        label="市区"
        width="150">
      </s-table-column>
      <s-table-column
        prop="address"
        label="地址"
        width="450">
      </s-table-column>
      <s-table-column
        prop="zip"
        label="邮编"
        width="150">
      </s-table-column>
      <s-table-column
        fixed="right"
        label="操作"
        width="180">
        <template slot-scope="scope">
          <i class="iconfont icon-eye" title="查看"></i>
          <i class="iconfont icon-error" title="删除"></i>
        </template>
      </s-table-column>
    </s-table>
        </textarea>
        <pre><code></code></pre>
      </example-code>
    </div>

    <h3>固定列和表头</h3>
    <div class="desc">横纵内容过多时，可选择固定列和表头。</div>
    <div class="example">
      <div class="example-demo">
        <s-table
          :data="tableDataB"
          style="width: 100%"
          height="200">
          <s-table-column
            prop="date"
            label="日期"
            width="180"
            fixed>
          </s-table-column>
          <s-table-column
            prop="name"
            label="姓名"
            width="150">
          </s-table-column>
          <s-table-column
            prop="province"
            label="省份"
            width="150">
          </s-table-column>
          <s-table-column
            prop="city"
            label="市区"
            width="150">
          </s-table-column>
          <s-table-column
            prop="address"
            label="地址"
            width="450">
          </s-table-column>
          <s-table-column
            prop="zip"
            label="邮编"
            width="150">
          </s-table-column>
          <s-table-column
            fixed="right"
            label="操作"
            width="180">
            <template slot-scope="scope">
              <i class="iconfont icon-error" title="删除"></i>
            </template>
          </s-table-column>
        </s-table>
      </div>
      <example-code>
        <textarea>
    <s-table
      :data="tableDataB"
      style="width: 100%"
      height="200">
      <s-table-column
        prop="date"
        label="日期"
        width="180"
        fixed>
      </s-table-column>
      <s-table-column
        prop="name"
        label="姓名"
        width="150">
      </s-table-column>
      <s-table-column
        prop="province"
        label="省份"
        width="150">
      </s-table-column>
      <s-table-column
        prop="city"
        label="市区"
        width="150">
      </s-table-column>
      <s-table-column
        prop="address"
        label="地址"
        width="450">
      </s-table-column>
      <s-table-column
        prop="zip"
        label="邮编"
        width="150">
      </s-table-column>
      <s-table-column
        fixed="right"
        label="操作"
        width="180">
        <template slot-scope="scope">
          <i class="iconfont icon-error" title="删除"></i>
        </template>
      </s-table-column>
    </s-table>
        </textarea>
        <pre><code></code></pre>
      </example-code>
    </div>

    <h3>流体高度</h3>
    <div class="desc">当数据量动态变化时，可以为 Table 设置一个最大高度。</div>
    <div class="example">
      <div class="example-demo">
        <s-table
          :data="tableDataB"
          style="width: 100%"
          max-height="200">
          <s-table-column
            prop="date"
            label="日期"
            width="180"
            fixed>
          </s-table-column>
          <s-table-column
            prop="name"
            label="姓名"
            width="150">
          </s-table-column>
          <s-table-column
            prop="province"
            label="省份"
            width="150">
          </s-table-column>
          <s-table-column
            prop="city"
            label="市区"
            width="150">
          </s-table-column>
          <s-table-column
            prop="address"
            label="地址"
            width="450">
          </s-table-column>
          <s-table-column
            prop="zip"
            label="邮编"
            width="150">
          </s-table-column>
          <s-table-column
            fixed="right"
            label="操作"
            width="180">
            <template slot-scope="scope">
              <i class="iconfont icon-error" title="删除" @click="deleteRow(scope.$index, tableDataB)"></i>
            </template>
          </s-table-column>
        </s-table>
      </div>
      <example-code>
        <textarea>
    <s-table
      :data="tableDataB"
      style="width: 100%"
      max-height="200">
      <s-table-column
        prop="date"
        label="日期"
        width="180"
        fixed>
      </s-table-column>
      <s-table-column
        prop="name"
        label="姓名"
        width="150">
      </s-table-column>
      <s-table-column
        prop="province"
        label="省份"
        width="150">
      </s-table-column>
      <s-table-column
        prop="city"
        label="市区"
        width="150">
      </s-table-column>
      <s-table-column
        prop="address"
        label="地址"
        width="450">
      </s-table-column>
      <s-table-column
        prop="zip"
        label="邮编"
        width="150">
      </s-table-column>
      <s-table-column
        fixed="right"
        label="操作"
        width="180">
        <template slot-scope="scope">
          <i class="iconfont icon-error" title="删除" @click="deleteRow(scope.$index, tableDataB)"></i>
        </template>
      </s-table-column>
    </s-table>
    <script>
      export default {
        methods: {
          deleteRow(index, rows) {
            rows.splice(index, 1);
          }
        }
      }
    </script>
        </textarea>
        <pre><code></code></pre>
      </example-code>
    </div>

    <h3>多级表头</h3>
    <div class="desc">只需要在 s-table-column 里面嵌套 s-table-column，就可以实现多级表头。</div>
    <div class="example">
      <div class="example-demo">
        <s-table
          :data="tableDataB"
          style="width: 100%"
          border>
          <s-table-column
            prop="date"
            label="日期"
            width="180">
          </s-table-column>
          <s-table-column label="配送信息">
            <s-table-column
              prop="name"
              label="姓名"
              width="120">
            </s-table-column>
            <s-table-column label="地址">
              <s-table-column
                prop="province"
                label="省份"
                width="120">
              </s-table-column>
              <s-table-column
                prop="city"
                label="市区"
                width="120">
              </s-table-column>
              <s-table-column
                prop="address"
                label="地址"
                width="300">
              </s-table-column>
              <s-table-column
                prop="zip"
                label="邮编"
                width="120">
              </s-table-column>
            </s-table-column>
          </s-table-column>
        </s-table>
      </div>
      <example-code>
        <textarea>
    <s-table
      :data="tableDataB"
      style="width: 100%"
      border>
      <s-table-column
        prop="date"
        label="日期"
        width="180">
      </s-table-column>
      <s-table-column label="配送信息">
        <s-table-column
          prop="name"
          label="姓名"
          width="120">
        </s-table-column>
        <s-table-column label="地址">
          <s-table-column
            prop="province"
            label="省份"
            width="120">
          </s-table-column>
          <s-table-column
            prop="city"
            label="市区"
            width="120">
          </s-table-column>
          <s-table-column
            prop="address"
            label="地址"
            width="300">
          </s-table-column>
          <s-table-column
            prop="zip"
            label="邮编"
            width="120">
          </s-table-column>
        </s-table-column>
      </s-table-column>
    </s-table>
        </textarea>
        <pre><code></code></pre>
      </example-code>
    </div>

    <h3>单选</h3>
    <div class="desc">Table 组件提供了单选的支持，只需要配置 highlight-current-row 属性即可实现单选。之后由 current-change 事件来管理选中时触发的事件，它会传入 currentRow，oldCurrentRow。</div>
    <div class="example">
      <div class="example-demo">
        <s-table
          ref="singleTable"
          :data="tableDataA"
          highlight-current-row
          @current-change="handleCurrentChange"
          style="width: 100%">
          <s-table-column
            type="index"
            width="50">
          </s-table-column>
          <s-table-column
            prop="date"
            label="日期"
            width="180">
          </s-table-column>
          <s-table-column
            prop="name"
            label="姓名"
            width="180">
          </s-table-column>
          <s-table-column
            prop="address"
            label="地址">
          </s-table-column>
        </s-table>
        <s-button @click="setCurrent(tableDataA[1])">选中第二行</s-button>
        <s-button @click="setCurrent()">清空选择</s-button>
      </div>
      <example-code>
        <textarea>
    <s-table
      ref="singleTable"
      :data="tableDataA"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%">
      <s-table-column
        type="index"
        width="50">
      </s-table-column>
      <s-table-column
        prop="date"
        label="日期"
        width="180">
      </s-table-column>
      <s-table-column
        prop="name"
        label="姓名"
        width="180">
      </s-table-column>
      <s-table-column
        prop="address"
        label="地址">
      </s-table-column>
    </s-table>
    <script>
      export default {
        methods: {
          handleCurrentChange(newRow, oldRow) {
            this.currentRow = newRow;
            console.log(this.tableDataA.indexOf(newRow));
            console.log(JSON.stringify(newRow, null, 2));
          }
        }
      }
    </script>
        </textarea>
        <pre><code></code></pre>
      </example-code>
    </div>

    <h3>多选</h3>
    <div class="desc">实现多选非常简单: 手动添加一个 s-table-column，设 type 属性为 selection 即可；默认情况下若列的内容过多会折行显示，若需要单行显示可以使用 show-overflow-tooltip 属性，它接受一个 Boolean，为 true 时多余的内容会在 hover 时以 tooltip 的形式显示出来。</div>
    <div class="example">
      <div class="example-demo">
        <s-table
          ref="multipleTable"
          :data="tableDataA"
          style="width: 100%">
          <s-table-column
            type="selection"
            width="55">
          </s-table-column>
          <s-table-column
            prop="date"
            label="日期"
            width="180">
          </s-table-column>
          <s-table-column
            prop="name"
            label="姓名"
            width="180">
          </s-table-column>
          <s-table-column
            prop="address"
            label="地址"
            show-overflow-tooltip>
          </s-table-column>
        </s-table>
        <s-button @click="toggleSelection([tableDataA[1], tableDataA[2]])">切换第二、第三行的选中状态</s-button>
        <s-button @click="toggleSelection()">取消选择</s-button>
      </div>
      <example-code>
        <textarea>
    <s-table
      ref="multipleTable"
      :data="tableDataA"
      style="width: 100%">
      <s-table-column
        type="selection"
        width="55">
      </s-table-column>
      <s-table-column
        prop="date"
        label="日期"
        width="180">
      </s-table-column>
      <s-table-column
        prop="name"
        label="姓名"
        width="180">
      </s-table-column>
      <s-table-column
        prop="address"
        label="地址"
        show-overflow-tooltip>
      </s-table-column>
    </s-table>
    <s-button @click="toggleSelection([tableDataA[1], tableDataA[2]])">切换第二、第三行的选中状态</s-button>
    <s-button @click="toggleSelection()">取消选择</s-button>
    <script>
      export default {
        methods: {
          toggleSelection(rows) {
            if (rows) {
              rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
              });
            } else {
              this.$refs.multipleTable.clearSelection();
            }
          }
        }
      }
    </script>
        </textarea>
        <pre><code></code></pre>
      </example-code>
    </div>

    <h3>排序</h3>
    <div class="desc">可以通过表的 default-sort 属性设置默认的排序列（prop: 列名）和排序顺序（order: ascending | descending）。在列中设置 sortable 属性即可实现以该列为基准的排序，接受一个 Boolean，默认为 false。在本例中，我们还使用了formatter 属性，它用于格式化指定列的值，接受一个 Function，会传入两个参数：row 和 column，可以根据自己的需求进行处理。</div>
    <div class="example">
      <div class="example-demo">
        <s-table
          :data="tableDataA"
          style="width: 100%"
          :default-sort="{prop: 'date', order: 'descending'}">
          <s-table-column
            prop="date"
            label="日期"
            sortable
            width="180">
          </s-table-column>
          <s-table-column
            prop="name"
            label="姓名"
            sortable
            width="180">
          </s-table-column>
          <s-table-column
            prop="address"
            label="地址"
            :formatter="formatter">
          </s-table-column>
        </s-table>
      </div>
      <example-code>
        <textarea>
    <s-table
      :data="tableDataA"
      style="width: 100%"
      :default-sort="{prop: 'date', order: 'descending'}">
      <s-table-column
        prop="date"
        label="日期"
        sortable
        width="180">
      </s-table-column>
      <s-table-column
        prop="name"
        label="姓名"
        sortable
        width="180">
      </s-table-column>
      <s-table-column
        prop="address"
        label="地址"
        :formatter="formatter">
      </s-table-column>
    </s-table>
    <script>
      export default {
        methods: {
          formatter(row, column) {
            return `@${row.address}`;
          }
        }
      }
    </script>
        </textarea>
        <pre><code></code></pre>
      </example-code>
    </div>

    <h3>筛选</h3>
    <div class="desc">在列中设置 filters filter-method 属性即可开启该列的筛选，filters 是一个数组，filter-method 是一个方法，它用于决定某些数据是否显示，会传入两个参数：value和row。</div>
    <div class="example">
      <div class="example-demo">
        <s-table
          :data="tableDataA"
          style="width: 100%">
          <s-table-column
            prop="date"
            label="日期"
            sortable
            width="180">
          </s-table-column>
          <s-table-column
            prop="name"
            label="姓名"
            width="180">
          </s-table-column>
          <s-table-column
            prop="address"
            label="地址">
          </s-table-column>
          <s-table-column
            prop="tag"
            label="标签"
            width="100"
            :filters="[{text: '家', value: '家'}, {text: '公司', value: '公司'}]"
            :filter-method="filterTag">
            <template slot-scope="scope">
              <s-tag
                :type="scope.row.tag === '家' ? 'primary': 'success'">{{scope.row.tag}}</s-tag>
            </template>
          </s-table-column>
        </s-table>
      </div>
      <example-code>
        <textarea v-pre>
    <s-table
      :data="tableDataA"
      style="width: 100%">
      <s-table-column
        prop="date"
        label="日期"
        sortable
        width="180">
      </s-table-column>
      <s-table-column
        prop="name"
        label="姓名"
        width="180">
      </s-table-column>
      <s-table-column
        prop="address"
        label="地址">
      </s-table-column>
      <s-table-column
        prop="tag"
        label="标签"
        width="100"
        :filters="[{text: '家', value: '家'}, {text: '公司', value: '公司'}]"
        :filter-method="filterTag">
        <template slot-scope="scope">
          <s-tag
            :type="scope.row.tag === '家' ? 'primary': 'success'">{{scope.row.tag}}</s-tag>
        </template>
      </s-table-column>
    </s-table>
    <script>
      export default {
        methods: {
          filterTag(value, row) {
            return row.tag === value;
          }
        }
      }
    </script>
        </textarea>
        <pre><code></code></pre>
      </example-code>
    </div>

    <h3>自定义列模板</h3>
    <div class="desc">通过 scope 可以获取到 row $index 等表格的数据和状态。</div>
    <div class="example">
      <div class="example-demo">
        <s-table
          :data="tableDataA"
          style="width: 100%">
          <s-table-column
            prop="date"
            label="日期"
            width="180">
            <template slot-scope="scope">
              <i class="iconfont icon-clock"></i>
              <span v-text="scope.row.date"></span>
            </template>
          </s-table-column>
          <s-table-column
            prop="name"
            label="姓名"
            width="180">
          </s-table-column>
          <s-table-column label="操作">
            <template slot-scope="scope">
              <s-button @click="handleEdit(scope.$index, scope.row)">编辑</s-button>
            </template>
          </s-table-column>
        </s-table>
      </div>
      <example-code>
        <textarea>
    <s-table
      :data="tableDataA"
      style="width: 100%">
      <s-table-column
        prop="date"
        label="日期"
        width="180">
        <template slot-scope="scope">
          <i class="iconfont icon-clock"></i>
          <span v-text="scope.row.date"></span>
        </template>
      </s-table-column>
      <s-table-column
        prop="name"
        label="姓名"
        width="180">
      </s-table-column>
      <s-table-column label="操作">
        <template slot-scope="scope">
          <s-button @click="handleEdit(scope.$index, scope.row)">编辑</s-button>
        </template>
      </s-table-column>
    </s-table>
    <script>
      export default {
        methods: {
          handleEdit(index, row) {
            console.log(index, JSON.stringify(row, null, 2));
          }
        }
      }
    </script>
        </textarea>
        <pre><code></code></pre>
      </example-code>
    </div>

    <h3>展开行</h3>
    <div class="desc">通过设置 type="expand" 可以开启展开行功能，s-table-column 的模板会被渲染成为展开行的内容。</div>
    <div class="example">
      <div class="example-demo">
        <s-table
          :data="tableDataA"
          style="width: 100%">
          <s-table-column type="expand">
            <template slot-scope="scope">
              <s-form>
                <s-form-item label="住址"><span v-text="scope.row.address"></span></s-form-item>
                <s-form-item label="备注"><span v-text="scope.row.tag"></span></s-form-item>
              </s-form>
            </template>
          </s-table-column>
          <s-table-column
            prop="date"
            label="日期">
          </s-table-column>
          <s-table-column
            prop="name"
            label="姓名">
          </s-table-column>
        </s-table>
      </div>
      <example-code>
        <textarea>
    <s-table
      :data="tableDataA"
      style="width: 100%">
      <s-table-column type="expand">
        <template slot-scope="scope">
          <s-form>
            <s-form-item label="住址"><span v-text="scope.row.address"></span></s-form-item>
            <s-form-item label="备注"><span v-text="scope.row.tag"></span></s-form-item>
          </s-form>
        </template>
      </s-table-column>
      <s-table-column
        prop="date"
        label="日期">
      </s-table-column>
      <s-table-column
        prop="name"
        label="姓名">
      </s-table-column>
    </s-table>
        </textarea>
        <pre><code></code></pre>
      </example-code>
    </div>

    <h3>表尾合计行</h3>
    <div class="desc">若表格展示的是各类数字，可以在表尾显示各列的合计。</div>
    <div class="example">
      <div class="example-demo">
        <s-table
          :data="tableDataC"
          style="width: 100%">
          <s-table-column
            prop="id"
            label="ID"
            width="180">
          </s-table-column>
          <s-table-column
            prop="name"
            label="姓名">
          </s-table-column>
          <s-table-column
            prop="amount1"
            label="数值 1">
          </s-table-column>
          <s-table-column
            prop="amount2"
            label="数值 2">
          </s-table-column>
          <s-table-column
            prop="amount3"
            label="数值 3">
          </s-table-column>
        </s-table>
      </div>
      <example-code>
        <textarea>

        </textarea>
        <pre><code></code></pre>
      </example-code>
    </div>

    <h3>树形表格</h3>
    <div class="desc"></div>
    <div class="example">
      <div class="example-demo">
        <s-table-tree :data="tree.data" :config="tree.config" :treeIndex="2">
          <s-table-column
            slot="pre"
            type="selection"
            width="55">
          </s-table-column>
          <s-table-column
            label="操作"
            width="220">
            <template slot-scope="scope">
              <i class="iconfont icon-merge" @click="handleMerge(scope.row)"></i>
            </template>
          </s-table-column>
        </s-table-tree>
      </div>
      <example-code>
        <textarea>
    <s-table-tree :data="tree.data" :config="tree.config" :treeIndex="2">
      <s-table-column
        slot="pre"
        type="selection"
        width="55">
      </s-table-column>
      <s-table-column
        label="操作"
        width="220">
        <template slot-scope="scope">
          <i class="iconfont icon-merge" @click="handleMerge(scope.row)"></i>
        </template>
      </s-table-column>
    </s-table-tree>
    <script>
      export default {
        data() {
          tree: {
            data: [
              {
                date: '2015-9-10',
                name: 'Lisa',
                children: [
                  {
                    date: '2015-9-10',
                    name: 'Lisa Child1'
                  },
                  {
                    date: '2015-9-10',
                    name: 'Lisa Child2',
                    children: [
                      {
                        date: '2015-9-10',
                        name: 'Lisa Child2 Child1'
                      }
                    ]
                  }
                ]
              },
              {
                date: '2015-9-10',
                name: 'Jack',
                children: [
                  {
                    date: '2015-9-10',
                    name: 'Jack Child1'
                  },
                  {
                    date: '2015-9-10',
                    name: 'Jack Child2'
                  }
                ]
              }
            ],
              config: [
              {
                title: '时间',
                property: 'date',
                width: 200
              },
              {
                title: '姓名',
                property: 'name'
              }
            ]
          }
        },
        methods: {
          handleMerge(row){
            console.log(row.name);
          }
        }
      }
    </script>
        </textarea>
        <pre><code></code></pre>
      </example-code>
    </div>

  </article>
</template>

<script>
  export default {
    data() {
      return {
        tableDataA: [{
          date: '2017-01-01',
          name: '傻妞a',
          address: '上海市普陀区金沙江路 1666 弄',
          tag: '家'
        }, {
          date: '2017-01-02',
          name: '傻妞b',
          address: '上海市普陀区金沙江路 1666 弄',
          tag: '公司'
        }, {
          date: '2017-01-03',
          name: '傻妞c',
          address: '上海市普陀区金沙江路 1666 弄',
          tag: '家'
        }, {
          date: '2017-01-04',
          name: '傻妞e',
          address: '上海市普陀区金沙江路 1666 弄',
          tag: '公司'
        }, {
          date: '2017-01-05',
          name: '傻妞f',
          address: '上海市普陀区金沙江路 1666 弄',
          tag: '家'
        }, {
          date: '2017-01-06',
          name: '傻妞g',
          address: '上海市普陀区金沙江路 1666 弄',
          tag: '公司'
        }],
        tableDataB: [{
          date: '2017-01-01',
          name: '傻妞a',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1666 弄',
          zip: 200333
        }, {
          date: '2017-01-02',
          name: '傻妞b',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1666 弄',
          zip: 200333
        }, {
          date: '2017-01-03',
          name: '傻妞c',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1666 弄',
          zip: 200333
        }, {
          date: '2017-01-04',
          name: '傻妞d',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1666 弄',
          zip: 200333
        }, {
          date: '2017-01-05',
          name: '傻妞e',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1666 弄',
          zip: 200333
        }, {
          date: '2017-01-06',
          name: '傻妞f',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1666 弄',
          zip: 200333
        }],
        tableDataC: [{
          id: '1001',
          name: '傻妞a',
          amount1: '123',
          amount2: '21.3',
          amount3: 312
        }, {
          id: '1002',
          name: '傻妞b',
          amount1: '157',
          amount2: '51.7',
          amount3: 517
        }, {
          id: '1003',
          name: '傻妞c',
          amount1: '362',
          amount2: '62.3',
          amount3: 236
        }, {
          id: '1004',
          name: '傻妞d',
          amount1: '178',
          amount2: '71.8',
          amount3: 178
        }, {
          id: '1005',
          name: '傻妞e',
          amount1: '310',
          amount2: '13.3',
          amount3: 133
        }],
        currentRow: null,
        tree: {
          data: [
            {
              date: '2015-9-10',
              name: 'Lisa',
              children: [
                {
                  date: '2015-9-10',
                  name: 'Lisa Child1'
                },
                {
                  date: '2015-9-10',
                  name: 'Lisa Child2',
                  children: [
                    {
                      date: '2015-9-10',
                      name: 'Lisa Child2 Child1'
                    }
                  ]
                }
              ]
            },
            {
              date: '2015-9-10',
              name: 'Jack',
              children: [
                {
                  date: '2015-9-10',
                  name: 'Jack Child1'
                },
                {
                  date: '2015-9-10',
                  name: 'Jack Child2'
                }
              ]
            }
          ],
          config: [
            {
              title: '时间',
              property: 'date',
              width: 200
            },
            {
              title: '姓名',
              property: 'name'
            }
          ]
        }
      }
    },
    methods: {
      tableRowClassName(row, index) {
        if (index === 0) {
          return 'normal-row'
        } else if (index === 1) {
          return 'info-row'
        } else if (index === 2) {
          return 'warning-row'
        }
        return '';
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      handleCurrentChange(newRow, oldRow) {
        this.currentRow = newRow;
        console.log(this.tableDataA.indexOf(newRow));
        console.log(JSON.stringify(newRow, null, 2));
      },
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      formatter(row, column) {
        return `@${row.address}`;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      handleEdit(index, row) {
        console.log(index, JSON.stringify(row, null, 2));
      },
      handleMerge(row){
        console.log(row.name);
      }
    }
  }
</script>