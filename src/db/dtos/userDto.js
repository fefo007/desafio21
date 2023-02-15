
class UserDto {
    constructor(username,password,email,direcction,age,cel,image){
        this.username=username
        this.password=password
        this.email=email
        this.direcction=direcction
        this.age=age
        this.cel=cel
        this.image=image
    }
}

function asUserDto(users) {
    if(Array.isArray(users)){
        return users.map(users => new UserDto(users))
    }else{
        return new UserDto()
    }
}

module.exports={asUserDto}