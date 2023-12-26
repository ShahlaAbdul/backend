import express from 'express';
import mongoose, { Schema }  from 'mongoose';

const app = express()
const port = 5000
app.use(express.json())


const productSchema = new Schema({
    name: String,
    price: Number,
    category: String,
    
  });
  const ProductModel = mongoose.model('Product', productSchema);
    
app.get('/', async (req, res) => {
    const products=await ProductModel.find({})
    res.send(products)
})
app.get('/:id',async (req, res) => {
    const {id}=req.params
    const products=await ProductModel.findById(id)
    res.send(products)

})
app.post('/', async(req,res)=>{
   
    try {
        const {name,price,category}=req.body
        const newProducts=new ProductModel({name,price,category})
        await newProducts.save()
        res.send('example post method')
    } catch (err) {
        res.send("error message")
        
    }
})

app.delete('/:id',async (req,res)=>{
    const {id}= req.params
    const products= await ProductModel.findByIdAndDelete(id)
    res.send(products)
})
app.put('/', async  (req,res)=>{
    const {id}= req.params
    const {name,price,category}=req.body
   const products= await ProductModel.findByIdAndUpdate(id,{name,price,category})
res.send(products)
})

mongoose.connect('mongodb+srv://Shahla:sehla200415@mycluster.vpdzf3b.mongodb.net/')
  .then(() => console.log('Connected!'))
  .catch(err=>console.log(err.message))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

