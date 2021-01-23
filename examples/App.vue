<template>
  <div id="app">
    <BpmnModeler ref="modeler"
                 :moddleExtensions="moddleExtensions"
                 :renderer="renderer"
                 :translate="translate"
                 :palette="palette"
                 :context-pad="contextPad"
                 @changed="changed"
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
  methods: {
    changed (val) {
      console.log('changed', val)
    },
    click (element) {
      console.log('click', element)
    },
    dblclick (element) {
      this.$refs.modeler.openDiagram('"<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:demo="http://demo.org/schema/1.0/bpmn" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">\n' +
          '  <bpmn:process id="Process_1" isExecutable="false">\n' +
          '    <bpmn:startEvent id="StartEvent_1">\n' +
          '      <bpmn:outgoing>Flow_1ppq60h</bpmn:outgoing>\n' +
          '    </bpmn:startEvent>\n' +
          '    <demo:chat id="Gateway_1ca0u02">\n' +
          '      <bpmn:incoming>Flow_1ppq60h</bpmn:incoming>\n' +
          '      <bpmn:outgoing>Flow_1fg8pfa</bpmn:outgoing>\n' +
          '    </demo:chat>\n' +
          '    <bpmn:sequenceFlow id="Flow_1ppq60h" sourceRef="StartEvent_1" targetRef="Gateway_1ca0u02" />\n' +
          '    <bpmn:endEvent id="Event_09rhd5x">\n' +
          '      <bpmn:incoming>Flow_1fg8pfa</bpmn:incoming>\n' +
          '    </bpmn:endEvent>\n' +
          '    <bpmn:sequenceFlow id="Flow_1fg8pfa" sourceRef="Gateway_1ca0u02" targetRef="Event_09rhd5x" />\n' +
          '  </bpmn:process>\n' +
          '  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
          '    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">\n' +
          '      <bpmndi:BPMNEdge id="Flow_1ppq60h_di" bpmnElement="Flow_1ppq60h">\n' +
          '        <di:waypoint x="209" y="120" />\n' +
          '        <di:waypoint x="265" y="120" />\n' +
          '      </bpmndi:BPMNEdge>\n' +
          '      <bpmndi:BPMNEdge id="Flow_1fg8pfa_di" bpmnElement="Flow_1fg8pfa">\n' +
          '        <di:waypoint x="290" y="145" />\n' +
          '        <di:waypoint x="290" y="290" />\n' +
          '        <di:waypoint x="382" y="290" />\n' +
          '      </bpmndi:BPMNEdge>\n' +
          '      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">\n' +
          '        <dc:Bounds x="173" y="102" width="36" height="36" />\n' +
          '      </bpmndi:BPMNShape>\n' +
          '      <bpmndi:BPMNShape id="Gateway_1ca0u02_di" bpmnElement="Gateway_1ca0u02">\n' +
          '        <dc:Bounds x="265" y="95" width="50" height="50" />\n' +
          '      </bpmndi:BPMNShape>\n' +
          '      <bpmndi:BPMNShape id="Event_09rhd5x_di" bpmnElement="Event_09rhd5x">\n' +
          '        <dc:Bounds x="382" y="272" width="36" height="36" />\n' +
          '      </bpmndi:BPMNShape>\n' +
          '    </bpmndi:BPMNPlane>\n' +
          '  </bpmndi:BPMNDiagram>\n' +
          '</bpmn:definitions>\n' +
          '"')
      // console.log('dblclick', element)
    },
    mouseup (element) {
      // console.log('mouseup', element)
    },
    mousedown (element) {
      // console.log('mousedown', element)
    },
    hover (element) {
      // console.log('hover', element)
    },
    out (element) {
      // console.log('out', element)
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
