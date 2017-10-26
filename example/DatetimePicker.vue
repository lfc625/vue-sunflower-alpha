<template>
  <article class="article">
    <h1>DateTimePicker 日期时间选择器</h1>

    <h3>日期和时间点</h3>
    <div class="example">
      <div class="example-demo">
        <s-date-picker
          v-model="value1"
          type="datetime"
          :value-format-flag="true"
          placeholder="请选择日期时间">
        </s-date-picker>
        <span>{{value1}}</span>
      </div>
      <example-code>
        <textarea>
    <s-date-picker
      v-model="value1"
      type="datetime"
      :value-format-flag="true"
      placeholder="请选择日期时间">
    </s-date-picker>
    <script>
      export default {
        data() {
          return {
            value1: ''
          }
        }
      }
    </script>
        </textarea>
        <pre><code></code></pre>
      </example-code>
    </div>

    <h3>日期和时间点 - 带快捷选项</h3>
    <div class="example">
      <div class="example-demo">
        <s-date-picker
          v-model="value2"
          type="datetime"
          placeholder="请选择日期时间"
          :picker-options="pickerOptions1">
        </s-date-picker>
      </div>
      <example-code>
        <textarea>
    <s-date-picker
      v-model="value2"
      type="datetime"
      placeholder="请选择日期时间"
      :picker-options="pickerOptions1">
    </s-date-picker>
    <script>
      export default {
        data() {
          return {
            value2: '',
            pickerOptions1: {
              shortcuts: [{
                text: '今天',
                onClick(picker) {
                  picker.$emit('pick', new Date());
                }
              }, {
                text: '昨天',
                onClick(picker) {
                  const date = new Date();
                  date.setTime(date.getTime() - 3600 * 1000 * 24);
                  picker.$emit('pick', date);
                }
              }, {
                text: '一周前',
                onClick(picker) {
                  const date = new Date();
                  date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', date);
                }
              }]
            }
          }
        }
      }
    </script>
        </textarea>
        <pre><code></code></pre>
      </example-code>
    </div>

    <h3>日期和时间范围</h3>
    <div class="example">
      <div class="example-demo">
        <s-date-picker
          v-model="value3"
          type="datetimerange"
          placeholder="选择时间范围">
        </s-date-picker>
      </div>
      <example-code>
        <textarea>
    <s-date-picker
      v-model="value3"
      type="datetimerange"
      placeholder="选择时间范围">
    </s-date-picker>
    <script>
      export default {
        data() {
          return {
            value3: ''
          }
        }
      }
    </script>
        </textarea>
        <pre><code></code></pre>
      </example-code>
    </div>

    <h3>日期和时间范围 - 带快捷选项</h3>
    <div class="example">
      <div class="example-demo">
        <s-date-picker
          v-model="value4"
          type="datetimerange"
          :picker-options="pickerOptions2"
          placeholder="请选择时间范围">
        </s-date-picker>
      </div>
      <example-code>
        <textarea>
    <s-date-picker
      v-model="value4"
      type="datetimerange"
      :picker-options="pickerOptions2"
      placeholder="请选择时间范围">
    </s-date-picker>
    <script>
      export default {
        data() {
          return {
            pickerOptions2: {
              shortcuts: [{
                text: '最近一周',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近一个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近三个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                  picker.$emit('pick', [start, end]);
                }
              }]
            }
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
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
      }
    }
  }
</script>