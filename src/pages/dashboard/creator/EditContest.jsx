import React from 'react';
import { useParams, useNavigate } from 'react-router';
// import { ContestForm } from '../../../components/features/ContestForm';
import { MOCK_CONTESTS } from '../../../utils/mockData';
import  Button  from '../../../components/ui/Button';
import { Textarea } from '../../../components/ui/Textarea';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { Select } from '../../../components/ui/Select';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { Input } from '../../../components/ui/Input';
export function EditContest() {
 const {
    id
 } = useParams();
  console.log(id)
  const navigate = useNavigate();

 const axiosSecure = useAxiosSecure()
 
      const { data: contest = [] } = useQuery({
       queryKey: ["contests",id],
       queryFn: async () => {
         const result = await axiosSecure.get(
           `http://localhost:5000/create-contest/${id}`
         );
         return result.data;
       },
      });

  // const contest = MOCK_CONTESTS.find(c => c.id === id);
  if (!contest) return <div>Contest not found</div>;

  const contestTypes = [{
    value: 'Image Design',
    label: 'Image Design'
  }, {
    value: 'Article Writing',
    label: 'Article Writing'
  }, {
    value: 'Business Idea',
    label: 'Business Idea'
  }, {
    value: 'Gaming Review',
    label: 'Gaming Review'
    }];

 const {
    data,
    reset: mutationReset,
    mutateAsync,
  } = useMutation({
    mutationFn: async (payload) =>
      await axios.patch(`http://localhost:5000/create-contest/${id}`, payload),
    onSuccess: (data) => {
      console.log(data);
      mutationReset();
    },
    onError: (error) => {
      console.log(error);
    },
    onMutate: (payload) => {
      console.log("i will post it", payload);
    },
    retry: 3,
  });

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    // Simulate update

    await mutateAsync(data);
    reset();

    console.log('Updated:', data);
    navigate('/dashboard/creator/contests');
  };
  return <div className="max-w-4xl mx-auto">
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-white">Edit Contest</h1>
      <p className="text-slate-400">Update contest details.</p>
    </div>

    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:p-8">
      {/* <ContestForm initialData={contest} onSubmit={handleSubmit} /> */}

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
            label="Contest Name"
          defaultValue={contest.name}
              {...register("name", {
                required: "Name is required",
              })}
              error={errors.name?.message}
            />

            <Select
            label="Contest Type"
            defaultValue={contest.type}
              options={contestTypes}
              {...register("type")}
            />
          </div>

          <Input
          label="Cover Image URL"
          
            type="file"
            placeholder="https://..."
            {...register("image")}
            error={errors.image?.message}
          />

          <Textarea
          label="Description"
        defaultValue={contest.description}
            {...register("description", {
              required: "Description is required",
            })}
            error={errors.description?.message}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
            label="Entry Fee ($)"
            defaultValue={contest.price}
              type="number"
              {...register("price", {
                required: "Price is required",
                min: 0,
              })}
              error={errors.price?.message}
            />

            <Input
            label="Prize Money ($)"
            defaultValue={contest.prizeMoney}
              type="number"
              {...register("prizeMoney", {
                required: "Prize money is required",
                min: 0,
              })}
              error={errors.prizeMoney?.message}
            />

            <div className="w-full">
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Deadline
              </label>
              <Controller
              control={control}
              defaultValue={contest.deadline}
                name="deadline"
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    minDate={new Date()}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                  />
                )}
              />
            </div>
          </div>

          <Textarea
          label="Task Instructions"
          defaultValue={contest.taskInstruction}
            placeholder="Explain what participants need to do..."
            {...register("taskInstruction", {
              required: "Instructions are required",
            })}
            error={errors.taskInstruction?.message}
            className="min-h-37.5"
          />

          <div className="pt-4">
            <Button
              type="submit"
              // isLoading={isLoading}
              className="w-full md:w-auto">
              {data ? "Update Contest" : "Create Contest"}
            </Button>
          </div>
        </form>

    </div>
  </div>;
}