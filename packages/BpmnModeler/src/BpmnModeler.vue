<template>
  <div ref="container" class="containers">
    <div ref="canvas" class="canvas"></div>
  </div>
</template>

<script>
import BpmnModelerFactory from "../../CustomModelerFactory.js";
import CustomTranslateFactory from "../../CustomTranslateFactory.js";
import CustomRendererModuleFactory from "../../CustomRendererFactory.js";
import minimapModule from "diagram-js-minimap";
import { debounce } from "min-dash";

export default {
  name: "BpmnModeler",
  props: {
    value: { type: Object, required: true },
    moddleExtensions: { type: Object },
    renderer: { type: Object },
    palette: { type: Object },
    contextPad: { type: Function },
    translate: { type: Object }
  },
  data () {
    return {
      modeler: {},
      xmlData: "",
      svgImage: "",
      isSvg: false,
    };
  },
  watch: {
    value (val) {
      this.openDiagram(val.xmlData)
    }
  },
  async mounted () {
    let canvas = this.$refs["canvas"];
    const additionalModules = []
    if (this.translate) {
      additionalModules.push({
        translate: ["value", CustomTranslateFactory(this.translate)]
      })
    }
    const CustomRendererModule = CustomRendererModuleFactory(this.renderer)
    additionalModules.push(CustomRendererModule)
    additionalModules.push(minimapModule)

    const factory = BpmnModelerFactory(this.palette, this.contextPad)
    this.modeler = new factory({
      container: canvas,
      keyboard: {
        bindTo: window
      },
      additionalModules,
      cli: {
        bindTo: 'cli'
      },
      moddleExtensions: this.moddleExtensions
    });

    await this.openDiagram(this.value.xmlData).then(() => {
      // 自动保存当前模型设计
      let _self = this;
      let exportArtifacts = debounce(async () => {
        try {
          const { svg } = await _self.modeler.saveSVG();
          _self.svgImage = svg;
        } catch (err) {
          console.log(`saveSVG error ${ err }`)
        }
        try {
          const { xml } = await _self.modeler.saveXML({ format: true })
          _self.xmlData = xml;
        } catch (error) {
          console.log(`saveXML error ${ err }`)
        }
        let modelInfo = {
          xmlData: _self.xmlData,
          svgImage: _self.svgImage
        }
        _self.$emit('input', modelInfo)
      }, 10);
      this.modeler.on("commandStack.changed", exportArtifacts);
      exportArtifacts()
    });
  },
  methods: {
    openDiagram (xml) {
      return new Promise(async (resolve, reject) => {
        if (xml) {
          try {
            const result = await this.modeler.importXML(xml);
            resolve(result)
          } catch (err) {
            reject(err);
          }
          this.xmlData = xml;
        } else {
          this.modeler.createDiagram();
          setTimeout(() => {
            /**
             * 修改xml属性值 isExecutable = false => true
             * isExecutable = false 后端部署流程时 不会创建流程定义数据
             */
            let modelerCanvas = this.modeler.get("canvas");
            let rootElement = modelerCanvas.getRootElement();
            let modeling = this.modeler.get("modeling");
            let eventBus = this.modeler.get('eventBus');

            // you may hook into any of the following events
            var events = [
              'element.hover',
              'element.out',
              'element.click',
              'element.dblclick',
              'element.mousedown',
              'element.mouseup'
            ];

            events.forEach((event) => {
              eventBus.on(event, (e) => {
                // e.element = the model element
                // e.gfx = the graphical element

                this.$emit(event.replace(/element[.]/, ''), e.element);
              });
            });

            resolve();
          });
        }
      })
    }
  }
};
</script>
<style lang="less" scoped>
// @import "../../styles/app.less";
@import "~bpmn-js/dist/assets/diagram-js.css";
@import "~bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
@import "~diagram-js-minimap/assets/diagram-js-minimap.css";

.containers {
  position: absolute;
  background-color: #ffffff;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // position: relative;
  // width: 100%;
  // height: 100%;
}

.canvas {
  // position: absolute;
  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 0;
  width: 100%;
  height: 100%;
}
</style>
