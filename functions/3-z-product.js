require('dotenv').config()
const Airtable = require('airtable-node')


const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appqm1XggMgz4p1jP')
  .table('products')




exports.handler = async (event, context, cb) => {
  const { id } = event.queryStringParameters
  if (id) {

    try {
      const product = await airtable.retrieve(id)
      if (product.error) {
        return {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
          statusCode: 404,
          body: `No product with id: ${id}`,
        }
      }
      return {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        statusCode: 200,
        body: JSON.stringify(product),
      }
    } catch (error) {
      return {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        statusCode: 500,
        body: `Server Error`,
      }
    }
  }
  try {
    const { records } = await airtable.list()
    const products = records.map((product) => {
      const { id } = product
      const { name, images, price,colors,company,description,category,shipping } = product.fields
      const image = images[0].url
      return { id, name, image, price,colors,company,description,category,shipping }
    })
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      statusCode: 200,
      body: JSON.stringify(products),
    }
  } catch (error) {
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      statusCode: 500,
      body: 'Server Error',
    }
  }
}