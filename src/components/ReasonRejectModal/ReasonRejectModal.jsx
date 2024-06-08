import { Description, Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react'
import { Button } from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const ReasonRejectModal = ({ isOpen, setIsOpen, item, handleStatus }) => {
  // console.log(item)
  const { register, handleSubmit, reset, } = useForm();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    console.log(data)
    const articleItem = {
      title: data?.description,
      userEmail: item?.user.email,
      userName: item?.user?.name,
      articleId: item?._id
    }
    // 
    const articleRes = await axiosPublic.post('/addFeedback', articleItem);
    console.log(articleRes.data)
    if (articleRes.data.insertedId) {
      // show success popup
      reset()   
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: `Reason Submitted to user.`,
        showConfirmButton: false,
        timer: 1500
      });
      handleStatus(item?._id, item?.status, 'Rejected');
      setIsOpen(false);
    }
  };

  return (
    <>

      <Transition
        show={isOpen}
        enter="duration-200 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-300 ease-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >


        <Dialog open={isOpen} onClose={() => setIsOpen(false)}
          className="relative z-50 transition">
          <div className="fixed inset-0 flex w-screen items-center justify-center">
            <DialogPanel className="w-full max-w-3xl space-y-4 bg-gray-300 p-12 rounded-md">
              <DialogTitle className="font-bold text-center text-black">Rejection Reason</DialogTitle>
              {/* <Description>This will permanently deactivate your account</Description> */}

              <form onSubmit={handleSubmit(onSubmit)} className=''>
                <div className="form-control mb-8">
                  <label className="label">
                    <span className="font-bold mb-3 text-black">Title</span>
                  </label>
                  <input type="text" required {...register("description")} placeholder="Article Title" className="input rounded-lg border-gray-200 p-3 text-sm w-full" />
                </div>
                <div className="flex justify-center gap-4">
                  <Button className='bg-red-500 text-white' htmlType='button' onClick={() => setIsOpen(false)}>Cancel</Button>

                  <button className='bg-green-500 text-white px-3 py-1 rounded-md' type="submit">Send</button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </Dialog>
      </Transition>

    </>
  )
}

export default ReasonRejectModal;