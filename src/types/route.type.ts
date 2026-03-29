import { LucideIcon } from "lucide-react";

export interface IRoutePage {
  title: string;
  url: string;
  isActive?: boolean;
  icon?: LucideIcon; 
}