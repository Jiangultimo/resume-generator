import React, { memo } from 'react'
import Timeline from '@/components/Timeline'

interface Props {
  experience: ExperienceObject
}

const Experience: React.FC<Props> = (props) => {
  return <Timeline {...props} />
}

export default memo(Experience)
