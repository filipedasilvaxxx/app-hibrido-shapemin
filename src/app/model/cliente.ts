export class Cliente {

    id: string;
    nome: string;
    telefone: string;
    endereco: string;
    email: string;

    constructor() {
    }

    // Dados do firebase
    setDados(obj: any) {
        this.nome = obj.nome;
        this.telefone = obj.telefone;
        this.endereco = obj.endereco;
        this.email = obj.email;
    }
}