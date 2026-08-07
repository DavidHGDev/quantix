import e from "express";
import routerApp from './routers/index.js'

const PORT = 3000;

const app = e();

app.use(e.json());

app.use(routerApp);

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT} http://localhost:${PORT}`)
})