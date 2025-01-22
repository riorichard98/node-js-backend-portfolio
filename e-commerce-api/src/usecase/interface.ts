export interface RegisterResponse {
    userId: string
}

export interface LoginResponse {
    token: string
}

export interface BuyProductResponse {
    transactionId: string
}

export interface CreateNewPaymentResponse {
    paymentId: string
}