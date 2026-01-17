// import User from'../Models/user'

// export const deleteUser=async(req,res)=>{
//     const { id } = req.params;

//   try{
//   const user=await User.findById(id);
//   if(!user){
//     return res.status(400).json({
//         success:false,
//         message:'user not found'
//     })
//   }
//   await user.findByIdAndDelete(id);
//   res.json({
//     success:true,
//     message:'User Delete Successfully'
//   })

//   }catch(error){
//      res.status(500).json({ message: "Server error" });
//   }
// }
import User from "../Models/user.js";

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
