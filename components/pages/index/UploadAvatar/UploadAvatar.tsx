import React, { useState, useEffect, memo } from 'react'
import { Upload, CheckCircle, AlertCircle } from 'lucide-react'
import Loading from '@/components/Loading'
import styles from '@/styles/components/UploadAvatar.module.css'

export interface UploadAvatarProps {
  style?: React.CSSProperties
}

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error'

const nilStyle: React.CSSProperties = {}
const isProduction = process.env.NODE_ENV === 'production'

const UploadAvatar: React.FC<UploadAvatarProps> = (props) => {
  const { style = nilStyle } = props
  const [imageFile, setImageFile] = useState<File>()
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle')
  const [isDragOver, setIsDragOver] = useState(false)

  useEffect(() => {
    // 生产环境跳过上传逻辑
    if (isProduction) return

    if (uploadStatus === 'uploading' && imageFile) {
      const formData = new FormData()
      formData.append("avatar", imageFile)
      fetch("/api/upload-avatar", {
        method: "POST",
        body: formData,
      })
        .then(async (res) => {
          if (res.ok) {
            const response = await res.json()
            setUploadStatus('success')
            // Reset to idle after 2 seconds
            setTimeout(() => setUploadStatus('idle'), 2000)
          } else {
            setUploadStatus('error')
            setTimeout(() => setUploadStatus('idle'), 3000)
          }
        })
        .catch((err) => {
          console.error(`upload avatar failed: ${err}`)
          setUploadStatus('error')
          setTimeout(() => setUploadStatus('idle'), 3000)
        })
    }
  }, [uploadStatus, imageFile])

  // 生产环境不渲染上传组件
  if (isProduction) {
    return null
  }

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setImageFile(file)
      setUploadStatus('uploading')
    }
  }

  const onInputChange = (e: React.ChangeEvent) => {
    const input = e.currentTarget as HTMLInputElement
    if (input.files) {
      const file = input.files[0]
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = e.dataTransfer.files
    const file = files[0]
    handleFileSelect(file)
  }

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case 'uploading':
        return <Loading className={styles["image-upload-loading"]} />
      case 'success':
        return <CheckCircle className="text-green-400 w-6 h-6" />
      case 'error':
        return <AlertCircle className="text-red-400 w-6 h-6" />
      default:
        return (
          <Upload className={`text-white w-12 h-12 transition-all duration-300 ${
            isDragOver 
              ? 'opacity-100 scale-110' 
              : 'opacity-0 group-hover:opacity-100 hover:scale-105'
          }`} />
        )
    }
  }

  return (
    <div
      className={`${styles["image-input-group"]} ${
        isDragOver ? styles["drag-over"] || 'ring-2 ring-white/50' : ''
      }`}
      style={style}
      data-upload-avatar
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {getStatusIcon()}
      <input
        type="file"
        accept="image/jpg, image/png"
        className={styles["image-input"]}
        onChange={onInputChange}
        disabled={uploadStatus === 'uploading'}
      />
    </div>
  )
}

export default memo(UploadAvatar)
