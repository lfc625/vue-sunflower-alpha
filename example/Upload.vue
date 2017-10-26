<template>
  <article class="article">
    <h1>Upload 上传</h1>
    <p>通过点击或者拖拽上传文件</p>
    <h3>点击上传</h3>
    <div class="example">
      <div class="example-demo">
        <s-upload
          class="upload-demo"
          action="//jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList">
          <s-button size="small">点击上传</s-button>
          <div slot="tip" class="s-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </s-upload>
      </div>
      <div class="example-code"><pre><code>
&lt;s-upload
  class="upload-demo"
  action="//jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"&gt;
  &lt;s-button size="small" type="primary"&gt;点击上传&lt;/s-button&gt;
  &lt;div slot="tip" class="s-upload__tip"&gt;只能上传jpg/png文件，且不超过500kb&lt;/div&gt;
&lt;/s-upload&gt;

&lt;script&gt;
  export default {
    data() {
      return {
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
            {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }
&lt;/script&gt;
          </code></pre>
      </div>
    </div>
    <h3>照片墙</h3>
    <p>使用 <code>list-type</code> 属性来设置文件列表的样式。</p>
    <div class="example">
      <div class="example-demo">
        <s-upload
          action="//jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="iconfont icon-add"></i>
        </s-upload>
        <s-dialog v-model="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </s-dialog>
      </div>
      <div class="example-code"><pre><code>
&lt;s-upload
  action="//jsonplaceholder.typicode.com/posts/"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove"&gt;
  &lt;i class="s-icon-plus"&gt;&lt;/i&gt;
&lt;/s-upload&gt;
&lt;s-dialog v-model="dialogVisible" size="tiny"&gt;
  &lt;img width="100%" :src="dialogImageUrl" alt=""&gt;
&lt;/s-dialog&gt;
&lt;script&gt;
  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    }
  }
&lt;/script&gt;
          </code></pre>
      </div>
    </div>
    <h3>上传文件列表控制</h3>
    <p>通过 <code>on-change</code> 钩子函数来对列表进行控制</p>
    <div class="example">
      <div class="example-demo">
        <s-upload
          class="upload-demo"
          action="//jsonplaceholder.typicode.com/posts/"
          :on-change="handleChange"
          :file-list="fileList3">
          <s-button size="small">点击上传</s-button>
          <div slot="tip" class="s-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </s-upload>
      </div>
      <div class="example-code"><pre><code>
&lt;s-upload
    class="upload-demo"
    action="//jsonplaceholder.typicode.com/posts/"
    :on-change="handleChange"
    :file-list="fileList3"&gt;
    &lt;s-button size="small" type="primary"&gt;点击上传&lt;/s-button&gt;
    &lt;div slot="tip" class="s-upload__tip"&gt;只能上传jpg/png文件，且不超过500kb&lt;/div&gt;
  &lt;/s-upload&gt;
  &lt;script&gt;
    export default {
      data() {
        return {
          fileList3: [{
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            status: 'finished'
          }, {
            name: 'food2.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            status: 'finished'
          }]
        };
      },
      methods: {
        handleChange(file, fileList) {
          this.fileList3 = fileList.slice(-3);
        }
      }
    }
  &lt;/script&gt;
          </code></pre>
      </div>
    </div>
    <h3>拖拽上传</h3>
    <div class="example">
      <div class="example-demo">
        <s-upload
          class="upload-demo"
          drag
          action="//jsonplaceholder.typicode.com/posts/"
          mutiple>
          <i class="iconfont icon-add"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </s-upload>
      </div>
      <div class="example-code"><pre><code>
&lt;s-upload
  class="upload-demo"
  drag
  action="//jsonplaceholder.typicode.com/posts/"
  mutiple&gt;
  &lt;i class="s-icon-upload"&gt;&lt;/i&gt;
  &lt;div class="s-upload__text"&gt;将文件拖到此处，或&lt;em&gt;点击上传&lt;/em&gt;&lt;/div&gt;
  &lt;div class="s-upload__tip" slot="tip"&gt;只能上传jpg/png文件，且不超过500kb&lt;/div&gt;
&lt;/s-upload&gt;
          </code></pre>
      </div>
    </div>
    <h3>Attribute</h3>
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
        <td>action</td>
        <td>必选参数, 上传的地址</td>
        <td>string</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <td>headers</td>
        <td>可选参数, 设置上传的请求头部</td>
        <td>object</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <td>multiple</td>
        <td>可选参数, 是否支持多选文件</td>
        <td>boolean</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <td>data</td>
        <td>可选参数, 上传时附带的额外参数</td>
        <td>object</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <td>name</td>
        <td>可选参数, 上传的文件字段名</td>
        <td>string</td>
        <td>—</td>
        <td>file</td>
      </tr>
      <tr>
        <td>with-credentials</td>
        <td>支持发送 cookie 凭证信息</td>
        <td>boolean</td>
        <td>—</td>
        <td>false</td>
      </tr>
      <tr>
        <td>show-file-list</td>
        <td>是否显示已上传文件列表</td>
        <td>boolean</td>
        <td>—</td>
        <td>true</td>
      </tr>
      <tr>
        <td>type</td>
        <td>上传控件类型</td>
        <td>string</td>
        <td>select,drag</td>
        <td>select</td>
      </tr>
      <tr>
        <td>accept</td>
        <td>可选参数, 接受上传的<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept">文件类型</a>（thumbnail-mode 模式下此参数无效）
        </td>
        <td>string</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <td>on-preview</td>
        <td>可选参数, 点击已上传的文件链接时的钩子, 可以通过 file.response 拿到服务端返回数据</td>
        <td>function(file)</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <td>on-remove</td>
        <td>可选参数, 文件列表移除文件时的钩子</td>
        <td>function(file, fileList)</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <td>on-success</td>
        <td>可选参数, 文件上传成功时的钩子</td>
        <td>function(response, file, fileList)</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <td>on-error</td>
        <td>可选参数, 文件上传失败时的钩子</td>
        <td>function(err, file, fileList)</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <td>on-progress</td>
        <td>可选参数, 文件上传时的钩子</td>
        <td>function(event, file, fileList)</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <td>on-change</td>
        <td>可选参数, 文件状态改变时的钩子，上传成功或者失败时都会被调用</td>
        <td>function(file, fileList)</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <td>before-upload</td>
        <td>可选参数, 上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传。</td>
        <td>function(file)</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <td>list-type</td>
        <td>文件列表的类型</td>
        <td>string</td>
        <td>text/picture/picture-card</td>
        <td>text</td>
      </tr>
      <tr>
        <td>auto-upload</td>
        <td>是否在选取文件后立即进行上传</td>
        <td>boolean</td>
        <td>—</td>
        <td>true</td>
      </tr>
      <tr>
        <td>file-list</td>
        <td>
          上传的文件列表, 例如: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
        </td>
        <td>array</td>
        <td>—</td>
        <td>[]</td>
      </tr>
      </tbody>
    </table>
    <h3>Methods</h3>
    <table class="table">
      <thead>
      <tr>
        <th>方法名</th>
        <th>说明</th>
        <th>参数</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>clearFiles</td>
        <td>清空已上传的文件列表</td>
        <td>—</td>
      </tr>
      </tbody>
    </table>
  </article>
</template>

<script type="text/babel">
  export default {
    data() {
      return {
        fileList: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],
        imageUrl: '',
        dialogImageUrl: '',
        dialogVisible: false,
        fileList2: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],
        fileList3: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
          status: 'finished'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
          status: 'finished'
        }]
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleChange(file, fileList) {
        this.fileList3 = fileList.slice(-3);
      },
      handleAvatarScucess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      submitUpload() {
        console.log("上传到服务器")
      }
    }
  }
</script>

<style>
  .avatar-uploader .s-upload {
    width: 178px;
    border: 1px dashed #344458;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .s-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #3aa0ff;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
