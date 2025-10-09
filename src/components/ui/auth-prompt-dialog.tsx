import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Heart } from 'lucide-react'

interface AuthPromptDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSignIn: () => void
}

export function AuthPromptDialog({
  open,
  onOpenChange,
  onSignIn,
}: AuthPromptDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className='max-w-md'>
        <AlertDialogHeader>
          <div className='flex items-center gap-3 mb-2'>
            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary/10'>
              <Heart className='h-6 w-6 text-primary' />
            </div>
            <AlertDialogTitle className='text-2xl'>
              Sign in to save challenges
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className='text-base text-muted-foreground'>
            Create an account or sign in to save your favorite challenges and
            track your progress. It's quick and free!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='gap-2 sm:gap-0'>
          <AlertDialogAction
            onClick={onSignIn}
            className='bg-primary hover:bg-primary/90'
          >
            Sign In
          </AlertDialogAction>
          <AlertDialogAction
            variant='outline'
            onClick={() => onOpenChange(false)}
          >
            Maybe Later
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
