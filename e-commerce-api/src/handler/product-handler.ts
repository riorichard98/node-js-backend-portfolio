import { Request } from 'express';
import { insertProductSchema, productListSchema, updateProductSchema } from '../joi/schema/product-joi';
import { productUsecase } from '../usecase/product-usecase';
import { validateRequest } from '../utils/common';
import { productListFilter } from '../joi/interface';
import { Prisma } from '@prisma/client';
import prisma from '../models/primsa-client';

const insertProduct = async (req: Request) => {
    const body = validateRequest(insertProductSchema, req.body);
    const data = await productUsecase.productInsert(body);
    return { data, statusCode: 201 }
}

const productList = async (req: Request) => {
    const { productName, offset, limit }: productListFilter = validateRequest(productListSchema, req.query)
    const whereInput: Prisma.ProductWhereInput = {
        ...(productName ? {
            name: {
                contains: productName
            }
        } : {})
    };
    const productsFound = await prisma.product.findMany({
        where: whereInput,
        skip: offset,
        take: limit,
        orderBy: {
            createdAt: 'desc'
        }
    })
    const data = productsFound.map(e => ({
        productId: e.productId,
        name: e.name,
        quantity: e.stockQuantity,
        price: e.price
    }))
    return { data, statusCode: 200 }
}

const productDetail = async (req: Request) => {
    const { productId } = req.params;
    const data = await productUsecase.productDetail(productId)
    return { data, statusCode: 200 };
}

const updateProduct = async (req: Request) => {
    const { productId } = req.params;
    const body = validateRequest(updateProductSchema, req.body);
    await productUsecase.productUpdate(body, productId);
    return { data: {}, statusCode: 200 };
}

const deleteProduct = async (req: Request) => {
    await productUsecase.deleteProduct(req.params.productId);
    return { data: {}, statusCode: 200 };
}

export const productHandler = {
    insertProduct,
    productList,
    productDetail,
    updateProduct,
    deleteProduct
}