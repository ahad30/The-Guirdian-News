import { Description, Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react'
import { Button } from 'antd';
import { useState } from 'react'


const RejectModal = ({isOpen, setIsOpen}) => {


  return (
    <>
 
    <Button className='rounded-full bg-red-400  px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white' onClick={() => setIsOpen(true)}> Reason   
    </Button>

    <Transition
      show={isOpen}
      enter="duration-200 ease-out"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="duration-300 ease-out"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Dialog onClose={() => setIsOpen(false)} className="relative z-50 transition">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 bg-gray-200 p-12 rounded-md">
            <DialogTitle className="font-bold">Deactivate account</DialogTitle>
            <Description>This will permanently deactivate your account</Description>
            <p>Are you sure you want to deactivate your account? All of your data will be permanently removed.</p>
            <div className="flex justify-center gap-4">
              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsOpen(false)}>Deactivate</Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
   
  </>
  )
}

export default RejectModal