// Challenge Components
export { ChallengePageHeader } from './components/ChallengePageHeader'
export { ChallengeControls } from './components/ChallengeControls'
export { ChallengeGridItem } from './components/ChallengeGridItem'
export { ChallengeListItem } from './components/ChallengeListItem'
export { ChallengeView } from './components/ChallengeView'

// Challenge Detail Components
export { ChallengeHero } from '../challenge details/ChallengeHero'
export { ChallengeOverview } from '../challenge details/ChallengeOverview'
export { ChallengeDesign } from '../challenge details/ChallengeDesign'
export { ChallengeResources } from '../challenge details/ChallengeResources'
export { ChallengeSubmission } from '../challenge details/ChallengeSubmission'

// Hooks
export { useChallengeFilters } from './hooks/useChallengeFilters'

// Data and API
export { getChallengeById, submitChallengeSolution } from './api'

// NOTE: The static `./data` file previously exported `challenges` and
// `challengeDetailData`. The app now reads challenges from the database via
// `src/lib/getChallenges.ts`. If any components still need a synchronous
// list, they should call `getChallenges()` asynchronously or use a client-side
// hook. The static data file was intentionally removed to avoid stale data.
