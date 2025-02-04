import express from  'express'
import  usuarioRoutes  from  "./routes/usuarioRoutes.js";
import atividadeRoutes from "./routes/atividadeRoutes.js"
import cors from "cors";


const app = express();

app.use(cors())
app.use(express.json()); 

app.use("/usuario", usuarioRoutes)
app.use("/atividade",atividadeRoutes )


export default app;




