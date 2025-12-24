import { useState } from "react";
import { useNavigate } from "react-router";
// import { ContestForm } from '../../../components/features/ContestForm';
import  useAuth  from "../../../authentication/context/useAuth";
// import { MOCK_CONTESTS } from '../../../utils/mockData';
import { CheckCircle, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import  Button  from "../../../components/ui/Button";
import { Input}  from "../../../components/ui/Input";
import { Textarea } from "../../../components/ui/Textarea";
import { Select } from "../../../components/ui/Select";
import axios from "axios";
import { imageUpload } from "../../../utils";

export function AddContest() {
  const { user } = useAuth();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const contestTypes = [
    {
      value: "Image Design",
      label: "Image Design",
    },
    {
      value: "Article Writing",
      label: "Article Writing",
    },
    {
      value: "Business Idea",
      label: "Business Idea",
    },
    {
      value: "Gaming Review",
      label: "Gaming Review",
    },
  ];
  if (!user) return null;

  const {
    data,
    reset: mutationReset,
    mutateAsync,
  } = useMutation({
    mutationFn: async (payload) =>
      await axios.post(`http://localhost:5000/create-contest`, payload),
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
  // } = useForm({
  //   defaultValues: {
  //     name: initialData?.name || '',
  //     image: imageProcess || '',
  //     description: initialData?.description || '',
  //     price: initialData?.price || 0,
  //     prizeMoney: initialData?.prizeMoney || 0,
  //     taskInstruction: initialData?.taskInstruction || '',
  //     type: initialData?.type || 'Image Design',
  //     deadline: initialData?.deadline ? new Date(initialData.deadline) : new Date(Date.now() + 86400000)
  //   }
  // });
  const onSubmit = async (data) => {
    const imageLink = await imageUpload(data.image[0])
    const contestInfo = {
      
name : data.name,
bannerImage : imageLink,
participants : [],
description : data.description,
      prizeMoney: data.prizeMoney,
      taskInstruction: data?.taskInstruction,
price : data.price,
type : data.type,
      deadline: data.deadline,
      creator_mail: user.email,
 status : 'pending'
    }
    // Simulate API call
    await mutateAsync(contestInfo);
    reset();
    setSuccess(true);
    setTimeout(() => {
      navigate("/dashboard/creator/contests");
    }, 2000);
    setIsLoading(false);
  };
  // if (isPending) return <Loader2></Loader2>;
  if (success) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Contest Submitted!
        </h2>
        <p className="text-slate-400 max-w-md">
          Your contest has been submitted for approval. An admin will review it
          shortly.
        </p>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Create New Contest</h1>
        <p className="text-slate-400">
          Fill in the details to launch a new challenge.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:p-8">
        {/* <ContestForm onSubmit={handleSubmit} isLoading={isLoading} /> */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Contest Name"
              {...register("name", {
                required: "Name is required",
              })}
              error={errors.name?.message}
            />

            <Select
              label="Contest Type"
              options={contestTypes}
              {...register("type")}
            />
          </div>

          <Input
            label="Cover Image URL"
            type="file"
            placeholder="https://..."
            {...register("image", {
              required: "Image URL is required",
            })}
            error={errors.image?.message}
          />

          <Textarea
            label="Description"
            {...register("description", {
              required: "Description is required",
            })}
            error={errors.description?.message}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              label="Entry Fee ($)"
              type="number"
              {...register("price", {
                required: "Price is required",
                min: 0,
              })}
              error={errors.price?.message}
            />

            <Input
              label="Prize Money ($)"
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
              isLoading={isLoading}
              className="w-full md:w-auto">
              {data ? "Update Contest" : "Create Contest"}
            </Button>
          </div>
        </form>
        
      </div>
    </div>
  );
}
