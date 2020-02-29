export interface Form{
    personalInfo:object
    taxes:object
    expenses:expense[]
    lifeChoices:object
    investment:object

}

interface expense{
    name:string
    weekly:number
}