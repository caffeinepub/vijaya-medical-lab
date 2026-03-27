import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BookTestSubmission {
    name: string;
    testType: string;
    timestamp: Time;
    phone: string;
}
export type Time = bigint;
export interface ContactSubmission {
    name: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export interface backendInterface {
    getAllBookTestSubmissions(): Promise<Array<[bigint, BookTestSubmission]>>;
    getAllContactSubmissions(): Promise<Array<[bigint, ContactSubmission]>>;
    submitBookTest(name: string, phone: string, testType: string): Promise<bigint>;
    submitContact(name: string, phone: string, message: string): Promise<bigint>;
}
