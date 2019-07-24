export class Loja {

    id: string;
    nome: string;
    telefone: string;
    email: string;
    cnpj: string;
    endereco: string;
    img : string;



    constructor() {
    }

    // Dados do firebase
    setDados(obj: any) {
        this.nome = obj.nome;
        this.telefone = obj.telefone;
        this.email = obj.email;
        this.cnpj = obj.cnpj;
        this.endereco = obj.endereco;
    }
}