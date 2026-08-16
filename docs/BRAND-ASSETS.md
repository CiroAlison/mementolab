# Brand assets — logo, spirale, wordmark, favicon

Tutti i loghi del sito derivano dalla **spirale dipinta a mano** del brand,
scansionata dal cliente. Questo documento spiega quali file esistono, dove
vengono usati e **come rigenerarli da zero** in modo fedele.

## Regola d'oro
Il cliente vuole la **pennellata reale** della spirale (mai versioni vettoriali o
ridisegnate) con i **colori originali del brand**: un **blu profondo** con
sfumature azzurre. La spirale va sempre mostrata sul fondo **arancione**.

⚠️ **La scansione NON ha i colori giusti.** È la foto di una stampa: la carta e
il riflesso hanno spento il blu in un grigio-viola slavato (ink medio circa
`(93,72,93)`), mentre i colori digitali veri del logo sono blu — `(36,57,85)`,
misurati su `logo-concept.png` e `pattern-spirale.png`. Per questo
`extract-spiral.py` applica una **correzione colore**: usa la luminosità di ogni
pixel (cioè la texture del pennello) per interpolare fra il navy del brand
`#0A2A4C` e l'azzurro `#2E93C8`. Risultato: pennellata autentica + colori veri.

## File generati

| File | Cos'è | Dove si usa |
|------|-------|-------------|
| `public/brand/spiral.png` | Spirale fedele, sfondo trasparente (1000×1000) | Intro animata, hero che gira sullo scroll, footer, filigrane su sezioni arancioni/chiare, favicon |
| `public/brand/spiral-cream.png` | Silhouette color crema della spirale | Filigrana sulle sezioni scure (navy) |
| `public/brand/wordmark-full.png` | Logotipo `MEMENTO●LAB`: lettere navy + spirale come lettera **O** | Header, intro, hero (reveal sullo scroll), footer |
| `public/brand/wordmark-cream.png` | Versione crema del logotipo | Menu mobile e sfondi scuri |
| `public/apple-icon.png` | Favicon / icona app: spirale su arancione (512×512) | Tab del browser, home screen |

Sorgenti (in `scripts/brand/`):
- `source-spiral-scan.png` — la scansione originale (spirale su cartoncino arancione), estratta dal PDF del cliente.
- `public/brand/logo-concept.png` — il logotipo di concept, da cui si prendono le **lettere** MEMENT…LAB alla loro risoluzione nativa.

## Come rigenerare tutto da zero

Serve Python 3 con `pillow`, `numpy`, `scipy`:

```bash
pip3 install --user pillow numpy scipy
cd scripts/brand
python3 extract-spiral.py   # scansione -> spiral_authentic.png (spirale pulita, trasparente)
python3 build-assets.py     # spiral_authentic.png -> tutti i file in public/
```

`build-assets.py` **verifica** che ogni PNG trasparente abbia davvero
trasparenza (fallisce se per errore produce un rettangolo pieno).

## Come funziona (in breve)
1. **extract-spiral.py** — sul cartoncino l'unico colore di fondo è l'arancione
   `(255,100,0)`. Si calcola per ogni pixel la distanza da quell'arancione e la
   si usa come canale alpha (arancione → trasparente, inchiostro → opaco). Si
   **mantengono i colori RGB originali** della scansione (nessuna "pulizia" che
   li schiarirebbe). Gli schizzi di vernice staccati dalla spirale vengono
   rimossi (dilatazione → si tiene solo la macchia più grande) perché dentro il
   logotipo sembrerebbero sporco. Output quadrato 1000px.
2. **build-assets.py** — salva la spirale, ne crea la versione crema, e
   ricostruisce il logotipo prendendo le lettere dal concept e **sostituendo la
   vecchia O a bassa risoluzione con la spirale nuova** (centro O = `(415,301)`,
   diametro `86px` nello spazio del concept). Infine genera il favicon.

## Errori già incontrati (da non ripetere)
- **Logotipo diventato un rettangolo blu pieno**: il keying dell'arancione era
  andato perso e il PNG risultava opaco. Per questo `build-assets.py` ora
  verifica sempre la trasparenza.
- **Spirale troppo chiara / azzurro acceso**: causato dall'"un-premultiply" dei
  bordi semi-trasparenti, che veniva poi amplificato dal ridimensionamento di
  `next/image`. Soluzione: non un-premultiplicare.
- **Logo "sbiadito"**: si erano tenuti i colori grezzi della scansione, che sono
  smorti (vedi Regola d'oro). Soluzione: la correzione colore verso i blu del
  brand, con `t ** 1.45` per mantenere il navy dominante come nel logo originale.
- **Modifiche non visibili al cliente**: le immagini hanno lo stesso nome file e
  restano in cache nel browser. Soluzione: i riferimenti nel codice hanno un
  suffisso di versione (`/brand/spiral.png?v=3`). **Se rigeneri i loghi, alza il
  numero di versione** in tutti i file: `grep -rl "?v=3" src/ | xargs sed -i '' 's/?v=3/?v=4/g'`

## Se cambia la spirale (nuova scansione)
Sostituisci `scripts/brand/source-spiral-scan.png` con la nuova scansione (sempre
su fondo arancione uniforme) e rilancia i due script. Se il fondo non è
arancione, aggiorna il valore `ORANGE` in cima a `extract-spiral.py`.
