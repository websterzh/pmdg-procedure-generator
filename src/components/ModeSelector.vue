<template>
  <div id="mode-selector">
    <b-card no-body>
      <b-tabs card>
        <b-tab title="SID" @click="data.general.mode = 'SID'" class="text-center" active>
          <GeneralConfigurator :data="data.general" />
          <SidEditor :data="data.sid" />
        </b-tab>

        <b-tab title="STAR" @click="data.general.mode = 'STAR'">
          <b-card-text>To be implemented...</b-card-text>
        </b-tab>
        <b-tab title="APPROACH" @click="data.general.mode = 'APPROACH'">
          <b-card-text>To be implemented...</b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import GeneralConfigurator from './GeneralConfigurator.vue'
import SidEditor from './SidEditor.vue'

export default {
  name: "ModeSelector",
  components: {
    GeneralConfigurator,
    SidEditor,
  },
  props: [ "data" ],
};
</script>

<style scoped>
#mode-selector {
  margin: 1.5rem 0;
}
</style>
