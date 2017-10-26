<template>
  <article class="article">
    <h1>Dialog 对话框</h1>

    <h3>基本用法</h3>
    <div class="example">
      <div class="example-demo">
        <s-button @click="bloom0 = true">显示对话框</s-button>
        <s-dialog
          v-model="bloom0"
          width="700px"
          title="这是标题">这是内容
          <template slot="footer" class="dialog-footer">
            <s-button @click="ok0">确定</s-button>
            <s-button @click="cancel0" type="cancel">取消</s-button>
          </template>
        </s-dialog>
      </div>
      <example-code>
        <textarea>
        <s-button @click="bloom0 = true">显示对话框</s-button>
        <s-dialog
          v-model="bloom0"
          width="700px"
          title="这是标题">这是内容
          <template slot="footer" class="dialog-footer">
            <s-button @click="ok0">确定</s-button>
            <s-button @click="cancel0" type="cancel0">取消</s-button>
          </template>
        </s-dialog>
        <script>
          export default {
            data() {
              return {
                bloom0: false
              }
            },
            methods: {
              ok0() {
                alert('点击了确定');
                this.bloom0 = false;
              },
              cancel0() {
                alert('点击了取消');
                this.bloom0 = false;
              }
            }
          }
        </script>
        </textarea>
        <pre><code></code></pre>
        <div class="description" v-marked>
在`s-dialog`上绑定**width**可直接设置dialog的弹框宽度
        </div>
      </example-code>
    </div>

    <h3>before-close</h3>
    <div class="desc">可以给 dialog 右上角的关闭按钮添加 before-close 方法。</div>
    <div class="example">
      <div class="example-demo">
        <s-button @click="bloom3 = true">显示dialog</s-button>
        <s-dialog
          v-model="bloom3"
          title="标题"
          :before-close="handleClose">
        </s-dialog>
      </div>
      <example-code>
        <textarea>
    <s-button @click="bloom3 = true">显示dialog</s-button>
    <s-dialog
      v-model="bloom3"
      title="标题"
      :before-close="handleClose">
    </s-dialog>
    <script>
      export default {
        data() {
          return {
            bloom3: false
          }
        },
        methods: {
          handleClose(close) {
            this.$confirm('确定关闭？', 'Title', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              close();
            }).catch(() => {});
          }
        }
      }
    </script>
        </textarea>
        <pre><code></code></pre>
      </example-code>
    </div>

    <h3>用户信息</h3>
    <div class="example">
      <div class="example-demo">
        <s-button @click="bloom1 = true">显示对话框</s-button>
        <s-dialog
          v-model="bloom1"
          title="用户信息">
          <s-tab :animated="false">
            <s-tab-pane label="个人信息">
              <s-scrollbar wrap-class="pinfo">
                <s-row>
                  <s-col :span="10">
                    <div class="grid-content bg-purple">用户名称</div>
                  </s-col>
                  <s-col :span="14">
                    <div class="grid-content bg-purple-light">TEST1</div>
                  </s-col>
                </s-row>
                <s-row>
                  <s-col :span="10">
                    <div class="grid-content bg-purple">真实姓名</div>
                  </s-col>
                  <s-col :span="14">
                    <div class="grid-content bg-purple-light">张三</div>
                  </s-col>
                </s-row>
                <s-row>
                  <s-col :span="10">
                    <div class="grid-content bg-purple">口令使用期限</div>
                  </s-col>
                  <s-col :span="14">
                    <div class="grid-content bg-purple-light">2018-04-01 16:20:20</div>
                  </s-col>
                </s-row>
                <s-row>
                  <s-col :span="10">
                    <div class="grid-content bg-purple">所属机构</div>
                  </s-col>
                  <s-col :span="14">
                    <div class="grid-content bg-purple-light">机构一</div>
                  </s-col>
                </s-row>
                <s-row>
                  <s-col :span="10">
                    <div class="grid-content bg-purple">角色</div>
                  </s-col>
                  <s-col :span="14">
                    <div class="grid-content bg-purple-light">角色1</div>
                  </s-col>
                </s-row>
                <s-row>
                  <s-col :span="10">
                    <div class="grid-content bg-purple">Email</div>
                  </s-col>
                  <s-col :span="14">
                    <div class="grid-content bg-purple-light">123456789@163.cxom</div>
                  </s-col>
                </s-row>
                <s-row>
                  <s-col :span="10">
                    <div class="grid-content bg-purple">手机号</div>
                  </s-col>
                  <s-col :span="14">
                    <div class="grid-content bg-purple-light">12345678910</div>
                  </s-col>
                </s-row>
                <s-row>
                  <s-col :span="10">
                    <div class="grid-content bg-purple">到期时间</div>
                  </s-col>
                  <s-col :span="14">
                    <div class="grid-content bg-purple-light">2018-04-11 16:20:20</div>
                  </s-col>
                </s-row>
                <s-row>
                  <s-col :span="10">
                    <div class="grid-content bg-purple">IP规则</div>
                  </s-col>
                  <s-col :span="14">
                    <div class="grid-content bg-purple-light">*</div>
                  </s-col>
                </s-row>
                <s-row>
                  <s-col :span="10">
                    <div class="grid-content bg-purple">MAC规则</div>
                  </s-col>
                  <s-col :span="14">
                    <div class="grid-content bg-purple-light">*</div>
                  </s-col>
                </s-row>
                <s-row>
                  <s-col :span="10">
                    <div class="grid-content bg-purple">多点并发数</div>
                  </s-col>
                  <s-col :span="14">
                    <div class="grid-content bg-purple-light">*</div>
                  </s-col>
                </s-row>
                <s-row>
                <s-col :span="10">
                  <div class="grid-content bg-purple">多次并发数</div>
                </s-col>
                <s-col :span="14">
                  <div class="grid-content bg-purple-light">*</div>
                </s-col>
              </s-row>
              </s-scrollbar>
            </s-tab-pane>
            <s-tab-pane label="修改密码">
              <s-scrollbar wrap-class="pinof"></s-scrollbar>
            </s-tab-pane>
            <s-tab-pane label="修改个人信息">
              <s-scrollbar wrap-class="pinfo">
                <s-form :label-position="labelPosition" :rules="rules" ref="formLabelAlign" label-width="110px" :model="formLabelAlign">
                <s-form-item label="真实姓名：" prop="name">
                  <s-input v-model="formLabelAlign.name"></s-input>
                </s-form-item>
                <s-form-item label="Email：">
                  <s-input v-model="formLabelAlign.email"></s-input>
                </s-form-item>
                <s-form-item label="手机号码：">
                  <s-input v-model="formLabelAlign.phoneNum"></s-input>
                </s-form-item>
                <s-form-item label="工号：">
                  <s-input v-model="formLabelAlign.workNum"></s-input>
                </s-form-item>
                <s-form-item label="性别：">
                  <s-radio-group v-model="formLabelAlign.sex">
                    <s-radio label="男"></s-radio>
                    <s-radio label="女"></s-radio>
                  </s-radio-group>
                </s-form-item>
                <s-form-item label="微信号：">
                  <s-input v-model="formLabelAlign.weChat"></s-input>
                </s-form-item>
                <s-form-item label="办公号码：">
                  <s-input v-model="formLabelAlign.officeNum"></s-input>
                </s-form-item>
                <s-form-item label="个人地址：">
                  <s-input v-model="formLabelAlign.address"></s-input>
                </s-form-item>
                <s-form-item label="IP规则：">
                  <s-input v-model="formLabelAlign.ipRule"></s-input>
                </s-form-item>
                <s-form-item label="MAC规则：">
                  <s-input v-model="formLabelAlign.macRule"></s-input>
                </s-form-item>
              </s-form>
              </s-scrollbar>
            </s-tab-pane>
          </s-tab>
          <template slot="footer" class="dialog-footer">
            <s-button @click="submitForm('formLabelAlign')">确定</s-button>
            <s-button type="cancel" @click="cancel1">取消</s-button>
          </template>
        </s-dialog>
      </div>
      <example-code>
        <textarea>
      <template>
        <s-button @click="bloom1 = true">显示对话框</s-button>
        <s-dialog
          v-model="bloom1"
          title="用户信息">
          <s-tab :animated="false">
            <s-tab-pane label="个人信息">
              <s-scrollbar wrap-class="pinfo">
                <s-row>
                  <s-col :span="10">
                    <div class="grid-content bg-purple">用户名称</div>
                  </s-col>
                  <s-col :span="14">
                    <div class="grid-content bg-purple-light">TEST1</div>
                  </s-col>
                </s-row>
                <s-row>
                  <s-col :span="10">
                    <div class="grid-content bg-purple">真实姓名</div>
                  </s-col>
                  <s-col :span="14">
                    <div class="grid-content bg-purple-light">张三</div>
                  </s-col>
                </s-row>
                <s-row>
                  <s-col :span="10">
                    <div class="grid-content bg-purple">口令使用期限</div>
                  </s-col>
                  <s-col :span="14">
                    <div class="grid-content bg-purple-light">2018-04-01 16:20:20</div>
                  </s-col>
                </s-row>
                <s-row>
                  <s-col :span="10">
                    <div class="grid-content bg-purple">所属机构</div>
                  </s-col>
                  <s-col :span="14">
                    <div class="grid-content bg-purple-light">机构一</div>
                  </s-col>
                </s-row>
                <s-row>
                  <s-col :span="10">
                    <div class="grid-content bg-purple">角色</div>
                  </s-col>
                  <s-col :span="14">
                    <div class="grid-content bg-purple-light">角色1</div>
                  </s-col>
                </s-row>
                <s-row>
                  <s-col :span="10">
                    <div class="grid-content bg-purple">Email</div>
                  </s-col>
                  <s-col :span="14">
                    <div class="grid-content bg-purple-light">123456789@163.cxom</div>
                  </s-col>
                </s-row>
                <s-row>
                  <s-col :span="10">
                    <div class="grid-content bg-purple">手机号</div>
                  </s-col>
                  <s-col :span="14">
                    <div class="grid-content bg-purple-light">12345678910</div>
                  </s-col>
                </s-row>
                <s-row>
                  <s-col :span="10">
                    <div class="grid-content bg-purple">到期时间</div>
                  </s-col>
                  <s-col :span="14">
                    <div class="grid-content bg-purple-light">2018-04-11 16:20:20</div>
                  </s-col>
                </s-row>
                <s-row>
                  <s-col :span="10">
                    <div class="grid-content bg-purple">IP规则</div>
                  </s-col>
                  <s-col :span="14">
                    <div class="grid-content bg-purple-light">*</div>
                  </s-col>
                </s-row>
                <s-row>
                  <s-col :span="10">
                    <div class="grid-content bg-purple">MAC规则</div>
                  </s-col>
                  <s-col :span="14">
                    <div class="grid-content bg-purple-light">*</div>
                  </s-col>
                </s-row>
                <s-row>
                  <s-col :span="10">
                    <div class="grid-content bg-purple">多点并发数</div>
                  </s-col>
                  <s-col :span="14">
                    <div class="grid-content bg-purple-light">*</div>
                  </s-col>
                </s-row>
                <s-row>
                <s-col :span="10">
                  <div class="grid-content bg-purple">多次并发数</div>
                </s-col>
                <s-col :span="14">
                  <div class="grid-content bg-purple-light">*</div>
                </s-col>
              </s-row>
              </s-scrollbar>
            </s-tab-pane>
            <s-tab-pane label="修改密码">
              <s-scrollbar wrap-class="pinof"></s-scrollbar>
            </s-tab-pane>
            <s-tab-pane label="修改个人信息">
              <s-scrollbar wrap-class="pinfo">
                <s-form :label-position="labelPosition" :rules="rules" ref="formLabelAlign" label-width="110px" :model="formLabelAlign">
                <s-form-item label="真实姓名：" prop="name">
                  <s-input v-model="formLabelAlign.name"></s-input>
                </s-form-item>
                <s-form-item label="Email：">
                  <s-input v-model="formLabelAlign.email"></s-input>
                </s-form-item>
                <s-form-item label="手机号码：">
                  <s-input v-model="formLabelAlign.phoneNum"></s-input>
                </s-form-item>
                <s-form-item label="工号：">
                  <s-input v-model="formLabelAlign.workNum"></s-input>
                </s-form-item>
                <s-form-item label="性别：">
                  <s-radio-group v-model="formLabelAlign.sex">
                    <s-radio label="男"></s-radio>
                    <s-radio label="女"></s-radio>
                  </s-radio-group>
                </s-form-item>
                <s-form-item label="微信号：">
                  <s-input v-model="formLabelAlign.weChat"></s-input>
                </s-form-item>
                <s-form-item label="办公号码：">
                  <s-input v-model="formLabelAlign.officeNum"></s-input>
                </s-form-item>
                <s-form-item label="个人地址：">
                  <s-input v-model="formLabelAlign.address"></s-input>
                </s-form-item>
                <s-form-item label="IP规则：">
                  <s-input v-model="formLabelAlign.ipRule"></s-input>
                </s-form-item>
                <s-form-item label="MAC规则：">
                  <s-input v-model="formLabelAlign.macRule"></s-input>
                </s-form-item>
              </s-form>
              </s-scrollbar>
            </s-tab-pane>
          </s-tab>
          <template slot="footer" class="dialog-footer">
            <s-button @click="submitForm('formLabelAlign')">确定</s-button>
            <s-button type="cancel" @click="cancel1">取消</s-button>
          </template>
        </s-dialog>
      </template>
      <script>
        export default {
          data() {
            return {
              model1: false
            }
          },
          methods: {
            submitForm() {

            }
          }
        }
      </script>
      <style>
        .pinfo {
          max-height: 400px;
        }
      </style>
        </textarea>
        <pre><code>
        </code></pre>
      </example-code>
    </div>

    <h3>登录设置</h3>
    <div class="example">
      <div class="example-demo">
        <s-button @click="bloom2 = true">显示对话框</s-button>
        <s-dialog
          v-model="bloom2"
          title="登陆设置">
          <s-tab :animated="false">
            <s-tab-pane label="登录认证设置">
              <p class="phead"><i class="iconfont icon-approve"></i>认证方式设置</p>
              <s-form ref="form" :model="form" label-width="130px" label-position="left">
                <s-form-item label="认证方式设置：">
                  <s-select v-model="region" placeholder="混合认证">
                    <s-option label="区域一" value="shanghai"></s-option>
                    <s-option label="区域二" value="beijing"></s-option>
                  </s-select>
                </s-form-item>
                <s-button>保存</s-button>
                <div style="clear:both"></div>
              </s-form>
              <p class="phead"><i class="iconfont icon-approve"></i>双因素认证属性</p>
              <s-form ref="form" :model="form" label-width="130px" label-position="left">
                <s-form-item label="认证方式一：">
                  <s-select v-model="region" placeholder="口令认证">
                    <s-option label="区域一" value="shanghai"></s-option>
                    <s-option label="区域二" value="beijing"></s-option>
                  </s-select>
                </s-form-item>
                <s-form-item label="认证方式二：">
                  <s-select v-model="region" placeholder="Radius认证">
                    <s-option label="区域一" value="shanghai"></s-option>
                    <s-option label="区域二" value="beijing"></s-option>
                  </s-select>
                </s-form-item>
                <s-button>保存</s-button>
                <div style="clear:both"></div>
              </s-form>
            </s-tab-pane>
            <s-tab-pane label="登录认证配置"></s-tab-pane>
            <s-tab-pane label="登录安全设置"></s-tab-pane>
          </s-tab>
        </s-dialog>
      </div>
    </div>
  </article>
</template>

<script type="text/babel">
  export default {
    data () {
      return {
        bloom0: false,
        bloom1: false,
        bloom2: false,
        bloom3: false,
        visible: false,
        region: '',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        labelPosition: 'left',
        formLabelAlign: {
          name: '',
          email: '',
          phoneNum: '',
          workNum: '',
          sex: '男',
          weChat: '',
          officeNum: '',
          address: '',
          ipRule: '',
          macRule: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
          ]
        }
      }
    },
    methods: {
      ok0() {
        alert('点击了确定');
        this.bloom0 = false;
      },
      cancel0() {
        alert('点击了取消');
        this.bloom0 = false;
      },
      ok1 () {
        alert('点击了确定');
        this.bloom1 = false;
      },
      cancel1 () {
        alert('点击了取消');
        this.bloom1 = false;
      },
      ok2 () {
        alert('点击了确定');
        this.bloom2 = false;
      },
      cancel2 () {
        alert('点击了取消');
        this.bloom2 = false;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleClose(close) {
        this.$confirm('确定关闭？', 'Title', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          close();
        }).catch(() => {});
      }
    }
  }
</script>

<style>
  article .phead {
    ont-size: 14px;
    font-weight: bold;
    color: #31aaff;
  }
  article .phead i {
    margin-right: 6px;
  }
  article .phead + form button {
    float: right;
  }
  article .pinfo {
    max-height: 400px;
  }
  article .codeDes pre {
    width: 60%;
    float: left;
  }
</style>