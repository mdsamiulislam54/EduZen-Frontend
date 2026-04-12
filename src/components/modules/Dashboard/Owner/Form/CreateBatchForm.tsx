// "use client"

// import { createBatch } from "@/app/(dashboardLayout)/dashboard/owner/batch/_actions";
// import { IBatch, ICreateBatchPayload } from "@/types/batch.type";
// import { useMutation } from "@tanstack/react-query";

// const CreateBatchForm = () => {
//       const { mutateAsync, isPending } = useMutation({
//     mutationKey: ["create-subject"],
//     mutationFn: async (data: Partial<ICreateBatchPayload>) => createBatch(data),
//     onError: (error) => {
//       toast.error("Failed to create subject: " + error.message);
//     },
//     onSuccess: () => {
//       toast.success("Subject  Created Successfully");
//       onClose()
//       form.reset();
//     }
//   })
//   const { mutateAsync: updateMutate, isPending: updateIsPenidng } = useMutation({
//     mutationKey: ["update-subject"],
//     mutationFn: async (data: Partial<ISubject> & { id?: string }) => updateSubject(data, data.id!),
//     onError: (error) => {
//       toast.error("Failed to Update subject: " + error.message);
//     },
//     onSuccess: () => {
//       toast.success("Subject  Update Successfully");
//       onClose()
//       form.reset();
//     }
//   })
//   const form = useForm({
//     defaultValues: {
//       name: initialData?.name || "",
//     },
//     onSubmit: async ({ value }) => {
//       if (mode === "edit") {
//         await updateMutate({ ...value, id: initialData?.id })
//       } else {
//         await mutateAsync(value);
//       }
//     }

//   })
//   return (
//     <div>CreateBatchForm</div>
//   )
// }

// export default CreateBatchForm