module.exports = {
    calculateValueOfPayment(array){
        const {price, iva} = array;
        return price + price* iva;
    }
}