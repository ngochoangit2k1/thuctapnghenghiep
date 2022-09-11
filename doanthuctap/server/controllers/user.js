
import createError from 'http-errors'
import User  from '../model/User.js'
import Video from '../model/Video.js'
import cors from "cors"

export  const update = async (req, res, next) => {
    if(req.params.id === req.user.id) {
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body
            },
            {new: true}
            )
            res.status(200).json(updateUser)
        } catch (err) {
            next(err)
        }
    }else{
        return next(createError(403,"You can update only you account!"));
    }
}

export  const deleteUser = async (req, res, next) => {
    if(req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id
            )
            res.status(200).json("User has been delete!")
        } catch (err) {
            next(err)
        }
    }else{
        return next(createError(403,"You can delete only you account!"));
    }
}

export  const getUser = async(req, res, next) => {
    try {
    
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
      
    } catch (err) {
         next(err)
    }
}

export  const subscribe = async(req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id,{
            $push:{subscribedUser:req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers: 1 }
        });
        res.status(200).json("Subscription successful")
    } catch (err) {
         next(err)
    }
}

export  const unsubscribe = async(req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id,{
            $pull:{subscribeUser:req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribe: -1 }
        });
        res.status(200).json("UnSubscription successful")
    } catch (err) {
         next(err)
    }
}

export  const like = async(req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId,{
           // addToSet: xác đinh rằng giấ trị được thêm vào chỉ 1 lần không có trong lần sau
           $addToSet:{likes:id},
           $pull:{dislikes:id}
        })
        res.status(200).json("The video has been likes")
    } catch (err) {
         next(err)
    }
}

export  const dislike =async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId,{
           // addToSet: xác đinh rằng giấ trị được thêm vào chỉ 1 lần không có trong lần sau
           $addToSet:{dislikes:id},
           $pull:{likes:id}
        })
        res.status(200).json("The video has been dislike")
    } catch (err) {
         next(err)
    }
}



export const getAllUser = async (req, res, next) => {
    try {
        
        const user = await User.find()
        res .status(200)
            .json(user)
            .set("Content-Range", countries.length)
    } catch (err) {
        next(err);
    }
}