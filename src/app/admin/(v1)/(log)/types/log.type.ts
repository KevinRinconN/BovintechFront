export interface Log {
  id: string;
  timestamp: string;
  logger: string;
  action: LogAction;
  module: LogModule;
  user: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    rol: "OPERATOR" | "ADMIN";
  };
}


export enum LogAction {
    CREATE,    
    UPDATE,    
    DELETE,    
    OTHER 
}

export enum LogModule {
    LOT,
    BIRTH,
    WEIGHING,
    EVENT,
    USER,
    CATTLE,
}