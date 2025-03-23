
export const GET = (req,res) => {
    return res.send("Hello from login...")
}

export const POST = (req, res) => {
    const {username,password} = req.body

    if(!username || !password){
        return res.status(400).send("Username and password is required")
    }
    return res.send("Login successfull")
}   