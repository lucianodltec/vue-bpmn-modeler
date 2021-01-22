<template>
  <div id="app">
    <BpmnModeler ref='modeler' v-model="modeler"
                 @click="click"
                 @hover="hover"
                 @out="out"
                 @dblclick="dblclick"
                 @mousedown="mousedown"
                 @mouseup="mouseup"
    />
  </div>
</template>
<script>

export default {
  data () {
    return {
      modeler: {
        xmlData: "",
        svgImage: ""
      }
    }
  },
  watch: {
    modeler (val) {
      console.log(val)
    }
  },
  methods: {
    click (element) {
      console.log('click', element)
    },
    dblclick (element) {
      console.log('dblclick', element)
    },
    mouseup (element) {
      console.log('mouseup', element)
    },
    mousedown (element) {
      console.log('mousedown', element)
    },
    hover (element) {
      console.log('hover', element)
    },
    out (element) {
      console.log('out', element)
    }
  }
}
</script>
<style lang="less">
.button {
  position: absolute;
  right: 15px;
  bottom: 100px;
  height: 40px;
  width: 80px;
  z-index: 100;
  color: green;
  background: rgba(0, 128, 0, 0.2);
  border: 1px solid rgb(0, 128, 0);
  border-radius: 4px;
}
</style>
