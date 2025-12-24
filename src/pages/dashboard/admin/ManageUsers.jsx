import React from 'react';

import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
export function ManageUsers() {

  const axiosSecure = useAxiosSecure();
    const { data: users = [], } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const result = await axiosSecure.get(
        `http://localhost:5000/users`
      );
      return result.data;
    },
    });
  
  const handleRoleUpdate = (email,role) => {
    console.log(email, role)
    const newData = {
        email,
        role
      }
    Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, UPDATE it!",
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(
              `http://localhost:5000/update-role`,
              {
                method: "PATCH",
                headers: {
                  'Content-Type': 'application/json',
                  
                },
                body: JSON.stringify(newData),
              }
            )
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                Swal.fire({
                  title: "updated!",
                  text: "Role has been updated.",
                  icon: "success",
                });
               
              })
              .catch((err) => {
                toast.success(err.message);
              });
          }
        });
  }
  // console.log(usersData)
  // const [users, setUsers] = useState(users);
  console.log(users)
 
  return <>
      <div className='container mx-auto bg-slate-900  text-gray-400 px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full  leading-normal'>
                <thead className=''>
                  <tr className=''>
                    <th
                      scope='col'
                      className='px-5 py-3  border-b border-gray-200 text-gray-400  text-left text-sm uppercase font-normal'
                    >
                      Photo
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3  border-b border-gray-200 text-gray-400  text-left text-sm uppercase font-normal'
                    >
                      name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3   border-b border-gray-200 text-gray-400  text-left text-sm uppercase font-normal'
                    >
                      Email
                    </th>
                    {/* <th
                      scope='col'
                      className='px-5 py-3  border-b border-gray-200 text-gray-400  text-left text-sm uppercase font-normal'
                    >
                      Role
                    </th> */}

                    <th
                      scope='col'
                      className='px-5 py-3   border-b border-gray-200 text-gray-400  text-left text-sm uppercase font-normal'
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                {
                  users.map(user => <tr>
                      <td className='px-5 py-5 border-b border-gray-200  text-sm'>
        <p className=' '><img src={user?.image} className='w-10 h-10 rounded-full' alt="" /></p>
      </td>
                      <td className='px-5 py-5 border-b border-gray-200  text-sm'>
        <p className=' '>{user?.name}</p>
      </td>
                      <td className='px-5 py-5 border-b border-gray-200  text-sm'>
        <p className=' '>{user?.email}</p>
      </td>
                      {/* <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{user?.role}</p>
      </td> */}
                    <td>
                      <select
                        // value={updatedRole}
                        defaultValue={user?.role}
                    onChange={e => handleRoleUpdate(user.email,e.target.value)}
                    className='w-full my-3 border border-gray-200 rounded-xl px-2 py-3'
                    name='role'
                    id=''
                  >
                    <option value='user'>user</option>
                    <option value='creator'>creator</option>
                    <option value='admin'>admin</option>
                  </select>
                    </td>

                  </tr>)
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
}