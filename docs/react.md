---
sidebar_position: 15
---

# React

## dnd-kit

```typescript
import React, { useRef, useState } from 'react'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { CloseCircleOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import {
  ProductImageType,
  putProductImages,
} from '../network/endpoints/products'
import { cdnHostWithoutContainer } from '../constants/network'

const SortableItem: React.FC<{
  id: string
  onDelete: (id: string) => void
}> = ({ id, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className='group relative cursor-move rounded-lg border border-solid border-gray-200 bg-white p-1'>
        <img src={id} alt='' className='h-20 w-20 object-contain' />
        <CloseCircleOutlined
          onClick={() => onDelete(id)}
          className='absolute -right-1 -top-1 z-10 cursor-pointer bg-white text-rose-500 opacity-0 transition-opacity group-hover:opacity-80'
        />
      </div>
    </div>
  )
}

const UploadButton: React.FC<{
  multiple?: boolean
  imageType: ProductImageType
  addImages: (images: string[]) => void
}> = ({ imageType, multiple, addImages }) => {
  const [messageApi, contextHolder] = message.useMessage()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleUploadImage = () => {
    const files = fileInputRef.current?.files
    if (!files || files.length === 0) return

    setLoading(true)
    putProductImages(files, imageType)
      .then((res) => res.json())
      .then(
        (data: {
          success: boolean
          data: string[] | null
          message: string
        }) => {
          if (!data.success || !data.data) {
            throw new Error('上傳失敗')
          }
          messageApi.success('成功')
          addImages(data.data.map((v) => cdnHostWithoutContainer + v))
        }
      )
      .catch((err: unknown) => {
        console.error(err)
        if (err instanceof Error) {
          messageApi.error(err.message)
        } else {
          messageApi.error('上傳失敗')
        }
      })
      .finally(() => {
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
        setLoading(false)
      })
  }

  return (
    <div>
      {contextHolder}
      <input
        className='!hidden'
        ref={fileInputRef}
        type='file'
        multiple={multiple}
        accept='image/jpeg, image/png, image/webp'
        onChange={handleUploadImage}
      />
      <Button
        size='small'
        icon={<UploadOutlined />}
        onClick={() => fileInputRef.current?.click()}
        loading={loading}
      >
        上傳
      </Button>
    </div>
  )
}

/**
 * 上傳圖片 Drag and drop image grid
 * @param value For antd form
 * @param onChange For antd form
 */
export const ImageSortableGrid: React.FC<{
  imageType: ProductImageType
  className?: string
  value?: string[]
  onChange?: (value: string[]) => void
  multiple?: boolean
}> = ({
  imageType,
  className,
  value = [],
  onChange = () => {},
  multiple = false,
}) => {
  // const [items, setItems] = useState([])
  const [items, setItems] = [value, onChange]

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // For sortable item clicks to work
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e
    if (over?.id && active.id !== over.id) {
      const oldIndex = items.indexOf(active.id as string)
      const newIndex = items.indexOf(over.id as string)
      setItems(arrayMove(items, oldIndex, newIndex))
    }
  }

  const handleDelete = (id: string) => {
    const newItems = items.filter((v) => v !== id)
    setItems(newItems)
  }

  return (
    <>
      <UploadButton
        multiple={multiple}
        addImages={(images: string[]) => {
          if (multiple) {
            setItems([...items, ...images])
          } else {
            setItems(images)
          }
        }}
        imageType={imageType}
      />

      <div className={`flex flex-wrap gap-2 ${className}`}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={rectSortingStrategy}>
            {items.map((item) => (
              <SortableItem key={item} id={item} onDelete={handleDelete} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </>
  )
}
```

```typescript
const putProductImages = async (
  files: FileList,
  type: ProductImageType,
  productId?: number
) => {
  // Fill formData
  const formData = new FormData()
  for (const file of files) {
    formData.append('Files', file, file.name)
  }
  formData.append('imageType', type.toString())
  if (productId) {
    formData.append('productId', productId.toString())
  }

  // Request
  return fetch(`${productApiHost}Product/images`, {
    method: 'PUT',
    body: formData,
    headers: {
			// 千萬不要加 'Content-Type': 'multipart/form'
      'x-api-key': productApiKey,
    },
  })
}
```

### Click Not Working

[Question: Respond to a click on the dragable item · Issue #591 · clauderic/dnd-kit (github.com)](https://github.com/clauderic/dnd-kit/issues/591)

Click not working on draggable item.

Solution is to add activationConstraint.

```js
const sensors = useSensors(
  useSensor(PointerSensor, {
    activationConstraint: {
      distance: 8,
    },
  })
)
```
