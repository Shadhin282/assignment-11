import useAuth from '../authentication/context/useAuth'
import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query'

const useRole = () => {
  const { user, loading } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: role, isLoading: isRoleLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ['role'],
    queryFn: async () => {
      const result = await axiosSecure(`http://localhost:5000/users/role`)
      console.log(result)
      return result.data.role
    },
  })

  //   return { role, isRoleLoading }
  return [role, isRoleLoading]
}

export default useRole