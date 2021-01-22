import inherits from 'inherits';

import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

import {
  is
} from 'bpmn-js/lib/util/ModelUtil';

import {
  append as svgAppend,
  create as svgCreate
} from 'tiny-svg';

import rendererImage from '../examples/cat-image'

const CustomRenderer = function (eventBus) {
  BaseRenderer.call(this, eventBus, 1500);

  this.canRender = function (element) {
    return is(element, 'demo:cat');
  };

  this.drawShape = function (parent, shape) {
    if (shape.type === 'demo:cat') {
      const width = 200
      const height = 75
      var gfx = svgCreate('image', {
        x: ((width - 50) / 2) * -1,
        y: ((height - 50) / 2) * -1,
        width,
        height,
        href: rendererImage
      });

      svgAppend(parent, gfx);

      return gfx;
    }
  };
}

inherits(CustomRenderer, BaseRenderer);

CustomRenderer.$inject = ['eventBus'];

export default {
  __init__: ['customRenderer'],
  customRenderer: ['type', CustomRenderer]
};