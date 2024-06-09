import models from '../models'
import resource from '../resources';
import Categoria from '../resources/Categoria';

export default{
    list:async(req,res)=>{
        try {
            var TIME_NOW =  req.query.TIME_NOW;

            console.log(TIME_NOW);
            let Sliders = await models.Slider.find({state:1});
            Sliders = Sliders.map((slider) => {
                return resource.Slider.slider_list(slider);
            })
            let Categorias = await models.Categoria.find({state:1});

            Categorias = Categorias.map((categoria) => {
                return resource.Categoria.categoria_list(categoria);
            })

            
            let BestProducts = await models.Product.find({state:2}).sort({"createdAt":-1});
            var ObjectBestProducts = [];
            for (const Product of BestProducts) {
                let VARIEDADES = await models.Variedad.find({product: Product._id});
                ObjectBestProducts.push(resource.Product.product_list(Product,VARIEDADES));
            }
           

            let OursProducts = await models.Product.find({state:2}).sort({"createdAt":1});
            var ObjectOursProducts = [];
            for (const Product of OursProducts) {
                let VARIEDADES = await models.Variedad.find({product: Product._id});
                ObjectOursProducts.push(resource.Product.product_list(Product,VARIEDADES));
            }




            let FlashSale = await models.Discount.findOne({
                type_campaign: 2,
                start_date_num:{$lte:TIME_NOW},//<=
                end_date_num:{$gte:TIME_NOW},//>=
            });
            let ProductList = [];
            if(FlashSale){
                for (const product of FlashSale.products) {
                    var ObjecT = await models.Product.findById({_id:product._id});
                    let VARIEDADES = await models.Variedad.find({product: product._id});
                    ProductList.push(resource.Product.product_list(ObjecT,VARIEDADES));
                }
            }
         
            console.log(FlashSale);
            res.status(200).json({
                sliders: Sliders,
                categorias: Categorias,
                best_products:ObjectBestProducts,
                our_products:ObjectOursProducts,
                FlashSale: FlashSale,

                campaign_products: ProductList,

                


            });
          
        } catch (error) {
            res.status(500).send({
                message:"ERROR"
            });
            console.log(error);
        }
    },
    show_landing_product:async(req,res)=>{
       try {
        let SLUG = req.params.slug;
        let Product = await models.Product.findOne({slug: SLUG,state:2});
        let  VARIEDADES = await models.Variedad.find({product:Product._id});
        let RelatedProducts = await models.Product.find({categoria: Product.categoria,state:2});
        var ObjectRelatedProducts = [];
        for (const Product of RelatedProducts) {
            let VARIEDADES = await models.Variedad.find({product: Product._id});
            ObjectRelatedProducts.push(resource.Product.product_list(Product,VARIEDADES));
        }

        res.status(200).json({
            product: resource.Product.product_list(Product,VARIEDADES),
            related_products: ObjectRelatedProducts,
        })
       } catch (error) {
        res.status(500).send({
            message:"ERROR"
        });
        console.log(error);
       } 
    },
}