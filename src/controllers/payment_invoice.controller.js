
const knex = require('../database');
const {decodeToken} = require('../auth');
const late_payment = require('../controllers/late_payment.controller');
const value_pay_ = 0;
module.exports = {
  async create(req, res){

  
    try {
      const { id_invoice, kind_payment, file_path_proof, amount_pay} = req.body; 
      
      const {id_employee} = await decodeToken(req.headers.authorization);     
      const paymentNotClosed = await knex('payment_invoice')
        .where({id_invoice})
        .first(); 
      
      if(await verifyAmountPay(amount_pay, id_invoice, value_pay_)){
        await late_payment.create({id_invoice, amount_pay, id_employee, kind_payment});
        return res.status(400).send({error: 'Transacao concluida, veja os pagamentos desta fatura'});
      }  
      if(paymentNotClosed) return res.status(400).send({error: 'Esta fatura foi paga. '}); 
      await knex.transaction(async trx => {
       await knex('payment_invoice')
       .insert({id_employee, id_invoice, kind_payment, file_path_proof, amount_pay})
       .transacting(trx);
      });
      
      return res.status(200).send({message: 'Fatura paga com sucesso'});
    }catch(err){
      console.log(err);
      return res.status(400).send({error: 'Registration failed'});
    }
  }
}
async function verifyAmountPay(amount_pay, id_invoice, value_pay_){
  try {
    const {value_pay} = await knex('invoice').where('id_invoice', id_invoice).first();
    const temp = amount_pay - value_pay;
    value_pay_ = value_pay;
    if(temp < 0) return true;
    return false;  
  } catch (error) {
    console.log(error);
  }
}