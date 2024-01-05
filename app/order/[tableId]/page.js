'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import Billing from '../page'


const OrderPage = ({ params }) => {
    const router=useRouter()
    const { tableId } = params;

    return (
        // <div>Hello I am {tableId}</div>
        <Billing tableId={tableId} />
        )
}

export default OrderPage