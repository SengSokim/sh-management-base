import { success } from "@/lib/helper"
import { createClient } from "@/utils/supabase/client"
import dayjs from "dayjs"
import { useState } from "react"

export const useInvoices = () => {
    const [invoices, setInvoices] = useState<any>([])
    const supabase = createClient()
    let now:any = dayjs()
    const getInvoices = async () => {
        const filter = null
        const {
            data: { user },
          } = await supabase.auth.getUser()
        let query = await supabase
        .from('invoices')
        .select(`
            id,
            status,
            customers (
                name,
                email,
                phone,
                address
            ),
            products (
                name,
                description,
                unit_price,
                quantity,
                total
            ),
            invoice_number,
            shipping_fees,
            tax_charges,
            sub_total,
            grand_total,
            created_at,
            paid_at
        `)
        .eq('admin_id',user?.id)
        .order('id', { ascending: false })

        if(filter) {
            query = query.eq('name',filter)
        }

        const {data:invoices, error} = await query
        if(error) {
            return 'Cannot get data for invoices'
        }
        if(invoices){
            setInvoices(invoices)
        }
    }
    interface productItem {
        name: string
        quantity: number
        unit_price: any
        total: string
        description: string
        invoice_id?: string // Make it optional if not all objects will have this property
      }
    const addInvoice = async (customer_id:number,shipping_fees:number, status:string,productItems:Array<any>) => {
       
        if(status == 'unpaid') {
            now = null
        }
        const newProductItems: productItem[] = productItems.map((item) => {
            return {
                name: item.product_name,
                quantity: item.product_quantity,
                unit_price: parseFloat(item.product_price).toFixed(2),
                total: (parseFloat(item.product_quantity) * parseFloat(item.product_price)).toFixed(2),
                description: item.product_description
                
            }
        })
        const sub_total = newProductItems.reduce((sum, item) => sum + parseFloat(item.total), 0)
        const tax_charges = sub_total * 0.1
        const cost_of_shipping = shipping_fees ? shipping_fees : 0
        const grand_total = sub_total + tax_charges + cost_of_shipping
        const { data: invoiceData, error: invoiceError } = await supabase
        .rpc('handle_new_invoice', {
            p_customer_id: customer_id,
            p_status: status,
            p_shipping_fees: cost_of_shipping,
            p_paid_at: now,
            p_tax_charges: tax_charges,
            p_sub_total: sub_total,
            p_grand_total: grand_total,
            p_product_items: newProductItems
        })
        if (invoiceError) {
            console.error('Error inserting invoice:', invoiceError)
            return
        }

        const invoiceId = invoiceData

        if (!invoiceId) {
            console.error('No invoice ID returned from insert')
            return
        }

        const { data: invoices, error: fetchError } = await supabase
            .from('invoices')
            .select(`
                id,
                status,
                customers (
                    name,
                    email,
                    phone,
                    address
                ),
                products (
                    name,
                    description,
                    unit_price,
                    quantity,
                    total
                ),
                invoice_number,
                shipping_fees,
                tax_charges,
                sub_total,
                grand_total,
                created_at,
                paid_at
            `)
            .eq('id', invoiceId)

        if (fetchError) {
            console.error('Error fetching invoice:', fetchError)
            return
        }

        return success(invoices)
    }
            
    const updateInvoice = async(id:Number,client_id:number,status:string) => {
       
        const { data, error } = await supabase
        .from('invoices')
        .update({ 
            client_id: client_id, 
            status: status,
        })
        .eq('id', id)
        .select()

        if(error) {
            return error
        }

        return success()
                
    }
    const deleteInvoice = async(id:Number) => {
        
        const { error } = await supabase
        .from('invoices')
        .delete()
        .eq('id', id)

        if(error) {
            return error
        }

        return success()
        
    }
    const updateStatus = async(id:Number) => {
        

        const { data, error } = await supabase
        .from('invoices')
        .update({ 
            status: 'paid',
            paid_at: now
        })
        .eq('id', id)
        .select()

        if(error) {
            return error
        }

        return success()
    }
    return {
        invoices,
        setInvoices,
        getInvoices,
        addInvoice,
        updateInvoice,
        deleteInvoice,
        updateStatus
    }
}