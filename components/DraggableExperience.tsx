'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { GripVertical, Calendar, MapPin } from 'lucide-react'

interface ExperienceItem {
  id: string
  title: string
  company: string
  location: string
  duration: string
  description: string[]
  skills: string[]
}

interface DraggableExperienceProps {
  experience: ExperienceItem
  index: number
  moveExperience: (dragIndex: number, hoverIndex: number) => void
  isDragging?: boolean
}

export const DraggableExperience: React.FC<DraggableExperienceProps> = ({
  experience,
  index,
  moveExperience,
  isDragging = false
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ index, experience }))
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    try {
      const draggedData = JSON.parse(e.dataTransfer.getData('text/plain'))
      const dragIndex = draggedData.index
      const hoverIndex = index

      if (dragIndex !== hoverIndex) {
        moveExperience(dragIndex, hoverIndex)
      }
    } catch (error) {
      console.error('Error parsing drag data:', error)
    }
  }

  return (
    <div
      className={`
        relative group cursor-move
        ${isDragging ? 'z-50 opacity-50 scale-95' : 'z-auto'}
        transition-all duration-200
      `}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="transition-all duration-200 hover:shadow-md">
        <CardHeader className="relative">
          <div className="absolute top-4 left-4">
            <GripVertical 
              className={`w-4 h-4 text-gray-400 transition-opacity ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`} 
            />
          </div>
          <div className="ml-8">
            <CardTitle className="text-xl font-bold text-gray-800">
              {experience.title}
            </CardTitle>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
              <h3 className="text-lg font-semibold text-blue-600">
                {experience.company}
              </h3>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {experience.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {experience.duration}
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="ml-8">
          <ul className="space-y-2 mb-4">
            {experience.description.map((item, idx) => (
              <li key={idx} className="text-gray-700 leading-relaxed">
                • {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {experience.skills.map((skill, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DraggableExperience