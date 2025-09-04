import { app } from "./app";
import { env } from "./env";
import { setupSwagger } from "./config/swagger";

setupSwagger(app)
app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`)
})
