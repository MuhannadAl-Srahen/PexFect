import type { ChallengeSubmission } from '../challenge'
import { useForm } from '@tanstack/react-form'







export const useSubmissionForm = (
  initialData: Partial<ChallengeSubmission>,
  onSubmit: (data: ChallengeSubmission) => Promise<void>
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
