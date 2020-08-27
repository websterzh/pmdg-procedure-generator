<template>
  <div id="result-area">
    <b-form-textarea
      id="result-container"
      placeholder="Result goes here..."
      rows="3"
      :plaintext="locked"
      v-model="result"
    ></b-form-textarea>
  </div>
</template>

<script>
export default {
  name: "ResultArea",
  props: ["data"],
  computed: {
    result: function() {
      return this.data.join(' ');
    }
  },
  data() {
    return {
      locked: false,
    };
  },
};
</script>

<style scoped>
#result-area {
  margin: 1.5rem 0;
}

#result-container {
  padding: 0.5rem 1rem;
}
</style>
