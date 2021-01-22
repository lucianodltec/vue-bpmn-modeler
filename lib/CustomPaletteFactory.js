import { assign } from 'min-dash';

export default function (config) {

  function PaletteProvider (palette, create, elementFactory, translate, handTool, lassoTool, spaceTool, globalConnect) {

    this._create = create;
    this._elementFactory = elementFactory;
    this._translate = translate;
    this._handTool = handTool;
    this._lassoTool = lassoTool;
    this._spaceTool = spaceTool;
    this._globalConnect = globalConnect;

    palette.registerProvider(this);
  }

  PaletteProvider.$inject = [
    'palette',
    'create',
    'elementFactory',
    'translate',
    'handTool',
    'lassoTool',
    'spaceTool',
    'globalConnect'
  ];

  PaletteProvider.prototype.getPaletteEntries = function (/*element*/) {

    var actions = {},
      create = this._create,
      elementFactory = this._elementFactory,
      translate = this._translate,
      handTool = this._handTool,
      lassoTool = this._lassoTool,
      spaceTool = this._spaceTool,
      globalConnect = this._globalConnect

    function createAction (params) {
      const { type, group, className, title, options, imageUrl } = params

      function createListener (event) {
        var shape = elementFactory.createShape(assign({ type: type }, options));

        if (options) {
          shape.businessObject.di.isExpanded = options.isExpanded;
        }

        create.start(event, shape);
      }

      const [p1, p2] = type.split(':')
      const shortType = p2 || p1

      return {
        group,
        className,
        imageUrl,
        title: translate(title || 'Create ' + shortType),
        action: {
          dragstart: createListener,
          click: createListener
        }
      };
    }

    assign(actions, {
      'hand-tool': {
        group: 'tools',
        className: 'bpmn-icon-hand-tool',
        title: translate('Activate the hand tool'),
        action: {
          click: function (event) {
            handTool.activateHand(event);
          }
        }
      },
      'lasso-tool': {
        group: 'tools',
        className: 'bpmn-icon-lasso-tool',
        title: translate('Activate the lasso tool'),
        action: {
          click: function (event) {
            lassoTool.activateSelection(event);
          }
        }
      },
      'space-tool': {
        group: 'tools',
        className: 'bpmn-icon-space-tool',
        title: translate('Activate the create/remove space tool'),
        action: {
          click: function (event) {
            spaceTool.activateSelection(event);
          }
        }
      },
      'global-connect-tool': {
        group: 'tools',
        className: 'bpmn-icon-connection-multi',
        title: translate('Activate the global connect tool'),
        action: {
          click: function (event) {
            globalConnect.toggle(event);
          }
        }
      },
      'tool-separator': {
        group: 'tools',
        separator: true
      },
      'create.start-event': createAction({
        type: 'bpmn:StartEvent',
        group: 'event',
        className: 'bpmn-icon-start-event-none'
      }),
      'create.end-event': createAction({
        type: 'bpmn:EndEvent',
        group: 'event',
        className: 'bpmn-icon-end-event-none'
      }),
      'create.Gateway': createAction({
        type: 'bpmn:Gateway',
        group: 'event',
        className: 'bpmn-icon-gateway-none'
      })
    });

    Object.keys(config).forEach(key => {
      const items = {}
      items[key] = createAction(config[key])
      assign(actions, items)
    })

    return actions;
  };

  return PaletteProvider
}
