import type { Page } from '@/payload-types'

import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
}

export const RenderHero = (props: Page['hero']) => {
  const type = props?.type

  if (!type) return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}