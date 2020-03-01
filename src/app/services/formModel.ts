export interface Form{
    personalInfo:{
        sheetName:string,
        income:number,
        age:number,
        state:string,
      }
    taxes:object
    expenses:expense[]
    lifeChoices:object
    investment:{
        '401k':number,
        '401kContrib':number,
        IRAType:string,
        IRAAmount:number,
        stocks:number
      }

}

interface expense{
    expense:string
    weekly:number
    monthly:number
    yearly:number
}