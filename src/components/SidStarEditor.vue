<template>
  <div class="editor">
    <b>
      <b-row>
        <b-col></b-col>
        <b-col>FIX ID</b-col>
        <b-col>Flyover?</b-col>
        <b-col>HDG/TRK</b-col>
        <b-col>TURN</b-col>
        <b-col>ALT</b-col>
        <b-col>SPD</b-col>
      </b-row>
    </b>
    <b-row class="mt-2" v-for="waypoint in data" v-bind:key="waypoint.index">
      <b-col>
        <b-button
          size="sm"
          pill
          variant="success"
          class="ml-2 align-top"
          @click="() => addWaypoint(waypoint.index)"
        >
          <b-icon icon="plus-circle-fill" aria-label="Add"></b-icon>
        </b-button>
        <b-button
          size="sm"
          pill
          variant="danger"
          class="ml-2 align-top"
          @click="() => removeWaypoint(waypoint.index)"
        >
          <b-icon icon="dash-circle-fill" aria-label="Delete"></b-icon>
        </b-button>
      </b-col>
      <b-col>
        <b-form-input
          :ref="`${waypoint.index}_fix`"
          v-model="waypoint.fix"
          class="text-center"
          placeholder="GG508"
          lazy-formatter
          :formatter="(value) => value.toUpperCase()"
        />
      </b-col>
      <b-col>
        <b-form-checkbox
          v-model="waypoint.flyover"
          value="true"
          size="lg"
        ></b-form-checkbox>
      </b-col>
      <b-col>
        <b-form-input
          v-model="waypoint.hdgtrk"
          class="text-center"
          placeholder="H030/T030"
          lazy-formatter
          :formatter="(value) => value.toUpperCase()"
        />
      </b-col>
      <b-col>
        <b-form-input
          v-model="waypoint.turnDirection"
          class="text-center"
          placeholder="L/R"
          lazy-formatter
          :formatter="(value) => value.toUpperCase()"
        />
      </b-col>
      <b-col>
        <b-form-input
          v-model="waypoint.altitude"
          class="text-center"
          placeholder="3900A/3900B/3900"
          lazy-formatter
          :formatter="(value) => value.toUpperCase()"
        />
      </b-col>
      <b-col>
        <b-form-input
          v-model="waypoint.speed"
          class="text-center"
          placeholder="200"
          lazy-formatter
          :formatter="(value) => value.toUpperCase()"
        />
      </b-col>
    </b-row>
    <div class="mt-3">
      <b-button
        size="sm"
        pill
        variant="success"
        class="ml-2 align-top"
        @click="() => addWaypoint(this.data.length)"
      >
        <b-icon icon="plus-circle-fill" aria-label="Add"></b-icon>
      </b-button>
      <b-button
        size="sm"
        pill
        variant="danger"
        class="ml-2 align-top"
        @click="() => removeAllWaypoints()"
      >
        <b-icon icon="dash-circle-fill" aria-label="Add"></b-icon>
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SidEditor",
  props: ["data"],
  methods: {
    addWaypoint(before) {
      const newWaypoint = {
        index: null,
        fix: "",
        flyover: false,
        hdgtrk: "",
        turnDirection: "",
        altitude: "",
        speed: "",
      };
      this.data.splice(before, 0, newWaypoint);

      // reindexing
      for (let i = before + 1; i < this.data.length; i++) {
        this.data[i].index++;
      }
      this.data[before].index = before;
      this.$nextTick(() => {
        this.$refs[`${before}_fix`][0].focus();
      });
    },
    removeWaypoint(at) {
      this.data.splice(at, 1);
      // reindexing
      for (let i = at; i < this.data.length; i++) {
        this.data[i].index--;
      }
    },
    removeAllWaypoints() {
      if (window.confirm("Remove all waypoints?")) {
        for (let i = this.data.length; i >= 0; i--) {
          this.removeWaypoint(i);
        }
      }
    },
  },
};
</script>

<style scoped></style>
