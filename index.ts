import comuniData from './data/comuni.json';
import regioniData from './data/regioni.json';
import provinceData from './data/province.json';

export type FasciaPopolazione = 'metropolitana' | 'grande' | 'media' | 'piccola';
export type AreaGeografica = 'Nord-Ovest' | 'Nord-Est' | 'Centro' | 'Sud' | 'Isole';
export type TipoProvincia = 'provincia' | 'citta_metropolitana' | 'provincia_autonoma' | 'regione_autonoma';

export interface Comune {
  nome: string;
  slug: string;
  codiceISTAT: string;
  provincia: string;
  regione: string;
  popolazione: number;
  fascia: FasciaPopolazione;
  capoluogoProvincia: boolean;
  capoluogoRegione: boolean;
  areaGeografica: AreaGeografica;
  cap: string;
}

export interface Regione {
  codiceISTAT: string;
  nome: string;
  capoluogo: string;
  areaGeografica: AreaGeografica;
}

export interface Provincia {
  sigla: string;
  nome: string;
  regione: string;
  tipo: TipoProvincia;
}

export const comuni: Comune[] = comuniData as Comune[];
export const regioni: Regione[] = regioniData as Regione[];
export const province: Provincia[] = provinceData as Provincia[];

export function getComuneBySlug(slug: string): Comune | undefined {
  return comuni.find((c) => c.slug === slug);
}

export function getComuniByRegione(regione: string): Comune[] {
  return comuni.filter((c) => c.regione === regione);
}

export function getComuniByProvincia(sigla: string): Comune[] {
  return comuni.filter((c) => c.provincia === sigla);
}

export function getCapoluoghiRegione(): Comune[] {
  return comuni.filter((c) => c.capoluogoRegione);
}

export function getCapoluoghiProvincia(): Comune[] {
  return comuni.filter((c) => c.capoluogoProvincia);
}

export default comuni;
