'use client'

import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { GripVertical } from 'lucide-react'
import { motion } from 'framer-motion'

interface DraggableSkillProps {
  skill: string
  index: number
  moveSkill: (dragIndex: number, hoverIndex: number) => void
  isDragging?: boolean
}

export const DraggableSkill: React.FC<DraggableSkillProps> = ({
  skill,
  index,
  moveSkill,
  isDragging = false
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ index, skill }))
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
        moveSkill(dragIndex, hoverIndex)
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
      <div className="flex items-center gap-2">
        <GripVertical 
          className={`w-4 h-4 text-gray-400 transition-opacity ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`} 
        />
        <Badge 
          variant="secondary" 
          className="transition-all duration-200 hover:scale-105"
        >
          {skill}
        </Badge>
      </div>
    </div>
  )
}

export default DraggableSkill