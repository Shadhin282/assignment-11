import axios from "axios"

export const imageUpload = async(imageData) => {
    const formData = new FormData()
  formData.append('image', imageData)

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`,
    formData
  )
  return data?.data?.display_url
}



// save user data in db
export const saveOrUpdateUser = async(userData) => {
    const {data} = await axios.post(`http://localhost:5000/users`,userData)
    return data;
}