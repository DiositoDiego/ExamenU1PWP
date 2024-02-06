<template>
  <div style="display: flex; justify-content: center;">
      <div style="width: 70%">
        <b-col>
          <label>Marca:</label>
          <b-form-input
            v-model="brand"
            placeholder="Marca"
            @input="validateBrand(brand)"
            :state="validatedBrand"
          />
          <b-form-invalid-feedback> {{ brandError }} </b-form-invalid-feedback>
        </b-col>
        <b-col>
          <label>Modelo</label>
          <b-form-input
            v-model="model"
            placeholder="Modelo"
            @input="validateModel(model)"
            :state="validatedModel"
          />
          <b-form-invalid-feedback>
            {{ modelError }}
          </b-form-invalid-feedback>
        </b-col>
        <b-col>
          <label>Año de fabricación</label>
          <b-form-input
            v-model="manufacturingYear"
            placeholder="Año de fabricación"
            @input="validateManufacturingYear(manufacturingYear)"
            :state="validatedManufacturingYear"
            type="number"
          />
          <b-form-invalid-feedback>
            {{ manufacturingYearError }}
          </b-form-invalid-feedback>
        </b-col>
        <b-col>
          <label>Número de serie</label>
          <b-form-input
            v-model="serialNumber"
            placeholder="Número de serie"
            @input="validateSerialNumber(serialNumber)"
            :state="validatedSerialNumber"
            :formatter="formatSerialNumber"
          />
          <b-form-invalid-feedback>
            {{ serialNumberError }}
          </b-form-invalid-feedback>
        </b-col>
        <b-col style="margin-top: 15px; display: flex; justify-content: space-between;">
          <b-button
            style="width: 40%;"
            variant="outline-danger"
            @click="() => $router.push('/list')"
          >
            Cancelar
          </b-button>
          <b-button
            style="width: 40%;"
            :disabled="!validatedFields()"
            variant="outline-success"
            @click="createVehicle"
          >
            Enviar
          </b-button>
        </b-col>
      </div>
  </div>
</template>

<script>
import Vue from "vue";
import Swal from "sweetalert2";

export default Vue.extend({
  data() {
    return {
      brand: "",
      model: "",
      manufacturingYear: "",
      birthdate: "",
      serialNumber: "",

      brandError: "",
      modelError: "",
      manufacturingYearError: "",
      birthdateError: "",
      serialNumberError: "",

      noSignsRegex: /[A-z0-9]+/,
      serialNumberRegex: /[A-Z]{1,4}[0-9]{1,3}-?[0-9]{1,2}[A-Z]{2}/,

      validatedBrand: null,
      validatedModel: null,
      validatedManufacturingYear: null,
      validatedSerialNumber: null,
    };
  },
  methods: {
    validateBrand(brand) {
      if (brand.length > 0 && brand.length <= 2) {
        this.validatedBrand = false;
        this.brandError = "Marca inválido";
      } else if (brand.length === 0) {
        this.validatedBrand = false;
        this.brandError = "La marca no puede estar vacío";
      } else if (!this.noSignsRegex.test(brand)) {
        this.validatedBrand = false;
        this.brandError = "La marca no puede contener caracteres especiales";
      } else {
        this.validatedBrand = true;
      }
    },
    validateModel(model) {
      if (model.length > 0 && model.length <= 3) {
        this.validatedModel = false;
        this.modelError = "Modelo inválido";
      } else if (model.length === 0) {
        this.validatedModel = false;
        this.modelError = "El modelo no puede estar vacío";
      } else if (!this.noSignsRegex.test(model)) {
        this.validatedModel = false;
        this.brandError = "El modelo no puede contener caracteres especiales";
      } else {
        this.validatedModel = true;
      }
    },
    validateManufacturingYear(manufacturingYear) {
      manufacturingYear = parseInt(manufacturingYear);
      if (manufacturingYear > new Date().getFullYear()) {
        this.validatedManufacturingYear = false;
        this.manufacturingYearError = "El año de fabricación no puede ser mayor al año actual";
      } else if (manufacturingYear < 0){
        this.validatedManufacturingYear = false;
        this.manufacturingYearError = "El año de fabricación no puede ser negativo";
      } else if ((manufacturingYear+"").length < 4 && (manufacturingYear+"").length > 0) {
        this.validatedManufacturingYear = false;
        this.manufacturingYearError = "Año de fabricación inválido";
      } else {
        this.validatedManufacturingYear = true;
      }
    },
    validateSerialNumber(serialNumber) {
      if (serialNumber.length === 0) {
        this.validatedSerialNumber = false;
        this.serialNumberError = "El número de serie no puede estar vacío";
      } else if (!this.serialNumberRegex.test(serialNumber)) {
        this.validatedSerialNumber = false;
        this.serialNumberError = "El número de serie no cumple con el formato (XXXX000-00XX)";
      } else {
        this.validatedSerialNumber = true;
      }
    },
    formatSerialNumber(serialNumber){
      serialNumber = serialNumber.toUpperCase();
      return serialNumber;
    },
    validatedFields() {
      return this.validatedBrand && this.validatedModel && this.validatedManufacturingYear && this.validatedSerialNumber;
    },
    createVehicle() {
      if (this.validatedFields()) {
        const vehicle = {
          brand: this.brand,
          model: this.model,
          year: this.manufacturingYear,
          serie: this.serialNumber,
        };
        fetch("http://localhost:8080/api/vehiculos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vehicle),
        })
          .then((response) => response.json())
          .then((data) => {
            if(data.id){
              Swal.fire({
                title: "Vehículo registrado",
                text: "El vehículo ha sido registrado exitosamente",
                icon: "success",
                confirmButtonText: "Aceptar",
              });
            } else {
              Swal.fire({
                title: "Error",
                text: "Ha ocurrido un error al registrar el vehículo",
                icon: "error",
                confirmButtonText: "Aceptar",
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "Error",
              text: "Ha ocurrido un error al registrar el vehículo",
              icon: "error",
              confirmButtonText: "Aceptar",
            });
          });
      }
    },
  },
});
</script>

<style></style>
