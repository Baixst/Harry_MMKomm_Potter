# Harry Potter Newsticker für M-M-Komm

## Neue Headline zum Ticker hinzufügen:

1.) Öffne "ticker_script.js"

2.) Suche nach Funktion "createAllHeadlines()" (momentan Zeile 26)

3.) Lege neue Headline an oder bearbeite bestehende
  Füge einen neuen Aufruf der Funktion "addHeadline()" hinzu mit folgenden Parametern (Reihenfolge ist wichtig)
  - **Titel** Legt den Text fest der im Ticker durchläuft
  - **Link:** Link zum vollständigen Artikel (href)
  - **Topic:** Kategorie zu der die Headline gehört
  - **Author:** Wer hat den Artikel verfasst
  - **Length:** Wie lang ist der Artikel
  - **Location:** Welchen Ort betrifft der Artikel

  Alle Möglichen Parameter sind unter dem Array "headlineClasses" gelistet (Zeile 16-20)!

## TO-DO:
- Slider für "Days Since Release" funktional machen
- Eigenes Design in Webseite einbauen

