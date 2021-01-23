<template>
  <div id="app">
    <BpmnModeler ref='modeler'
                 v-model="modeler"
                 :moddleExtensions="moddleExtensions"
                 :renderer="renderer"
                 :translate="translate"
                 :palette="palette"
                 :context-pad="contextPad"
                 @click="click"
                 @hover="hover"
                 @out="out"
                 @dblclick="dblclick"
                 @mousedown="mousedown"
                 @mouseup="mouseup"/>
  </div>
</template>
<script>

import demo from './demo.json'
import contextpadImage from './img16x16-contextpad'
import paletteImage from './img32x32-palette'
import elementImage from './img100x100-element'

export default {
  data () {
    return {
      modeler: {
        xmlData: "",
        svgImage: ""
      },
      moddleExtensions: { demo },
      translate: {
        'Activate the hand tool': 'Mover (H)',
        'Activate the lasso tool': 'Selecionar (L)',
        'Activate the create/remove space tool': 'Espaçamento (S)',
        'Activate the global connect tool': 'Conexão',
        'Create StartEvent': 'Início',
        'Create EndEvent': 'Fim',
        'Create Gateway': 'Decisão',
        'Create Chat': 'Chat',
        'Append Sequence': 'Transição',
        'Append Gateway': 'Decisão',
        'Append EndEvent': 'Fim',
        'Append Chat': 'Chat',
        'Open minimap': 'MAPA',
        'Close minimap': 'FECHAR',
        'Remove': 'Remover'
      },
      renderer: {
        'demo:Chat': {
          imageUrl: elementImage
        }
      },
      palette: {
        'create.Chat': {
          type: 'demo:Chat',
          group: 'demo',
          imageUrl: paletteImage
        }
      },
      contextPad (element) {
        const res = {}

        if (element.$type !== 'bpmn:EndEvent') {
          res['append.Gateway'] = {
            type: 'bpmn:Gateway',
            className: 'bpmn-icon-gateway-none',
            title: 'Append Gateway'
          }
          res['append.Chat'] = {
            type: 'demo:Chat',
            title: 'Append Chat',
            imageUrl: contextpadImage
          }
        }

        return res
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
