const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if(token){
            token = token.slice(7);
            verify(token, "Plu573ck2020@p1n0d3", (err, decoded) => {
                if(err){
                    res.json({
                        success: 0,
                        message: "Token inválido!"
                    });
                }else{
                    next();
                }
            });
        }else{
            res.json({
                success: 0,
                message: "Acesso negado, utilizador não autenticado!"
            });
        }
    }
}