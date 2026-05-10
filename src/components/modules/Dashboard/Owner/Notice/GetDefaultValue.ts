import { ICreateNotice, INotice } from "@/types/notice.type";

export const getDefaultValues = (
  mode: "create" | "edit",
  initialData?: INotice | null
): ICreateNotice => {
  
  if (mode === "edit" && initialData) {
    return {
      title: initialData.title ?? "",
      description: initialData.description ?? "",

      type: initialData.type ?? "GENERAL",

      priority: initialData.priority ?? "NORMAL",

      isPinned: initialData.isPinned ?? false,

      isPublished: initialData.isPublished ?? true,
    };
  }

  // create mode
  return {
    title: "",
    description: "",

    type: "GENERAL",

    priority: "NORMAL",

    isPinned: false,

    isPublished: true,
  };
};