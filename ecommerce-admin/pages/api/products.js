import { product_model } from "@/models/product_model";
import { mongooseConnect } from "@/lib/mongoose";
export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  if(method === 'GET'){
    res.json(await product_model.find());
  }
  if (method === "POST") {
    const { title, description, price } = req.body;
    const productDoc = await product_model.create({
      title,
      description,
      price,
    });
    res.json(productDoc);
  }
  
}
