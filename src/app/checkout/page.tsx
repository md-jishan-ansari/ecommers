
import Container from '@/src/components/Container'
import React from 'react'
import CheckoutClient from './CheckoutClient'
import FormWrap from '@/src/components/FormWrap'

const CheckOut = () => {
  return (

      <Container>
          <FormWrap>
            <CheckoutClient />
          </FormWrap>
      </Container>

  )
}

export default CheckOut
