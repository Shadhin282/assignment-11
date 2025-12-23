import React, { useState } from 'react';
import { CheckCircle, Link as LinkIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import { Textarea } from '../../ui/Textarea';
import axios from 'axios';
import useAuth from '../../../authentication/context/useAuth';


const TaskSubmissionModal = ({
  isOpen,
  onClose,
  contest,
}) => {
  
  const { user } = useAuth()
  
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm();
  const onSubmit = async (task) => {
    
    const submitInfo = {
      
    contestId : contest._id ,               
    user_email : user.email,
      taskLink: task.taskLink,
      prizeMoney: contest.prizeMoney,
    image : contest.bannerImage,
    submittedAt : new Date().getTimezoneOffset() ,
    status : "Under Review"
           
    }

    const { data } = await axios.post(
      `http://localhost:5000/submissions`,
      submitInfo
    )
    console.log(data)
    setClose(true)
  };


  return <Modal isOpen={isOpen} onClose={onClose}  title="Submit Your Work">
    <div className="mb-6">
      <h3 className="text-sm font-medium text-slate-300 mb-2">
        Task Instructions:
      </h3>
      <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 text-sm text-slate-400">
        {contest?.taskInstruction}
      </div>
    </div>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Textarea label="Submission Details / Links" placeholder="Paste your Google Drive, Dropbox, or GitHub link here..." {...register('taskLink', {
        required: 'Submission link/details are required',
        minLength: {
          value: 10,
          message: 'Please provide more details'
        }
      })} error={errors.taskLink?.message} className="min-h-37.5" />

      <div className="bg-blue-900/20 border border-blue-900/50 rounded-lg p-4 flex items-start">
        <LinkIcon className="w-5 h-5 text-blue-400 mt-0.5 mr-3 shrink-0" />
        <p className="text-sm text-blue-200/80">
          Make sure your link is publicly accessible. Once submitted, you
          cannot edit your submission.
        </p>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="ghost"  onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" >
          Submit Task
        </Button>
      </div>
    </form>
  </Modal>;
}

export default TaskSubmissionModal;