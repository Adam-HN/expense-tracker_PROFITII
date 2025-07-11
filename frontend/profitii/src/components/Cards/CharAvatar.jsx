import { getInitials } from '../../utils/helper'
import React from 'react'

const CharAvatar = ({fullName, width, height, style}) => {
  return (
    <div className={`${width || 'w-12'} ${height || 'w-12'} ${style || ''} 
        flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-100 `}
    >
      {getInitials(fullName)}
    </div>
  )
}

export default CharAvatar