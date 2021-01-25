<template>
  <div></div>
</template>

<script>
export default {
  name: "MiniMap"
}
</script>

<style>

.djs-minimap:not(.open) .toggle:before {
  font-family: "bpmn";
  content: '\e819' !important;
  display: block;
  float: left;
  margin: 0px 0px 10px 0px;
  font-size: 20px;
  cursor: pointer;
}

.djs-minimap .toggle:before {
  font-family: "bpmn";
  content: '\e805' !important;
  display: block;
  float: left;
  margin: 4px 4px 10px 2px;
  font-size: 20px;
  cursor: pointer;
}
</style>
