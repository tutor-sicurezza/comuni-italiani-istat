# comuni-italiani-istat

[![License: MIT](https://img.shields.io/badge/Code-MIT-blue.svg)](LICENSE)
[![Data License: CC BY 4.0](https://img.shields.io/badge/Data-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![GitHub stars](https://img.shields.io/github/stars/tutor-sicurezza/comuni-italiani-istat?style=social)](https://github.com/tutor-sicurezza/comuni-italiani-istat)
[![Part of the tutor-sicurezza open-data ecosystem](https://img.shields.io/badge/ecosystem-tutor--sicurezza-blue.svg)](https://github.com/tutor-sicurezza)

> Dataset JSON dei principali comuni italiani — codice ISTAT, regione, provincia, CAP, fascia di popolazione, area geografica. Pronto all’uso in TypeScript/JavaScript.

---

## Cos’è

`comuni-italiani-istat` è un dataset open data pensato per sviluppatori che costruiscono applicazioni italiane e hanno bisogno di una **lista pulita, tipizzata e attribuibile dei principali comuni italiani** — capoluoghi di provincia, città metropolitane e comuni con popolazione rilevante — senza dover scaricare e parsare il CSV ufficiale ISTAT.

Tre dataset coordinati:

| File | Voci | Contenuto |
|---|---|---|
| `data/comuni.json` | **121** | Comuni con codice ISTAT, sigla provincia, regione, popolazione, fascia, CAP, area geografica, flag capoluogo |
| `data/regioni.json` | **20** | Regioni italiane con codice ISTAT, capoluogo, ripartizione geografica |
| `data/province.json` | **107** | Province con sigla, regione, tipo (provincia, città metropolitana, provincia autonoma) |

## Statistiche del dataset

- **121 comuni** (tutti i 107 capoluoghi di provincia + 14 grandi comuni non capoluogo come Sesto San Giovanni, Giugliano in Campania, Pozzuoli, Civitavecchia, Pomezia, ecc.)
- **20 regioni** con codice ISTAT ufficiale
- **107 province** (incluse città metropolitane e province autonome)
- Tutti i **5 ambiti geografici ISTAT**: Nord-Ovest, Nord-Est, Centro, Sud, Isole

## Disclaimer di scope

**Questo NON è il dataset completo di tutti gli 8.000+ comuni italiani.** È una **selezione curata** dei capoluoghi e dei comuni più popolosi, sufficiente per la maggior parte degli use case applicativi (form di registrazione, drop-down città, copertura local-SEO, segmentazione utenti per area geografica).

Per la lista completa ufficiale di tutti i comuni italiani aggiornata in tempo reale consulta la fonte ufficiale:

> ISTAT — Codici statistici delle unità amministrative territoriali
> https://www.istat.it/it/archivio/6789

## Installazione

```bash
# npm
npm install github:tutor-sicurezza/comuni-italiani-istat

# oppure clona direttamente i file JSON
curl -O https://raw.githubusercontent.com/tutor-sicurezza/comuni-italiani-istat/main/data/comuni.json
```

## Uso

### TypeScript / JavaScript

```ts
import {
  comuni,
  regioni,
  province,
  getComuneBySlug,
  getComuniByRegione,
  getCapoluoghiRegione,
  type Comune,
} from 'comuni-italiani-istat';

// Tutti i comuni
console.log(comuni.length); // 121

// Cerca per slug
const roma = getComuneBySlug('roma');
// { nome: 'Roma', codiceISTAT: '058091', provincia: 'RM', regione: 'Lazio', popolazione: 2748109, ... }

// Tutti i comuni di una regione
const lombardi = getComuniByRegione('Lombardia');

// Solo i capoluoghi di regione
const capoluoghi = getCapoluoghiRegione(); // 20 voci
```

### JSON puro (qualsiasi linguaggio)

```js
const comuni = require('comuni-italiani-istat/data/comuni.json');

const ordinatiPerPopolazione = comuni
  .sort((a, b) => b.popolazione - a.popolazione)
  .slice(0, 10);
```

## Schema dati

### Comune

```json
{
  "nome": "Roma",
  "slug": "roma",
  "codiceISTAT": "058091",
  "provincia": "RM",
  "regione": "Lazio",
  "popolazione": 2748109,
  "fascia": "metropolitana",
  "capoluogoProvincia": true,
  "capoluogoRegione": true,
  "areaGeografica": "Centro",
  "cap": "00100-00199"
}
```

- **fascia**: `metropolitana` (>250k) · `grande` (100k–250k) · `media` (50k–100k) · `piccola` (<50k)
- **areaGeografica**: `Nord-Ovest` · `Nord-Est` · `Centro` · `Sud` · `Isole` (ripartizioni ISTAT NUTS-1)
- **provincia**: sigla automobilistica a 2 lettere (es. `RM`, `MI`, `NA`)
- **cap**: singolo CAP o intervallo `00100-00199` per grandi città

### Regione

```json
{ "codiceISTAT": "12", "nome": "Lazio", "capoluogo": "Roma", "areaGeografica": "Centro" }
```

### Provincia

```json
{ "sigla": "MI", "nome": "Milano", "regione": "Lombardia", "tipo": "citta_metropolitana" }
```

## Use case real-world

Questo dataset alimenta le pagine **[/provincia](https://123formazione.com/provincia)** di **123Formazione** per la copertura local-SEO dei corsi di sicurezza sul lavoro su tutto il territorio italiano. La selezione di comuni (capoluoghi + grandi comuni) è ottimizzata per coprire i bacini d’utenza B2B principali senza generare migliaia di pagine thin-content.

Altri use case tipici:
- Drop-down di selezione città nei form di registrazione
- Geo-segmentazione marketing per area ISTAT
- Validazione codice ISTAT in software gestionali / fatturazione
- Generazione automatica di landing page local-SEO
- Mappe coropletiche regionali / provinciali

## Fonti dati

- **Codici ISTAT comuni e regioni**: ISTAT — Elenco codici statistici e denominazioni delle unità territoriali (https://www.istat.it/it/archivio/6789)
- **Popolazione**: ISTAT — Censimento permanente 2023
- **CAP**: Poste Italiane — elenco ufficiale codici di avviamento postale
- **Sigle automobilistiche**: ACI — sigle di provincia

## Contribuire

I PR sono benvenuti! Per aggiungere comuni:

1. Verifica codice ISTAT su https://www.istat.it/it/archivio/6789
2. Verifica popolazione su demo.istat.it
3. Mantieni l’ordinamento e lo schema esistente
4. Apri PR con fonte dei dati nei commit

## Related repositories

Open dataset / tooling ecosystem for Italian workplace safety (D.Lgs 81/08) maintained by [@tutor-sicurezza](https://github.com/tutor-sicurezza):

**Datasets**
- [italian-ateco-database](https://github.com/tutor-sicurezza/italian-ateco-database) — ATECO 2007 codes + workplace-safety risk
- [italian-province-regioni-dataset](https://github.com/tutor-sicurezza/italian-province-regioni-dataset) — Italian provinces + regions metadata
- [dlgs-81-08-glossario](https://github.com/tutor-sicurezza/dlgs-81-08-glossario) — 218 D.Lgs 81/08 glossary terms
- [dlgs-81-08-testo-unico](https://github.com/tutor-sicurezza/dlgs-81-08-testo-unico) — D.Lgs 81/08 structured by Title + key articles index
- [haccp-italia-normativa-regionale](https://github.com/tutor-sicurezza/haccp-italia-normativa-regionale) — HACCP regional regulations (20 Italian regions)
- [verifiche-periodiche-inail-attrezzature](https://github.com/tutor-sicurezza/verifiche-periodiche-inail-attrezzature) — Equipment subject to INAIL periodic verification
- [accordi-stato-regioni-sicurezza-lavoro](https://github.com/tutor-sicurezza/accordi-stato-regioni-sicurezza-lavoro) — Stato-Regioni training agreements

**Libraries / tools**
- [scadenze-formazione-calculator](https://github.com/tutor-sicurezza/scadenze-formazione-calculator) — Training renewal schedule calculator
- [next-seo-italian-helpers](https://github.com/tutor-sicurezza/next-seo-italian-helpers) — Next.js SEO helpers for Italian B2B
- [mcp-italian-workplace-safety](https://github.com/tutor-sicurezza/mcp-italian-workplace-safety) — MCP server for Claude Desktop / Cursor / Cline

**Online services**
- [Public REST API + OpenAPI 3.1 + DCAT-AP-IT](https://123formazione.com/api/public/docs) — Free open data API
- [Live documentation site (GitHub Pages)](https://tutor-sicurezza.github.io/accordi-stato-regioni-sicurezza-lavoro/) — Accordi Stato-Regioni

All resources are MIT or CC-BY licensed and maintained as production-quality open data.

## License

- **Codice** (`index.ts`, script): MIT
- **Dati** (`data/*.json`): CC-BY 4.0 — basati su dati pubblici ISTAT

Citazione consigliata: vedi [CITATION.cff](CITATION.cff).

---

## English summary

**`comuni-italiani-istat`** is an open dataset of the main Italian municipalities (`comuni`) with official ISTAT codes, region, province (2-letter plate code), population band, postal code range and ISTAT geographic area. Includes all 107 province capitals + 14 large non-capital cities = **121 comuni**, plus 20 regions and 107 provinces.

**Not** a full 8,000-municipality dump — for that, use the official ISTAT source linked above. This is a curated subset optimized for the most common app use cases (city dropdowns, geo-segmentation, local SEO coverage, ISTAT code validation).

License: MIT (code) + CC-BY 4.0 (data). Attribution to ISTAT required for data redistribution.
