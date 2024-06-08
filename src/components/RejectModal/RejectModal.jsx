import { Description, Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react'
import { Button } from 'antd';
import { useState } from 'react'
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';


const RejectModal = ({isOpen, setIsOpen ,item}) => {
 console.log(item)
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
 
  const {
    data: reason = [],
    isLoading,
  } = useQuery({
    queryKey: ['myArticleReason', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/myArticleReason/${user?.email}/${item._id}`)
      return data
    },
  })
  console.log(reason);

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
          <DialogPanel className="w-full max-w-lg space-y-4 bg-gray-200 p-12 rounded-md">
            <DialogTitle className="font-bold text-center">Reason Details</DialogTitle>
            {
              reason.length === 0 && <div className='text-center'>
                <p className='text-red-500'>No reason found</p>
              </div>
            }
           {reason.map(item => (
              <>  
              <div className='border-black p-4 border rounded-md'>
                <Description key={item?._id}>{item?.title}</Description>
              </div>
           </>
           ))}
            
            <div className="flex justify-center gap-4">
              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
   
  </>
  )
}

export default RejectModal