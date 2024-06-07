import { Description, Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react'
import { Button } from 'antd';

const ReasonRejectModal = ({ isOpen, setIsOpen, item, handleStatus }) => {
  // console.log(item)
  return (
    <>
      {/* disabled={item?.status === 'Approved' || item?.status ==='Rejected'}  */}
      <button

        className='disabled:cursor-not-allowed text-gray-500 transition-colors duration-200   hover:text-yellow-500 focus:outline-none' onClick={() => setIsOpen(true)}>    <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='w-5 h-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636'
          />
        </svg>
      </button>


      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 transition">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 bg-gray-200 p-12 rounded-md">
            <DialogTitle className="font-bold">Deactivate account</DialogTitle>
            <Description>This will permanently deactivate your account</Description>
            <p>Are you sure you want to deactivate your account? All of your data will be permanently removed.</p>
            <div className="flex justify-center gap-4">
              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={() => {
                handleStatus(item?._id, item?.status, 'Rejected');
                setIsOpen(false);
              }}  >Save</Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>


    </>
  )
}

export default ReasonRejectModal;