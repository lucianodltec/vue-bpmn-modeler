import Modeler from 'bpmn-js/lib/Modeler'
import inherits from 'inherits'
import CustomPaletteFactory from './CustomPaletteFactory.js';
import CustomContextPadProviderFactory from './CustomContextPadProviderFactory.js';

export default function (palette = {}, contextPad) {
  function CustomModelerFactory (options) {
    Modeler.call(this, options)

    this._customElements = []
  }

  inherits(CustomModelerFactory, Modeler)

  const CustomPalette = CustomPaletteFactory(palette)
  const CustomContextPadProvider = CustomContextPadProviderFactory(contextPad)

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

