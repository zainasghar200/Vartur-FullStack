export interface ToLocaleDateStringOptions {
  day?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "narrow" | "short" | "long";
  year?: "numeric" | "2-digit";
  hour?: "numeric" | "2-digit";
  minute?: "numeric" | "2-digit";
  second?: "numeric" | "2-digit";
  timeZone?: string;
  hour12?: boolean;
}

export interface ProductInterface {
  _id: string;
  name: string;
  picture: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductForm {
  name: string;
  image: string;
}
