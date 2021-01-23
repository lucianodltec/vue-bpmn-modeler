import inherits from 'inherits';
import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import { is } from 'bpmn-js/lib/util/ModelUtil';
import {
  append as svgAppend,
  create as svgCreate
} from 'tiny-svg';

export default function (config = {}) {

  function CustomRenderer (eventBus) {
    BaseRenderer.call(this, eventBus, 1500);

    this.canRender = function (element) {
      return is(element, Object.keys(config));
    };

    this.drawShape = function (parent, shape) {
      const info = config[shape.type]
      if (info) {
        const width = info.width || shape.width
        const height = info.height || shape.height
        var gfx = svgCreate('image', {
          x: ((width - 50) / 2) * -1,
          y: ((height - 50) / 2) * -1,
          width,
          height,
          href: info.imageUrl
        });

        svgAppend(parent, gfx);

        return gfx;
      }
    };
  }

  inherits(CustomRenderer, BaseRenderer);

  CustomRenderer.$inject = ['eventBus'];

  return {
    __init__: ['customRenderer'],
    customRenderer: ['type', CustomRenderer]
  }
}
