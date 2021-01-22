<template>
  <div id="app">
    <BpmnModeler ref='modeler'
                 v-model="modeler"
                 :moddleExtensions="moddleExtensions"
                 :translate="translate"
                 :palette="palette"
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

import demo from './demo.json'
import catImage from './cat-image'

export default {
  data () {
    return {
      moddleExtensions: { demo },
      translate: {
        'Activate the hand tool': 'Mover',
        'Activate the lasso tool': 'Selecionar',
        'Activate the create/remove space tool': 'Espaçamento',
        'Activate the global connect tool': 'Conexão',
        'Create StartEvent': 'Início',
        'Create EndEvent': 'Fim',
        'Create Gateway': 'Decisão',
        'Open minimap': 'MAPA',
        'Close minimap': 'FECHAR',
        'Remove': 'Remover',
        'Append Sequence': 'Sequência',
        'Append EndEvent': 'Fim'
      },
      palette: {
        'create.gateway': {
          type: 'bpmn:gateway',
          className: 'bpmn-icon-gateway-none'
        },
        'create.demoCat': {
          type: 'demo:cat',
          group: 'demo',
          imageUrl: catImage
        }
      },
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
