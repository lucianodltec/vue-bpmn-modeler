import Modeler from 'bpmn-js/lib/Modeler'

import inherits from 'inherits'

import CustomPalette from '../CustomPalette';
import CustomContextPadProvider from '../CustomContextPadProvider';

const CustomModule = {
  __init__: [
    'paletteProvider',
    'contextPadProvider'
  ],
  paletteProvider: ['type', CustomPalette],
  contextPadProvider: ['type', CustomContextPadProvider]
}

export default function CustomModeler (options) {
  Modeler.call(this, options)

  this._customElements = []
}

inherits(CustomModeler, Modeler)

CustomModeler.prototype._modules = [].concat(CustomModeler.prototype._modules, [
  CustomModule
])
