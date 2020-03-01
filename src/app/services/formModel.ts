export interface Form{
    personalInfo:any
    taxes:object
    expenses:expense[]
    lifeChoices:object
    investment:object

}

interface expense{
    expense:string
    weekly:number
    monthly:number
    yearly:number
}