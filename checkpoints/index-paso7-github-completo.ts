// CHECKPOINT 7 (BONUS EXTRA) -- + Tool "buscar_repositorios_github" -- swap de API completo
// Solo si en el taller sobró tiempo. Si te quedaste aquí, tu src/index.ts debería verse exactamente así.
// Este tercer tool usa la API pública de GitHub (no TMDB) -- mismo patrón: schema -> fetch -> formatear.
// No requiere API key nueva ni npm install nuevo.

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import "dotenv/config";

const server = new McpServer({
  name: "recomendador-peliculas",
  version: "1.0.0",
});

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

server.tool(
  "buscar_repositorios_github",
  "Busca repositorios públicos en GitHub según palabras clave, lenguaje de programación y número mínimo de estrellas. Devuelve los 5 con más estrellas.",
  BuscarRepositoriosGithubSchema,
  async (params) => {
    let query = params.busqueda;
    if (params.lenguaje) {
      query += ` language:${params.lenguaje}`;
    }
    if (params.minEstrellas !== undefined) {
      query += ` stars:>=${params.minEstrellas}`;
    }

    const url = new URL("https://api.github.com/search/repositories");
    url.searchParams.set("q", query);
    url.searchParams.set("sort", "stars");
    url.searchParams.set("order", "desc");

    const response = await fetch(url.toString(), {
      headers: {
        "Accept": "application/vnd.github+json",
        "User-Agent": "taller-mcp-gdg",
      },
    });

    if (!response.ok) {
      return { content: [{ type: "text" as const, text: `Error de GitHub: ${response.status}` }] };
    }

    const data = await response.json() as {
      items: Array<{
        full_name: string;
        description: string | null;
        html_url: string;
        stargazers_count: number;
        language: string | null;
      }>;
    };

    const repos = data.items.slice(0, 5);

    if (repos.length === 0) {
      return { content: [{ type: "text" as const, text: "No encontré repositorios con esos criterios." }] };
    }

    const texto = repos
      .map(
        (r, i) =>
          `${i + 1}. 📦 **${r.full_name}** ⭐ ${r.stargazers_count.toLocaleString()}\n` +
          `   ${r.language ? `Lenguaje: ${r.language} · ` : ""}${r.description || "Sin descripción."}\n` +
          `   ${r.html_url}`
      )
      .join("\n\n");

    return {
      content: [{ type: "text" as const, text: `Repositorios encontrados en GitHub:\n\n${texto}` }],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main();
