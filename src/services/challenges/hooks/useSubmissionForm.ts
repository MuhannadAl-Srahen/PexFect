import { useForm } from '@tanstack/react-form'

export interface SubmissionFormData {
  title: string
  githubUrl: string
  liveUrl: string
  description: string
}

export const useSubmissionForm = (
  initialData: Partial<SubmissionFormData>,
  onSubmit: (data: SubmissionFormData) => Promise<void>
) => {
  const form = useForm({
    defaultValues: {
      title: initialData.title || '',
      githubUrl: initialData.githubUrl || '',
      liveUrl: initialData.liveUrl || '',
      description: initialData.description || '',
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value)
    },
  })

  return form
}
