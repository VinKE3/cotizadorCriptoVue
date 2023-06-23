<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import Alerta from "./components/Alerta.vue";
import Cotizacion from "./components/Cotizacion.vue";
import Spinner from "./components/Spinner.vue";
const monedas = ref([
  { codigo: "USD", texto: "Dolar de Estados Unidos" },
  { codigo: "ARG", texto: "Peso Argentino" },
  { codigo: "COP", texto: "Peso Colombiano" },
  { codigo: "CLP", texto: "Peso Chileno" },
  { codigo: "PEN", texto: "Sol Peruano" },
  { codigo: "UYU", texto: "Peso Uruguayo" },
  { codigo: "BRL", texto: "Real Brasileño" },
  { codigo: "MXN", texto: "Peso Mexicano" },
  { codigo: "EUR", texto: "Euro" },
]);
const criptomonedas = ref([]);
const error = ref("");
const cotizar = reactive({
  moneda: "",
  criptomoneda: "",
});
const cotizacion = ref({});
const cargando = ref(false);
const cotizarCriptomoneda = () => {
  //?validarmos que los campos esten llenos
  if (Object.values(cotizar).includes("")) {
    error.value = "Todos los campos son obligatorios";
    return;
  }
  consultando();
  error.value = "";
};
const consultando = async () => {
  cargando.value = true;
  cotizacion.value = {};
  try {
    const { moneda, criptomoneda } = cotizar;
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
    const respuesta = await fetch(url);
    const data = await respuesta.json();
    cotizacion.value = data.DISPLAY[criptomoneda][moneda];
  } catch (error) {
    error.value = "Ha ocurrido un error";
  } finally {
    cargando.value = false;
  }
};
onMounted(() => {
  fetch(
    "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"
  )
    .then((respuesta) => respuesta.json())
    .then(({ Data }) => {
      criptomonedas.value = Data;
    });
});
const cotizacionVacio = computed(() => {
  return Object.keys(cotizacion.value).length === 0;
});
</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Cotizador de <span>Criptomonedas</span></h1>
    <div class="contenido">
      <Alerta v-if="error">{{ error }}</Alerta>
      <form class="formulario" @submit.prevent="cotizarCriptomoneda">
        <div class="campo">
          <label for="moneda">Moneda</label>
          <select id="moneda" v-model="cotizar.moneda">
            <option value="">-- Seleccione la Moneda --</option>
            <option v-for="moneda in monedas" :value="moneda.codigo">
              {{ moneda.texto }}
            </option>
          </select>
        </div>
        <div class="campo">
          <label for="cripto">Criptomoneda</label>
          <select id="cripto" v-model="cotizar.criptomoneda">
            <option value="">-- Seleccione la Criptomoneda --</option>
            <option
              v-for="criptomoneda in criptomonedas"
              :value="criptomoneda.CoinInfo.Name"
            >
              {{ criptomoneda.CoinInfo.FullName }}
            </option>
          </select>
        </div>
        <input type="submit" value="Cotizar" />
      </form>
      <Spinner v-if="cargando" />
      <Cotizacion v-if="!cotizacionVacio" :cotizacion="cotizacion" />
    </div>
  </div>
</template>

<style scoped></style>
