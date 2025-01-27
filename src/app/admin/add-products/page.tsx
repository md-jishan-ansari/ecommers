
import getCurrentUser from '@/src/actions/getCurrentUser';
import Container from '@/src/components/Container';
import NullData from '@/src/components/NullData';
import React from 'react'
import AddProductForm from './AddProductForm';
import FormWrap from '@/src/components/FormWrap';

const AddProducts = async () => {
  const currentUser = await getCurrentUser();

  if(!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Access denied" />
  }

  return (
    <div className=''>
      <Container>
        <FormWrap>
          <AddProductForm />
        </FormWrap>
      </Container>
    </div>
  )
}

export default AddProducts
