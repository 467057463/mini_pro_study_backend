<template>
  <div class="modal-mask" :style="{ 'z-index': zIndex + zIndexOffset }">
    <transition :name="transitionName" @after-leave="emit('destroy')">
      <div v-if="visible" class="modal"
        :style="{ width, height, minWidth, '--body-padding': bodyPadding }"
        :class="{ 'full-body': fullBody, 'transparent': transprent}">
        <div class="modal-header">
          <slot name="header">
            <div v-if="header" class="modal-header-content flex flex-aic flex-jsb">
              <div class="modal-header-content-title text-ellipsis">
                <span v-if="title">{{ title }}</span>
              </div>
              <div class="icon-button close-button no-drag" v-if="showClose" @click="handleClose('close')">
                <el-icon><close/></el-icon>
              </div>
            </div>
          </slot>
        </div>
        <div class="modal-body no-drag" :class="bodyClass" :style="bodyStyle">
          <slot></slot>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="mask" @click="onMaskClick" v-if="showMask && visible"></div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, provide } from 'vue'
import { Close } from '@element-plus/icons-vue'

defineOptions({
  name: 'BaseModal'
})

const props = defineProps({
  transitionName: {
    type: String,
    default: 'zoom-fade'
  },
  showClose: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: '温馨提示'
  },
  width: {
    type: String,
    default: ''
  },
  height: {
    type: String,
    default: ''
  },
  minWidth: {
    type: String,
    default: '400px'
  },
  header: {
    type: Boolean,
    default: true
  },
  showMask: {
    type: Boolean,
    default: true
  },
  bodyStyle: {
    type: [String, Object, Array],
    default: ''
  },
  bodyClass: {
    type: [String, Object, Array],
    default: ''
  },
  bodyPaddingSize: {
    type: [Array, Number, String],
    default: 24
  },
  fullBody: {
    type: Boolean,
    default: false
  },
  transprent: {
    type: Boolean,
    default: false
  },
  closeOnMaskClick: {
    type: Boolean,
    default: false
  },
  maskClick: {
    type: Boolean,
    default: true
  },
  beforeClose: {
    type: Function,
    default: null
  },
  zIndexOffset: {
    type: Number,
    default: 0
  },
  closeOnEsc: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'destroy'])

const zIndex = 999
const visible = ref(false)


const bodyPadding = computed(() => {
  return props.bodyPaddingSize + 'px'
})

const handleClose = (type = 'external') => {
  if (visible.value) {
    if (type === 'close' && props.beforeClose && typeof props.beforeClose === 'function') {
      props.beforeClose()
    } else {
      visible.value = false;
      emit('close', type)
    }
  }
}

const onMaskClick = (e) => {
  if (props.closeOnMaskClick) {
    handleClose('mask')
  }
}


onMounted(() => {
  visible.value = true
})

defineExpose({
  close: handleClose
})

</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  border-radius: inherit;
  display: flex;
  align-items: center;
  justify-content: center;

  .mask {
    background-color: rgba(0, 0, 0, 0.6);
    pointer-events: all;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    border-radius: inherit;
  }

  .modal {
    position: relative;
    min-width: 400px;
    height: fit-content;
    border-radius: inherit;
    font-size: 16px;
    background-color: var(--el-bg-color);
    // border: var(--el-border);
    overflow: hidden;
    z-index: 1;
    pointer-events: all;
    padding: var(--body-padding);
    border-radius: 4px;

    &.transparent {
      background: transparent;
      border: none;
    }

    &.full-body {
      .modal-header {
        position: relative;
        z-index: 1;
      }

      .modal-body {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 0;
      }
    }

    .close-button {
      position: absolute;
      right: 12px;
      cursor: pointer;
      // top: 12px;
    }

    .modal-header {
      width: 100%;
      padding-bottom: 10px;
      margin-top: -10px;
      margin-left: -5px;
      .modal-header-content {
        width: 100%;
        font-size: 20px;
        line-height: 28px;
        display: flex;
        .modal-header-content-title {
          margin-right: 15px;
          flex: 1;
          font-size: 16px;
          font-weight: bold;
        }
      }
    }

    .modal-body {
      border-radius: inherit;
      // padding: var(--body-padding);
    }
  }
}
</style>