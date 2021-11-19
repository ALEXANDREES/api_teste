const Sequelize = require('sequelize')

class PaymentService {
    constructor(PaymentModel) {
        this.payment = PaymentModel
    }

    async getById(idDTO) {
        const validationPaymentById = await this.payment.findOne({
            where: {
                id: idDTO
            }
        })

        if (validationPaymentById === null) {
            throw new Error('Payment method not found!')
        } else {
            return validationPaymentById
        } 
    }

    async getAll() {
        const listPayments = await this.payment.findAll()
        return listPayments
    }

    async add(paymentDTO) {
        const validationPayment = await this.payment.findOne({
            where: {
                method: paymentDTO.method
            }
        })

        if (validationPayment != null) {
            throw new Error('There is already a payment method with this name registered!')
        }

        try {
            await this.payment.create(paymentDTO)
        } catch (error) {
            throw error
        }
    }

    async update(idDTO, paymentDTO) {
        const validationPaymentUpdate = await this.payment.findOne({
            where: {
                id: idDTO
            }
        })

        if (validationPaymentUpdate === null) {
            throw new Error('Payment method not found!')
        }

        try {
            await this.payment.update(
                {
                    ...paymentDTO 
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

    async updateMerge(idDTO, paymentDTO) {
        const validationPaymentUpdateMerge = await this.payment.findOne({
            where: {
                id: idDTO
            }
        })

        if (validationPaymentUpdateMerge === null) {
            throw new Error('Payment method not found!')
        }

        const dataMerge = {
            ...validationPaymentUpdateMerge.dataValues,
            ...paymentDTO
        }

        try {
            await this.payment.update(
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
        const validationPaymentDelete = await this.payment.findOne({
            where: {
                id: idDTO
            }
        })

        if (validationPaymentDelete === null) {
            throw new Error('Payment method not found!')
        }

        try {
            await this.payment.destroy({
                where: {
                    id: idDTO
                }
            })
        } catch (error) {
            if (error instanceof Sequelize.ForeignKeyConstraintError) {
                error.message = 'It is not possible to delete the payment method as it is linked to another table!'
                throw error
                // if (error.index.includes("entityrequests_paymentId_fkey")) {}
            } else {
                throw error
            }
        }
    }
}

module.exports = PaymentService