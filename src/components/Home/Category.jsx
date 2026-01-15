import React from 'react'
import CategoryShowcase from '../CategoryShowcase';

export default async function Category() {
     const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/client/v1/categories`);
        const res = await response.json();
        const data=res.data || [];
  return (
   <CategoryShowcase  categories={data}/>
  )
}
