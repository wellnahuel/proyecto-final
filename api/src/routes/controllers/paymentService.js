const axios = require("axios");

class PaymentService {
  async createPayment(req, res) {
    const url = "https://api.mercadopago.com/checkout/preferences";
    // let products = []
    // products.forEach(p => {
    //   let prod = {
    //     id: p.id,
    //     title: p.name,
    //     description: p.detail,
    //     category_id: p.category,
    //     quantity: p.qty,
    //     picture_url: p.image,
    //     unit_price: p.price
    //   }
    //   products.push(prod)
    // })

    const body = {
      payer_email: "test_user_10178403@testuser.com",
      items: req.body.items,
      // items: [
      //   //Acá hay que traer los productos reales
      //   //También se pueden modificar las formas de pago
      //   {
      //     title: "Producto de prueba",
      //     description: "Descripción del producto de prueba",
      //     picture_url: "http://www.myapp.com/myimage.jpg",
      //     category_id: "category123",
      //     quantity: 1,
      //     unit_price: 10,
      //   },
      // ],
      back_urls: {
        failure: "https://proyecto-final-git-develop-matarg81.vercel.app",
        pending: "https://proyecto-final-git-develop-matarg81.vercel.app",
        success: "https://proyecto-final-git-develop-matarg81.vercel.app",
      },
    };

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });

    return payment.data;
  }

  async createSubscription() {
    const url = "https://api.mercadopago.com/preapproval";

    const body = {
      reason: "Cuota mensual",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 10,
        currency_id: "ARS",
      },
      back_url: "https://proyecto-final-git-develop-matarg81.vercel.app",
      payer_email: "test_user_10178403@testuser.com",
    };

    const subscription = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });

    return subscription.data;
  }
}

module.exports = PaymentService;
