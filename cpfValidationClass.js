class ValidaCPF {
    constructor(cpfEnviado) {
        Object.defineProperty(this, 'cpfLimpo', {
            value: cpfEnviado.replace(/\D+/g, '')
        });
    }

    valida() {
        if(!this.cpfLimpo) return 'indefinido';
        if(this.cpfLimpo.length !== 11) return 'n tem o tamanho correto';
        if(this.sequencia() === true) return 'é sequencia';

        const cpfParcial = this.cpfLimpo.slice(0, -2);
        const digito1 = this.criaDigito(cpfParcial);
        const digito2 = this.criaDigito(cpfParcial + digito1);
        const novoCPF = cpfParcial + digito1 + digito2;

        return novoCPF === this.cpfLimpo;
    
    }

    criaDigito(cpfParcial) {
        const cpfArray = Array.from(cpfParcial);

        let contadorRegressivo = cpfArray.length + 1;

        const reduceCpf = cpfArray.reduce((acumulador, valor) => {
            acumulador += (contadorRegressivo * Number(valor));
            contadorRegressivo--
            return acumulador;
        }, 0);

        const digito = 11 - (reduceCpf % 11);

        return digito > 9 ? '0' : String(digito);
    }

    sequencia() {
        const validacao = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
        return validacao === this.cpfLimpo;
    }
}

const cpf1 = new ValidaCPF('111.111.111-11');
if(cpf1.valida() === true) {
    console.log('é um cpf valido');
} else {
    console.log('é um cpf invalido');
}
