class UserService {
    constructor(UserModel) {
        this.user = UserModel
    }

    async get(){
        const listUsers = await this.user.findAll()
        return listUsers
    }

    async add(userDTO) {
        const validationUser = await this.user.findOne({
            where: {
                cpf: userDTO.cpf
            }
        })

        if (validationUser != null) {
            throw new Error('The informative cpf is already being used!')
        }

        try {
            await this.user.create(userDTO)
        } catch (error) {
            throw error.message
        }
    }
}

module.exports = UserService