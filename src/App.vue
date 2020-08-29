<template>
  <div id="app">
    <div class="app-title">
      <h1>PMDG Procedure Generator</h1>
      <b-button
        size="sm"
        pill
        v-b-modal.intro-modal
        variant="info"
        class="ml-2 align-top"
      >
        <b-icon icon="question-circle-fill" aria-label="Help"></b-icon>
      </b-button>
    </div>
    <ModeSelector :data="inputData" />
    <ResultArea :data="outputData" />

    <b-modal id="intro-modal" size="lg" title="About This Project">
      <IntroModal />
    </b-modal>
    <!-- For debugging below -->

    <!--
    <pre>{{ inputData }}</pre>
    <pre>{{ outputData }}</pre>
    -->
  </div>
</template>

<script>
import IntroModal from "./components/IntroModal.vue";
import ModeSelector from "./components/ModeSelector.vue";
import ResultArea from "./components/ResultArea.vue";
import { calculate } from "./algorithms/ProcedureCalculator.js";

export default {
  name: "App",
  components: {
    IntroModal,
    ModeSelector,
    ResultArea,
  },
  computed: {
    outputData: function() {
      return calculate(this.inputData);
    },
  },
  data() {
    return {
      inputData: {
        general: {
          mode: "SID",
          airport: "",
          runway: "",
          procedure: "",
        },
        sid: [],
        star: [],
        approach: [],
        transition: [],
      },
      currentMode: "SID",
    };
  },
};
</script>

<style>
#app {
  margin: 1.5rem 1rem;
}

.app-title {
  text-align: center;
}

.app-title h1 {
  display: inline-block;
}

.editor input::placeholder {
  color: #dddddd !important;
  opacity: 1;
}
</style>
