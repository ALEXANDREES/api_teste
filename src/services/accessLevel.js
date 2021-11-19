const Sequelize = require('sequelize')

class AccessLevelService {
    constructor(AccessLevelModel) {
        this.accessLevel = AccessLevelModel
    }

    async getById(idDTO) {
        const validationAccessLevelById = await this.accessLevel.findOne({
            where: {
                id: idDTO
            }
        })

        if (validationAccessLevelById === null) {
            throw new Error('Access level not found!')
        } else {
            return validationAccessLevelById
        } 
    }

    async getAll() {
        const listAccessLevel = await this.accessLevel.findAll()
        return listAccessLevel
    }

    async add(accessLevelDTO) {
        const validationAccessLevel = await this.accessLevel.findOne({
            where: {
                type: accessLevelDTO.type
            }
        })

        if (validationAccessLevel != null) {
            throw new Error('There is already a access level with this name registered!')
        }

        try {
            await this.accessLevel.create(accessLevelDTO)
        } catch (error) {
            throw error
        }
    }

    async update(idDTO, accessLevelDTO) {
        const validationAccessLevelUpdate = await this.accessLevel.findOne({
            where: {
                id: idDTO
            }
        })

        if (validationAccessLevelUpdate === null) {
            throw new Error('Access level not found!')
        }

        try {
            await this.accessLevel.update(
                {
                    ...accessLevelDTO 
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

    async updateMerge(idDTO, accessLevelDTO) {
        const validationAccessLevelUpdateMerge = await this.accessLevel.findOne({
            where: {
                id: idDTO
            }
        })

        if (validationAccessLevelUpdateMerge === null) {
            throw new Error('Access level not found!')
        }

        const dataMerge = {
            ...validationAccessLevelUpdateMerge.dataValues,
            ...accessLevelDTO
        }

        try {
            await this.accessLevel.update(
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
        const validationAccessLevelDelete = await this.accessLevel.findOne({
            where: {
                id: idDTO
            }
        })

        if (validationAccessLevelDelete === null) {
            throw new Error('Access level not found!')
        }

        try {
            await this.accessLevel.destroy({
                where: {
                    id: idDTO
                }
            })
        } catch (error) {
            if (error instanceof Sequelize.ForeignKeyConstraintError) {
                error.message = 'It is not possible to delete the access level as it is linked to another table!'
                throw error
                // if (error.index.includes("entityrequests_paymentId_fkey")) {}
            } else {
                throw error
            }
        }
    }
}

module.exports = AccessLevelService