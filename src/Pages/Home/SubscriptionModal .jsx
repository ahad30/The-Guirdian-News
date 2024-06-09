import { Description, Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react'
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const SubscriptionModal = ({ isOpen, setIsOpen , closeModal }) => {
  return (
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
            <DialogTitle className="font-bold text-center">Subscribe Now</DialogTitle>
            <Description className="text-center">
              Subscribe to our guridian news  now to get the latest updates.
            </Description>
            <div className="flex justify-center gap-4">
              <Link to={`/subscription`}><Button>Subscribe</Button></Link>
              <Button onClick={closeModal}>Cancel</Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SubscriptionModal;
