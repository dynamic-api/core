export interface ICRUDService<T> {

    collection: string;

    query<R>(ctx?: any): Promise<R>;
    find(filter: any, fields: string, skip: number, take: number, orderBy: any, includes?: string[], ctx?: any): Promise<T[]>;
    findOne(filter: any, fields: string, includes?: string[], ctx?: any): Promise<T>;
    findById(id: any, fields: string, includes?: string[], ctx?: any): Promise<T>;
    add(entity: T): Promise<T>;
    addMany(entities: T[]): Promise<T[]>;
    updateById(id: any, $set: any, fields: string, includes?: string[], ctx?: any): Promise<T>;
    updateOne(filter: any, $set: any, fields: string, includes?: string[], ctx?: any): Promise<T>;
    updateMany(filter: any, $set: any, fields: string, includes?: string[], ctx?: any): Promise<T[]>;
    upsertOne(filter: any, $set: any, fields: string, includes?: string[], ctx?: any): Promise<T>;
    upsertMany(filter: any, $set: any, fields: string, includes?: string[], ctx?: any): Promise<T[]>;
    deleteById(id: any, fields: string, includes?: string[], ctx?: any): Promise<T>;
    deleteOne(filter: any,fields: string, includes?: string[], ctx?: any): Promise<T>;
    deleteMany(filter: any,fields: string, includes?: string[], ctx?: any): Promise<T[]>;
} 