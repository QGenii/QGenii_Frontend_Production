import React from 'react'

import Check from '../../assets/assets/FirstLinkPage/Check.svg'

const PaymentSuccessful = () => {
  return (
    <div className='h-screen w-full py-[6rem]'>


      <div className='flex flex-col justify-center items-center '>
        <h4 className='text-black font-poppins text-[2.25rem] not-italic font-semibold leading-normal capitalize'>Payment Successful</h4>
        <div className=''>
          <img src={Check} alt="Sign" className='w-[18.3rem] h-[18.3rem]' />
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccessful