import { Prisma, Product } from "@prisma/client";
import { InsertProductData, UpdateProductData } from "../joi/interface";
import prisma from "../models/primsa-client";
import { cleanObject } from "../utils/common";
import { throwRequestError } from "../middleware/error-handler";
import { GENERAL_ERROR_MESSAGE } from "../constants/general-error-message";

const productInsert = async (data: InsertProductData): Promise<{ productId: string }> => {
    const insertedProduct = await prisma.product.create({
        data: {
            name: data.productName,
            price: data.price,
            stockQuantity: data.stockQuantity,
            ...(data.productDescription ? { description: data.productDescription } : {})
        }
    })
    return { productId: insertedProduct.productId }
}

const validateProductExist = async (productId: string): Promise<Product | null> => {
    const foundProduct = await prisma.product.findUnique({
        where: { productId }
    })
    if (!foundProduct) throwRequestError(GENERAL_ERROR_MESSAGE.DATA_NOT_EXISTS);
    return foundProduct;
}

const productUpdate = async (data: UpdateProductData, productId: string): Promise<void> => {
    await validateProductExist(productId);
    const updateData: Prisma.ProductUpdateInput = {
        description: data.productDescription,
        name: data.productName,
        price: data.price,
        stockQuantity: data.stockQuantity,
        updatedAt: new Date()
    }
    await prisma.product.update({
        where: { productId },
        data: cleanObject(updateData)
    })
}

const productDetail = async (productId: string) => (await validateProductExist(productId));

const deleteProduct = async (productId: string) => {
    await validateProductExist(productId);
    await prisma.product.delete({
        where: { productId }
    })
}

export const productUsecase = {
    productInsert,
    productUpdate,
    productDetail,
    deleteProduct
};