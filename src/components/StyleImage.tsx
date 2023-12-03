import React from 'react'

const StyleImage: React.FC<{ src: string, style?: React.CSSProperties }> = ({src, style}) => {
  return (
    <div className={'flex justify-center'}>
      <img src={src} alt={''} style={style}/>
    </div>
  )
}

export default StyleImage