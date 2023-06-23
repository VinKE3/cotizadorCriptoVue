<script setup>
const props = defineProps({
  cotizacion: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <div class="contenedor resultado">
    <h2>Cotizacion</h2>
    <img
      :src="'https://www.cryptocompare.com' + cotizacion.IMAGEURL"
      alt="imagen cripto"
    />
    <div>
      <p>
        El precio es de: <span>{{ cotizacion.PRICE }}</span>
      </p>
      <p>
        Precio más alto del día: <span>{{ cotizacion.HIGHDAY }}</span>
      </p>
      <p>
        Precio más bajo del día: <span>{{ cotizacion.LOWDAY }}</span>
      </p>
      <p>
        Variación últimas 24hs: <span>{{ cotizacion.CHANGEPCT24HOUR }}</span>
      </p>
      <p>
        última Actualización: <span>{{ cotizacion.LASTUPDATE }}</span>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
