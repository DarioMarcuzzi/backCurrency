const { Currency } = require("../db.js");
const cron = require("node-cron");
require("dotenv").config();
const axios = require("axios");
const currenciesData = require("../currency.json");

const { apikey } = process.env;

async function carryDBAllCurrency() {
  try {
    const currenciesOld = await Currency.findAll();
    console.log("entro");

    if (currenciesOld.length > 0) {
      for (const currencyOld of currenciesOld) {
        try {
          const currencyUrl = await axios.get(
            `https://v6.exchangerate-api.com/v6/${apikey}/latest/${currencyOld.base_code}`
          );
          const { conversion_rates, base_code, time_last_update_utc } =
            currencyUrl.data;

          let newConversionRates = [];
          let id = 0;
          for (const currency in conversion_rates) {
            id++;
            const rate = conversion_rates[currency];
            const oldConversionRate = currencyOld.conversion_rates.find(
              (oldConversionRate) => oldConversionRate.currency === currency
            );

            const difference = rate - oldConversionRate.rate;
            const disparity = Math.abs(difference) / oldConversionRate.rate;
            const positive = difference >= 0 ? true : false;

            newConversionRates.push({
              id,
              currency,
              rate,
              disparity,
              positive,
            });
          }

          // Actualizar la base de datos con los nuevos valores
          await currencyOld.update({
            time_last_update_utc,
            conversion_rates: newConversionRates,
          });
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      try {
        console.log(currenciesData.currencies);
        const currencyRequests = currenciesData.currencies.map(
          async (moneda) => {
            const currencyUrl = `https://v6.exchangerate-api.com/v6/${apikey}/latest/${moneda}`;
            const currencyResponse = await axios.get(currencyUrl);
            const { conversion_rates, base_code, time_last_update_utc } =
              currencyResponse.data;

            if (conversion_rates && time_last_update_utc) {
              const exchangeRates = Object.entries(conversion_rates).map(
                ([currency, rate], id) => ({
                  id,
                  currency,
                  rate,
                  disparity: 0,
                })
              );

              return Currency.create({
                base_code: base_code,
                time_last_update_utc: time_last_update_utc,
                conversion_rates: exchangeRates,
              });
            }
          }
        );

        const currencyResults = await Promise.all(currencyRequests);

        const errors = currencyResults.filter(
          (result) => result instanceof Error
        );

        if (errors.length) {
          console.error(`Hubo ${errors.length} errores:`);
          console.error(errors);
        } else {
          console.log(
            `Se procesaron ${currencyResults.length} monedas exitosamente.`
          );
        }
      } catch (error) {
        console.error(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
}
// Programar la tarea para que se ejecute una vez al día a las 2:30 AM
cron.schedule("30 2 * * *", () => {
  carryDBAllCurrency();
});

async function getCurrencyByBase(req, res) {
  try {
    let { base } = req.query;

    console.log(base);
    if (!base || base === undefined) {
      base = "USD";
    }

    if (!currenciesData.currencies.includes(base)) {
      console.log("entro significa que no esta");
      base = "USD";
    }

    const currencies = await Currency.findOne({
      where: { base_code: base },
    });
    console.log(currencies);
    const responseObj = {
      currencies: currencies,
      currenciesSupport: currenciesData.currencies,
    };

    res.status(200).json(responseObj);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
}

module.exports = {
  carryDBAllCurrency,
  getCurrencyByBase,
};
