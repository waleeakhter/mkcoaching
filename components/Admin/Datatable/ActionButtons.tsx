import Link from 'next/link'
import { Button } from 'primereact/button'
import React from 'react'
import { actionButtons } from './Datatable';

type Props = {
    rowData: { quantity: number, _id: string, status: "" },
    prevProps: actionButtons,
}
const ActionButtons = ({ rowData, prevProps }: Props) => {
    return (

        <>
            <div className='flex justify-center text-center w-full'>
                <span className="p-buttonset">
                    {!prevProps.hideEditBtn && <Link href={`/admin/${prevProps.targetRoute}/${rowData._id}/edit`}  >
                        < Button icon="pi pi-file-edit" tooltip='Edit Product' tooltipOptions={{ position: 'bottom' }} />
                    </Link>}
                    {!prevProps.hideDeleteBtn && <Button icon="pi pi-trash" tooltip='Delete Product' className='btn-delete' tooltipOptions={{ position: 'bottom' }} />}
                </span>
            </div>
        </>
    )
}

export default ActionButtons