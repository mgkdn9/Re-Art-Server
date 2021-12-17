//import Piece from '../models/piece'
import Tag from '../models/tag'
import vm from "v-response"

exports.create_product = (req, res, next) => {
    let product_body = req.product_body
    const new_product = new Tag(product_body)
    new_product.save()
        .then(saved => {
            if (!saved) {
                return res.status(400)
                    .json(vm.ApiResponse(false, 400, "unable to save product please try again"))
            }
            if (saved) {
                return res.status(201)
                    .json(vm.ApiResponse(true, 201, "product created successfully", saved))
            }
        }).catch(error => {
            return res.status(500)
                .json(vm.ApiResponse(false, 500, "an error occured", undefined, error))
        })
}