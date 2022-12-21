const router = require("express").Router();
const { isObjectIdOrHexString } = require("mongoose");
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res)=>{
    if(req.body.pasword){
            req.body.password= CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
            ).toString();
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            {
            $set: req.body,
        },
        {new: true}
        );
        res.status(200).json(updatedUser)
    } catch(err){
        res.status(500).json(err)
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try{
        await  User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted...")
    }catch(err){
        res.status(500).json(err);
    }
});

//GET USER

router.get("/:id", verifyTokenAndAdmin, async (req, res) => {
    try{
        const user = await  User.findById(req.params.id);
        const {password, ...others}= user_.doc;
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
});


module.exports = router