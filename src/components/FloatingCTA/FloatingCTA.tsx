 import {FaTelegramPlane } from 'react-icons/fa'
 import './FloatingCTA.scss'

 function FloatingCTA() {
   return (
     <div className='floating-cta'>

       {/* Telegram */}
       <a
         href='https://t.me/podushkaodeilo'
         target='_blank'
         rel='noreferrer'
         className='cta-btn telegram'
       >
         <FaTelegramPlane />
       </a>

     </div>
   )
 }

 export default FloatingCTA