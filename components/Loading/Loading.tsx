import React, { memo } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface LoadingProps {
  style?: React.CSSProperties
  className?: string
}

const Loading: React.FC<LoadingProps> = ({ style, className }) => {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center',
        'bg-gradient-to-br from-black/80 to-gray-900/90 backdrop-blur-lg',
        className
      )}
      style={style}
    >
      <div className="flex flex-col items-center gap-6 animate-in fade-in duration-500">
        {/* 旋转加载图标 */}
        <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />

        {/* 加载文本 */}
        <div className="text-white text-lg font-medium tracking-wide animate-pulse">
          Loading...
        </div>

        {/* 加载点动画 */}
        <div className="flex gap-2">
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  )
}

export default memo(Loading)
