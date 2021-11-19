const Sequelize = require('sequelize')
const AccessLevel = require('../models/entityAccessLevel')

class UserService {
    constructor(UserModel) {
        this.user = UserModel
    }

    async getById(idDTO){
        const validationUserById = await this.user.findOne({
            include: {
                model: AccessLevel,
                as: 'accessLevelData'
            },
            where: {
                id: idDTO
            }
        })

        if (validationUserById === null) {
            throw new Error('User not found!')
        } else {
            return validationUserById
        }
    }

    async getAll(){
        const listUsers = await this.user.findAll({
            include: {
                model: AccessLevel,
                as: 'accessLevelData'
            }
        })
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

        const validationUserAccessLevel = await AccessLevel.findOne({
            where: {
                id: userDTO.accessLevelId
            }
        })

        if (validationUserAccessLevel === null) {
            throw new Error('The ID informed for the access level is not valid!')
        }

        try {
            await this.user.create(userDTO)
        } catch (error) {
            throw error
        }
    }

    async update(idDTO, userDTO) {
        const validationUserUpdate = await this.user.findOne({
            where: {
                id: idDTO
            }
        })

        if (validationUserUpdate === null) {
            throw new Error('User not found!')
        }

        try {
            await this.user.update(
                {
                    ...userDTO 
                },
                { 
                    where: { 
                        id: idDTO
                    } 
                }
            )
        } catch (error) {
            throw error
        }
    }

    async updateMerge(idDTO, userDTO) {
        const validationUserUpdateMerge = await this.user.findOne({
            where: {
                id: idDTO
            }
        })

        if (validationUserUpdateMerge === null) {
            throw new Error('User not found!')
        }

        const dataMerge = {
            ...validationUserUpdateMerge.dataValues,
            ...userDTO
        }

        try {
            await this.user.update(
                {
                    ...dataMerge 
                },
                { 
                    where: { 
                        id: idDTO
                    } 
                }
            )
        } catch (error) {
            throw error
        }
    }

    async delete(idDTO) {
        const validationUserDelete = await this.user.findOne({
            where: {
                id: idDTO
            }
        })

        if (validationUserDelete === null) {
            throw new Error('User not found!')
        }

        try {
            await this.user.destroy({
                where: {
                    id: idDTO
                }
            })
        } catch (error) {
            if (error instanceof Sequelize.ForeignKeyConstraintError) {
                error.message = 'It is not possible to delete the user as it is linked to another table!'
                throw error
                // if (error.index.includes("entityrequests_userId_fkey")) {}
            } else {
                throw error
            }
        }
    }
}

module.exports = UserService