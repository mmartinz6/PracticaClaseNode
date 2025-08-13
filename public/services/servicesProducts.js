//GET
async function getProducts() {
    try {
        
        const response = await fetch ('http://localhost:3001/productos',{

            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const products = await response.json()
        return products

    } catch (error) {
        console.error("Error al obtener los productos")
        throw error
    }
}
export{getProducts}

//POST
async function postProducts(product) {
    try {
        const response = await fetch ('http://localhost:3001/productos',{

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(product)
        })

        const products = await response.json()
        return products

    } catch (error) {
        console.error("Error al crear los productos")
        throw error
    }
}
export{postProducts}
