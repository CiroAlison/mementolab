import { z } from "zod";

export const commissionSchema = z.object({
  name: z.string().min(2, "Inserisci il tuo nome").max(80),
  email: z.string().email("Inserisci un'email valida"),
  phone: z.string().max(30).optional().or(z.literal("")),
  itemType: z.enum(["giubbotto", "jeans", "scarpe", "altro"], {
    errorMap: () => ({ message: "Scegli un tipo di capo" }),
  }),
  idea: z
    .string()
    .min(10, "Raccontami almeno un po' della tua idea")
    .max(2000),
  budget: z.string().max(40).optional().or(z.literal("")),
  // honeypot anti-spam: deve restare vuoto
  website: z.string().max(0).optional().or(z.literal("")),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Inserisci il tuo nome").max(80),
  email: z.string().email("Inserisci un'email valida"),
  message: z.string().min(10, "Scrivi un messaggio più lungo").max(2000),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type CommissionInput = z.infer<typeof commissionSchema>;
export type ContactInput = z.infer<typeof contactSchema>;

export const itemTypeOptions = [
  { value: "giubbotto", label: "Giubbotto" },
  { value: "jeans", label: "Jeans" },
  { value: "scarpe", label: "Scarpe" },
  { value: "altro", label: "Altro" },
] as const;
