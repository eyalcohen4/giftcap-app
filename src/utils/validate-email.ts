function validateEmail(email: string) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const isValid = regex.test(email)

    return isValid;
    
}

export default validateEmail