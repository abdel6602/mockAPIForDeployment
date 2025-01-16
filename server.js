const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/availableBanks' , (req, res) => {

    console.log("processing GET from ip:" + req.ip);

    res.json({
        banks : [
            {
                CIB : "Commercial International Bank",
            },
            {
                NBE: "National Bank of Egypt",
            },
            {
                BanqueMisr: "Banque Misr"
            },
            {
                BankOfAlexandria: "Bank of Alexandria"
            }
        ]
    })

    console.log("processed GET from ip:" + req.ip);
    
})

app.get('/getBankDetails/:bankName', (req, res) => {
    var chosenBank = req.params.bankName;

    console.log("processing GET from ip:" + req.ip);

    switch(chosenBank) {
        case "CIB": 
            res.status(200).json({
                EGPAccount: "100009126583",
                USDAccount: "100009986329",
                EURAccount: "100018096093",
                SWIFTCode: "CIBEEGCX007",
                IBAN_EGP: "EG720010000700000100009126583",
                IBAN_USD: "EG970010000700000100009986329"
            })
            break;
        
        case "NBE":
            res.status(200).json({
                EGPAccount: "0773060451108100016"
            })
            break;
        case "BanqueMisr":
            res.status(200).json({
                EGPAccount: "1550001000106952"
            })
            break;

        case "BankOfAlexandria":
            res.status(200).json({
                EGPAccount: "101796733001"
            })
            break;

        default:
            res.status(400).json({
                message: "Bank not found"
            })
            break;
    }
    console.log("processed GET from ip:" + req.ip);

})

app.post('/transferMoney', (req, res) => {
    var postData = req.body;
    // console.log(postData);

    console.log("processing POST from ip:" + req.ip);


    if(!postData.senderAccount || !postData.receiverAccount || !postData.amount) {
        return res.status(400).json({
            message: "Please provide all the required fields"
        })
    }

    if(postData.amount <= 5) {
        return res.status(422).json({
            message: "Amount should be greater than 5"
        })
    }
    res.status(200).json({
        message: "Money transferred successfully",
        senderAccount: postData.senderAccount,
        receiverAccount: postData.receiverAccount,
        amount: postData.amount
    })

    console.log("processed POST from ip:" + req.ip);

})

app.post('/creditCardPayment', (req, res) => {
    var postData = req.body;
    // console.log(postData);

    console.log("processing POST from ip:" + req.ip);
    

    if(!postData.cardNumber || !postData.cvv || !postData.expiryDate || !postData.amount) {
        return res.status(400).json({
            message: "Please provide all the required fields"
        })
    }

    if(postData.amount <= 5) {
        return res.status(422).json({
            message: "Amount should be greater than 5"
        })
    }
    res.status(200).json({
        message: "Payment successful",
        amount: postData.amount
    })

    console.log("processed POST from ip:" + req.ip);

});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});