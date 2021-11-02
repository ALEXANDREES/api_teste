class UserService {
    constructor(UserModel) {
        this.user = UserModel
    }

    async get(){
        const listUsers = await this.user.findAll()
        return listUsers
    }

    async add(userDTO) {
        const validationUserCpf = await this.user.findOne({
            where: {
                cpf: userDTO.cpf
            }
        })

        if (validationUserCpf != null) {
            throw new Error('The informative cpf is already being used!')
        }

        const validationUserEmail = await this.user.findOne({
            where: {
                email: userDTO.email
            }
        })

        if (validationUserEmail != null) {
            throw new Error('The informative email is already being used!')
        }

        try {
            await this.user.create(userDTO)
        } catch (error) {
            throw error.message
        }
    }
}

module.exports = UserService