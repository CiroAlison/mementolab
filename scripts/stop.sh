#!/usr/bin/env bash
# Chiude tutto quello che un intervento di sviluppo può aver lasciato acceso.
# Da lanciare SEMPRE prima di considerare concluso un lavoro: npm run stop
echo "Chiudo processi rimasti attivi…"
trovato=0
for pat in "next start" "next-server" "next dev" "gallery_dl" "until curl" "while.*curl"; do
  pids=$(pgrep -f "$pat" 2>/dev/null)
  if [ -n "$pids" ]; then
    echo "  • $pat → $(echo "$pids" | tr '\n' ' ')"
    echo "$pids" | xargs kill -9 2>/dev/null
    trovato=1
  fi
done
[ "$trovato" = "0" ] && echo "  nulla da chiudere ✓" || { sleep 1; echo "  chiusi ✓"; }
echo
echo "Controllo finale:"
resti=$(pgrep -f "next start|next-server|gallery_dl|until curl" 2>/dev/null | wc -l | tr -d ' ')
[ "$resti" = "0" ] && echo "  nessun processo attivo ✓" || echo "  !! restano $resti processi, controllare a mano"
