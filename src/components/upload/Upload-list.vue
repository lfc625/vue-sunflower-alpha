<template>
  <transition-group
    tag="ul"
    :class="['s-upload-list', 's-upload-list--' + listType]"
    name="list"
  >
    <li
      v-for="file in files"
      :class="['s-upload-list__item', 'is-' + file.status]"
      :key="file"
    >
      <img
        class="s-upload-list__item-thumbnail"
        v-if="['picture-card', 'picture'].indexOf(listType) > -1 && file.status === 'success'"
        :src="file.url" alt=""
      >
      <s-row>
        <s-col :span="8">
          <a class="s-upload-list__item-name" @click="handleClick(file)">
            <i class="iconfont icon-file"></i>{{file.name}}
        </a>
        </s-col>
        <s-col :span="16">
          <label v-show="file.status === 'success'" class="s-upload-list__item-status-label">
            <i :class="[{
            'iconfont icon-correct': listType === 'text',
            's-icon-check': ['picture-card', 'picture'].indexOf(listType) > -1
        }]"></i>
            <i class="iconfont icon-cancel" @click="$emit('remove', file)"></i>
          </label>
        </s-col>
        <span class="s-upload-list__item-actions"
              v-if="
          listType === 'picture-card' &&
          file.status === 'success'
        "
        >
        <span
                v-if="
            handlePreview &&
            listType === 'picture-card'
          "
                @click="handlePreview(file)"
                class="s-upload-list__item-preview"
        >
          <i class="s-icon-view"></i>
        </span>
        <span
                class="s-upload-list__item-delete"
                @click="$emit('remove', file)"
        >
          <i class="s-icon-delete2"></i>
        </span>
      </span>
        <s-col :span="16">
          <s-progress
                  v-if="file.status === 'uploading'"
                  :type="listType === 'picture-card' ? 'circle' : 'line'"
                  :stroke-width="listType === 'picture-card' ? 6 : 2"
                  :percentage="parsePercentage(file.percentage)">
          </s-progress>
        </s-col>
      </s-row>
    </li>
  </transition-group>
</template>
<script>
  import Locale from '../extra/mixins/locale';
  import sProgress from '../progress';

  export default {
    mixins: [Locale],

    components: { sProgress },

    props: {
      files: {
        type: Array,
        default() {
          return [];
        }
      },
      handlePreview: Function,
      listType: String
    },
    methods: {
      parsePercentage(val) {
        return parseInt(val, 10);
      },
      handleClick(file) {
        this.handlePreview && this.handlePreview(file);
      }
    }
  };
</script>
