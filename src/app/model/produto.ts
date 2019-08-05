export class Produto {

    id: string;
    nome: string;
    nomePrincipal: string;
    marca: string;
    descricao: string;
    codigo: string;
    categoria: string;
    preco: string;
    img : string;



    constructor() {
    }

    // Dados do firebase
    setDados(obj: any) {
        this.nome = obj.nome;
        this.nomePrincipal = obj.nomePrincipal;
        this.marca = obj.marca;
        this.descricao = obj.descricao;
        this.codigo = obj.codigo;
        this.categoria =  obj.categoria;
        this.preco =  obj.preco;
        
    }
}