interface FirebirdConnectionOptions {
    host?: string;
    port?: number;
    database?: string;
    user?: string;
    password?: string;
    role?: any;
    pageSize?: number;
}

interface FirebirdConnection {
    (error: Error, db: FirebirdDatabaseOperation): void;
}

interface FirebirdResult {
    (error: Error, results: any[]): void;
}

interface FirebirdError {
    (error: Error): void;
}

interface FirebirdStatic {
    attach(options: FirebirdConnectionOptions, callback: FirebirdConnection): void;
    create(options: FirebirdConnectionOptions, callback: FirebirdConnection): void;
    attachOrCreate(options: FirebirdConnectionOptions, callback: FirebirdConnection): void;
    pool(pool: number, options: FirebirdConnectionOptions, callback?: FirebirdConnection): FirebirdPool;
    escape(sql: string): string;
}

interface FirebirdPool {
    get(callback: FirebirdConnection): void; 
    destroy: void;
}

interface FirebirdDatabaseOperation {
    query(query: string, params: any[], result: FirebirdResult): void;
    query(query: string, result: FirebirdResult): void;
    execute(query: string, params: any[], result: FirebirdResult): void;
    sequentially(query: string, params: any[], result: (row: any, index: number) => void, error: FirebirdError): void;
    sequentially(query: string, result: (row: any, index: number) => void, error: FirebirdError): void;
    detach(error?: FirebirdError, force?: boolean): void;
    transaction(isolation: number[], result: (error: any, transaction: FirebirdTransactionOperation) => void): void;
    on(event: string, params?: (...params: any[]) => void): void;
}

interface FirebirdTransactionOperation {
    query(query: string, params: any[], result: FirebirdResult): void;
    query(query: string, result: FirebirdResult): void;
    execute(query: string, params: any[], result: FirebirdResult): void;
    commit(error: FirebirdError): void;
    commitRetaining(error: FirebirdError): void;
    rollback(error: FirebirdError): void;
    rollbackRetaining(error: FirebirdError): void;
}


declare var firebird: FirebirdStatic;
declare module 'node-firebird' {
  export = firebird;
}

