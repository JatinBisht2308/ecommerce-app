import { product_model } from "@/models/product_model";
import { mongooseConnect } from "@/lib/mongoose";
export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  if (method === "GET") {
    if (req.query?.productId) {
      res.json(await product_model.findOne({ _id: req.query.productId }));
    } else {
      res.json(await product_model.find());
    }
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
