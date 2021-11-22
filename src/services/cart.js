const Products = require("../models/entityProducts")
const Users = require("../models/entityUsers")

class CartService {
    constructor(CartModel) {
        this.cart = CartModel
    }

    async getById(idDTO) {
        const validationCartById = await this.cart.findAll({
            include: {
                model: Products,
                as: 'productData'
            },
            where: {
                userId: idDTO
            }
        })

        if (validationCartById === null) {
            throw new Error('Cart not found!')
        } else {

            var dataFormat = {
                userId: idDTO,
                products: []
            }

            await validationCartById.forEach(element => {

                var product = {}
                var quantity = 0
                var productData = {}

                product = element.dataValues.productData.dataValues
                quantity = element.dataValues.quantity

                productData = {
                    ...product,
                    quantity
                }

                dataFormat.products.push(productData)
            })

            return dataFormat
        } 
    }

    async add(cartDTO) {
        const validationUser = await Users.findOne({
            where: {
                id: cartDTO.userId
            }
        })

        if (validationUser === null) {
            throw new Error('The sent ID does not correspond to a valid user!')
        }

        const validationCart = await Products.findOne({
            where: {
                id: cartDTO.productId
            }
        })

        if (validationCart === null) {
            throw new Error('The sent ID does not correspond to a valid product!')
        }

        const validationQuantityProductCart = await this.cart.findOne({
            where: {
                userId: cartDTO.userId,
                productId: cartDTO.productId
            }
        })

        if (validationQuantityProductCart === null) {
            try {
                await this.cart.create(cartDTO)
            } catch (error) {
                throw error
            }
        } else {
            const idCart = validationQuantityProductCart.dataValues.id
            const lastQuantity = validationQuantityProductCart.dataValues.quantity
            const newQuantity = lastQuantity + cartDTO.quantity

            const dataMerge = {
                ...validationQuantityProductCart.dataValues,
                quantity: newQuantity
            }

            try {
                await this.cart.update(
                    {
                        ...dataMerge 
                    },
                    { 
                        where: { 
                            id: idCart
                        } 
                    }
                )
            } catch (error) {
                throw error
            }
        }
    }

    async updateMerge(idUserCartDTO, idProductCartDTO, cartDTO) {
        const validationCartUpdateMerge = await this.cart.findOne({
            where:{
                userId: idUserCartDTO,
                productId: idProductCartDTO
            }
        })

        if (validationCartUpdateMerge === null) {
            throw new Error('Product not found!')
        } else {
            var idCart = validationCartUpdateMerge.dataValues.id
            const lastQuantity = validationCartUpdateMerge.dataValues.quantity
            var newQuantity = lastQuantity + cartDTO.quantity
        }

        const dataMerge = {
            ...validationCartUpdateMerge.dataValues,
            quantity: newQuantity
        }

        try {
            await this.cart.update(
                {
                    ...dataMerge 
                },
                { 
                    where: { 
                        id: idCart
                    } 
                }
            )
        } catch (error) {
            throw error
        }
    }

    async delete(idUserCartDTO, idProductCartDTO) {
        const validationCartDelete = await this.cart.findOne({
            where:{
                userId: idUserCartDTO,
                productId: idProductCartDTO
            }
        })

        if (validationCartDelete === null) {
            throw new Error('Product not found!')
        } else {
            var idCart = validationCartDelete.dataValues.id
        }

        try {
            await this.cart.destroy({
                where: {
                    id: idCart
                }
            })
        } catch (error) {
            throw error
        }
    }
}

module.exports = CartService