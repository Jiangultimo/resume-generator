import React, { useState, useEffect, memo } from 'react'
import Loading from '@/components/Loading'
import styles from '@/styles/components/UploadAvatar.module.css'

export interface UploadAvatarProps {
  style?: React.CSSProperties
}

const nilStyle: React.CSSProperties = {}
const UploadAvatar: React.FC<UploadAvatarProps> = (props) => {
  const { style = nilStyle } = props
  const [imageFile, setImageFile] = useState<File>()
  const [uploadRequestFlag, setUploadRequestFlag] = useState(false)

  const onInputChange = (e: React.ChangeEvent) => {
    const input = e.currentTarget as HTMLInputElement
    if (input.files) {
      const file = input.files[0]
      setImageFile(file)
      setUploadRequestFlag(true)
    }
  }

  useEffect(() => {
    if (uploadRequestFlag && imageFile) {
      const formData = new FormData()
      formData.append("avatar", imageFile)
      fetch("http://localhost:3000/api/upload-avatar", {
        method: "POST",
        body: formData,
      })
        .then(async (res) => {
          if (res.ok) {
            const response = await res.json()
            console.log(`upload avatar result: ${response.success}`)
          }
          setUploadRequestFlag(false)
        })
        .catch((err) => {
          console.error(`upload avatar failed: ${err}`)
          setUploadRequestFlag(false)
        })
    }
  }, [uploadRequestFlag, imageFile])

  return (
    <>
      {uploadRequestFlag && (
        <Loading className={styles["image-upload-loading"]} />
      )}
      <div className={styles["image-input-group"]} style={style}>
        <span className={styles["image-input-icon"]}>+</span>
        <input
          type="file"
          accept="image/jpg, image/png"
          className={styles["image-input"]}
          onChange={onInputChange}
        />
      </div>
    </>
  )
}

export default memo(UploadAvatar)
