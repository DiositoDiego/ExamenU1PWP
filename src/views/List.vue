<template>
  <div style="display: flex; justify-content: center;">
    <div style="width: 75%">
      <b-table
        :items="vehicles"
        :fields="fields"
        :per-page="size"
        :current-page="page"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        label-sort-asc=""
        label-sort-desc=""
        striped
        responsive
      >
        <template #cell(marca)="data">
          <strong>{{ data.value }}</strong>
        </template>
        <template #cell(modelo)="data">
          <em>{{ data.value }}</em>
        </template>
      </b-table>
      <b-pagination
        v-model="page"
        :total-rows="vehicles.length"
        :per-page="size"
        aria-controls="my-table"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      vehicles: [],
      page: 1,
      size: 10,
      sortBy: "",
      sortDesc: false,
      fields: [
        { key: "brand", label: "Marca", sortable: true },
        { key: "model", label: "Modelo", sortable: true },
        { key: "serie", label: "No. serie", sortable: true },
        { key: "year", label: "Año", sortable: true },
      ],
    };
  },
  methods: {
    async getVehicles() {
      const response = await fetch("http://localhost:8080/api/vehiculos/page", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      console.log(data);
      this.vehicles = data.content;
    },
  },
  mounted() {
    this.getVehicles();
  },
});
</script>

<style></style>
