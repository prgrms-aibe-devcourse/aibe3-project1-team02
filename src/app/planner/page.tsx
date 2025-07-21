import { Suspense } from 'react'
import PlannerPage from './PlannerPage'

export default function Page() {
    return (
        <Suspense fallback={<div>로딩 중...</div>}>
            <PlannerPage />
        </Suspense>
    )
}
