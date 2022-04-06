import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/Cliente';
import { Pedido } from 'src/app/model/Pedido';
import { ClienteService } from 'src/app/servicos/cliente.service';
import { PedidoService } from 'src/app/servicos/pedido.service';

@Component({
  selector: 'app-efetivarpedido',
  templateUrl: './efetivarpedido.component.html',
  styleUrls: ['./efetivarpedido.component.css']
})
export class EfetivarpedidoComponent implements OnInit {
  public cliente: Cliente;
  public pedido: Pedido;
  public achou: boolean;
  public visivel: boolean;
  
  constructor(private cliService: ClienteService, 
              private pedService: PedidoService,
              private router: Router) { 
    this.cliente = new Cliente();
    this.pedido = new Pedido();
    this.achou = false;
    this.visivel = false;
  }

  ngOnInit(): void {
  }

  public buscarTelefone() {
    this.cliService.buscarClientePeloTelefone(this.cliente.telefone)
      .subscribe((cli:Cliente) => {
        this.cliente = cli;
        this.achou = true;
        console.log(this.cliente);
        this.visivel = true;
      },
      (err) => {
        if (err.status == 404) {
          // deu certo, mas a pesquisa não encontrou o cliente com esse numero de telefone = logo, novo cliente
          this.visivel = true;
          alert("Que massa, identificamos um novo cliente!");
        }
        else {
          alert("Falha na requisao" + err);
        }
      });
  }

  public finalizarCompra() {
    let pedidoTmp: Pedido;
    pedidoTmp = JSON.parse(localStorage.getItem("ShoppingCart"));
    this.pedido.itensPedido = pedidoTmp.itensPedido;
    this.pedido.valorTotal = pedidoTmp.valorTotal;
    this.pedido.cliente = this.cliente;
    this.pedido.status = 0; // pedido inicial

    console.log(this.pedido);

    this.pedService.inserirNovoPedido(this.pedido).subscribe(
      (res: Pedido) => {
        alert("Pedido efetivado = numero " + res.idPedido);
        localStorage.removeItem("ShoppingCart");
        this.router.navigate(["/recibo/", res.idPedido]);
      },
      (err) => {
        alert("Não conseguimos efetuar seu pedido - desculpe");
      }
    );
  }

}
