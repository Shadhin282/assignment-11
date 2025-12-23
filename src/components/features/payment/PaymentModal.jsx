import React, { useState } from "react";
import Button from "../../ui/Button";
import { Input } from "../../ui/Input";
import Modal from "../../ui/Modal";
import { useForm } from "react-hook-form";
import { CreditCard, Lock, CheckCircle } from "lucide-react";
import useAuth from "../../../authentication/context/useAuth";
import axios from "axios";
// import useAxiosSecure from "../../../hook/useAxiosSecure";

const PaymentModal = ({contest, isOpen, onClose}) => {
  const { user } = useAuth();
  const {
    
    handleSubmit,
    
  } = useForm();

  const onSubmit = async () => {

    const paymentInfo = {
      id: contest._id,
      name : contest.name,
      type: contest.type,
      price: contest.prizeMoney,
      description : contest.description,
      image : contest.bannerImage,
      quantity: 1,
      participator: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
    }
    const { data } = await axios.post(
      `http://localhost:5000/payment`,
      paymentInfo
    )
    window.location.assign(data.url)  


  }


  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`join ${contest.name}`}>
      <div className="mb-6 bg-slate-800/50 p-4 rounded-lg border border-slate-700">
        <div className="flex justify-between items-center mb-2">
          <span className="text-slate-400">Entry Fee</span>
          <span className="text-xl font-bold text-white">${contest.prizeMoney}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-500">Prize Pool</span>
          <span className="text-yellow-500 font-medium">
            ${contest.prizeMoney}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
       

        

        <div className="grid grid-cols-2 gap-4">
         
          
        </div>

        <div className="pt-4">
          <Button type="submit" className="w-full" >
            Pay ${contest.prizeMoney} & Join
          </Button>
          <p className="text-xs text-center text-slate-500 mt-4 flex items-center justify-center">
            <Lock className="w-3 h-3 mr-1" />
            Secure payment processing
          </p>
        </div>
      </form>
    </Modal>
  );
};

export default PaymentModal;
