import { Suspense } from 'react'
import { Dashboard } from '../components/Dashboard'
import { Loading } from '../components/Loading'

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <Dashboard />
    </Suspense>
  )
} 