import inherits from 'inherits'
import ContextPadProvider from 'bpmn-js/lib/features/context-pad/ContextPadProvider'
import { is } from 'bpmn-js/lib/util/ModelUtil'
import { assign } from 'min-dash'

export default function (config) {

  function CustomContextPadProvider (injector, connect, translate) {
    injector.invoke(ContextPadProvider, this)

    var elementFactory = this._elementFactory
    var create = this._create
    var autoPlace = this._autoPlace
    var modeling = this._modeling

    this.getContextPadEntries = function (element) {

      var actions = {}
      var businessObject = element.businessObject

      function startConnect (event, element, autoActivate) {
        connect.start(event, element, autoActivate)
      }

      function appendAction (params) {
        let { type, className, title, options, imageUrl } = params
        if (typeof title !== 'string') {
          options = title
          title = translate('Append {type}', { type: type.replace(/^bpmn:/, '') })
        }

        function appendStart (event, element) {
          var shape = elementFactory.createShape(assign({ type: type }, options))
          create.start(event, shape, {
            source: element
          })
        }

        var append = autoPlace
          ? function (event, element) {
            var shape = elementFactory.createShape(
              assign({ type: type }, options)
            )

            autoPlace.append(element, shape)
          }
          : appendStart

        return {
          group: 'model',
          className,
          title,
          imageUrl,
          action: {
            dragstart: appendStart,
            click: append
          }
        }
      }

      function removeElement () {
        modeling.removeElements([element])
      }

      if (typeof config === 'function') {
        const res = config(businessObject) || {}
        Object.keys(res).forEach(key => {
          const items = {}
          items[key] = appendAction(res[key])
          assign(actions, items)
        })
      }

      if (!is(businessObject, 'bpmn:EndEvent')) {
        assign(actions, {
          'append.end-event': appendAction({
              type: 'bpmn:EndEvent',
              className: 'bpmn-icon-end-event-none',
              title: translate('Append EndEvent')
            }
          ),
          connect: {
            group: 'connect',
            className: 'bpmn-icon-connection-multi',
            title: translate('Append Sequence'),
            action: {
              click: startConnect,
              dragstart: startConnect
            }
          }
        })
      }

      assign(actions, {
        delete: {
          group: 'edit',
          className: 'bpmn-icon-trash',
          title: translate('Remove'),
          action: {
            click: removeElement
          }
        }
      })

      assign(actions, {
        'append.text-annotation': appendAction({
          type: 'bpmn:TextAnnotation',
          className: 'bpmn-icon-text-annotation'
        })
      })

      return actions
    }
  }

  inherits(CustomContextPadProvider, ContextPadProvider)

  CustomContextPadProvider.$inject = [
    'injector',
    'connect',
    'translate',
    'elementFactory'
  ]

  return CustomContextPadProvider
}
