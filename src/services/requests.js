const Users = require('../models/entityUsers')

class RequestService {
    constructor(RequestModel) {
        this.request = RequestModel
    }

    async getById(idDTO) {
        const validationRequestById = await this.request.findOne({
            include: { 
                model: Users,
                as: 'userData'
            },
            where: {
                id: idDTO
            }
        })

        if (validationRequestById === null) {
            throw new Error('Request not found!')
        } else {
            return validationRequestById
        } 
    }

    async getAll() {
        const listRequests = await this.request.findAll()
        return listRequests
    }

    async add(requestDTO) {
        const validationRequest = await Users.findOne({
            where: {
                id: requestDTO.userId
            }
        })

        if (validationRequest === null) {
            throw new Error('The ID entered does not belong to a valid user!')
        }

        try {
            await this.request.create(requestDTO)
        } catch (error) {
            throw error.message
        }
    }

    // async update(idDTO, requestDTO) {
    //     const validationProductUpdate = await this.product.findOne({
    //         where: {
    //             id: idDTO
    //         }
    //     })

    //     if (validationProductUpdate === null) {
    //         throw new Error('Product not found!')
    //     }

    //     try {
    //         await this.product.update(
    //             {
    //                 ...requestDTO 
    //             },
    //             { 
    //                 where: { 
    //                     id: idDTO
    //                 } 
    //             }
    //         )
    //     } catch (error) {
    //         throw error.message
    //     }
    // }

    // async updateMerge(idDTO, requestDTO) {
    //     const validationProductUpdateMerge = await this.product.findOne({
    //         where: {
    //             id: idDTO
    //         }
    //     })

    //     if (validationProductUpdateMerge === null) {
    //         throw new Error('Product not found!')
    //     }

    //     const dataMerge = {
    //         ...validationProductUpdateMerge.dataValues,
    //         ...requestDTO
    //     }

    //     try {
    //         await this.product.update(
    //             {
    //                 ...dataMerge 
    //             },
    //             { 
    //                 where: { 
    //                     id: idDTO
    //                 } 
    //             }
    //         )
    //     } catch (error) {
    //         throw error.message
    //     }
    // }

    // async delete(idDTO) {
    //     const validationProductDelete = await this.product.findOne({
    //         where: {
    //             id: idDTO
    //         }
    //     })

    //     if (validationProductDelete === null) {
    //         throw new Error('Product not found!')
    //     }

    //     try {
    //         await this.product.destroy({
    //             where: {
    //                 id: idDTO
    //             }
    //         })
    //     } catch (error) {
    //         throw error.message
    //     }
    // }
}

module.exports = RequestService