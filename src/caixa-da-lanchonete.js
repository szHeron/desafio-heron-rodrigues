const menu = [
    {
        id: "cafe",
        name: "Café",
        main: "",
        value: 3.00
    },
    {
        id: "chantily",
        name: "Chantily (extra do Café)",
        main: "cafe",
        value: 1.50
    },
    {
        id: "suco",
        name: "Suco Natural",
        main: "",
        value: 6.20
    },
    {
        id: "sanduiche",
        name: "Sanduíche",
        main: "",
        value: 6.50
    },
    {
        id: "queijo",
        name: "Queijo (extra do Sanduíche)",
        main: "sanduiche",
        value: 2.00
    },
    {
        id: "salgado",
        name: "Salgado",
        main: "",
        value: 7.25
    },
    {
        id: "combo1",
        name: "1 Café e 1 Sanduíche",
        main: "",
        value: 9.50
    },
    {
        id: "combo2",
        name: "1 Suco e 1 Sanduíche",
        main: "",
        value: 7.50
    },
]

class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        if(itens.length < 1){
            return "Não há itens no carrinho de compra!";
        }else if(metodoDePagamento !== "credito" && metodoDePagamento !== "debito" && metodoDePagamento !== "dinheiro"){
            return "Forma de pagamento inválida!"
        }

        let total = 0
        for(let i = 0; i < itens.length; i++){
            if(itens[i].indexOf(",") < 0){
                return "Item inválido!"
            }

            const name = itens[i].split(',')[0]
            const amount = Number(itens[i].split(',')[1])

            if(amount === 0){
                return "Quantidade inválida!"
            }

            const itemInMenu = menu.filter((menuItem)=>menuItem.id === name)[0]

            if(itemInMenu){
                if(itemInMenu.main.length > 0){
                    const exists = itens.filter((item)=>item.indexOf(itemInMenu.main) !== -1)

                    if(exists.length === 0){
                        return "Item extra não pode ser pedido sem o principal"
                    }
                }
                total += itemInMenu.value * amount
            }else{
                return "Item inválido!"
            }

        }

        const result = metodoDePagamento === "credito"?total+total*0.03:metodoDePagamento === "dinheiro"?total-total*0.05:total

        return `R$ ${result.toFixed(2)}`.replace(".",",")
    }

}

export { CaixaDaLanchonete };