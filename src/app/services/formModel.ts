export interface Form{
    personalInfo:object
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