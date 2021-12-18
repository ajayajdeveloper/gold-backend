import jwt from "jsonwebtoken";

  
export const auth = (request, response, next) => {
 
  try {
    const token = request.header("x-auth-token");
    console.log(token);
    jwt.verify(token, process.env.SECERET_KEY); 
    next();
  } catch (err) {
    response.status(401); 
    response.send({ err: err.message });
  }
};