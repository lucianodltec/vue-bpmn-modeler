import inherits from 'inherits'

import ContextPadProvider from 'bpmn-js/lib/features/context-pad/ContextPadProvider'

import { is } from 'bpmn-js/lib/util/ModelUtil'

import { assign } from 'min-dash'

import contextpadImage from '../examples/cat-image'

inherits(CustomContextPadProvider, ContextPadProvider)

CustomContextPadProvider.$inject = [
  'injector',
  'connect',
  'translate',
  'elementFactory'
]

export default function CustomContextPadProvider (injector, connect, translate) {
  injector.invoke(ContextPadProvider, this)

  // var cached = bind(this.getContextPadEntries, this)
  // var rules = this._rules
  var elementFactory = this._elementFactory
  var create = this._create
  var autoPlace = this._autoPlace
  var modeling = this._modeling
  // var contextPad = this._contextPadt

  this.getContextPadEntries = function (element) {

    var actions = {}
    var businessObject = element.businessObject

    function startConnect (event, element, autoActivate) {
      connect.start(event, element, autoActivate)
    }

    function appendAction (type, className, title, options, imageUrl) {
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

    // function appendUserTask(event, element) {
    //   if (autoPlace) {
    //     const shape = elementFactory.createShape({ type: 'bpmn:UserTask' })

    //     autoPlace.append(element, shape)
    //   } else {
    //     appendUserTaskStart(event, element)
    //   }
    // }

    // function appendUserTaskStart(event) {
    //   const shape = elementFactory.createShape({ type: 'bpmn:UserTask' })

    //   create.start(event, shape, element)
    // }

    // 定义开始节点 扩展的操作
    // if (is(businessObject, 'bpmn:StartEvent')) {
    //   assign(actions, {
    //     'append.gateway': appendAction(
    //       'bpmn:Gateway',
    //       'bpmn-icon-gateway-none',
    //       translate('Append Gateway')
    //     ),
    //     'append.user-task': appendAction(
    //       'bpmn:UserTask',
    //       'bpmn-icon-user-task',
    //       translate('Append UserTask')
    //     ),
    //     'append.demoCat': appendAction(
    //       'demo:cat',
    //       'bpmn-icon-service-task',
    //       translate('Append demoCat'),
    //       null,
    //       contextpadImage)
    //   })
    // }

    // if (is(businessObject, 'bpmn:Gateway')) {
    //   assign(actions, {
    //     'append.user-task': appendAction(
    //       'bpmn:UserTask',
    //       'bpmn-icon-user-task',
    //       translate('Append UserTask')
    //     )
    //   })
    // }

    // if (!is(businessObject, 'bpmn:EndEvent')) {
    //   assign(actions, {
    //     'append.gateway': appendAction(
    //       'bpmn:Gateway',
    //       'bpmn-icon-gateway-none',
    //       translate('Append Gateway')
    //     ),
    //     'append.user-task': appendAction(
    //       'bpmn:UserTask',
    //       'bpmn-icon-user-task',
    //       translate('Append UserTask')
    //     )
    //   })
    // }

    if (!is(businessObject, 'bpmn:EndEvent')) {
      assign(actions, {
        'append.end-event': appendAction(
          'bpmn:EndEvent',
          'bpmn-icon-end-event-none',
          translate('Append EndEvent')
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
      'append.text-annotation': appendAction('bpmn:TextAnnotation', 'bpmn-icon-text-annotation')
    })
    return actions
  }
}
