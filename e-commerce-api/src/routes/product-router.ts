import { Router } from "express";
import { handlerWrapper as h } from "../middleware/handler-wrapper";
import { productHandler } from "../handler/product-handler";

const productRouter = Router();

productRouter.get('',h(productHandler.productList)); // product list
productRouter.post('', h(productHandler.insertProduct)); // add product
productRouter.get('/:productId',h(productHandler.productDetail)); // product detail
productRouter.put('/:productId',h(productHandler.updateProduct)); // update product
productRouter.delete('/:productId',h(productHandler.deleteProduct)); // delete product

export default productRouter;