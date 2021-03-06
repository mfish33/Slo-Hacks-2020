export interface Form{
    id:string
    personalInfo:{
        sheetName:string,
        income:number,
        age:number,
        state:string,
      }
    taxes:{
        effectiveTaxRate: number,
        totalIncomeTax: number,
        incomeAfterTaxes: number
    }
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