export interface CRUD {
  create: (resource: any) => Promise<any>;
}
