import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from 'src/app/model/Pedido';
import { CarrinhoService } from 'src/app/servicos/carrinho.service';
import { PedidoService } from 'src/app/servicos/pedido.service';

@Component({
  selector: 'app-recibo',
  templateUrl: './recibo.component.html',
  styleUrls: ['./recibo.component.css']
})
export class ReciboComponent implements OnInit {

  public idPedido: number;
  public detalhePedido: Pedido;

  constructor(private router: ActivatedRoute,
              private service: PedidoService) { 
    this.idPedido = 0;
    this.detalhePedido = new Pedido();
  }

  ngOnInit(): void {
    this.idPedido = this.router.snapshot.params["id"];
    this.service.recuperarPedidoPeloId(this.idPedido).subscribe(
      (res: Pedido) => {
        this.detalhePedido = res;
      }
    );
  }

}
