import { Request, Response } from "express";

export interface SuccessResponse<T> {
    success: true;
    data: T;
}

export interface ErrorResponse {
    success: false;
    error: string;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export type TypedRequest<
    TParams extends Record<string, string> = {},
    TBody = {},
    TQuery = {}
> = Request<TParams, {}, TBody, TQuery>;

export type TypedResponse<T> = Response<ApiResponse<T>>;
