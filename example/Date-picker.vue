<template>
  <article class="article">
    <h1>DatePicker 日期选择器</h1>

    <h3>选择日</h3>
    <div class="example">
      <div class="example-demo">
        <s-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期">
        </s-date-picker>
        <span v-text="value1"></span>
        <s-date-picker
                v-model="value1Format"
                type="date"
                :value-format-flag="true"
                placeholder="选择日期">
        </s-date-picker>
        <span v-text="value1Format"></span>
      </div>
      <example-code>
        <textarea>
    <s-date-picker
      v-model="value1"
      type="date"
      placeholder="选择日期">
    </s-date-picker>
    <s-date-picker
      v-model="value1Format"
      type="date"
      :value-format-flag="true"
      placeholder="选择日期">
    </s-date-picker>
    <script>
      export default {
        data() {
          return {
            value1: '',
            value1Format: ''
          }
        }
      }
    </script>
        </textarea>
        <pre><code></code></pre>
      </example-code>
    </div>

    <h3>选择日 - 带限制（只能选择今天和今天之后的日期）</h3>
    <div class="example">
      <div class="example-demo">
        <s-date-picker
          v-model="value2"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions0">
        </s-date-picker>
        <span v-text="value2"></span>
      </div>
      <example-code>
        <textarea>
    <s-date-picker
      v-model="value2"
      type="date"
      placeholder="选择日期"
      :picker-options="pickerOptions0">
    </s-date-picker>
    <script>
      export default {
        data() {
          return {
            value2: '',
            pickerOptions0: {
              disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7;
              }
            }
          }
        }
      }
    </script>
        </textarea>
        <pre><code></code></pre>
      </example-code>
    </div>

    <h3>选择日 - 带快捷选项</h3>
    <div class="example">
      <div class="example-demo">
        <s-date-picker
          v-model="value3"
          type="date"
          placeholder="选择日期"
          align="top"
          :picker-options="pickerOptions1">
        </s-date-picker>
        <span v-text="value3"></span>
      </div>
      <example-code>
        <textarea>
    <s-date-picker
      v-model="value3"
      type="date"
      placeholder="选择日期"
      align="top"
      :picker-options="pickerOptions1">
    </s-date-picker>
    <script>
      export default {
        data() {
          return {
            value3: '',
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

    <h3>选择周</h3>
    <div class="example">
      <div class="example-demo">
        <s-date-picker
          v-model="value4"
          type="week"
          format="yyyy 第 WW 周"
          placeholder="选择周">
        </s-date-picker>
        <span v-text="value4"></span>
      </div>
      <example-code>
        <textarea>
    <s-date-picker
      v-model="value4"
      type="week"
      format="yyyy 第 WW 周"
      placeholder="选择周">
    </s-date-picker>
    <script>
      export default {
        data() {
          return {
            value4: ''
          }
        }
      }
    </script>
        </textarea>
        <pre><code></code></pre>
      </example-code>
    </div>

    <h3>选择月</h3>
    <div class="example">
      <div class="example-demo">
        <s-date-picker
          v-model="value5"
          type="month"
          placeholder="选择月">
        </s-date-picker>
        <span v-text="value5"></span>
      </div>
      <example-code>
        <textarea>
    <s-date-picker
      v-model="value5"
      type="month"
      placeholder="选择月">
    </s-date-picker>
    <script>
      export default {
        data() {
          return {
            value5: ''
          }
        }
      }
    </script>
        </textarea>
        <pre><code></code></pre>
      </example-code>
    </div>

    <h3>选择年</h3>
    <div class="example">
      <div class="example-demo">
        <s-date-picker
          v-model="value6"
          type="year"
          placeholder="选择年">
        </s-date-picker>
        <span v-text="value6"></span>
      </div>
      <example-code>
        <textarea>
    <s-date-picker
      v-model="value6"
      type="year"
      placeholder="选择年">
    </s-date-picker>
    <script>
      export default {
        data() {
          return {
            value6: ''
          }
        }
      }
    </script>
        </textarea>
        <pre><code></code></pre>
      </example-code>
    </div>

    <h3>选择日期范围</h3>
    <div class="example">
      <div class="example-demo">
        <s-date-picker
          v-model="value7"
          type="daterange"
          placeholder="请选择日期范围">
        </s-date-picker>
        <span v-text="value7"></span>
      </div>
      <example-code>
        <textarea>
    <s-date-picker
      v-model="value7"
      type="daterange"
      placeholder="请选择日期范围">
    </s-date-picker>
    <script>
      export default {
        data() {
          return {
            value7: ''
          }
        }
      }
    </script>
        </textarea>
        <pre><code></code></pre>
      </example-code>
    </div>

    <h3>选择日期范围 - 带快捷选项</h3>
    <div class="example">
      <div class="example-demo">
        <s-date-picker
          v-model="value8"
          type="daterange"
          placeholder="选择日期范围"
          :picker-options="pickerOptions2">
        </s-date-picker>
        <span v-text="value8"></span>
      </div>
      <example-code>
        <textarea>
    <s-date-picker
      v-model="value8"
      type="daterange"
      placeholder="选择日期范围"
      :picker-options="pickerOptions2">
    </s-date-picker>
    <script>
      export default {
        data() {
          return {
            value8: '',
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
        value1Format: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        value6: '',
        value7: '',
        value8: '',
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
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