import { useState } from "react";
import useShowToast from "../hooks/useShowToast"
const useImgPreview = () => {

    const [imageUrl , setImageUrl] = useState(null)
    const showToast = useShowToast()

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if(file && file.type.startsWith("image/")){
            const fileReader = new FileReader()

            fileReader.onloadend = () => {
                setImageUrl(fileReader.result)
            }

            fileReader.readAsDataURL(file)
        }else{
            showToast("Error" , "Please select image files only" , "error")
            setImageUrl(null)
        }
        
    }

    return {handleImageChange , imageUrl , setImageUrl};
}
 
export default useImgPreview;