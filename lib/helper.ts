import React from 'react'
import dayjs from 'dayjs';
export function formatCurrency(num:number) {
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return USDollar.format(num)
}
export function formatDate( dateString:any,format:string='YYYY-MM-DD' ) { 
    if(!dayjs(dateString).isValid()){
        return 'N/A';
    }
    const formattedDate = dayjs(dateString).format(format)

    
    return formattedDate;
}

