function validatePhone(phone: string) {
    const regex = /^\+?(972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/

    const isValid = regex.test(phone)

    return isValid;
    
}

export default validatePhone