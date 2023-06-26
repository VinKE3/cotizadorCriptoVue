<script setup>
const props = defineProps({
  monedas: {
    type: Array,
    required: true,
  },
  criptomonedas: {
    type: Array,
    required: true,
  },
  cotizar: {
    type: Object,
    required: true,
  },
});
defineEmits(["cotizar-criptomoneda"]);
</script>
<template>
  <div>
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
  </div>
</template>

<style lang="scss" scoped></style>
