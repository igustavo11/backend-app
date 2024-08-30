import {NextFunction, Request, Response} from 'express'
import { verify} from 'jsonwebtoken'

interface PayLoad{
    sub: string;
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction

){

    //receber o token

    const authToken= req.headers.authorization;

    if(!authToken){
        return res.status(401).end();
    }

   const [, token] = authToken.split(" ")

   try{
    //validação token

    const { sub } = verify(
        token,
        process.env.JWT_SECRET
    ) as PayLoad;

    //recupera id do token e colocar na varialvel user_id no req
    req.user_id = sub;
    
    
    
    return next();

   }catch(err){
    return res.status(401).end();
   }

}