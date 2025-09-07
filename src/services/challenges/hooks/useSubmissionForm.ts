import type { ChallengeSubmission } from '@/types'
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
      screenshot: initialData.screenshot || null,
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value as ChallengeSubmission)
    },
  })

  return form
}
