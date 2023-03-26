import User from "../model/User"

export default class UserTransfer {
    id!:string
    name!:string
    username!:string
    email!:string
    cover?:string
    avatar?:string
    verified!:boolean
    token!:string
    constructor(user:any, token:string) {
        this.id = user._id
        this.name = user.name
        this.username = user.username
        this.email = user.email
        this.cover = user.cover
        this.avatar = user.avatar
        this.verified = user.verified
        this.token = token
    }
}