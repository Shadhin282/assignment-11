import React, { useState } from "react";
import Button from "../../ui/Button";
import { Input } from "../../ui/Input";
import Modal from "../../ui/Modal";
import { useForm } from "react-hook-form";
import { CreditCard, Lock, CheckCircle } from "lucide-react";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const PaymentModal = ({ isOpen, onClose, contest, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure()

  const onSubmit = async (data) => {
    const { name } = data;

    const paymentInfo = {
      contestId : contest._id,
      contestName: contest.name,
      participatorName: name,
      image: contest.bannerImage,
      contestPrize : contest.prizeMoney,
      
      payment: 'Done'
    }
    
    setIsProcessing(true);
    // Simulate payment processing
    const result = await axiosSecure.post(`http://localhost:5000/payment`, paymentInfo);
    console.log(result.data.url);
    //  await new Promise(resolve => setTimeout(resolve, 2000));
    
    
    setIsProcessing(false);
    
    setIsSuccess(true);
    // Wait a moment to show success state before closing
    setTimeout(() => {
      onSuccess();
      setIsSuccess(false);
    }, 1500);
   
  };
  
  if (isSuccess) {
    return (
      <Modal isOpen={isOpen} onClose={() => {}} title="Payment Successful">
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-500 mb-6">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">You're In!</h3>
          <p className="text-slate-400">
            Payment confirmed. Good luck with the contest!
          </p>
        </div>
      </Modal>
    );
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Join ${contest.name}`}>
      <div className="mb-6 bg-slate-800/50 p-4 rounded-lg border border-slate-700">
        <div className="flex justify-between items-center mb-2">
          <span className="text-slate-400">Entry Fee</span>
          <span className="text-xl font-bold text-white">${contest.price}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-500">Prize Pool</span>
          <span className="text-yellow-500 font-medium">
            ${contest.prizeMoney}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Cardholder Name"
          placeholder="John Doe"
          {...register("name", {
            required: "Name is required",
          })}
          error={errors.name?.message}
        />

        <Input
          label="Card Number"
          placeholder="0000 0000 0000 0000"
          {...register("cardNumber", {
            required: "Card number is required",
            pattern: {
              value: /^\d{16}$/,
              message: "Invalid card number",
            },
          })}
          error={errors.cardNumber?.message}
          icon={<CreditCard className="w-5 h-5 text-slate-500" />}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Expiry Date"
            placeholder="MM/YY"
            {...register("expiry", {
              required: "Expiry is required",
            })}
            error={errors.expiry?.message}
          />
          <Input
            label="CVC"
            placeholder="123"
            type="password"
            {...register("cvc", {
              required: "CVC is required",
              pattern: {
                value: /^\d{3,4}$/,
                message: "Invalid CVC",
              },
            })}
            error={errors.cvc?.message}
            icon={<Lock className="w-4 h-4 text-slate-500" />}
          />
        </div>

        <div className="pt-4">
          <Button type="submit" className="w-full" isLoading={isProcessing}>
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
