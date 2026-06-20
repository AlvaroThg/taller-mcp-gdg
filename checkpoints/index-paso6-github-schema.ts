// CHECKPOINT 6 (BONUS EXTRA) -- + Schema de búsqueda en GitHub
// Solo si en el taller sobró tiempo después del Checkpoint 5 y se hizo el "swap de API".
// Si te quedaste aquí, tu src/index.ts debería verse exactamente así.
// NOTA: todavía falta registrar el tool con fetch (Checkpoint 7) -- este schema solo no hace nada.


// NUEVO: schema para el tercer tool, ahora usando GitHub en vez de TMDB.
// Misma idea de siempre: el schema es el "guardia con lista de invitados".
const BuscarRepositoriosGithubSchema = {
  busqueda: z
    .string()
    .min(2)
    .describe("Palabras clave para buscar repositorios en GitHub. Ejemplo: 'mcp server'"),

  lenguaje: z
    .string()
    .optional()
    .describe("Lenguaje de programación para filtrar. Ejemplo: 'typescript', 'python'"),

  minEstrellas: z
    .number()
    .int()
    .min(0)
    .optional()
    .describe("Número mínimo de estrellas que debe tener el repositorio"),
};

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main();
