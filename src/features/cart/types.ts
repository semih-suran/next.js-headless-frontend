export type CartStatus = "idle" | "updating" | "error";

export type CartLine = {
  id: string;
  title: string;
  quantity: number;
};

export type CartViewModel = {
  status: CartStatus;
  items: CartLine[];
  pendingIntent?: {
    type: "add";
    variantId: string;
    quantity: number;
  };
};
