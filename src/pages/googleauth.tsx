import { useYoutubeContext } from '@/hooks/urlcontext'
import API from '@/utils/api.config'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function Googleauth() {
  const {Credentails}=useYoutubeContext()
  

 
  
  return (
    <div>googleauth</div>
  )
}
