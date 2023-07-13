export interface AddCompanyRequest{
userId:number ;
email :String;
username  :String;
userStatus:string;
level :String ;
createdDate ?:   Date;
lastModificatedDate?: Date; 
fiscalCode: string;
}