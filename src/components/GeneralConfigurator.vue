<template>
  <div>
    <div>
      <b-row>
        <b-col>
          <b-form-input
            class="text-center"
            placeholder="Airport ICAO / ZGGG"
            v-model="data.airport"
          ></b-form-input>
        </b-col>
        <b-col>
          <b-form-input
            class="text-center"
            placeholder="Runway Identification / 01"
            v-model="data.runway"
          ></b-form-input>
        </b-col>
        <b-col>
          <b-form-input
            class="text-center"
            placeholder="Procedure Name / YIN1A"
            v-model="data.procedure"
          ></b-form-input>
        </b-col>
      </b-row>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  name: "GeneralConfigurator",
  props: [ "data" ],
};
</script>
