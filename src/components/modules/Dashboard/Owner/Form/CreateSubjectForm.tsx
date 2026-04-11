import { createSubject } from '@/app/(dashboardLayout)/dashboard/owner/create-subject/_actions';
import { updateSubject } from '@/app/(dashboardLayout)/dashboard/owner/subject/_actions';
import AppField from '@/shared/from/AppField';
import AppSubmitButton from '@/shared/from/SubmitButton';
import { ISubject } from '@/types/subject.type';
import { subjectZodSchema } from '@/zod/Subject.zod.schema';


import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
interface CreateSubjectFormProps {
  onClose: () => void;
  mode?: "create" | "edit",
  initialData?: ISubject | null
}

const CreateSubjectForm = ({ onClose, mode, initialData }: CreateSubjectFormProps) => {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["create-subject"],
    mutationFn: async (data: Partial<ISubject>) => createSubject(data),
    onError: (error) => {
      toast.error("Failed to create subject: " + error.message);
    },
    onSuccess: () => {
      toast.success("Subject  Created Successfully");
      onClose()
      form.reset();
    }
  })
  const { mutateAsync: updateMutate, isPending: updateIsPenidng } = useMutation({
    mutationKey: ["update-subject"],
    mutationFn: async (data: Partial<ISubject> & { id?: string }) => updateSubject(data, data.id!),
    onError: (error) => {
      toast.error("Failed to Update subject: " + error.message);
    },
    onSuccess: () => {
      toast.success("Subject  Update Successfully");
      onClose()
      form.reset();
    }
  })
  const form = useForm({
    defaultValues: {
      name: initialData?.name || "",
    },
    onSubmit: async ({ value }) => {
      if (mode === "edit") {
        await updateMutate({ ...value, id: initialData?.id })
      } else {
        await mutateAsync(value);
      }
    }

  })
  return (
    <div>
      <form

        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="space-y-5"
      >
        <form.Field
          name='name'
          validators={{ onChange: subjectZodSchema.shape.name }}

        >
          {
            (filed) => (
              <AppField
                field={filed}
                label='Subject Name'
                placeholder='Enter Subject Name'
                type="text"
                className="space-y-4"

              />


            )
          }

        </form.Field>


        <form.Subscribe selector={(s) => [s.canSubmit]}>
          {
            ([canSubmit]) => (
              <AppSubmitButton
                isPending={isPending || updateIsPenidng}
                disabled={!canSubmit || isPending || updateIsPenidng}

              >
                {mode === "create" ? " Create Subject" : "Update"}
              </AppSubmitButton>
            )
          }
        </form.Subscribe>

      </form>
    </div>
  )
}

export default CreateSubjectForm