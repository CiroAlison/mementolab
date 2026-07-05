import Image from "next/image";

// Piccolo nodo-spirale che segna ogni fase sulla linea del processo.
export function SpiralNode() {
  return (
    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-paper ring-1 ring-flame/40">
      <span className="relative h-6 w-6">
        <Image src="/brand/spiral.png" alt="" fill className="object-contain" />
      </span>
    </span>
  );
}
