import { ref, onMounted, computed } from "vue";
export default function useCripto() {
  const criptomonedas = ref([]);
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
  const cotizacion = ref({});
  const cargando = ref(false);
  onMounted(() => {
    fetch(
      "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"
    )
      .then((respuesta) => respuesta.json())
      .then(({ Data }) => {
        criptomonedas.value = Data;
      });
  });
  const consultando = async (cotizar) => {
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
  const cotizacionVacio = computed(() => {
    return Object.keys(cotizacion.value).length === 0;
  });
  return {
    monedas,
    criptomonedas,
    cargando,
    cotizacion,
    consultando,
    cotizacionVacio,
  };
}
