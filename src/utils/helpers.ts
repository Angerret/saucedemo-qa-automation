/** Convierte textos como "$29.99" o "Total: $32.39" en número. */
export function parsePrice(text: string | null): number {
  const match = (text ?? '').match(/\$(\d+(?:\.\d{1,2})?)/);
  if (!match) throw new Error(`No se pudo extraer un precio de: "${text}"`);
  return Number(match[1]);
}

/** Crea una RegExp de coincidencia exacta a partir de un texto literal. */
export function exactText(text: string): RegExp {
  const escaped = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`^\\s*${escaped}\\s*$`);
}
