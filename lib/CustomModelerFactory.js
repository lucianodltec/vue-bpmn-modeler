import Modeler from 'bpmn-js/lib/Modeler'
import inherits from 'inherits'
import CustomPalette from './CustomPalette.js';
import CustomContextPadProvider from './CustomContextPadProvider.js';

export default function (palette, contextPad) {
  function CustomModelerFactory (options) {
    Modeler.call(this, options)

    this._customElements = []
  }

  inherits(CustomModelerFactory, Modeler)

  CustomModelerFactory.prototype._modules = [].concat(CustomModelerFactory.prototype._modules, [{
    __init__: [
      'paletteProvider',
      'contextPadProvider'
    ],
    paletteProvider: ['type', CustomPalette],
    contextPadProvider: ['type', CustomContextPadProvider]
  }])

  return CustomModelerFactory
}

