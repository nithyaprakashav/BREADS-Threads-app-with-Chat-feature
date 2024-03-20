import UserNavbar from "../components/UserNavbar";
import UserPost from "../components/UserPost";

const UserPage = () => {
    return ( 
        <>
            <UserNavbar/>

            <UserPost likes={2001} replies={304} postImg={"/np-avatar.jpg"} postTitle={"Hey guys! wassup!!"} />
            <UserPost likes={3225} replies={287} postImg={"/me-khachith-pavan.jpg"} postTitle={"Group of three!"}/>
            <UserPost likes={2431} replies={324} postImg={"/inGoa.JPG"} postTitle={"Goa!!!"} />
            
        </>
     );
}
 
export default UserPage;